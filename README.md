# React Inline Autocomplete

![version](https://img.shields.io/npm/v/react-inline-autocomplete)
![download](https://img.shields.io/npm/dt/react-inline-autocomplete)
![license](https://img.shields.io/npm/l/react-inline-autocomplete)

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
    text: 'Amazon',
    value: 'Amazon',
  },
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
    text: 'Apple Watch',
    value: 'AppleWatch',
  },
  {
    text: 'Apple Power',
    value: 'ApplePower',
  },
];

function App() {
  const ref = React.createRef<HTMLInputElement>();
  const focus = () => {
    ref.current!.focus();
  };
  const onChange = (value: string) => {};
  const onPressEnter = (value: string) => {};
  const onSelect = (item: DataSourceItem) => {};

  return (
    <InlineAutocomplete
      ref={ref}
      className="inline-autocomplete-example"
      dataSource={dataSource}
      caseSensitive={false}
      onChange={onChange}
      onConfirm={onPressEnter}
      onSelect={onSelect}
    ></InlineAutocomplete>
  );
}
```

## Props

| Property      | Type                           |   Default | Required | Description                                           |
| ------------- | ------------------------------ | --------: | -------- | ----------------------------------------------------- |
| value         | string                         | undefined | no       | input value                                           |
| dataSource    | DataSourceItem                 |        [] | yes      | Array of available items to search.                   |
| className     | string                         |        "" | yes      |                                                       |
| style         | React.CSSProperties            | undefined | no       |                                                       |
| placeholder   | string                         | undefined | no       |                                                       |
| disabled      | boolean                        |     false | no       | Whether to disable, the default is false.             |
| caseSensitive | boolean                        |      true | no       |                                                       |
| navigate      | boolean                        |      true | no       | You can switch auto-complete when `navigate` is true. |
| onBlur        | () => void                     | undefined | no       | onBlur handler                                        |
| onFocus       | () => void                     | undefined | no       | onFocus handler                                       |
| onChange      | (value: string) => void        | undefined | no       | onChange handler                                      |
| onPressEnter  | (value: string) => void        | undefined | no       | onPressEnter handler(called when you press `Enter`)   |
| onSelect      | (item: DataSourceItem) => void | undefined | no       | onSelect handler(called when you press `Tab`)         |

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

## Build & Publish

```
yarn
yarn build
npm publish
```

```
cd example
yarn
yarn build
cd ..
yarn deploy
```

## License

MIT
