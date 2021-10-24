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
import '../assets/elements.autocomplete.scss';
import {Button} from '../Button/Button';
import {ControlPropsType} from '../Form/Control';
import Form from '../Form/Form';
import {createPopper, Placement} from '@popperjs/core';

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
  inputProps?: ControlPropsType;
}

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
    inputProps,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

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
        if (!isOpen) {
          // menu is closed so there is no selection to accept -> do nothing
          return;
        } else if (highlightedIndex === null) {
          // input has focus but no menu item is selected + enter is hit -> close the menu, highlight whatever's in input
          setIsOpen(false);
          inputRef.current && inputRef.current.select();
        } else {
          // text entered + menu item has been highlighted + enter is hit -> update value to that of selected menu item, close the menu
          event.preventDefault();
          const item = getFilteredItems()[highlightedIndex];
          const value = getItemValue(item);
          setIsOpen(false);
          setHighlightedIndex(null);
          inputRef.current &&
            inputRef.current.setSelectionRange(value.length, value.length);
          if (onSelect) onSelect(value, item);
        }
      },
      Escape() {
        // In case the user is currently hovering over the menu
        setIsOpen(false);
        setHighlightedIndex(null);
      },
      Tab() {},
    };
  }, [
    highlightedIndex,
    inputRef.current,
    isOpen,
    setHighlightedIndex,
    isItemSelectable,
    getFilteredItems,
    getItemValue,
    setIsOpen,
  ]);

  const handleInputFocus = useCallback((event) => {
    if (!isOpen) setIsOpen(true);
    const {onFocus} = inputProps!;
    if (onFocus) {
      onFocus(event);
    }
  }, []);

  const handleInputBlur = useCallback(
    (event) => {
      if (selectOnBlur && highlightedIndex !== null) {
        const items = getFilteredItems();
        const item = items[highlightedIndex];
        const value = getItemValue(item);
        if (onSelect) onSelect(value, item);
      }
      setIsOpen(false);
      setHighlightedIndex(null);
      const {onBlur} = inputProps!;
      if (onBlur) {
        onBlur(event);
      }
    },
    [highlightedIndex],
  );

  const isInputFocused = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    return el.ownerDocument && el === el.ownerDocument.activeElement;
  }, [inputRef.current]);

  const handleInputClick = useCallback(() => {
    if (isInputFocused() && !isOpen) setIsOpen(true);
  }, [isOpen]);

  const handleArrowClick = useCallback(() => {
    if (!isOpen && inputRef.current) {
      inputRef.current.focus();
      handleInputClick();
    }
  }, [isOpen, inputRef.current]);

  const handleClearClick = useCallback(
    (event) => {
      if (!isOpen && inputRef.current) {
        inputRef.current.focus();
      }
      onChange && onChange(event, '');
    },
    [isOpen, inputRef.current],
  );

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

  const selectItemFromMouse = useCallback((item) => {
    const value = getItemValue(item);
    // The menu will re-render before a mouseLeave event
    // happens. Clear the flag to release control over focus
    setIsOpen(false);
    setHighlightedIndex(null);
    if (onSelect) onSelect(value, item);
  }, []);

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
      });
    });
    const menu = <div className="x-autocomplete__menu" children={items} />;

    const modifiers = [
      {
        name: 'offset',
        options: {
          offset: [0, 5],
        },
      },
      {
        name: 'flip',
        options: {
          altBoundary: true,
        },
      },
    ];
    return React.cloneElement(menu, {
      ref: (e: HTMLElement | null) => {
        createPopper(inputRef.current!, e!, {
          placement: 'bottom-start',
          modifiers,
        });
      },
    });
  };
  useEffect(() => {
    if (isOpen) {
      if (onMenuVisibilityChange) onMenuVisibilityChange(isOpen);
    }
  }, [isOpen]);

  return (
    <div
      ref={forawardedRef}
      className={classNames('x-autocomplete', className)}>
      {showArrow && (
        <Button className="x-autocomplete__arrow" onClick={handleArrowClick}>
          <i
            className={classNames(
              'x-autocomplete__arrow--' + (isOpen ? 'down' : 'up'),
            )}></i>
        </Button>
      )}
      {showClear && (
        <Button className="x-autocomplete__clear" onClick={handleClearClick}>
          <i>&times;</i>
        </Button>
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
        ref={inputRef}
        {...inputProps}></Form.Control>
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
  inputProps: {},
};
export {Autocomplete};
