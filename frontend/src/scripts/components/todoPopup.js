import { LitElement, html, css } from 'lit';

import './timeDisplay.js';
import './timeSelcetor.js';
import './dateDisplay.js';
import './dateSelector.js';
import { isSameDate, localDateFromUTC } from './dateUtils.js';

export class TodoPopup extends LitElement {
  static styles = css`
    .popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border: 1px solid #ccc;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      padding: 20px;
      border-radius: 8px;
      width: 520px;
      z-index: 1000;
    }

    .popup button {
      margin-top: 10px;
      padding: 8px 12px;
      background: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    }

    .popup .close {
      background: #dc3545;
    }

    .input-field {
      width: 80%;
      padding: 8px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 2px;
    }
  `;

  closePopup() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="popup">
        <h3>Neues To-Do</h3>
        
        
        <input type="text" class="input-field" placeholder="To-Do Name">
        
        <date-selector></date-selector>
        <date-display></date-display> 
        <time-selector></time-selector>
        <time-display></time-display> 

        <button @click="${this.closePopup}" class="close">Schließen</button>
        <button @click="${() => alert('To-Do gespeichert')}">Speichern</button>
      </div>
    `;
  }
}

customElements.define('todo-popup', TodoPopup);
