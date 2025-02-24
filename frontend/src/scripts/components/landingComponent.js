import { LitElement, html, css } from 'lit';

class LandingComponent extends LitElement {
    static styles = css`
      /* Import Google Fonts */
      @import url('https://fonts.googleapis.com/css2?family=Miniver&family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
      
      :host {
        --primary-color: #0d4c8b;
        --secondary-color: #fa7d00;
        }
  
      * {
        font-family: 'Poppins', sans-serif;
      }
      
        .hero-section {
            background-color: var(--primary-color);
            min-height: 100vh;
        }

        .section-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-left: 10%;
            min-height: 75vh;
            color: white;
            gap: 30px;
        }

        .hero-details .title {
            font-size: 45px;
            font-weight: 800;
            color: var(--secondary-color);
            font-family: 'Miniver', cursive;
        }

        .hero-details .subtitle {
            font-size: 30px;
            font-weight: 500;
            margin-top: 8px;
            max-width: 70%;
        }

        .hero-details .describtion {
            font-size: 20px;
            margin: 24px 0 40px;
            max-width: 70%;
        }

        .hero-details .buttons {
            display: flex;
            gap: 23px;
        }

        .hero-details .button {
            padding: 10px 26px;
            color: var(--primary-color);
            border-radius: 25px;
            border: 2px solid transparent;
            background-color: var(--secondary-color);
            font-weight: 500;
            text-decoration: none;
            transition: 0.3s ease;
        }

        .hero-details .button:hover,
        .hero-details .login {
            color: white;
            border-color: white;
            background: transparent;
        }

        .hero-details .login:hover {
            color: var(--primary-color);
            border-color: var(--secondary-color);
            background: var(--secondary-color);
        }

        .hero-section .hero-image-container .hero-image {
            max-width: 80%;
            margin-right: 30px;
            align-items: right;
        }
        
        /*
        .hero-image-container .hero-image {
            width: 300px;
            height: 300px;
        }
        */

        @media (max-width: 900px) {
            .hero-section .section-content {
                gap: 50px;
                flex-direction: column-reverse;
                text-align: center;
                justify-content: center;
                padding: 30px 20px 20px;
                margin-left: 0;
            }

            .hero-section .hero-image-container {
                max-width: 270px;
                margin-right: 0;
            }

            .hero-section .hero-details :is(.subtitle, .describtion) {
                max-width: 100%;
            }

            .hero-section .hero-details .buttons {
                justify-content: center;
            }
        }
    `;

    render() {
        return html`
            <section class="hero-section">
                <div class="section-content">
                    <div class="hero-details">
                        <h1 class="title">Willkommen bei unserem To-Do Planner</h1>
                        <h2 class="subtitle">Der einfachste Weg deine täglichen Probleme zu lösen!</h2>
                        <p class="describtion">Hier kannst du gan zeinfach deine Termine eintragen,
                            vermerken was du noch machen wolltest und vieles mehr.</p>

                        <div class="buttons">
                            <a href="/contact/index.html" class="button contact">Kontaktieren Sie uns</a>
                            <a href="/login/index.html" class="button login">Anmelden</a>
                        </div>
                    </div>
                    <div class="hero-image-container">
                        <img src="images/calender.png" alt="hero-image" class="hero-image">
                    </div>
                </div>

            </section>
        `;
    }
}

customElements.define('landing-component', LandingComponent);
