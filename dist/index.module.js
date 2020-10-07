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

var Autocomplete = function Autocomplete(props, ref) {
  var _matchedDataSource$ac;

  var value = props.value,
      dataSource = props.dataSource,
      className = props.className,
      onBlur = props.onBlur,
      onFocus = props.onFocus,
      onChange = props.onChange,
      onPressEnter = props.onPressEnter,
      onSelect = props.onSelect,
      others = _objectWithoutPropertiesLoose(props, ["value", "dataSource", "className", "onBlur", "onFocus", "onChange", "onPressEnter", "onSelect"]);

  var _useState = useState(''),
      _value = _useState[0],
      setValue = _useState[1];

  var _useState2 = useState(),
      matchedDataSource = _useState2[0],
      setMatchedDataSource = _useState2[1];

  var _useState3 = useState(0),
      activeIndex = _useState3[0],
      setActiveIndex = _useState3[1];

  var controlledValue = value != null ? value : _value;
  var inputRef = useRef();
  React.useImperativeHandle(ref, function () {
    return inputRef.current;
  });

  var updateValue = function updateValue(value) {
    onChange && onChange(value);
    setValue(value);
  };

  var handleChange = function handleChange(e) {
    var value = e.target.value;
    updateValue(value);
    if (!value) return setMatchedDataSource([]);
    setActiveIndex(0);
    setMatchedDataSource(dataSource.filter(function (i) {
      return i.text.startsWith(value) && i.text !== value;
    }));
  };

  var handleKeyDown = function handleKeyDown(e) {
    if (Object.values(KeyEnum).includes(e.key)) {
      e.preventDefault();
    }

    switch (e.key) {
      case KeyEnum.TAB:
        var matchedDataSourceItem = matchedDataSource == null ? void 0 : matchedDataSource[activeIndex];
        if (!matchedDataSourceItem) return;
        updateValue(matchedDataSourceItem.text);
        onSelect && onSelect(matchedDataSourceItem);
        setMatchedDataSource([]);
        break;

      case KeyEnum.ARROW_UP:
        setActiveIndex(function (idx) {
          if (matchedDataSource == null ? void 0 : matchedDataSource.length) {
            return (idx - 1 + matchedDataSource.length) % matchedDataSource.length;
          }

          return 0;
        });
        break;

      case KeyEnum.ARROW_DOWN:
        setActiveIndex(function (idx) {
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

  var wrapClassString = classNames('ria-wrap', styles.wrap, className);
  var inputClassString = classNames('ria-input', styles.input);
  var completeClassString = classNames('ria-complete', styles.complete);
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

var RefAutoComplete = React.forwardRef(Autocomplete);

export default RefAutoComplete;
//# sourceMappingURL=index.module.js.map
