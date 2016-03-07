import React, { Component } from 'react';
import { Link } from 'react-router'

import styles from './App.module.css';


export default class App extends Component {
  render() {
    let {routes} = this.props;

    let currentRoute = routes[routes.length -1],
        {name: routeName} = currentRoute;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            <Link to="/">klassify</Link>
          </h1>
        </div>
        <div className={styles.nav}>
          <ul>
            <li className={routeName === 'overview' && styles.current}>
              <Link to="/">Overview</Link>
            </li>
            <li className={routeName === 'train' && styles.current}>
              <Link to="/train">Train</Link>
            </li>
            <li className={routeName === 'classify' && styles.current}>
              <Link to="/classify">Classify</Link>
            </li>
            <li className={routeName === 'browse' && styles.current}>
              <Link to="/browse">Browse</Link>
            </li>
          </ul>
        </div>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}