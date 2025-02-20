import { LitElement, html, css } from 'lit';

class HeaderComponent extends LitElement {
  static styles = css`
    header {
      background-color: #333;
      color: white;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      text-align: left;
      font-size: 24px;
      font-family: Arial, sans-serif;
    }

    nav {
      display: flex;
      gap: 25px;
    }

    nav a {
      color: white;
      text-decoration: none;
    }

    nav a:hover {
      text-decoration: underline;
    }
  `;

  render() {
    return html`
      <header>
        <div>To-Do Planner</div>
        <nav>
          <a href="/">Home</a>
          <a href="/dashboard/index.html">Dashboard</a>
          <a href="/register/index.html">Contact</a>
          <a href="/login/index.html">Login</a>
        </nav>
      </header>
    `;
  }
}

customElements.define('header-component', HeaderComponent);
