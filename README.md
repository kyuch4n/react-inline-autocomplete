# React Inline Autocomplete

[![npm version](https://badge.fury.io/js/react-inline-autocomplete.svg)](https://badge.fury.io/js/react-inline-autocomplete)

## Installation

```shell
yarn add react-inline-autocomplete
```

or

```shell
npm install react-inline-autocomplete --save
```

**Remember to import `react-inline-autocomplete/dist/index.css` to your project.**

## Demo

Live demo: [Protal](https://kyuch4n.github.io/react-inline-autocomplete/)

## How to use

```tsx
import InlineAutocomplete from 'react-inline-autocomplete';
import { DataSourceItem } from 'react-inline-autocomplete/dist';
import 'react-inline-autocomplete/dist/index.css';

const dataSource: DataSourceItem[] = [
  {
    text: 'Google',
    value: 'Google',
  },
  {
    text: 'Google Search',
    value: 'GoogleSearch',
  },
  {
    text: 'Apple',
    value: 'Apple',
  },
  {
    text: 'Apple Pencil',
    value: 'ApplePencil',
  },
  {
    text: 'Amazon',
    value: 'Amazon',
  },
  {
    text: 'Microsoft',
    value: 'Microsoft',
  },
];

function App() {
  const ref = React.createRef<HTMLInputElement>();
  const focus = () => {
    ref.current!.focus();
  };
  const onChange = () => {}
  const onConfirm = () => {}

  return (
    <InlineAutocomplete
      ref={ref}
      className="inline-autocomplete-example"
      dataSource={dataSource}
      onChange={onChange}
      onConfirm={onConfirm}
    ></InlineAutocomplete>
  );
}
```

## Props

| Property    | Type                           |   Default | Required | Description                                      |
| ----------- | ------------------------------ | --------: | -------- | ------------------------------------------------ |
| value       | string                         | undefined | no       | input value                                      |
| dataSource  | DataSourceItem                 |        [] | yes      | Array of available items to search.              |
| className   | string                         |        "" | yes      |                                                  |
| style       | React.CSSProperties            | undefined | no       |                                                  |
| placeholder | string                         | undefined | no       |                                                  |
| disabled    | boolean                        |     false | no       | Whether to disable, the default is false.        |
| onBlur      | () => void                     | undefined | no       | onBlur handler                                   |
| onChange    | (text: string) => void;        | undefined | no       | onChange handler                                 |
| onFocus     | () => void                     | undefined | no       | onFocus handler                                  |
| onConfirm   | (item: DataSourceItem) => void | undefined | no       | onConfirm handler(called when you press `Enter`) |

## Development

```shell
yarn
yarn dev
```

```shell
cd example
yarn
yarn start
```

Open `http://localhost:3000`.

## License

MIT
