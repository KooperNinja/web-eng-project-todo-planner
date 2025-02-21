import { LitElement, html, css } from 'lit';
import { navigate } from '../router.js';
import { applyToken, backendAxios } from '../axios.js';

class LoginPage extends LitElement {
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

    .login-container {
      background-color: white;
      padding: 20px;
      border-radius: 16px;
      width: 60%;
      height: 95.5%;
    }

    .login-container h2 {
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

    nav {
      text-align: center;
    }

    nav a {
        color: black;
        text-decoration: none;
        text-align: center;
    }

    a:hover {
        text-decoration: underline;
        color: blue;
    }
  `;

  static properties = {
    email: { type: String },
    password: { type: String },
    error: { type: String },
  };

  constructor() {
    super();
    this.email = '';
    this.password = '';
    this.error = '';
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this[name] = value;
  }

  async handleLogin(event) {
    event.preventDefault();

    if (this.email === '' || this.password === '') {
      this.error = 'Beide Felder sind verpflichtend auszufüllen.';
      return
    }
    this.error = '';

    try {
      const response = await backendAxios.post('/auth/login', {
        email: this.email,
        password: this.password,
      })
      applyToken(response.data.token);
    } catch (/** @type {AxiosError} */error) {
      this.error = 'Fehler beim Login. '
      switch (error.response.data.errorCode) {
        case 1:
          this.error += 'Benutzer mit dieser E-Mail-Adresse nicht gefunden.';
          break;
        case 2:
          this.error += 'Falsches Passwort.';
          break;
      }
      return
    }
    navigate('/');
  }

  render() {
    return html`
      <div class="login-container">
        <h2>Login</h2>
        <form @submit="${this.handleLogin}">
          <div class="input-container">
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
          </div>
          ${this.error ? html`<div class="error">${this.error}</div>` : ''}
          <button type="submit">Login</button>
          <nav>
            <a href=/register/index.html>Sie haben noch keinen Account? Registrieren Sie sich jetzt!</a>
          </nav>
        </form>
      </div>
    `;
  }
}

customElements.define('login-page', LoginPage);
