import React, { Component } from 'react';

import styles from './Overview.module.css';
import store from '../store';


export default class Overview extends Component {
  state = {
    stats: {},
    listening: false
  };

  componentDidMount() {
    this.removeListener = store.addListener(this.updateState.bind(this));
    this.connectForUpdates();

    store.fetchStats();
  }

  updateState() {
    this.setState({
      stats: store.getStats()
    });
  }

  componentWillUnmount() {
    this.removeListener();
    this.disconnect();
  }

  componentWillUpdate(nextProps, nextState) {
    let prevState = this.state;
    if (prevState.listening) {
      let prevStats = prevState.stats.data;
      let nextStats = nextState.stats.data;

      this.highlightChangedState(prevStats, nextStats);
    }
  }

  highlightChangedState(prevStats, nextStats) {
    if (prevStats.classifications !== nextStats.classifications) {
      this.highlightRef(this.classificationsRef)
    }

    if (prevStats.labels !== nextStats.labels) {
      this.highlightRef(this.trainingRef)
    }

    if (prevStats.words !== nextStats.words) {
      this.highlightRef(this.wordsRef)
    }
  }

  highlightRef(ref) {
    if (!ref) {
      return;
    }

    setTimeout(() => {
      // remove animation
      ref.classList.remove(styles.highlight);
    }, 100);

    ref.classList.add(styles.highlight);
  }

  connectForUpdates() {
    this.ws = new WebSocket("ws://127.0.0.1:8888/ws");

    this.ws.onopen = () => {
      this.setState({
        listening: true
      });
    };

    this.ws.onmessage = () => {
      store.fetchStats(
        false // don't change isLoad and isFetching attributes
      );
    };
  }

  disconnect() {
    this.ws.close();
    this.setState({
      listening: false
    });
  }

  render() {
    let {stats} = this.state;

    return (
      <div className={styles.container}>
        {stats.isFetching && (
          <div className={styles.loading}>Loading</div>
        )}

        {stats.isLoad && (
          <div>
            <div className={styles.total}
                 ref={(ref) => this.trainingRef = ref}>
              <span className={styles.value}>{stats.data.labels}</span>
              <span className={styles.totalTitle}>trained labels</span>
            </div>

            <div className={styles.total}
                 ref={(ref) => this.classificationsRef = ref}>
              <span className={styles.value}>{stats.data.classifications}</span>
              <span className={styles.totalTitle}>classifications</span>
            </div>

            <div className={styles.total}
                 ref={(ref) => this.wordsRef = ref}>
              <span className={styles.value}>{stats.data.words}</span>
              <span className={styles.totalTitle}>words</span>
            </div>
          </div>
        )}

        <div className={styles.endpoints}>
          Endpoints:
          <ul>
            <li>{store.endpoint('train')}</li>
            <li>{store.endpoint('classify')}</li>
          </ul>
        </div>

      </div>
    );
  }
}