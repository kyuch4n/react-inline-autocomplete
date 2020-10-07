import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { KeyEnum } from './key-enum';
import styles from './index.module.css';

export interface Props {
  value?: string;
  dataSource: DataSourceItem[];
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  disabled?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  onChange?: (value: string) => void;
  onPressEnter?: (value: string) => void;
  onSelect?: (item: DataSourceItem) => void;
}

export interface DataSourceItem {
  text: string;
  value: string | number;
  [key: string]: any;
}

const Autocomplete: React.ForwardRefRenderFunction<HTMLInputElement, Props> = (props, ref) => {
  const {
    value,
    dataSource,
    className,
    onBlur,
    onFocus,
    onChange,
    onPressEnter,
    onSelect,
    ...others
  } = props;
  const [_value, setValue] = useState('');
  const [matchedDataSource, setMatchedDataSource] = useState<DataSourceItem[]>();
  const [activeIndex, setActiveIndex] = useState(0);
  const controlledValue = value ?? _value;

  const inputRef = useRef<HTMLInputElement>();
  React.useImperativeHandle(ref, () => inputRef.current!);

  const updateValue = (value: string) => {
    onChange && onChange(value);
    setValue(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateValue(value);

    if (!value) return setMatchedDataSource([]);
    setActiveIndex(0);
    setMatchedDataSource(
      dataSource.filter((i) => {
        return i.text.startsWith(value) && i.text !== value;
      })
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (Object.values(KeyEnum).includes(e.key as KeyEnum)) {
      e.preventDefault();
    }

    switch (e.key) {
      case KeyEnum.TAB:
        const matchedDataSourceItem = matchedDataSource?.[activeIndex];
        if (!matchedDataSourceItem) return;

        updateValue(matchedDataSourceItem.text);
        onSelect && onSelect(matchedDataSourceItem);
        setMatchedDataSource([]);
        break;
      case KeyEnum.ARROW_UP:
        setActiveIndex((idx) => {
          if (matchedDataSource?.length) {
            return (idx - 1 + matchedDataSource.length) % matchedDataSource.length;
          }
          return 0;
        });
        break;
      case KeyEnum.ARROW_DOWN:
        setActiveIndex((idx) => {
          if (matchedDataSource?.length) {
            return (idx + 1) % matchedDataSource.length;
          }
          return 0;
        });
        break;
      case KeyEnum.ENTER:
        onPressEnter && onPressEnter(controlledValue);
        setMatchedDataSource([]);
        break;
      default:
        break;
    }
  };

  const wrapClassString = classNames('ria-wrap', styles.wrap, className);
  const inputClassString = classNames('ria-input', styles.input);
  const completeClassString = classNames('ria-complete', styles.complete);

  return (
    <div className={wrapClassString}>
      <input
        ref={inputRef as any}
        className={inputClassString}
        value={controlledValue}
        type="text"
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...others}
      />
      <div className={completeClassString}>{matchedDataSource?.[activeIndex]?.text}</div>
    </div>
  );
};

const RefAutoComplete = React.forwardRef<HTMLInputElement, Props>(Autocomplete);
export default RefAutoComplete;
