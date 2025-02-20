import { LitElement, html, css } from 'lit';
import { isSameDate } from './dateUtils.js';

class DateDisplay extends LitElement {
  static properties = {
    date: {
      // Für Wrapper-Typen wie Date, einfacher Vergleich funktioniert nicht,
      // weil jedes Date-Objekt ein neues ist
      hasChanged: (value, oldValue) => {
        return !isSameDate(value, oldValue);
      },
    },
  };

  static styles = css`
    #datefield {
      font-family: Arial, sans-serif;
      font-size: 1.5em;
      color: #333;
      padding: 10px;
      border-radius: 5px;
      background-color: #f0f0f0;
      display: inline-block;
    }
    #datefield.animate {
      animation: colorChange 1s ease-in-out;
    }

    @keyframes colorChange {
      0% {
        background-color: #fff;
      }
      50% {
        background-color: #324fff;
      }
      100% {
        background-color: #fff;
      }
    }
  `;

  get datefield() {
    return this.renderRoot?.querySelector('#datefield') ?? null;
  }

  frames = [
    { backgroundColor: '#fff' },
    { backgroundColor: '#324fff' },
    { backgroundColor: '#fff' },
  ];

  render() {
    return html`<span id="datefield">${this.date?.toLocaleDateString()}</span>`;
  }

  updated(changed) {
    if (changed.has('date')) {
      this.datefield?.classList.add('animate');
      this.datefield?.animate(this.frames, 1000);
    }
  }
}

customElements.define('date-display', DateDisplay);
