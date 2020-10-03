import React from 'react';
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
declare const RefAutoComplete: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLInputElement>>;
export default RefAutoComplete;
