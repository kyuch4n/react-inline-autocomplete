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

var styles = {"wrap":"_index-module__wrap__31Ve9","input":"_index-module__input__ZX6Lw","complete":"_index-module__complete__NwvFz"};

const Autocomplete = (props, ref) => {
  let {
    value,
    dataSource,
    className,
    onBlur,
    onChange,
    onFocus,
    onConfirm
  } = props,
      others = _objectWithoutPropertiesLoose(props, ["value", "dataSource", "className", "onBlur", "onChange", "onFocus", "onConfirm"]);

  let [matchedDSItem, setMatchedDSItem] = useState();
  let [_value, setValue] = useState('');
  let controlledValue = value != null ? value : _value; // input ref

  const inputRef = useRef();
  React.useImperativeHandle(ref, () => inputRef.current);
  const wrapClassString = classNames(styles.wrap, className);
  const inputClassString = classNames(styles.input);
  const completeClassString = classNames(styles.complete);

  const _onChange = e => {
    // trigger onChange
    let text = e.target.value;
    onChange && onChange(text);
    setValue(text); // search matched data source item

    if (!text) return setMatchedDSItem(null);
    let matchedDSItem = dataSource.find(i => i.text.startsWith(text));
    setMatchedDSItem(matchedDSItem);
  };

  const _onConfirm = e => {
    if (e.key !== 'Enter') return;
    if (!matchedDSItem) return; // trigger onChange

    let text = matchedDSItem == null ? void 0 : matchedDSItem.text;
    setValue(text);
    onChange && onChange(text); // trigger onConfirm and reset

    onConfirm && onConfirm(matchedDSItem);
    setMatchedDSItem(null);
  };

  return React.createElement("div", {
    className: wrapClassString
  }, React.createElement("input", Object.assign({
    ref: inputRef,
    className: inputClassString,
    value: controlledValue,
    type: "text",
    onBlur: onBlur,
    onFocus: onFocus,
    onChange: _onChange,
    onKeyDown: _onConfirm
  }, others)), React.createElement("div", {
    className: completeClassString
  }, matchedDSItem == null ? void 0 : matchedDSItem.text));
};

const RefAutoComplete = React.forwardRef(Autocomplete);

export default RefAutoComplete;
//# sourceMappingURL=index.modern.js.map
