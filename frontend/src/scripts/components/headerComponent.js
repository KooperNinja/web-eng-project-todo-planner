import { LitElement, html, css } from 'lit';

class HeaderComponent extends LitElement {
  static styles = css`
    /* Import Google Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

    * {
      font-family: 'Poppins', sans-serif;
    }

    :host {
      --primary-color: #0d4c8b;
      --secondary-color: #fa7d00;
    }

    header {
      background-color: var(--primary-color);
      color: white;
      padding: 20px;
      display: flex;
      text-align: left;
      font-size: 24px;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-left: 10%;
      margin-right: 10%;
    }

    .title-container {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    title {
      display: flex;
      text-align: left;
      align-items: center;
      gap: 10px;
    }

    nav {
      display: flex;
      gap: 20px;
    }

    nav a {
      color: white;
      padding: 10px 18px;
      border-radius: 25px;
      text-decoration: none;
      transition: 0.3s ease;
    }

    nav a:hover {
      color: var(--primary-color);
      background-color: var(--secondary-color);
    }

    .header-content :where(#menu-close-button, #menu-open-button) {
        display: none;
    }

    .logo-button {
      background: transparent;
      border: none;
      padding: 0;
      margin: 0;
      cursor: pointer;
    }

    .logo {
      width: 40px;
      height: 40px;
    }

    @media screen and (max-width: 900px) {
      nav {
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 300px;
        display: none;
        flex-direction: column;
        align-items: center;
        padding-top: 100px;
        background: white;
        transition: left 0.2s ease;
        z-index: 1000;
      }


      /* gute Idee, aber nicht notwendig, weiß nicht woran es liegt
        --> sorgt dafür, dass der Hintergrund bei offenem Menü nicht verschwommen ist
        nav.show-mobile-menu header::before {
          position: fixed;
          content: "";
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(5px);
        }
        */


      nav.show-mobile-menu {
        left: 0;
        display: flex;
        transition: left 0.3s ease;
      }

      nav a {
        color: black;
        display: block;
        margin-top: 17px;
        font-size: 25px;
      }

      .header-content :where(#menu-close-button, #menu-open-button) {
        font-size: 25px;
        display: block;
        background: transparent;
        border: none;
      }

      .header-content #menu-close-button { 
        position: absolute;
        right: 30px;
        top: 30px;
      }

      .header-content #menu-open-button {
        color: white;
      }
    }
  `;

  firstUpdated() {
    const menuOpenButton = this.shadowRoot.querySelector('#menu-open-button');
    const menuCloseButton = this.shadowRoot.querySelector('#menu-close-button');
    const nav = this.shadowRoot.querySelector('nav');

    menuOpenButton.addEventListener('click', () => {
      nav.classList.toggle('show-mobile-menu');
    });

    menuCloseButton.addEventListener('click', () => menuOpenButton.click());
  }

  render() {
    return html`
      <header> 
        <!-- Linking Font Awsome for icons -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
        
        <div class="header-content">
          <div class="title-container">
            <img src="../images/calender-logo.png" alt="logo" width="50" height="50">
            <title>To-Do Planner</title>
          </div>
          <nav>
            <button id="menu-close-button" class="logo-button">
              <i class="fas fa-times"></i>
            </button>
            <a href="/">Home</a>
            <a href="/dashboard/index.html">Dashboard</a>
            <a href="/contact/index.html">Kontakt</a>            
            <a href="/login/index.html">Login</a>
          </nav>
          <button id="menu-open-button" class="logo-button">
              <i class="fas fa-bars"></i>
          </button>
        </div>
      </header>
    `;
  }
}

customElements.define('header-component', HeaderComponent);
