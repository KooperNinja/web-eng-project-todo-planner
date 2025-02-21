import { LitElement, html, css } from 'lit';

class TimeDisplay extends LitElement {
  static properties = {
    time: { type: Object },
  };

  render() {
    return html`
      <span>${this.time ? this.time.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) : ''}</span> <!-- Anzeige der Uhrzeit -->
    `;
  }
}

customElements.define('time-display', TimeDisplay);
