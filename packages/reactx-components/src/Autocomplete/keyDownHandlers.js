export const keyDownHandlers = {
  ArrowDown(event) {
    event.preventDefault();
    const items = this.getFilteredItems(this.props);
    if (!items.length) return;
    const {highlightedIndex} = this.state;
    let index = highlightedIndex === null ? -1 : highlightedIndex;
    for (let i = 0; i < items.length; i++) {
      const p = (index + i + 1) % items.length;
      if (this.props.isItemSelectable(items[p])) {
        index = p;
        break;
      }
    }
    if (index > -1 && index !== highlightedIndex) {
      this.setState({
        highlightedIndex: index,
        isOpen: true,
      });
    }
  },

  ArrowUp(event) {
    event.preventDefault();
    const items = this.getFilteredItems(this.props);
    if (!items.length) return;
    const {highlightedIndex} = this.state;
    let index = highlightedIndex === null ? items.length : highlightedIndex;
    for (let i = 0; i < items.length; i++) {
      const p = (index - (1 + i) + items.length) % items.length;
      if (this.props.isItemSelectable(items[p])) {
        index = p;
        break;
      }
    }
    if (index !== items.length) {
      this.setState({
        highlightedIndex: index,
        isOpen: true,
      });
    }
  },

  Enter(event) {
    // Key code 229 is used for selecting items from character selectors (Pinyin, Kana, etc)
    if (event.keyCode !== 13) return;
    // In case the user is currently hovering over the menu
    this.setIgnoreBlur(false);
    if (!this.isOpen()) {
      // menu is closed so there is no selection to accept -> do nothing
      return;
    } else if (this.state.highlightedIndex == null) {
      // input has focus but no menu item is selected + enter is hit -> close the menu, highlight whatever's in input
      this.setState(
        {
          isOpen: false,
        },
        () => {
          this.refs.input.select();
        },
      );
    } else {
      // text entered + menu item has been highlighted + enter is hit -> update value to that of selected menu item, close the menu
      event.preventDefault();
      const item = this.getFilteredItems(this.props)[
        this.state.highlightedIndex
      ];
      const value = this.props.getItemValue(item);
      this.setState(
        {
          isOpen: false,
          highlightedIndex: null,
        },
        () => {
          //this.refs.input.focus() // TODO: file issue
          this.refs.input.setSelectionRange(value.length, value.length);
          this.props.onSelect(value, item);
        },
      );
    }
  },

  Escape() {
    // In case the user is currently hovering over the menu
    this.setIgnoreBlur(false);
    this.setState({
      highlightedIndex: null,
      isOpen: false,
    });
  },

  Tab() {
    // In case the user is currently hovering over the menu
    this.setIgnoreBlur(false);
  },
};
