import React, { Component } from 'react';

import styles from './Form.module.css';
import store from '../store';


export default class Classifier extends Component {
  state = {
    text: null
  }

  onTextChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let {text} = this.state;

    store.classify(
      text
    ).then(result => {
      this.setState({
        result: result
      });
    });
  }

  render() {
    let {text, result} = this.state;

    return (
      <div className={styles.container}>
        <form className={styles.form}>
          <label className={styles.label}>Document</label>
          <div>
            <textarea className={styles.body}
                    value={text}
                    onChange={this.onTextChange.bind(this)}
                    placeholder={'Text data.'} />

          <input type={'submit'}
                 onClick={this.handleSubmit.bind(this)}
                 className={styles.button}
                 value={'Classify'} />
          </div>

          {result && (
            <div className={styles.results}>
              <h3 className={styles.title}>
                  Prediction: 
                  <span className={styles.matchedLabel}>
                    {result.label}
                  </span>
              </h3>
              <ul className={styles.scores}>
                {Object.keys(result.scores).map(score => (
                  <li key={score} className={styles.scoreItem}>
                    <span className={styles.scoreValue}>{result.scores[score]}</span>
                    <span className={styles.scoreResultTitle}>{score}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
    );
  }
}