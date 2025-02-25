import { LitElement, html, css } from 'lit'
import './timeSelector.js'
import './timeDisplay.js'
import './dateSelector.js'
import './dateDisplay.js'

export class TodoPopup extends LitElement {
	static styles = css`
		.popup {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background: #fff;
			border: 1px solid #ddd;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
			padding: 20px;
			border-radius: 10px;
			width: 500px;
			z-index: 1000;
		}

		.popup-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20px;
		}

		.popup-header h3 {
			margin: 0;
			font-size: 1.5em;
			color: #333;
		}

		.popup-header button {
			background: none;
			border: none;
			font-size: 1.5em;
			cursor: pointer;
			color: #999;
		}

		.popup-body {
			display: flex;
			flex-direction: column;
		}

		.popup-body label {
			margin-bottom: 5px;
			font-size: 0.9em;
			color: #666;
		}

		.popup-body input,
		.popup-body textarea {
			width: 95.5%;
			padding: 10px;
			margin-bottom: 15px;
			border: 1px solid #ddd;
			border-radius: 5px;
			font-size: 1em;
			color: #333;
		}

		.popup-body textarea {
			resize: vertical;
		}

		.popup-footer {
			display: flex;
			justify-content: flex-end;
		}

		.popup-footer button {
			padding: 10px 20px;
			border: none;
			background: #333;
			color: white;
			cursor: pointer;
			border-radius: 5px;
			font-size: 1em;
			margin-left: 10px;
		}
	`

	closePopup() {
		this.dispatchEvent(
			new CustomEvent('close', { bubbles: true, composed: true })
		)
	}

	/**
	 *
	 * @returns {Date | null}
	 */

	getStartAtMsFromSelector() {
		const dateSelector = this.shadowRoot.querySelector('date-selector')
		return dateSelector ? new Date(dateSelector.date) : null
	}

	saveTodo() {
		const title = this.shadowRoot.querySelector('#title').value
		const notes = this.shadowRoot.querySelector('#notes').value
		const date = this.getDateFromSelector()
		if (!date) {
		}
	}

	render() {
		return html`
			<div class="popup">
				<div class="popup-header">
					<h3>Neues To-Do</h3>
					<button @click="${this.closePopup}">&times;</button>
				</div>

				<div class="popup-body">
					<label for="title"></label>
					<input
						type="text"
						id="title"
						class="input-field"
						placeholder="To-Do Name"
					/>

					<textarea
						id="notes"
						class="textarea-field"
						placeholder="Beschreibung"
					></textarea>

					<date-selector id="date"></date-selector>
					<date-display></date-display>
					<time-selector id="time"></time-selector>
					<time-display></time-display>
				</div>

				<div class="popup-footer">
					<button @click="${this.saveTodo}">Speichern</button>
				</div>
			</div>
		`
	}
}

customElements.define('todo-popup', TodoPopup)
