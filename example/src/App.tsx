import React from 'react';
import InlineAutocomplete from 'react-inline-autocomplete';
import { DataSourceItem } from 'react-inline-autocomplete/dist';
import 'react-inline-autocomplete/dist/index.css';
import './App.css';

function App() {
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
      value: 'Apple'
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

  const aaa = React.createRef<HTMLInputElement>();

  const clickkk = () => {
    aaa.current!.focus();
  };

  return (
    <div className="App">
      <InlineAutocomplete
        ref={aaa}
        className="inline-autocomplete-example"
        dataSource={dataSource}
        // value={'AAA'}
      ></InlineAutocomplete>
      <div onClick={clickkk}>AAAAAAAAAAAA</div>
    </div>
  );
}

export default App;
