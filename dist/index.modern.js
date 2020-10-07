import React, { useState, useRef } from 'react';
import classNames from 'classnames';

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var KeyEnum;

(function (KeyEnum) {
  KeyEnum["TAB"] = "Tab";
  KeyEnum["ENTER"] = "Enter";
  KeyEnum["ARROW_UP"] = "ArrowUp";
  KeyEnum["ARROW_DOWN"] = "ArrowDown";
})(KeyEnum || (KeyEnum = {}));

var styles = {"wrap":"_31Ve9","input":"_ZX6Lw","complete":"_NwvFz"};

const Autocomplete = (props, ref) => {
  var _matchedDataSource$ac;

  const {
    value,
    dataSource,
    className,
    onBlur,
    onFocus,
    onChange,
    onPressEnter,
    onSelect
  } = props,
        others = _objectWithoutPropertiesLoose(props, ["value", "dataSource", "className", "onBlur", "onFocus", "onChange", "onPressEnter", "onSelect"]);

  let [_value, setValue] = useState('');
  let [matchedDataSource, setMatchedDataSource] = useState();
  let [activeIndex, setActiveIndex] = useState(0);
  let controlledValue = value != null ? value : _value;
  const inputRef = useRef();
  React.useImperativeHandle(ref, () => inputRef.current);

  const updateValue = value => {
    onChange && onChange(value);
    setValue(value);
  };

  const handleChange = e => {
    const value = e.target.value;
    updateValue(value);
    if (!value) return setMatchedDataSource([]);
    setActiveIndex(0);
    setMatchedDataSource(dataSource.filter(i => {
      return i.text.startsWith(value) && i.text !== value;
    }));
  };

  const handleKeyDown = e => {
    if (Object.values(KeyEnum).includes(e.key)) {
      e.preventDefault();
    }

    switch (e.key) {
      case KeyEnum.TAB:
        let matchedDataSourceItem = matchedDataSource == null ? void 0 : matchedDataSource[activeIndex];
        if (!matchedDataSourceItem) return;
        updateValue(matchedDataSourceItem.text);
        onSelect && onSelect(matchedDataSourceItem);
        setMatchedDataSource([]);
        break;

      case KeyEnum.ARROW_UP:
        setActiveIndex(idx => {
          if (matchedDataSource == null ? void 0 : matchedDataSource.length) {
            return (idx - 1 + matchedDataSource.length) % matchedDataSource.length;
          }

          return 0;
        });
        break;

      case KeyEnum.ARROW_DOWN:
        setActiveIndex(idx => {
          if (matchedDataSource == null ? void 0 : matchedDataSource.length) {
            return (idx + 1) % matchedDataSource.length;
          }

          return 0;
        });
        break;

      case KeyEnum.ENTER:
        onPressEnter && onPressEnter(controlledValue);
        setMatchedDataSource([]);
        break;
    }
  };

  const wrapClassString = classNames('ria-wrap', styles.wrap, className);
  const inputClassString = classNames('ria-input', styles.input);
  const completeClassString = classNames('ria-complete', styles.complete);
  return React.createElement("div", {
    className: wrapClassString
  }, React.createElement("input", Object.assign({
    ref: inputRef,
    className: inputClassString,
    value: controlledValue,
    type: "text",
    onBlur: onBlur,
    onFocus: onFocus,
    onChange: handleChange,
    onKeyDown: handleKeyDown
  }, others)), React.createElement("div", {
    className: completeClassString
  }, matchedDataSource == null ? void 0 : (_matchedDataSource$ac = matchedDataSource[activeIndex]) == null ? void 0 : _matchedDataSource$ac.text));
};

const RefAutoComplete = React.forwardRef(Autocomplete);

export default RefAutoComplete;
//# sourceMappingURL=index.modern.js.map
