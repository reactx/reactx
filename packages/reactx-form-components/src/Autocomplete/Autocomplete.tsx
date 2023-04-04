/**
 * Copyright (c) ReactX and its affiliates..
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import {createPopper, Modifier} from '@popperjs/core';
import clsx from 'clsx';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export interface AutocompletePropsType
  extends Omit<
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSelect'>,
    'onChange'
  > {
  onChange?: (value?: string) => void;
  renderItem: (e: any, changed: boolean, opt: any) => React.ReactElement<any>;
  sortItems?: (a: any, b: any, c: any) => number;
  shouldItemRender?: (item: any, value: any) => void;
  onSelect?: (value: any, item: any) => void;
  onMenuVisibilityChange?: (e: any) => void;
  getItemValue: (e: any) => string;
  isItemSelectable?: (e: any) => boolean;
  renderArrow?: (onClick: () => void) => React.ReactElement<any>;
  renderClear?: (onClick: () => void) => React.ReactElement<any>;
  selectOnBlur?: boolean;
  showArrow?: boolean;
  showClear?: boolean;
  className?: string;
  items: Array<any>;
  value: any;
  modifiers?: Partial<Modifier<any, any>>[];
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
type OptionsType = {
  _ignoreBlur: boolean;
  _ignoreFocus: boolean;
};
const Autocomplete = forwardRef<HTMLDivElement, AutocompletePropsType>(
  (props, ref) => {
    const {
      onMenuVisibilityChange,
      shouldItemRender,
      getItemValue,
      renderItem,
      sortItems,
      onChange,
      onSelect,
      onFocus,
      onBlur,
      renderArrow,
      renderClear,
      modifiers,
      showClear,
      items,
      className,
      value = '',
      showArrow = false,
      isItemSelectable = () => true,
      selectOnBlur = false,
      inputProps = {},
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const menuRef = useRef<HTMLElement | null>(null);
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(
      null,
    );
    const [options, setOptions] = useState<OptionsType>({
      _ignoreBlur: false,
      _ignoreFocus: false,
    });
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
          let index =
            highlightedIndex === null ? items.length : highlightedIndex;
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
          // In case the user is currently hovering over the menu
          setOptions({...options, _ignoreBlur: false});
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
      inputRef,
      isOpen,
      options,
      setOptions,
      setHighlightedIndex,
      isItemSelectable,
      getFilteredItems,
      getItemValue,
      setIsOpen,
    ]);

    const handleInputFocus = useCallback(
      (event: React.FocusEvent<HTMLInputElement, Element>) => {
        if (!options._ignoreFocus) {
          if (!isOpen) setIsOpen(true);
          if (onFocus) {
            onFocus(event);
          }
        }
      },
      [options, isOpen, setIsOpen, onFocus],
    );

    const handleInputBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement, Element>) => {
        if (options._ignoreBlur) {
          setOptions({
            ...options,
            _ignoreFocus: true,
          });
          inputRef.current && inputRef.current.focus();
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
        if (onBlur) {
          onBlur(event);
        }
      },
      [
        highlightedIndex,
        inputRef,
        options,
        setOptions,
        setIsOpen,
        setHighlightedIndex,
        getFilteredItems,
        getItemValue,
        onBlur,
      ],
    );

    const isInputFocused = useCallback(() => {
      const el = inputRef.current;
      if (!el) return;
      return el.ownerDocument && el === el.ownerDocument.activeElement;
    }, [inputRef]);

    const handleInputClick = useCallback(() => {
      if (isInputFocused() && !isOpen) {
        onChange && onChange(value);
        setIsOpen(true);
      }
    }, [isOpen, value, isInputFocused, setIsOpen, onChange]);

    const handleArrowClick = useCallback(() => {
      if (!isOpen && inputRef.current) {
        inputRef.current.focus();
        handleInputClick();
      }
    }, [isOpen, inputRef, handleInputClick]);

    const handleClearClick = useCallback(() => {
      if (!isOpen && inputRef.current) {
        inputRef.current.focus();
        setIsOpen(true);
      }
      onChange && onChange('');
      onSelect && onSelect(null, null);
    }, [isOpen, inputRef, onChange, setIsOpen]);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent): void => {
        if ((keyDownHandlers as any)[event.key])
          (keyDownHandlers as any)[event.key].call(this, event);
        else if (!isOpen) {
          setIsOpen(true);
        }
      },
      [isOpen, setIsOpen, keyDownHandlers],
    );

    const selectItemFromMouse = useCallback(
      (item: any) => {
        const value = getItemValue(item);
        // The menu will re-render before a mouseLeave event
        // happens. Clear the flag to release control over focus
        setOptions({...options, _ignoreBlur: false});
        setIsOpen(false);
        setHighlightedIndex(null);
        if (onSelect) onSelect(value, item);
      },
      [
        options,
        setOptions,
        setIsOpen,
        setHighlightedIndex,
        getItemValue,
        onChange,
        onSelect,
      ],
    );

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
    }, [
      highlightedIndex,
      value,
      getFilteredItems,
      isItemSelectable,
      getItemValue,
    ]);

    useEffect(() => {
      setHighlightedIndex(maybeAutoCompleteText());
    }, [value]);

    useEffect(() => {
      if (isOpen) {
        if (onMenuVisibilityChange) onMenuVisibilityChange(isOpen);
      }
    }, [isOpen]);

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
      const menu = <div className='x-autocomplete__menu' children={items} />;

      const modifs: Partial<Modifier<any, any>>[] = modifiers || [
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
          if (e && inputRef.current) {
            menuRef.current = e;
            createPopper(inputRef.current, e, {
              placement: 'bottom-start',
              modifiers: modifs,
            });
          }
        },
        // Ignore blur to prevent menu from de-rendering before we can process click
        onTouchStart: () => setOptions({...options, _ignoreBlur: true}),
        onMouseEnter: () => setOptions({...options, _ignoreBlur: true}),
        onMouseLeave: () => setOptions({...options, _ignoreBlur: false}),
      });
    };

    return (
      <div ref={ref} className={clsx('x-autocomplete', className)}>
        {showArrow && (
          <>
            {renderArrow ? (
              renderArrow(handleArrowClick)
            ) : (
              <button
                className='x-btn x-autocomplete__arrow'
                onClick={handleArrowClick}>
                <i
                  className={clsx(
                    'x-autocomplete__arrow--' + (isOpen ? 'down' : 'up'),
                  )}></i>
              </button>
            )}
          </>
        )}
        {showClear && (
          <>
            {renderClear ? (
              renderClear(handleClearClick)
            ) : (
              <button
                className='x-btn x-autocomplete__clear'
                onClick={handleClearClick}>
                <i>&times;</i>
              </button>
            )}
          </>
        )}
        <input
          role='combobox'
          aria-autocomplete='list'
          autoComplete='off'
          className={clsx('x-form-control', 'x-autocomplete__control')}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={(event) => onChange && onChange(event.target.value)}
          aria-expanded={isOpen}
          onKeyDown={handleKeyDown}
          onClick={handleInputClick}
          value={value}
          ref={inputRef}
          {...inputProps}></input>
        {isOpen && renderMenu()}
      </div>
    );
  },
);

export {Autocomplete};
