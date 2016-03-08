import React, { Component } from 'react';
import Select from 'react-select';
import {Table, Column, Cell} from 'fixed-data-table';


import styles from './Browser.module.css';
import store from '../store';


class Trainer extends Component {
  state = {
    labels: [],
    words: {}
  };

  componentDidMount() {
    this.removeListener = store.addListener(
      this.updateState.bind(this)
    );

    store.fetchLabels();
  }

  updateState() {
    this.setState({
      labels: store.getLabels()
    });
  }

  componentWillMount() {
    this.setState({
      labels: store.getLabels()
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  onLabelChange(label) {
    if (!label) {
      return this.setState({
        label: null,
        words: {}
      });
    }

    this.setState({
      label
    });

    store
      .fetchWords(label)
      .then(words => {
        this.setState({
          words
        })
      });
  }

  render() {
    let {labels, label: currentLabel, words} = this.state;

    let labelOptions = labels.data.map((label) => ({
      value: label,
      label
    }));

    let rows = Object.keys(words);

    return (
      <div className={styles.container}>
        <div className={styles.select}>
          <Select
            value={currentLabel}
            onChange={this.onLabelChange.bind(this)}
            options={labelOptions}
            className={styles.Select} />
        </div>

        {rows.length ? (
          <div className={styles.table}>
            <Table
              rowHeight={30}
              rowsCount={rows.length}
              width={505}
              height={450}
              headerHeight={30}
              footerHeight={30}>
              <Column
                header={<Cell>Word</Cell>}
                cell={({rowIndex}) => (
                  <Cell>{rows[rowIndex]}</Cell>
                )}
                width={435}
                footer={<Cell>Total: {rows.length}</Cell>}
              />
              <Column
                header={<Cell>Count</Cell>}
                cell={({rowIndex}) => (
                  <Cell>{words[rows[rowIndex]]}</Cell>
                )}
                width={70}
              />
            </Table>
          </div>
        ): (
          <div>Select a label.</div>
        )}
      </div>
    );
  }
}

export default Trainer;