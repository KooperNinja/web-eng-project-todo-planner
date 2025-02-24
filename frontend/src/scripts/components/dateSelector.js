import { LitElement, html, css } from 'lit';
import { localDateFromUTC } from '../utils/dateUtils.js';
import './dateDisplay.js';

class DateSelector extends LitElement {
  static properties = {
    date: {},
  };

  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      color: #333;
    }

    .date-selector-container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 15px;
    }

    .date-selector-label {
      font-size: 1em;
      margin-bottom: 5px;
      color: #333;
    }

    .date-selector-input {
      padding: 10px;
      font-size: 1em;
      border: 1px solid #ccc;
      border-radius: 5px;
      background: #fff;
      color: #333;
      width: 100%;
      box-sizing: border-box;
    }

    .date-display-container {
      display: flex;
      align-items: center;
      margin-top: 10px;
    }

    .date-display-text {
      font-size: 1em;
      margin-right: 5px;
      color: #333;
    }

    button {
      padding: 10px 20px;
      font-size: 1em;
      background-color: #333;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
      margin-top: 10px;
    }

    button:hover {
      background-color: #555;
    }

    date-display {
      margin-top: 10px;
      display: block;
      font-size: 1.2em;
      font-weight: bold;
      color: #000;
      background: #f0f0f0;
      padding: 10px 15px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  `;

  constructor() {
    super();
    this.date = null;
  }

  _dateChanged(event) {
    this.date = event.target.value;
  }

  _setToday() {
    const today = new Date().toISOString().split('T')[0];
    this.date = today;
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="date-selector-container">
        <label class="date-selector-label" for="date">Wähle ein Datum:</label>
        <input class="date-selector-input" type="date" id="date" .value=${this.date} @change=${this._dateChanged}>
        <button @click=${this._setToday}>Heute auswählen</button>
      </div>

      ${this.date ? html`
        <div class="date-display-container">
          <span class="date-display-text">Datum:</span>
          <date-display .date=${new Date(this.date)}></date-display>
        </div>
      ` : ''}
    `;
  }
}

customElements.define('date-selector', DateSelector);
