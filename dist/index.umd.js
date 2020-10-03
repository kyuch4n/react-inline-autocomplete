(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('classnames')) :
  typeof define === 'function' && define.amd ? define(['react', 'classnames'], factory) :
  (global = global || self, global.reactInlineAutocomplete = factory(global.React, global.classnames));
}(this, (function (React, classNames) {
  var React__default = 'default' in React ? React['default'] : React;
  classNames = classNames && Object.prototype.hasOwnProperty.call(classNames, 'default') ? classNames['default'] : classNames;

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

  var styles = {"wrap":"_31Ve9","input":"_ZX6Lw","complete":"_NwvFz"};

  var Autocomplete = function Autocomplete(props, ref) {
    var value = props.value,
        dataSource = props.dataSource,
        className = props.className,
        onBlur = props.onBlur,
        onChange = props.onChange,
        onFocus = props.onFocus,
        onConfirm = props.onConfirm,
        others = _objectWithoutPropertiesLoose(props, ["value", "dataSource", "className", "onBlur", "onChange", "onFocus", "onConfirm"]);

    var _useState = React.useState(),
        matchedDSItem = _useState[0],
        setMatchedDSItem = _useState[1];

    var _useState2 = React.useState(''),
        _value = _useState2[0],
        setValue = _useState2[1];

    var controlledValue = value != null ? value : _value; // input ref

    var inputRef = React.useRef();
    React__default.useImperativeHandle(ref, function () {
      return inputRef.current;
    });
    var wrapClassString = classNames('ria-wrap', styles.wrap, className);
    var inputClassString = classNames('ria-input', styles.input);
    var completeClassString = classNames('ria-complete', styles.complete);

    var _onChange = function _onChange(e) {
      // trigger onChange
      var text = e.target.value;
      onChange && onChange(text);
      setValue(text); // search matched data source item

      if (!text) return setMatchedDSItem(null);
      var matchedDSItem = dataSource.find(function (i) {
        return i.text.startsWith(text);
      });
      setMatchedDSItem(matchedDSItem);
    };

    var _onConfirm = function _onConfirm(e) {
      if (e.key !== 'Enter') return;
      if (!matchedDSItem) return; // trigger onChange

      var text = matchedDSItem == null ? void 0 : matchedDSItem.text;
      setValue(text);
      onChange && onChange(text); // trigger onConfirm and reset

      onConfirm && onConfirm(matchedDSItem);
      setMatchedDSItem(null);
    };

    return React__default.createElement("div", {
      className: wrapClassString
    }, React__default.createElement("input", Object.assign({
      ref: inputRef,
      className: inputClassString,
      value: controlledValue,
      type: "text",
      onBlur: onBlur,
      onFocus: onFocus,
      onChange: _onChange,
      onKeyDown: _onConfirm
    }, others)), React__default.createElement("div", {
      className: completeClassString
    }, matchedDSItem == null ? void 0 : matchedDSItem.text));
  };

  var RefAutoComplete = React__default.forwardRef(Autocomplete);

  return RefAutoComplete;

})));
//# sourceMappingURL=index.umd.js.map
