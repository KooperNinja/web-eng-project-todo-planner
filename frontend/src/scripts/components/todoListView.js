import { LitElement, html, css } from 'lit';
import './todoPopup.js';
import { backendAxios } from '../axios.js';
import { navigate } from '../router.js';
import { AxiosError } from 'axios';

class TodoListView extends LitElement {
    static styles = css`
        :host {
            --primary-color: #0d4c8b;
            --secondary-color: #fa7d00;
            font-family: 'Poppins', sans-serif;
            display: block;
            padding: 20px;
            background: #f5f5f5;
        }

        h2 {
            text-align: center;
            color: var(--secondary-color);
            margin-bottom: 20px;
            font-family: 'Miniver', cursive;
            font-size: 45px;
            font-weight: 800;
        }

        .todo-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .todo-item {
            background: #fff;
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .todo-item:hover {
            transform: translateY(-5px);
        }

        .todo-item h3 {
            margin: 0 0 10px;
            font-size: 20px;
            color: var(--primary-color);
        }

        .todo-item p {
            margin: 5px 0;
            color: #666;
        }

        .todo-item p strong {
            color: #333;
        }

        .todo-item .actions {
            display: flex;
            gap: 10px;
        }

        .todo-item button {
            padding: 5px 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
        }

        .todo-item button.complete {
            background-color: var(--primary-color);
            color: white;
        }

        .todo-item button.delete {
            background-color: var(--secondary-color);
            color: white;
        }

        .controls {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
        }

        .controls button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background-color: var(--primary-color);
            color: white;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
        }
    `;

    static properties = {
        todos: { type: Array },
        dummyData: { type: Array },
        showPopup: { type: Boolean }
    };

    constructor() {
        super();
        this.todos = []
        this.dummyData = [
            {
                id: 1,
                ownerId: 1,
                createdAt: new Date('2025-10-01T10:00:00'),
                updatedAt: new Date('2025-10-01T10:00:00'),
                title: 'Dummy Task 1',
                description: 'This is the first task description',
                startAt: new Date('2025-10-01T10:00:00'),
                duration: 60
            },
            {
                id: 2,
                ownerId: 1,
                createdAt: new Date('2025-10-02T11:00:00'),
                updatedAt: new Date('2025-10-02T11:00:00'),
                title: 'Dummy Task 2',
                description: 'This is the second task description',
                startAt: new Date('2025-10-02T11:00:00'),
                duration: 30
            },
            {
                id: 3,
                ownerId: 1,
                createdAt: new Date('2025-10-03T12:00:00'),
                updatedAt: new Date('2025-10-03T12:00:00'),
                title: 'Dummy Task 3',
                description: 'This is the third task description',
                startAt: new Date('2025-10-03T12:00:00'),
                duration: 45
            }
        ];
        this.showPopup = false;
        this.fetchTodos()
    }

    async fetchTodos() {
        try {
            const response = await backendAxios.get('/todos');
            this.todos = response.data;
        } catch (error) {
            if (!(error instanceof AxiosError)) return this.dummyData;
            if (error.response.status === 401) navigate('/login');
            console.error(error);
        }
        return this.dummyData;
    }

    async onNewTodo() {
        await this.fetchTodos();
        this.requestUpdate('todos');
    }

    togglePopup() {
        this.showPopup = !this.showPopup;
    }

    async completeTodo(id) {
        /** Noch gleich wie Delete -> In Zukunft könnte hier geupdated werden */
        try {
            await backendAxios.delete(`/todos/${id}`);
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.requestUpdate('todos');
        } catch (error) {
            console.error(error);
        }
    }

    async deleteTodo(id) {
        try {
            await backendAxios.delete(`/todos/${id}`);
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.requestUpdate('todos');
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return html`
            <h2>Meine ToDo-Liste</h2>
            <div class="controls">
                <button @click="${this.togglePopup}">+ Neues To-Do</button>
            </div>
            ${this.showPopup ? html`<todo-popup @close="${this.togglePopup}" @newTodo="${this.onNewTodo}"></todo-popup>` : ''}
            <div class="todo-list">
                ${this.todos.map(todo => html`
                    <div class="todo-item">
                        <div>
                            <h3>${todo.title}</h3>
                            <p>${todo.description}</p>
                            <p><strong>Start:</strong> ${todo.startAt.toLocaleString()}</p>
                            <p><strong>Dauer:</strong> ${todo.duration} Minuten</p>
                        </div>
                        <div class="actions">
                            <button class="complete" @click="${() => this.completeTodo(todo.id)}">Erledigt</button>
                            <button class="delete" @click="${() => this.deleteTodo(todo.id)}">Löschen</button>
                        </div>
                    </div>
                `)}
            </div>
        `;
    }
}

customElements.define('todo-list-view', TodoListView);