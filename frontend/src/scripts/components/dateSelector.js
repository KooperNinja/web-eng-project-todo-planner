import { LitElement, html, css } from 'lit';
import { localDateFromUTC } from './dateUtils.js';
import './dateDisplay.js';

class DateSelector extends LitElement {
  static properties = {
    date: {},
  };

  static styles = css`
    p {
      font-family: Arial, sans-serif;
      font-size: 1.2em;
      color: #ff0000;
    }

    input[type="date"] {
      padding: 5px;
      font-size: 1em;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    button {
      padding: 8px 15px;
      font-size: 1em;
      background-color: #324fff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #1d2bc9;
    }

    date-display {
      margin-top: 10px;
      display: block;
    }
  `;

  render() {
    return html`
      <p>Wähle ein Datum:
        <input type="date" @change=${this._dateChanged}>
      </p>
      <p><button @click=${this._chooseToday}>Wähle heute</button></p>
      <p>Datum: <date-display .date=${this.date}></date-display></p>
    `;
  }

  _dateChanged(e) {
    const utcDate = e.target.valueAsDate;
    if (utcDate) {
      this.date = localDateFromUTC(utcDate);
    }
  }

  _chooseToday() {
    this.date = new Date();
  }
}

customElements.define('date-selector', DateSelector);
