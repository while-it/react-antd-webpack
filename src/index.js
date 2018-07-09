import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';

function Header() {
  return (
    <div>
      <span>6456</span>
      <Button type="primary">test</Button>
    </div>
  );
}

ReactDOM.render(<Header />, document.getElementById('root'));
