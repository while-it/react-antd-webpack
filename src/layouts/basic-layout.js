import React from 'react';
import styles from './styles.scss';
import Header from './Header';
import Content from './content';
export default function Layout(props) {
  console.log(props);

  return (
    <div className={styles.normal}>
      <Header location={props.location} />
      <Content navData={props.navData} />
    </div>
  );
}
