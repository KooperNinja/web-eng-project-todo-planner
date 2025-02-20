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

        .calendar-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
        }

        th, td {
            border: 1px solid #ccc;
            text-align: center;
            position: relative;
            height: 60px; 
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
            outline: none;
            border: none; 
            position: relative;
            width: 50px; 
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

        .calendar-table td, .calendar-table th {
            border-left: 1px solid #ccc; 
        }

        .calendar-table td.time-column, .calendar-table th.time-column {
            border-left: none;
        }

        .task {
            position: absolute;
            left: 0;
            right: 0;
            background: rgba(74, 144, 226, 0.3); 
            border: 1px solid #4A90E2;
            box-sizing: border-box;
        }
    `;

    static properties = {
        tasks: { type: Array },
        userId: { type: Number }
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
    }

    getWeekDays() {
        const today = new Date();
        const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Montag als erster Tag der Woche
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
        const durationHeight = (task.duration / 60) * 60; // Höhe in px

        return html`
            <div class="task"
                style="top: ${startMinutes}px; height: ${durationHeight}px;">
                <div>${taskStart.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} - ${task.duration} Min</div>
                <strong>${task.title}</strong>
            </div>
        `;
    }

    render() {
        const weekDays = this.getWeekDays();
        const timeSlots = this.getTimeSlots();
        const userTasks = this.tasks.filter(task => task.ownerId === this.userId);

        return html`
            <h2>Mein Wochenplan</h2>
            <table class="calendar-table">
                <thead>
                    <tr>
                        <th class="time-column"></th>
                        ${weekDays.map(day => html`<th>${day.label}</th>`)}
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
