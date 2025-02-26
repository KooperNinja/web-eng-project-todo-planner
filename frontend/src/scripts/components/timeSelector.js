import { LitElement, html, css } from 'lit'
import './timeDisplay.js'

class TimeSelector extends LitElement {
	static properties = {
		time: { type: String },
		autoPlan: { type: Boolean },
		duration: { type: Number },
	}

	constructor() {
		super()
		this.time = null
		this.autoPlan = false
		this.duration = 1
	}

	static styles = css`
		:host {
			display: block;
			font-family: Arial, sans-serif;
			color: #333;
		}

		.time-selector-container {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			margin-bottom: 15px;
		}

		.time-selector-label {
			font-size: 1em;
			margin-bottom: 5px;
			color: #333;
		}

		.time-selector-input,
		.duration-input {
			padding: 10px;
			font-size: 1em;
			border: 1px solid #ccc;
			border-radius: 5px;
			background: #fff;
			color: #333;
			width: 100%;
			box-sizing: border-box;
			margin-bottom: 10px;
		}

		.time-display-container {
			display: flex;
			align-items: center;
			margin-top: 10px;
		}

		.time-display-text {
			font-size: 1em;
			margin-right: 5px;
			color: #333;
		}

		.auto-plan-container {
			display: flex;
			align-items: center;
			margin-bottom: 10px;
		}

		.auto-plan-label {
			font-size: 1em;
			margin-left: 5px;
			color: #333;
		}
	`

	_timeChanged(event) {
		this.time = event.target.value
	}

	_toggleAutoPlan(event) {
		this.autoPlan = event.target.checked
		if (this.autoPlan) {
			this.time = null
		}
	}

	_durationChanged(event) {
		const value = parseInt(event.target.value, 10)
		if (value > 0) {
			this.duration = value
		} else {
			event.target.value = this.duration
		}
	}

	render() {
		return html`
			<div class="time-selector-container">
				<div class="auto-plan-container">
					<input
						type="checkbox"
						id="autoPlan"
						@change=${this._toggleAutoPlan}
					/>
					<label class="auto-plan-label" for="autoPlan"
						>Automatisch Planen</label
					>
				</div>
				${!this.autoPlan
					? html`
							<label class="time-selector-label" for="time"
								>Wähle eine Uhrzeit:</label
							>
							<input
								class="time-selector-input"
								type="time"
								id="time"
								.value=${this.time}
								@change=${this._timeChanged}
							/>
						`
					: ''}
				<label class="time-selector-label" for="duration"
					>Dauer (Minuten):</label
				>
				<input
					class="duration-input"
					type="number"
					id="duration"
					.value=${this.duration.toString()}
					@change=${this._durationChanged}
					min="1"
				/>
			</div>
		`
	}
}

customElements.define('time-selector', TimeSelector)
