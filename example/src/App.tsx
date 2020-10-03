import React, { useState } from 'react';
import { Button, Tag, Timeline } from 'antd';
import InlineAutocomplete from 'react-inline-autocomplete';
import { DataSourceItem } from 'react-inline-autocomplete/dist';
import 'react-inline-autocomplete/dist/index.css';
import './App.scss';

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
].map((i) =>
  Object.assign(i, {
    color: '#' + ((Math.random() * 0xffffff) << 0).toString(16),
  })
);

function App() {
  const [timelineList, setTimelineList] = useState<
    {
      text: string;
      event: string;
    }[]
  >([]);
  const ref = React.createRef<HTMLInputElement>();

  const focus = () => {
    ref.current!.focus();
  };

  const addTimelineItem = (item: { text: string; event: string }) => {
    setTimelineList((prevList) => [item].concat(prevList));
  };

  const onChange = (text: string) => {
    addTimelineItem({
      text,
      event: 'change',
    });
  };

  const onConfirm = (item: DataSourceItem) => {
    addTimelineItem({
      text: item.text,
      event: 'confirm',
    });
  };

  return (
    <div className="App">
      <section>
        <b>Data Source:</b>&nbsp;&nbsp;
        {dataSource.map((i, idx) => (
          <Tag key={idx} color={i.color}>
            {i.text}
          </Tag>
        ))}
      </section>
      <section>
        <InlineAutocomplete
          ref={ref}
          className="inline-autocomplete-example"
          dataSource={dataSource}
          onChange={onChange}
          onConfirm={onConfirm}
        ></InlineAutocomplete>
        <Button type="primary" size="large" onClick={focus}>
          Focus
        </Button>
      </section>
      <section>
        <Timeline>
          {timelineList.map((i, idx) => (
            <Timeline.Item key={idx}>
              Event: {i.event}, {i.text}
            </Timeline.Item>
          ))}
        </Timeline>
      </section>
    </div>
  );
}

export default App;
