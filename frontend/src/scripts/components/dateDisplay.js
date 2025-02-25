import { LitElement, html, css } from 'lit'
import { isSameDate } from '../utils/dateUtils.js'

class DateDisplay extends LitElement {
	static properties = {
		date: {
			hasChanged: (value, oldValue) => !isSameDate(value, oldValue),
		},
	}

	static styles = css`
		:host {
			display: inline-block;
			font-family: Arial, sans-serif;
			color: #333;
		}

		.datefield {
			font-size: 0.8em;
			font-weight: bold;
			color: #000;
			padding: 3px 7px;
			display: inline-block;
		}
	`

	render() {
		return html`
			<div class="datefield">
				${this.date
					? this.date.toLocaleDateString('de-DE', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})
					: ''}
			</div>
		`
	}
}

customElements.define('date-display', DateDisplay)
