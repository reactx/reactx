/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import classNames from 'classnames';
import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Form from '../Form/Form';
import {Button} from '../Button/Button';
import '../assets/elements.autocomplete.scss';

export interface AutocompletePropsType {
  forawardedRef?: ForwardedRef<HTMLDivElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  renderItem: (e: any, changed: boolean, opt: any) => React.ReactElement<any>;
  sortItems?: (a: any, b: any, c: any) => number;
  shouldItemRender?: (item: any, value: any) => void;
  onSelect?: (value: any, item: any) => void;
  onMenuVisibilityChange?: (e: any) => void;
  getItemValue: (e: any) => string;
  isItemSelectable?: (e: any) => boolean;
  selectOnBlur?: boolean;
  showArrow?: boolean;
  showClear?: boolean;
  className?: string;
  items: Array<any>;
  value: any;
}

type RefsType = {
  input?: HTMLInputElement | null;
  menu?: HTMLElement | null;
  arrow?: HTMLButtonElement | null;
  clear?: HTMLButtonElement | null;
};

type OptionsType = {
  _scrollOffset: {x: number; y: number} | null;
  _scrollTimer: NodeJS.Timeout | null;
  _ignoreBlur: boolean;
  _ignoreFocus: boolean;
};
type PositionType = {
  menuLeft?: number;
  menuTop?: number;
  menuWidth?: number;
};

const AutocompleteComponent = (props: AutocompletePropsType) => {
  const {
    forawardedRef,
    onMenuVisibilityChange,
    isItemSelectable,
    shouldItemRender,
    getItemValue,
    renderItem,
    sortItems,
    onChange,
    onSelect,
    selectOnBlur,
    showArrow,
    showClear,
    items,
    value,
    className,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<OptionsType>({
    _scrollOffset: null,
    _scrollTimer: null,
    _ignoreBlur: false,
    _ignoreFocus: false,
  });
  const refs = useRef<RefsType>({});
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [positions, setPositions] = useState<PositionType>({});

  const getFilteredItems = useCallback(() => {
    let renderedOtems = [...items];
    if (shouldItemRender) {
      renderedOtems = items.filter((item) => shouldItemRender(item, value));
    }

    if (sortItems) {
      renderedOtems = renderedOtems.sort((a, b) => sortItems(a, b, value));
    }
    return renderedOtems;
  }, [value, items]);

  const keyDownHandlers = useMemo(() => {
    return {
      ArrowDown(event: KeyboardEvent) {
        event.preventDefault();
        const items = getFilteredItems();
        if (!items.length) return;
        let index = highlightedIndex === null ? -1 : highlightedIndex;
        for (let i = 0; i < items.length; i++) {
          const p = (index + i + 1) % items.length;
          if (isItemSelectable!(items[p])) {
            index = p;
            break;
          }
        }
        if (index > -1 && index !== highlightedIndex) {
          setHighlightedIndex(index);
          setIsOpen(true);
        }
      },

      ArrowUp(event: KeyboardEvent) {
        event.preventDefault();
        const items = getFilteredItems();
        if (!items.length) return;
        let index = highlightedIndex === null ? items.length : highlightedIndex;
        for (let i = 0; i < items.length; i++) {
          const p = (index - (1 + i) + items.length) % items.length;
          if (isItemSelectable!(items[p])) {
            index = p;
            break;
          }
        }
        if (index !== items.length) {
          setHighlightedIndex(index);
          setIsOpen(true);
        }
      },

      Enter(event: KeyboardEvent) {
        // Key code 229 is used for selecting items from character selectors (Pinyin, Kana, etc)
        if (event.keyCode !== 13) return;
        // In case the user is currently hovering over the menu
        setOptions({...options, _ignoreBlur: false});
        if (!isOpen) {
          // menu is closed so there is no selection to accept -> do nothing
          return;
        } else if (highlightedIndex == null) {
          // input has focus but no menu item is selected + enter is hit -> close the menu, highlight whatever's in input
          setIsOpen(false);
          refs.current.input && refs.current.input.select();
        } else {
          // text entered + menu item has been highlighted + enter is hit -> update value to that of selected menu item, close the menu
          event.preventDefault();
          const item = getFilteredItems()[highlightedIndex];
          const value = getItemValue(item);
          setIsOpen(false);
          setHighlightedIndex(null);
          //   refs.input.current.setSelectionRange(value.length, value.length);
          refs.current.input &&
            refs.current.input.setSelectionRange(value.length, value.length);
          if (onSelect) onSelect(value, item);
        }
      },
      Escape() {
        // In case the user is currently hovering over the menu
        setOptions({...options, _ignoreBlur: false});
        setIsOpen(false);
        setHighlightedIndex(null);
      },
      Tab() {
        // In case the user is currently hovering over the menu
        setOptions({...options, _ignoreBlur: false});
      },
    };
  }, [
    highlightedIndex,
    refs.current,
    options,
    isOpen,
    setHighlightedIndex,
    isItemSelectable,
    getFilteredItems,
    getItemValue,
    setOptions,
    setIsOpen,
  ]);

  const handleInputFocus = useCallback(
    (event) => {
      if (options._ignoreFocus) {
        if (options._scrollOffset) {
          const {x, y} = options._scrollOffset;
          setOptions({...options, _ignoreFocus: false, _scrollOffset: null});
          // Focus will cause the browser to scroll the <input> into view.
          // This can cause the mouse coords to change, which in turn
          // could cause a new highlight to happen, cancelling the click
          // event (when selecting with the mouse)
          window.scrollTo(x, y);
          // Some browsers wait until all focus event handlers have been
          // processed before scrolling the <input> into view, so let's
          // scroll again on the next tick to ensure we're back to where
          // the user was before focus was lost. We could do the deferred
          // scroll only, but that causes a jarring split second jump in
          // some browsers that scroll before the focus event handlers
          // are triggered.
          if (options._scrollTimer) clearTimeout(options._scrollTimer);
          setOptions({
            ...options,
            _scrollTimer: setTimeout(() => {
              setOptions({...options, _scrollTimer: null});
              window.scrollTo(x, y);
            }, 0),
          });
          return;
        }
      }
      if (!isOpen) setIsOpen(true);
      //   const {onFocus} = inputProps;
      //   if (onFocus) {
      //     onFocus(event);
      //   }
    },
    [options],
  );

  const getScrollOffset = useCallback(() => {
    return {
      x:
        window.pageXOffset !== undefined
          ? window.pageXOffset
          : (document.documentElement || document.body).scrollLeft,
      y:
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (document.documentElement || document.body).scrollTop,
    };
  }, []);

  const handleInputBlur = useCallback(
    (event) => {
      if (options._ignoreBlur) {
        setOptions({
          ...options,
          _ignoreFocus: true,
          _scrollOffset: getScrollOffset(),
        });
        refs.current.input && refs.current.input.focus();
        return;
      }

      if (selectOnBlur && highlightedIndex !== null) {
        const items = getFilteredItems();
        const item = items[highlightedIndex];
        const value = getItemValue(item);
        if (onSelect) onSelect(value, item);
      }
      setIsOpen(false);
      setHighlightedIndex(null);
      //   const {onBlur} = inputProps;
      //   if (onBlur) {
      //     onBlur(event);
      //   }
    },
    [highlightedIndex, options],
  );

  const isInputFocused = useCallback(() => {
    const el = refs.current.input;
    if (!el) return;
    return el.ownerDocument && el === el.ownerDocument.activeElement;
  }, [refs.current]);

  const isArrowFocused = useCallback(() => {
    const el = refs.current.arrow;
    if (!el) return;
    return el.ownerDocument && el === el.ownerDocument.activeElement;
  }, [refs.current]);

  const handleInputClick = useCallback(() => {
    if (isInputFocused() && !isOpen) setIsOpen(true);
  }, [isOpen]);

  const handleArrowClick = useCallback(() => {
    if (isArrowFocused() && !isOpen && refs.current.input) {
      refs.current.input.focus();
      handleInputClick();
    }
  }, [isOpen]);

  const handleClearClick = useCallback(() => {
    if (!isOpen && refs.current.input) {
      refs.current.input.focus();
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent): void => {
      if ((keyDownHandlers as any)[event.key])
        (keyDownHandlers as any)[event.key].call(this, event);
      else if (!isOpen) {
        setIsOpen(true);
      }
    },
    [isOpen, highlightedIndex],
  );

  const selectItemFromMouse = useCallback(
    (item) => {
      const value = getItemValue(item);
      // The menu will de-render before a mouseLeave event
      // happens. Clear the flag to release control over focus
      setOptions({...options, _ignoreBlur: false});
      setIsOpen(false);
      setHighlightedIndex(null);
      if (onSelect) onSelect(value, item);
    },
    [options],
  );

  const setMenuPositions = useCallback(() => {
    const node = refs.current.input;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const computedStyle = global.window.getComputedStyle(node);
    const marginBottom = parseInt(computedStyle.marginBottom, 10) || 0;
    const marginLeft = parseInt(computedStyle.marginLeft, 10) || 0;
    const marginRight = parseInt(computedStyle.marginRight, 10) || 0;

    setPositions({
      menuTop: rect.bottom + marginBottom,
      menuLeft: rect.left + marginLeft,
      menuWidth: rect.width + marginLeft + marginRight,
    });
  }, [refs.current]);

  const maybeAutoCompleteText = useCallback(() => {
    let index = highlightedIndex === null ? 0 : highlightedIndex;
    let items = getFilteredItems();
    for (let i = 0; i < items.length; i++) {
      if (isItemSelectable!(items[index])) break;
      index = (index + 1) % items.length;
    }
    const matchedItem =
      items[index] && isItemSelectable!(items[index]) ? items[index] : null;
    if (value.toString() !== '' && matchedItem) {
      const itemValue = getItemValue(matchedItem);
      const itemValueDoesMatch =
        itemValue
          .toString()
          .toLowerCase()
          .indexOf(value.toString().toLowerCase()) === 0;
      if (itemValueDoesMatch) {
        return index;
      }
    }
    return null;
  }, [highlightedIndex, value]);

  useEffect(() => {
    setHighlightedIndex(maybeAutoCompleteText());
  }, [value]);

  const renderMenu = () => {
    const items = getFilteredItems().map((item, index) => {
      const element = renderItem(item, highlightedIndex === index, {
        cursor: 'default',
      });
      return React.cloneElement(element, {
        onMouseEnter: isItemSelectable!(item)
          ? () => setHighlightedIndex(index)
          : null,
        onClick: isItemSelectable!(item)
          ? () => selectItemFromMouse(item)
          : null,
        ref: (e: any) =>
          (refs.current = {...refs.current, [`item-${index}`]: e}),
      });
    });
    const style = {
      left: positions.menuLeft,
      top: positions.menuTop,
      minWidth: positions.menuWidth,
    };
    const menu = (
      <div
        className="x-autocomplete__menu"
        style={{
          ...style,
        }}
        children={items}
      />
    );
    return React.cloneElement(menu, {
      ref: (e: HTMLElement | null) =>
        (refs.current = {...refs.current, menu: e}),
      // Ignore blur to prevent menu from de-rendering before we can process click
      onTouchStart: () => setOptions({...options, _ignoreBlur: true}),
      onMouseEnter: () => setOptions({...options, _ignoreBlur: true}),
      onMouseLeave: () => setOptions({...options, _ignoreBlur: false}),
    });
  };
  useEffect(() => {
    if (isOpen) {
      setMenuPositions();
      if (onMenuVisibilityChange) onMenuVisibilityChange(isOpen);
    }
  }, [isOpen]);

  return (
    <div
      ref={forawardedRef}
      className={classNames('x-autocomplete', className)}>
      {showArrow && (
        <Button
          className={classNames(
            'x-autocomplete__arrow',
            'x-autocomplete__arrow--' + (isOpen ? 'up' : 'down'),
          )}
          onClick={handleArrowClick}
          ref={(el) => (refs.current = {...refs.current, arrow: el})}></Button>
      )}
      {showClear && (
        <Button
          className="x-autocomplete__clear"
          onClick={handleClearClick}
          ref={(el) => (refs.current = {...refs.current, clear: el})}></Button>
      )}
      <Form.Control
        role="combobox"
        aria-autocomplete="list"
        autoComplete="off"
        className="x-autocomplete__control"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={(event) => onChange && onChange(event, event.target.value)}
        aria-expanded={isOpen}
        onKeyDown={handleKeyDown}
        onClick={handleInputClick}
        value={value}
        ref={(el: HTMLInputElement) =>
          (refs.current = {...refs.current, input: el})
        }></Form.Control>
      {isOpen && renderMenu()}
    </div>
  );
};

const Autocomplete = forwardRef<HTMLDivElement, AutocompletePropsType>(
  (props, ref) => {
    return <AutocompleteComponent {...props} forawardedRef={ref} />;
  },
);

Autocomplete.displayName = 'Autocomplete';
Autocomplete.defaultProps = {
  value: '',
  showArrow: false,
  isItemSelectable: () => true,
  selectOnBlur: false,
};
export {Autocomplete};
