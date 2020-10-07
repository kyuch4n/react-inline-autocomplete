import React from 'react';
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
declare const RefAutoComplete: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLInputElement>>;
export default RefAutoComplete;
