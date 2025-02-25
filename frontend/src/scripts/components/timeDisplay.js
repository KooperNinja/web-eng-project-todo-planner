import { LitElement, html, css } from 'lit';

class TimeDisplay extends LitElement {
  static properties = {
    time: { type: String },
  };

  render() {
    return html`
      <span>${this.time ? this.time : ''}</span>
    `;
  }
}

customElements.define('time-display', TimeDisplay);
