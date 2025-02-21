import { LitElement, html, css } from 'lit';
import './timeDisplay.js';

class TimeSelector extends LitElement {
  static properties = {
    time: { type: Object },
  };

  constructor() {
    super();
    this.time = null; // Initial null, keine Zeit angezeigt, bevor der Benutzer eine Eingabe macht
  }

  static styles = css`
    p {
      font-family: Arial, sans-serif;
      font-size: 1.2em;
      color: #ff0000;
      display: flex;
      align-items: center;
    }

    input[type="time"] {
      padding: 5px;
      font-size: 1em;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    time-display {
      margin-right: 5px; /* Etwas Abstand zwischen der Zeit und dem Text */
    }
  `;

  render() {
    return html`
      <p>Wähle eine Uhrzeit:
        <input type="time" @change=${this._timeChanged}>
      </p>

      <!-- Uhrzeit und "Uhr" werden nur angezeigt, wenn time gesetzt ist -->
      ${this.time ? html`
        <p>
          Uhrzeit: <time-display .time=${this.time}></time-display> Uhr
        </p>
      ` : ''}
    `;
  }

  _timeChanged(e) {
    // Die Eingabe wird als string im Format "HH:MM" geliefert
    const timeString = e.target.value;
    
    if (!timeString) {
      this.time = null;
      return;
    }

    // Umwandlung von "HH:MM" in ein Date-Objekt
    const [hours, minutes] = timeString.split(':').map(num => parseInt(num, 10));
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);  // Setze Sekunden auf 0

    // Die Zeit als Date-Objekt speichern
    this.time = date;
  }
}

customElements.define('time-selector', TimeSelector);
