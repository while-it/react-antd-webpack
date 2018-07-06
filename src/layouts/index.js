import React from 'react';
import './index.css';
import Header from './Header';

export default function Layout({ location }) {
  return (
    <div className="normal">
      <Header location="location" />
    </div>
  );
}
