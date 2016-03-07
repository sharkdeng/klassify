import React, { Component } from 'react';
import Select from 'react-select';

import styles from './Form.module.css';
import store from '../store';


class Trainer extends Component {
  state = {
    text: null,
    label: null,
    isTrained: false
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

  onTextChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  onLabelChange(label) {
    this.setState({
      label
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let {text, label} = this.state;

    store.train(
      text,
      label
    ).then(() => {
      this.setState({
        isTrained: true
      })
    });
  }

  render() {
    let {labels, text, label: currentLabel, isTrained} = this.state;

    let labelOptions = labels.data.map((label) => ({
      value: label,
      label
    }));

    return (
      <div className={styles.container}>
        <form className={styles.form}>
          {isTrained && (
            <div className={styles.success}>
              The text has been successfully trained.
            </div>
          )}
          <label className={styles.label}>Document</label>
          <textarea className={styles.body}
                    value={text}
                    onChange={this.onTextChange.bind(this)}
                    placeholder={'Text data.'}></textarea>

          <label className={styles.label}>Label</label>
          <div className={styles.select}>
            <Select
              value={currentLabel}
              onChange={this.onLabelChange.bind(this)}
              allowCreate={true}
              options={labelOptions}
              className={styles.Select} />
          </div>

          <input type={'submit'}
                 onClick={this.handleSubmit.bind(this)}
                 className={styles.button}
                 value={'Train'} />
        </form>
      </div>
    );
  }
}

export default Trainer;