import { LitElement, html, css } from 'lit'

class TimeDisplay extends LitElement {
	static properties = {
		time: { type: String },
	}

	render() {
		return html`
			<span>${this.time ? this.time : ''}</span>
			<!-- Display the time as a string -->
		`
	}
}

customElements.define('time-display', TimeDisplay)
