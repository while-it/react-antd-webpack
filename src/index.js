import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
function Header() {
  return (
    <div>
      <Button>test</Button>
    </div>
  );
}

ReactDOM.render(<Header />, document.getElementById('root'));
