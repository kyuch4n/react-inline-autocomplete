import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './index.module.css';

export interface Props {
  value?: string;
  dataSource: DataSourceItem[];
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  disabled?: boolean;
  onBlur?: () => void;
  onChange?: (text: string) => void;
  onFocus?: () => void;
  onConfirm?: (option: DataSourceItem) => void;
}

export interface DataSourceItem {
  value: string | number;
  text: string;
}

const Autocomplete: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (props, ref) => {
  const { value, dataSource, className, onBlur, onChange, onFocus, onConfirm, ...others } = props;
  const [matchedDSItem, setMatchedDSItem] = useState<DataSourceItem | null>();
  const [_value, setValue] = useState('');
  const controlledValue = value ?? _value;

  // input ref
  const inputRef = useRef<HTMLInputElement>();
  React.useImperativeHandle(ref, () => inputRef.current!);

  const wrapClassString = classNames(styles.wrap, className);
  const inputClassString = classNames(styles.input);
  const completeClassString = classNames(styles.complete);

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // trigger onChange
    const text = e.target.value;
    onChange && onChange(text);
    setValue(text);

    // search matched data source item
    if (!text) return setMatchedDSItem(null);
    const matchedDSItem = dataSource.find((i) => i.text.startsWith(text));
    setMatchedDSItem(matchedDSItem);
  };

  const _onConfirm = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    if (!matchedDSItem) return;

    // trigger onChange
    const text = matchedDSItem?.text;
    setValue(text);
    onChange && onChange(text);

    // trigger onConfirm and reset
    onConfirm && onConfirm(matchedDSItem);
    setMatchedDSItem(null);
  };

  return (
    <div className={wrapClassString}>
      <input
        ref={inputRef as any}
        className={inputClassString}
        value={controlledValue}
        type="text"
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={_onChange}
        onKeyDown={_onConfirm}
        {...others}
      />
      <div className={completeClassString}>{matchedDSItem?.text}</div>
    </div>
  );
};

const RefAutoComplete = React.forwardRef<HTMLInputElement, Props>(Autocomplete);
export default RefAutoComplete;
