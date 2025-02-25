import { LitElement, html, css } from 'lit';


class ContactPage extends LitElement {
    static styles = css`
    /* Import Google Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Miniver&family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
      
    :host {
        --primary-color: #0d4c8b;
        --secondary-color: #fa7d00;

        background-color: var(--primary-color);
        display: flex;
        flex-grow: 1;
        justify-content: flex-start;
        align-items: center;
        height: auto;
        flex-direction: column;
    }

    * {
        font-family: 'Poppins', sans-serif;
    }
    
    .contact-page {
        background-color: var(--primary-color);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        flex-grow: 1;
        height: auto;
        width: 100%;
    }

    .contact-container {
        width: 60%;
        flex-grow: 1;
        background-color: white;
        padding: 20px;
        border-radius: 50px;
    }

    h2 {
        text-align: center;
        padding: 60px 0 30px;
        text-transform: uppercase;
        font-size: 36px;
    }

    h2::after {
        content: '';
        width: 80px;
        height: 5px;
        display: block;
        margin: 10px auto 0;
        border-radius: 5px;
        background-color: var(--secondary-color);
    }

    .contact-content {
        display: flex;
        gap: 48px;
        align-items: flex-start;
        justify-content: space-between;
    }

    .contact-info-list {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    
    .contact-info {
        display: flex;
        gap: 20px;
        margin: 20px 0;
        align-items: center;
    }

    .contact-info i {
        padding: clamp(10px, 5%, 20px);
        font-size: 24px;    
    }

    .contact-form {
        margin-top: 40px;
        margin-left: 20px;
    }

    .contact-form .form-input{
        width: 80%;
        height: 50px;
        padding: 0 12px;
        outline: none;
        margin-bottom: 16px;
        background: white;
        border-radius: 4px;
        border: 1px solid #ddd;
    }

    .contact-form .form-input:focus {
        border-color: var(--secondary-color);
    }

    .contact-form textarea.form-input {
        height: 150px;
        padding: 12px;
        resize: vertical;
    }

    .contact-form .submit-button {
        padding: 10px 26px;
        color: white;
        font-size: 16px;
        font-weight: 500;
        border-radius: 25px;
        background: var(--primary-color);
        border: 1px solid var(--primary-color);
        transition: 0.3s ease;
        cursor: pointer;
    }

    .contact-form .submit-button:hover {
        background: transparent;
        color: var(--primary-color);
    }

    @media (max-width: 900px) {
        .contact-content {
            flex-direction: column-reverse;
            
        }

        .contact-form {
            max-width: 100%;
        }
    }
  `;


    render() {
        return html`
        <div class="contact-page">
            <!-- Linking Font Awsome for icons -->
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

            <div class="contact-container">
                <h2>Kontakt</h2>
                <div class="contact-content">
                    <ul class="contact-info-list">
                        <li class="contact-info">
                            <i class="fa-solid fa-location-crosshairs"></i>
                            <p>Fallenbrunnen 2, 88045 Friedrichshafen</p>
                        </li>
                        <li class="contact-info">
                            <i class="fa-solid fa-phone"></i>
                            <p>+49 3675295732</p>
                        </li>
                        <li class="contact-info">
                            <i class="fa-solid fa-clock"></i>
                            <p>Montag - Samstag: 9:00 Uhr - 18:00 Uhr</p>
                        </li>
                        <li class="contact-info">
                            <i class="fa-solid fa-clock"></i>
                            <p>Sonntags nicht erreichbar</p>
                        </li>
                        <li class="contact-info">
                            <i class="fa-solid fa-globe"></i>
                            <p>www.ravensburg.dhbw.de</p>
                        </li>
                    </ul>

                    <form action="#" class="contact-form">
                        <input type="text" placeholder="Name" class="form-input" required>
                        <input type="email" placeholder="E-Mail-Adresse" class="form-input" required>
                        <textarea placeholder="Ihre Nachricht" class="form-input" required></textarea>
                        <button class="submit-button">Absenden</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    }
}

customElements.define('contact-page', ContactPage);
