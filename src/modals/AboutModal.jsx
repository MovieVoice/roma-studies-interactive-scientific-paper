import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './Modals.module.css';

function AboutModal() {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(-1);
    };

    useEffect(() => {
        const onEsc = (e) => e.key === 'Escape' && handleClose();
        window.addEventListener('keydown', onEsc);
        return () => window.removeEventListener('keydown', onEsc);
    }, []);

    return (
        <>
            <div className={styles.modalWrapper}>
                <div className={styles.modal}>
                    <div className={styles.appbar}>
                        <p>About</p>
                        <button onClick={handleClose}>
                            <img src="/src/assets/icons/close.svg" alt="Fenster schließen" />
                        </button>
                    </div>
                    <div className={styles.content}>
                        <p className={styles.subheading}>Über das Projekt</p>
                        <div className={styles.contentSpacer}></div>
                        <p className={styles.text}>Dieses Multimediasystem ist im Rahmen des Moduls <span className={styles.bold}>„Multimediasysteme“</span> an der <span className={styles.bold}>Hochschule Fulda</span> entstanden. Entwickelt haben es <span className={styles.bold}>Robert Stein</span> und <span className={styles.bold}>Marcel Otto</span>, zwei Studierende des Studiengangs <span className={styles.bold}>Digitale Medien</span>, die sich gefragt haben, wie gut wir eigentlich noch erkennen, was auf Social Media echt ist und was nicht. Im System lassen sich die Ergebnisse ihrer Studie interaktiv erleben.</p>
                        <div className={styles.contentSpacer}></div>
                        <div className={styles.contentSpacer}></div>
                        <p className={styles.subheading}>Über uns</p>
                        <div className={styles.contentSpacer}></div>
                        <p className={styles.text}>
                            Wir – <span className={styles.bold}>Robert Stein</span> und <span className={styles.bold}>Marcel Otto</span> – studieren Digitale Medien an der Hochschule Fulda und teilen die Begeisterung dafür, <span className={styles.bold}>Technik und Gestaltung auf sinnvolle Weise zu verbinden</span>.
                        </p>
                        <div className={styles.contentSpacer}></div>
                        <p className={styles.text}>
                            Im Laufe unseres Studiums haben wir schon einige gemeinsame Projekte umgesetzt. Dieses hier liegt uns besonders am Herzen, weil es ein aktuelles Thema aus unserem eigenen Alltag aufgreift.
                        </p>
                        <div className={styles.contentSpacer}></div>
                        <p className={styles.text}>
                            Marcel ist außerdem <span className={styles.bold}>Mitglied im Young Founders Network (YFN)</span>. Darüber lernte er <span className={styles.bold}>Julius Kopp</span>, den Gründer von Tasy.ai, kennen – ein Unternehmen, das Tools zur Erstellung von KI‑Produktvideos entwickelt. Julius hat uns sein Tool kostenlos für die Forschung zur Verfügung gestellt und damit einen wichtigen Beitrag zum Projekt geleistet.
                        </p>
                        <div className={styles.contentSpacer}></div>
                        <p className={styles.text}>
                            Gemeinsam möchten wir mit dieser Arbeit zeigen, wie man <span className={styles.bold}>wissenschaftliche Themen lebendig, greifbar und interaktiv</span> vermitteln kann – und dabei vielleicht auch ein kleines bisschen nachdenklich wird über das, was wir heute als „real“ wahrnehmen.
                        </p>

                    </div>
                </div>
            </div>
            <div className={styles.overlay} onClick={handleClose}></div>
        </>
    );
}

export default AboutModal;
