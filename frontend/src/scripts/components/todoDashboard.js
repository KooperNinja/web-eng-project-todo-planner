import { LitElement, html, css } from 'lit'
import './todoPopup.js'

export class TodoDashboard extends LitElement {
	static styles = css`
		:host {
			display: block;
			width: 100vw;
			height: 100vh;
			display: flex;
			flex-direction: column;
			background: #f5f5f5;
			overflow: auto;
		}

		h2 {
			text-align: center;
			background: #4a90e2;
			color: white;
			padding: 15px;
			margin: 0;
			font-size: 24px;
		}

		.controls {
			display: flex;
			justify-content: space-between;
			padding: 10px;
		}

		.calendar-container {
			position: relative;
			flex: 1;
			overflow-y: auto;
		}

		.calendar-table {
			width: 100%;
			border-collapse: collapse;
			table-layout: fixed;
		}

		th,
		td {
			border: 1px solid #ccc;
			text-align: center;
			position: relative;
			height: 57px;
		}

		th {
			background: #4a90e2;
			color: white;
			font-size: 16px;
			padding: 10px;
			position: sticky;
			top: 0;
			z-index: 2;
		}

		.time-column {
			vertical-align: top;
			text-align: right;
			padding-top: 0;
			border: none;
			position: sticky;
			left: 0;
			background: #4a90e2;
			color: white;
			width: 50px;
			z-index: 2;
		}

		.time-column p {
			position: relative;
			top: -45%;
		}

		.calendar-table td.time-column {
			border: none;
		}

		.calendar-table th.time-column {
			border: none;
		}

		.calendar-table td,
		.calendar-table th {
			border-left: 1px solid #ccc;
		}

		.calendar-table td.time-column,
		.calendar-table th.time-column {
			border-left: none;
		}

		.task {
			position: absolute;
			left: 0;
			right: 0;
			background: rgba(74, 144, 226, 0.3);
			border: 1px solid #4a90e2;
			box-sizing: border-box;
		}

		.today {
			background: #1e528a;
		}

		.current-time-line {
			position: absolute;
			left: 0;
			right: 0;
			height: 2px;
			background: red;
			z-index: 1;
		}

		.popup-container {
			position: relative;
		}

		.time-dialog {
			position: fixed;
			bottom: 10px;
			right: 10px;
			background: white;
			border: 1px solid #ccc;
			padding: 10px;
			box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
			border-radius: 4px;
			z-index: 1000;
		}
	`

	static properties = {
		showPopup: { type: Boolean },
		tasks: { type: Array },
		userId: { type: Number },
		currentWeekStart: { type: Date },
		currentTime: { type: String },
	}

	constructor() {
		super()
		this.showPopup = false
		this.userId = 1
		this.tasks = [
			{
				id: 1,
				ownerId: 1,
				title: 'Projekt starten',
				startAt: '2025-02-17T09:00:00Z',
				duration: 120,
			},
			{
				id: 2,
				ownerId: 1,
				title: 'Meeting mit Team',
				startAt: '2025-02-18T14:00:00Z',
				duration: 90,
			},
			{
				id: 3,
				ownerId: 1,
				title: 'Entwicklung',
				startAt: '2025-02-19T10:30:00Z',
				duration: 180,
			},
			{
				id: 4,
				ownerId: 1,
				title: 'Dokumentation',
				startAt: '2025-02-21T11:15:00Z',
				duration: 60,
			},
		]
		this.currentWeekStart = this.getStartOfWeek(new Date())
		this.currentTime = this.getCurrentTime()
	}

	togglePopup() {
		this.showPopup = !this.showPopup
	}

	getStartOfWeek(date) {
		const day = date.getDay()
		const diff = date.getDate() - day + (day === 0 ? -6 : 1)
		return new Date(date.setDate(diff))
	}

	getWeekDays() {
		const firstDayOfWeek = new Date(this.currentWeekStart)
		return Array.from({ length: 7 }, (_, i) => {
			const day = new Date(firstDayOfWeek)
			day.setDate(firstDayOfWeek.getDate() + i)
			return {
				date: day,
				label: day.toLocaleDateString('de-DE', {
					weekday: 'long',
					day: '2-digit',
					month: '2-digit',
				}),
			}
		})
	}

	getTimeSlots() {
		return [
			{ label: '', hour: -1 },
			...Array.from({ length: 24 }, (_, i) => ({
				label: `${i % 24}:00`,
				hour: (i + 3) % 24,
			})),
		]
	}

	renderTask(task) {
		const taskStart = new Date(task.startAt)
		const startMinutes = taskStart.getMinutes()
		const durationHeight = (task.duration / 57) * 57

		return html`
			<div
				class="task"
				style="top: ${startMinutes}px; height: ${durationHeight}px;"
			>
				<div>
					${taskStart.toLocaleTimeString('de-DE', {
						hour: '2-digit',
						minute: '2-digit',
					})}
					- ${task.duration} Min
				</div>
				<strong>${task.title}</strong>
			</div>
		`
	}

	previousWeek() {
		this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7)
		this.requestUpdate()
	}

	nextWeek() {
		this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7)
		this.requestUpdate()
	}

	getCurrentTimeLinePosition() {
		const now = new Date()
		const hours = (now.getHours() + 3) % 24
		const minutes = now.getMinutes()
		return hours * 57 + (minutes / 57) * 57
	}

	updateCurrentTimeLine() {
		const currentTimeLine =
			this.shadowRoot.querySelector('.current-time-line')
		if (currentTimeLine) {
			currentTimeLine.style.top = `${this.getCurrentTimeLinePosition()}px`
		}
	}

	getCurrentTime() {
		const now = new Date()
		return now.toLocaleTimeString('de-DE', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		})
	}

	firstUpdated() {
		this.shadowRoot.querySelector('.calendar-container').scrollTop = 8 * 57
		this.updateCurrentTimeLine()
		setInterval(() => {
			this.updateCurrentTimeLine()
			this.currentTime = this.getCurrentTime()
		}, 1000)
	}

	render() {
		const weekDays = this.getWeekDays()
		const timeSlots = this.getTimeSlots()
		const userTasks = this.tasks.filter(
			(task) => task.ownerId === this.userId
		)

		return html`
			<h2>Mein Wochenplan</h2>
			<div class="controls">
				<button @click="${this.previousWeek}">Vorherige Woche</button>
				<button @click="${this.togglePopup}">+ Neues To-Do</button>
				<button @click="${this.nextWeek}">Nächste Woche</button>
			</div>

			<div class="popup-container">
				${this.showPopup
					? html`<todo-popup
							@close="${this.togglePopup}"
						></todo-popup>`
					: ''}
			</div>

			<div class="calendar-container">
				<div
					class="current-time-line"
					style="top: ${this.getCurrentTimeLinePosition()}px;"
				></div>
				<table class="calendar-table">
					<thead>
						<tr>
							<th class="time-column"></th>
							${weekDays.map((day) => {
								const isToday =
									new Date().toDateString() ===
									day.date.toDateString()
								return html`<th
									class="${isToday ? 'today' : ''}"
								>
									${day.label}
								</th>`
							})}
						</tr>
					</thead>
					<tbody>
						${timeSlots.map(
							(slot) => html`
								<tr>
									<td class="time-column">
										<p>${slot.label}</p>
									</td>
									${weekDays.map((day) => {
										const tasksForCell = userTasks.filter(
											(task) => {
												const taskStart = new Date(
													task.startAt
												)
												return (
													taskStart.toDateString() ===
														day.date.toDateString() &&
													taskStart.getHours() ===
														slot.hour
												)
											}
										)

										return html`
											<td>
												${tasksForCell.map(
													this.renderTask
												)}
											</td>
										`
									})}
								</tr>
							`
						)}
					</tbody>
				</table>
			</div>
		`
	}
}

customElements.define('todo-dashboard', TodoDashboard)
