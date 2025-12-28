import { useParams, Navigate, NavLink } from 'react-router-dom';
import { useState } from 'react';
import styles from './QuestionnairePage.module.css';

function QuestionnairePage() {
    const { id } = useParams();
    const questionId = parseInt(id, 10);
    const [isLoading, setIsLoading] = useState(true);

    // Ungültige IDs umleiten
    if (isNaN(questionId) || questionId < 1 || questionId > 19) {
        return <Navigate to="/" replace />;
    }


    let pageContent;

    // IDs 1–16
    if (questionId >= 1 && questionId <= 16) {
        pageContent = (
            <>
                <div className={styles.layoutVideoMobile}>
                    <p className={styles.headline}>Video #{questionId}</p>
                    <p className={styles.text}>Du darfst das Video genau einmal anschauen. Entscheide dann selbst, ob das Video KI-generiert oder real ist. Du kannst auch direkt die Ergebnisse der Befragung aufdecken.</p>

                    <div className={styles.btnContainer}>
                        <button className={styles.voteBtn}><img src="/src/assets/icons/real.svg" alt="" />Echtes Video</button>
                        <button className={styles.voteBtn}><img src="/src/assets/icons/ai.svg" alt="" />KI-generiertes Video</button>
                        <button className={styles.revealBtn}><img src="/src/assets/icons/reveal.svg" alt="" />Ergebnisse direkt aufdecken</button>
                    </div>

                    <div className={styles.videoWrapper}>
                        <div className={styles.videoContainer}>
                            {isLoading && (
                                <div className={styles.loader}></div>
                            )}

                            <video
                                src={`/videos/${questionId}.mp4`}
                                controls
                                playsInline
                                onCanPlay={() => setIsLoading(false)}
                                onLoadedData={() => setIsLoading(false)}
                                className={isLoading ? styles.hidden : ''}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.layoutVideo}>
                    <p className={styles.headline}>Video #{questionId}</p>
                    <p className={styles.text}>Dies ist eine normale Video-Frage.</p>

                    {isLoading && (
                        <div className={styles.loaderWrapper}>
                            <div className={styles.loader}></div>
                            <p>Video wird geladen...</p>
                        </div>
                    )}

                    <video
                        src={`/videos/${questionId}.mp4`}
                        controls
                        onCanPlay={() => setIsLoading(false)}
                        onLoadedData={() => setIsLoading(false)}
                        className={isLoading ? styles.hidden : ''}
                        playsInline
                    />
                </div>
            </>
        );
    }

    // IDs 17–18
    if (questionId >= 17 && questionId <= 18) {
        pageContent = (
            <div className={styles.layoutSettings}>
                <h1>Einstellungsfrage {questionId - 16}</h1>
                <p>Dies ist eine textbasierte Einstellungsfrage.</p>
                <textarea placeholder="Bitte gib deine Antwort ein..." />
            </div>
        );
    }

    // ID 19
    if (questionId === 19) {
        pageContent = (
            <div className={styles.layoutSettings}>
                <h1>Vielen Dank für deine Teilnahme!</h1>
                <p>Deine Antworten wurden gespeichert.</p>
            </div>
        );
    }

    // Fallback
    return (
        <>
            <div className={styles.container}>
                {pageContent}
            </div>

            <div className={styles.bottomNavbar}>
                <NavLink
                    to={questionId > 1 ? `/questionnaire/${questionId - 1}` : '/method'}
                    title="Zurück"
                    className={styles.bottomNavbarItem}
                >
                    <span className={styles.bottomNavbarItemBox}>
                        <img src="/src/assets/icons/previous-page.svg" alt="" />
                        <span className={styles.linkTitle}>Zurück</span>
                    </span>
                </NavLink>

                <NavLink
                    to={questionId < 19 ? `/questionnaire/${questionId + 1}` : '/results'}
                    title="Weiter"
                    className={styles.bottomNavbarItem}
                >
                    <span className={styles.bottomNavbarItemBox}>
                        <span className={styles.linkTitle}>Weiter</span>
                        <img src="/src/assets/icons/next-page.svg" alt="" />
                    </span>
                </NavLink>
            </div>
        </>
    );
}

export default QuestionnairePage;
