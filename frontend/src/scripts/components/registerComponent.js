import { LitElement, html, css } from 'lit';
import { navigate } from '../router.js';
import { AxiosError } from 'axios';
import { applyToken, backendAxios } from '../axios.js';


class RegisterPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      background-color: #f4f4f9;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .register-container {
      background-color: white;
      padding: 20px;
      border-radius: 16px;
      width: 60%;
      height: 95.5%;
    }

    .register-container h2 {
      text-align: center;
      margin-bottom: 20px;
    }

    .input-container{
      margin-right: 20px;
    }

    input {
      display: flex;
      width: 100%;
      padding: 10px;
      margin-left: 0;
      margin-top: 15px;
      margin-bottom: 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    button {
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      margin-bottom: 15px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    button:hover {
      background-color: #0056b3;
    }

    .error {
      color: red;
      font-size: 14px;
      text-align: center;
      margin-top: 0;
      margin-bottom: 5px;
    }
  `;

  static properties = {
    username: { type: String },
    email: { type: String },
    password: { type: String },
    passwordValidation: { type: String },
    error: { type: String },
  };

  constructor() {
    super();
    this.username = '';
    this.email = '';
    this.password = '';
    this.passwordValidation = '';
    this.error = '';
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this[name] = value;
  }

  async handleRegister(event) {
    event.preventDefault();

    if (this.username === '' || this.email === '' || this.password === '' || this.passwordValidation === '') {
      this.error = 'Alle Felder sind verpflichtend auszufüllen.';
      return
    }
    if (this.password !== this.passwordValidation) {
      this.passwordValidation = '';
      this.error = 'Die Passwörter stimmen nicht überein!';
      return
    }
    this.error = '';
    
    try {
      const response = await backendAxios.post('/auth/register', {
        name: this.username,
        email: this.email,
        password: this.password,
      });
      applyToken(response.data.token);
    } catch (error) {
      if (!(error instanceof AxiosError)) return;
      this.error = 'Fehler bei Registrierung';
      if (error.response?.data.errorCode === 1) {
        this.error = 'Ein Benutzer existiert bereits unter dieser E-Mail-Adresse.';
        return;
      }
    }
    navigate('/');
  }



  render() {
    return html`
      <div class="register-container">
        <h2>Registrieren</h2>
        <form @submit="${this.handleRegister}">
          <div class="input-container">
            <input
              type="text"
              name="username"
              .value="${this.username}"
              placeholder="Benutzername"
              @input="${this.handleInputChange}"
            />
            <input
              type="text"
              name="email"
              .value="${this.email}"
              placeholder="E-Mail-Adresse"
              @input="${this.handleInputChange}"
            />
            <input
              type="password"
              name="password"
              .value="${this.password}"
              placeholder="Passwort"
              @input="${this.handleInputChange}"
            />
            <input
              type="password"
              name="passwordValidation"
              .value="${this.passwordValidation}"
              placeholder="Passwort wiederholen"
              @input="${this.handleInputChange}"
            />
          </div>
          ${this.error ? html`<div class="error">${this.error}</div>` : ''}
          <button type="submit">Registrieren</button>
        </form>
      </div>
    `;
  }
}

customElements.define('register-page', RegisterPage);
