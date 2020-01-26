/**
 * Copyright (c) ReactX and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import React, {useMemo, useRef, useCallback, useState, useEffect} from 'react';
type AutocompleteProps = {
  onChange: (e: SyntheticEvent<HTMLButtonElement>, value: string) => void,
  onSelect: (e: SyntheticEvent<HTMLButtonElement>) => void,
  sortItems: (e: SyntheticEvent<HTMLButtonElement>) => void,
  getItemValue: (e: any) => void,
  renderItem: (e: any) => void,
  items: Array<any>,
  value: any,
  wrapperStyle: any,
  wrapperProps: any,
  inputProps: any,
  selectOnBlur: boolean,
  isItemSelectable: (e: any) => void,
};

const defaultProps = {
  value: '',
  wrapperProps: {},
  wrapperStyle: {
    display: 'inline-block',
  },
  inputProps: {},
  renderInput(props) {
    return <input {...props} />;
  },
  onChange() {},
  onSelect() {},
  isItemSelectable() {
    return true;
  },
  renderMenu(items, value, style) {
    return <div style={{...style, ...menuStyle}} children={items} />;
  },
  menuStyle: {
    borderRadius: '3px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '2px 0',
    fontSize: '90%',
    position: 'fixed',
    overflow: 'auto',
    maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
  },
  autoHighlight: true,
  selectOnBlur: false,
  onMenuVisibilityChange() {},
};

export default function Autocomplete(userProps: AutocompleteProps) {
  const defaultMemoizedProps = useMemo(() => defaultProps, []);
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [refs, setRefs] = useState({});
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [positions, setPositions] = useState({});

  const props: TabTypeProps = Object.assign(
    {},
    {...defaultMemoizedProps},
    {...userProps},
  );

  const getFilteredItems = useCallback(() => {
    let items = props.items;

    if (props.shouldItemRender) {
      items = items.filter(item => props.shouldItemRender(item, props.value));
    }

    if (props.sortItems) {
      items.sort((a, b) => props.sortItems(a, b, props.value));
    }

    return items;
  }, []);

  const keyDownHandlers = useMemo(() => {
    return {
      ArrowDown(event) {
        event.preventDefault();
        const items = getFilteredItems();
        if (!items.length) return;
        let index = highlightedIndex === null ? -1 : highlightedIndex;
        for (let i = 0; i < items.length; i++) {
          const p = (index + i + 1) % items.length;
          if (props.isItemSelectable(items[p])) {
            index = p;
            break;
          }
        }
        if (index > -1 && index !== highlightedIndex) {
          setHighlightedIndex(index);
          setIsOpen(true);
        }
      },

      ArrowUp(event) {
        event.preventDefault();
        const items = getFilteredItems();
        if (!items.length) return;
        let index = highlightedIndex === null ? items.length : highlightedIndex;
        for (let i = 0; i < items.length; i++) {
          const p = (index - (1 + i) + items.length) % items.length;
          if (props.isItemSelectable(items[p])) {
            index = p;
            break;
          }
        }
        if (index !== items.length) {
          setHighlightedIndex(index);
          setIsOpen(true);
        }
      },

      Enter(event) {
        // Key code 229 is used for selecting items from character selectors (Pinyin, Kana, etc)
        if (event.keyCode !== 13) return;
        // In case the user is currently hovering over the menu
        if (!isOpen) {
          // menu is closed so there is no selection to accept -> do nothing
          return;
        } else if (highlightedIndex == null) {
          // input has focus but no menu item is selected + enter is hit -> close the menu, highlight whatever's in input
          setIsOpen(false);
        } else {
          // text entered + menu item has been highlighted + enter is hit -> update value to that of selected menu item, close the menu
          event.preventDefault();
          const item = getFilteredItems()[highlightedIndex];
          const value = props.getItemValue(item);
          setIsOpen(false);
          setHighlightedIndex(null);
          //   refs.input.current.setSelectionRange(value.length, value.length);
          //   if (props.onSelect) props.onSelect(value, item);
        }
      },
      Escape() {
        // In case the user is currently hovering over the menu
        setIsOpen(false);
        setHighlightedIndex(null);
      },
    };
  }, [highlightedIndex, isOpen]);

  const handleInputFocus = useCallback(event => {
    setIsOpen(true);
    const {onFocus} = props.inputProps;
    if (onFocus) {
      onFocus(event);
    }
  }, []);

  const handleInputBlur = useCallback(
    event => {
      if (props.selectOnBlur && highlightedIndex !== null) {
        const items = getFilteredItems();
        const item = items[highlightedIndex];
        const value = props.getItemValue(item);
      }
      setIsOpen(false);
      setHighlightedIndex(null);

      const {onBlur} = props.inputProps;
      if (onBlur) {
        onBlur(event);
      }
    },
    [highlightedIndex],
  );

  const isInputFocused = useCallback(() => {
    const el = refs.input;
    return el.ownerDocument && el === el.ownerDocument.activeElement;
  }, [refs]);

  const handleChange = useCallback(event => {
    props.onChange(event, event.target.value);
  }, []);

  const handleInputClick = useCallback(() => {
    if (isInputFocused() && !isOpen) setIsOpen(true);
  }, [isOpen]);

  const handleKeyDown = useCallback(
    event => {
      if (keyDownHandlers[event.key])
        keyDownHandlers[event.key].call(this, event);
      else if (!isOpen) {
        setIsOpen(true);
      }
    },
    [isOpen],
  );

  const composeEventHandlers = useCallback((internal, external) => {
    return external
      ? e => {
          internal(e);
          external(e);
        }
      : internal;
  }, []);

  const selectItemFromMouse = useCallback(item => {
    const value = props.getItemValue(item);
    // The menu will de-render before a mouseLeave event
    // happens. Clear the flag to release control over focus
    setIsOpen(false);
    setHighlightedIndex(null);
    // if(props.onSelect)
    //     props.onSelect(value, item);
  }, []);

  const setMenuPositions = useCallback(
    item => {
      const node = refs.input;
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
    },
    [refs],
  );

  const renderMenu = () => {
    const items = getFilteredItems().map((item, index) => {
      const element = props.renderItem(item, highlightedIndex === index, {
        cursor: 'default',
      });
      let ref = React.createRef();
      return React.cloneElement(element, {
        onMouseEnter: props.isItemSelectable(item)
          ? () => setHighlightedIndex(index)
          : null,
        onClick: props.isItemSelectable(item)
          ? () => selectItemFromMouse(item)
          : null,
        ref: e => setRefs({...refs, [`item-${index}`]: e}),
      });
    });
    const style = {
      left: this.state.menuLeft,
      top: this.state.menuTop,
      minWidth: this.state.menuWidth,
    };
    const menu = props.renderMenu(items, props.value, style);
    return React.cloneElement(menu, {
      ref: e => setRefs({...refs, menu: e}),
      // Ignore blur to prevent menu from de-rendering before we can process click
      //   onTouchStart: () => this.setIgnoreBlur(true),
      //   onMouseEnter: () => this.setIgnoreBlur(true),
      //   onMouseLeave: () => this.setIgnoreBlur(false),
    });
  };

  useEffect(() => {
    if (isOpen) setMenuPositions();
  }, [isOpen]);

  return (
    <div style={{...props.wrapperStyle}} {...props.wrapperProps}>
      {props.renderInput({
        ...props.inputProps,
        role: 'combobox',
        'aria-autocomplete': 'list',
        'aria-expanded': isOpen,
        autoComplete: 'off',
        // ref: e => setRefs({...refs, input: e}),
        onFocus: handleInputFocus,
        onBlur: handleInputBlur,
        onChange: handleChange,
        onKeyDown: composeEventHandlers(
          handleKeyDown,
          props.inputProps.onKeyDown,
        ),
        onClick: composeEventHandlers(
          handleInputClick,
          props.inputProps.onClick,
        ),
        value: props.value,
      })}
      {isOpen && renderMenu()}
    </div>
  );
}
