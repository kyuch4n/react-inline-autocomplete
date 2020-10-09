import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import ignoreCase from 'ignore-case';
import { KeyEnum } from './key-enum';
import styles from './index.module.css';

export interface Props {
  value?: string;
  dataSource: DataSourceItem[];
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  disabled?: boolean;
  navigate?: boolean;
  caseSensitive?: boolean;
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
    navigate = true,
    caseSensitive = true,
    onBlur,
    onFocus,
    onChange,
    onPressEnter,
    onSelect,
    ...others
  } = props;
  const [innerVal, setInnerVal] = useState('');
  const [matchedDataSource, setMatchedDataSource] = useState<DataSourceItem[]>();
  const [activeIndex, setActiveIndex] = useState(0);
  const ctrlValue = value ?? innerVal;

  /**
   * inputRef
   */
  const inputRef = useRef<HTMLInputElement>();
  React.useImperativeHandle(ref, () => inputRef.current!);

  const updateValue = (value: string) => {
    onChange && onChange(value);
    setInnerVal(value);
  };

  const updateMatchedDataSource = (value?: string) => {
    setActiveIndex(0);
    value
      ? setMatchedDataSource(
          dataSource.filter(({ text }) => {
            return caseSensitive
              ? text.startsWith(value) && text !== value
              : ignoreCase.startsWith(text, value) && !ignoreCase.equals(text, value);
          })
        )
      : setMatchedDataSource([]);
  };

  /**
   * InputChange Handler
   * @param e
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateValue(value);
    updateMatchedDataSource(value);
  };

  /**
   * KeyDown Handler
   * deal with `Tab` | `Enter` | `ArrowUp` | `ArrowDown`
   * @param e
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (Object.values(KeyEnum).includes(e.key as KeyEnum)) {
      e.preventDefault();
    }

    switch (e.key) {
      case KeyEnum.TAB:
        const matchedDataSourceItem = matchedDataSource?.[activeIndex];
        if (!matchedDataSourceItem) return;

        /**
         * onChange >>> onSelect >>> Search matched item
         */
        const { text } = matchedDataSourceItem;
        updateValue(text);
        onSelect && onSelect(matchedDataSourceItem);
        updateMatchedDataSource(text);
        break;
      case KeyEnum.ENTER:
        /**
         * onPressEnter >>> Reset
         */
        onPressEnter && onPressEnter(ctrlValue);
        updateMatchedDataSource();
        break;
      case KeyEnum.ARROW_UP:
        if (!navigate) break;

        setActiveIndex((idx) => {
          if (matchedDataSource?.length) {
            return (idx - 1 + matchedDataSource.length) % matchedDataSource.length;
          }
          return 0;
        });
        break;
      case KeyEnum.ARROW_DOWN:
        if (!navigate) break;

        setActiveIndex((idx) => {
          if (matchedDataSource?.length) {
            return (idx + 1) % matchedDataSource.length;
          }
          return 0;
        });
        break;
      default:
        break;
    }
  };

  const breakUp = () => {
    return matchedDataSource?.[activeIndex]?.text
      ? `${ctrlValue}${matchedDataSource[activeIndex].text.slice(ctrlValue.length)}`
      : undefined;
  };

  const wrapClassString = classNames('ria-wrap', styles.wrap, className); // `className` should cover `styles.wrap`
  const inputClassString = classNames('ria-input', styles.input);
  const completeClassString = classNames('ria-complete', styles.complete);
  const completeContent = breakUp();

  return (
    <div className={wrapClassString}>
      <input
        ref={inputRef as any}
        className={inputClassString}
        value={ctrlValue}
        type="text"
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...others}
      />
      <div className={completeClassString}>{completeContent}</div>
    </div>
  );
};

const RefAutoComplete = React.forwardRef<HTMLInputElement, Props>(Autocomplete);
export default RefAutoComplete;
