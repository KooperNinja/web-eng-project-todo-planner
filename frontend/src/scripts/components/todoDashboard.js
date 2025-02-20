import { LitElement, html, css } from 'lit';

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
            background: #4A90E2;
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

        .calendar-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
        }

        th, td {
            border: 1px solid #ccc;
            text-align: center;
            position: relative;
            height: 60px; /* Höhe einer Stunde */
        }

        th {
            background: #4A90E2;
            color: white;
            font-size: 16px;
            padding: 10px;
        }

        .time-column {
            vertical-align: top;
            text-align: right;
            padding-top: 0;
            border: none; /* Entfernt die Linien der ersten Spalte */
            position: relative;
            width: 50px; /* Feste Breite für die erste Spalte */
        }

        .time-column p {
            position: relative;
            top: -45%;
        }

        .calendar-table td.time-column {
            border: none; /* Entfernt die Linien der ersten Spalte */
        }

        .calendar-table th.time-column {
            border: none; /* Entfernt die Linien der ersten Spalte */
        }

        .calendar-table td, .calendar-table th {
            border-left: 1px solid #ccc; /* Fügt eine linke Rahmenlinie zu allen Zellen hinzu */
        }

        .calendar-table td.time-column, .calendar-table th.time-column {
            border-left: none; /* Entfernt die linke Rahmenlinie der ersten Spalte */
        }

        .task {
            position: absolute;
            left: 0;
            right: 0;
            background: rgba(74, 144, 226, 0.3); /* Hintergrundfarbe für Meetings */
            border: 1px solid #4A90E2;
            box-sizing: border-box;
        }

        .today {
            background: #1E528A; /* Hintergrundfarbe für das heutige Datum */
        }
    `;

    static properties = {
        tasks: { type: Array },
        userId: { type: Number },
        currentWeekStart: { type: Date }
    };

    constructor() {
        super();
        this.userId = 1;
        this.tasks = [
            { id: 1, ownerId: 1, title: "Projekt starten", startAt: "2025-02-17T09:00:00Z", duration: 120 },
            { id: 2, ownerId: 1, title: "Meeting mit Team", startAt: "2025-02-18T14:00:00Z", duration: 90 },
            { id: 3, ownerId: 1, title: "Entwicklung", startAt: "2025-02-19T10:30:00Z", duration: 180 },
            { id: 4, ownerId: 1, title: "Dokumentation", startAt: "2025-02-21T11:15:00Z", duration: 60 }
        ];
        this.currentWeekStart = this.getStartOfWeek(new Date());
    }

    getStartOfWeek(date) {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        return new Date(date.setDate(diff));
    }

    getWeekDays() {
        const firstDayOfWeek = new Date(this.currentWeekStart);
        return Array.from({ length: 7 }, (_, i) => {
            const day = new Date(firstDayOfWeek);
            day.setDate(firstDayOfWeek.getDate() + i);
            return { date: day, label: day.toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "2-digit" }) };
        });
    }

    getTimeSlots() {
        return Array.from({ length: 24 }, (_, i) => ({
            label: `${0 + i}:00`,
            hour: 0 + i
        }));
    }

    renderTask(task) {
        const taskStart = new Date(task.startAt);
        const startMinutes = taskStart.getMinutes();
        const durationHeight = (task.duration / 60) * 60; // Höhe in px, angepasst an die Höhe der Stundenzeilen

        return html`
            <div class="task"
                style="top: ${startMinutes}px; height: ${durationHeight}px;">
                <div>${taskStart.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} - ${task.duration} Min</div>
                <strong>${task.title}</strong>
            </div>
        `;
    }

    previousWeek() {
        this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
        this.requestUpdate();
    }

    nextWeek() {
        this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
        this.requestUpdate();
    }

    render() {
        const weekDays = this.getWeekDays();
        const timeSlots = this.getTimeSlots();
        const userTasks = this.tasks.filter(task => task.ownerId === this.userId);

        return html`
            <h2>Mein Wochenplan</h2>
            <div class="controls">
                <button @click="${this.previousWeek}">Vorherige Woche</button>
                <button @click="${this.nextWeek}">Nächste Woche</button>
            </div>
            <table class="calendar-table">
                <thead>
                    <tr>
                        <th class="time-column"></th>
                        ${weekDays.map(day => {
                            const isToday = new Date().toDateString() === day.date.toDateString();
                            return html`<th class="${isToday ? 'today' : ''}">${day.label}</th>`;
                        })}
                    </tr>
                </thead>
                <tbody>
                    ${timeSlots.map(slot => html`
                        <tr>
                            <td class="time-column">
                                <p>${slot.label}</p>
                            </td>
                            ${weekDays.map(day => {
                                const tasksForCell = userTasks.filter(task => {
                                    const taskStart = new Date(task.startAt);
                                    return taskStart.toDateString() === day.date.toDateString() &&
                                           taskStart.getHours() === slot.hour;
                                });

                                return html`
                                    <td>
                                        ${tasksForCell.map(this.renderTask)}
                                    </td>
                                `;
                            })}
                        </tr>
                    `)}
                </tbody>
            </table>
        `;
    }
}

customElements.define('todo-dashboard', TodoDashboard);
