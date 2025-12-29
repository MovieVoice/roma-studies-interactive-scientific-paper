import { useParams, Navigate, NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import results from '/src/assets/data/results.json';
import styles from './QuestionnairePage.module.css';

function QuestionnairePage() {
    const { id } = useParams();
    const questionId = parseInt(id, 10);

    const [isLoading, setIsLoading] = useState(true);
    const [alreadyWatched, setAlreadyWatched] = useState(false);
    const [answer, setAnswer] = useState(null);

    const videoRef = useRef(null);
    const wrapperRef = useRef(null);


    // Prüfen, ob das Video schon angesehen wurde oder eine Antwort existiert
    useEffect(() => {
        const watchedFlag = localStorage.getItem(`videoWatched_${questionId}`);
        const savedAnswer = localStorage.getItem(`answer_${questionId}`);

        // Wenn bereits eine Antwort existiert, Video wieder freigeben
        if (savedAnswer) {
            localStorage.removeItem(`videoWatched_${questionId}`);
            setAlreadyWatched(false);
        } else {
            setAlreadyWatched(watchedFlag === 'true');
        }

        setAnswer(savedAnswer || null);
    }, [questionId, answer]);

    useEffect(() => {
        const video = videoRef.current;
        const wrapper = wrapperRef.current;
        if (!video || !wrapper) return;

        let resizeTimeout;

        const adjustVideoSize = () => {
            if (!video || !wrapper) return;

            const width = window.innerWidth;
            const height = window.innerHeight;

            if (width >= 992 && height >= 800) {
                const maxVideoHeight = wrapper.offsetHeight;
                const idealVideoWidth = Math.ceil((maxVideoHeight) * (9 / 16));

                video.style.width = `${idealVideoWidth}px`;
            } else {
                video.style.width = "100%";
            }
        };

        // Debounced resize handler
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(adjustVideoSize, 100); // 100ms Delay
        };

        // Observer für Wrapper, falls sich dieser dynamisch ändert
        const resizeObserver = new ResizeObserver(() => adjustVideoSize());

        // Events
        window.addEventListener("resize", adjustVideoSize);
        window.addEventListener("load", adjustVideoSize);
        resizeObserver.observe(wrapper);

        // Initialer Adjust nach kleinem Delay (wenn alles gerendert ist)
        setTimeout(adjustVideoSize, 50);

        return () => {
            window.removeEventListener("resize", adjustVideoSize);
            window.removeEventListener("load", adjustVideoSize);
            resizeObserver.disconnect();
            clearTimeout(resizeTimeout);
        };
    }, []);



    // Ungültige IDs -> zurück
    if (isNaN(questionId) || questionId < 1 || questionId > 19) {
        return <Navigate to="/" replace />;
    }


    // Antwort speichern
    const handleAnswer = (type) => {
        localStorage.setItem(`answer_${questionId}`, type);
        setAnswer(type);
    };

    // Textdarstellung der Antwort
    const translate = (type) =>
        type === 'real' ? 'Echtes Video' : type === 'ai' ? 'KI-generiertes Video' : 'Keine Angabe';

    // Ergebnisse aus JSON holen
    const resultData = results.find((r) => r.id === questionId);


    let pageContent;

    // IDs 1–16
    if (questionId >= 1 && questionId <= 16) {
        pageContent = (
            <>
                <div className={styles.layoutVideoMobile}>
                    <p className={styles.headline}>Video #{questionId}</p>
                    <p className={styles.text}>Du darfst das Video genau einmal anschauen. Entscheide dann selbst, ob das Video KI-generiert oder real ist. Du kannst auch direkt die Ergebnisse der Befragung aufdecken.</p>

                    {answer ? (
                        <div className={styles.answerSection}>
                            <div className={styles.onlineResults}>
                                <p className={styles.onlineResultsHeadline}>Ergebnis der Online‑Befragung:</p>
                                <div className={`${styles.barContainer} ${answer === 'real' ? styles.barActive : ''}`}>
                                    <span>Echtes Video</span>
                                    <span>{resultData.realPercentage}%</span>
                                    <div className={styles.bar} style={{ 'width': `${resultData.realPercentage}%` }}></div>
                                </div>

                                <div className={`${styles.barContainer} ${answer === 'ai' ? styles.barActive : ''}`}>
                                    <span>KI-generiertes Video</span>
                                    <span>{resultData.aiPercentage}%</span>
                                    <div className={styles.bar} style={{ 'width': `${resultData.aiPercentage}%` }}></div>
                                </div>
                            </div>

                            <p>
                                <span className={styles.resultLabel}>Richtige Antwort: </span>
                                <span className={styles.resultValue}>{translate(resultData.correctAnswer)}</span>
                            </p>
                            <p>
                                <span className={styles.resultLabel}>Deine Antwort: </span>
                                <span className={styles.resultValue}>{translate(answer)}</span>
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.btnContainer}>
                                <button
                                    className={styles.voteBtn}
                                    onClick={() => handleAnswer('real')}
                                >
                                    <img src="/src/assets/icons/real.svg" alt="" />
                                    Echtes Video
                                </button>

                                <button
                                    className={styles.voteBtn}
                                    onClick={() => handleAnswer('ai')}
                                >
                                    <img src="/src/assets/icons/ai.svg" alt="" />
                                    KI-generiertes Video
                                </button>

                                <button
                                    className={styles.revealBtn}
                                    onClick={() => handleAnswer('-')}
                                >
                                    <img src="/src/assets/icons/reveal.svg" alt="" />
                                    Ergebnisse direkt aufdecken
                                </button>
                            </div>
                        </>
                    )}
                    <div className={styles.videoWrapper}>
                        <div className={styles.videoContainer}>
                            {alreadyWatched ? (
                                <div className={styles.alreadyWatchedContainer}>
                                    <div className={styles.alreadyWatchedBox}>
                                        <img src="/src/assets/icons/no-repeat.svg" alt="" />
                                        <p>Dieses Video wurde bereits angesehen und kann nicht erneut abgespielt werden.</p>
                                    </div>
                                    <img className={styles.alreadyWatchedBG} src={`/src/assets/thumbnails/${questionId}.jpg`} alt="" />
                                </div>
                            ) : (
                                <>
                                    {isLoading && <div className={styles.loader}></div>}
                                    <video
                                        src={`/videos/${questionId}.mp4`}
                                        controls
                                        playsInline
                                        onCanPlay={() => setIsLoading(false)}
                                        onLoadedData={() => setIsLoading(false)}
                                        onEnded={() => {
                                            if (!answer) {
                                                localStorage.setItem(`videoWatched_${questionId}`, 'true');
                                                setAlreadyWatched(true);
                                            }
                                        }}
                                        className={isLoading ? styles.hidden : ''}
                                    />
                                </>
                            )}
                        </div>
                    </div>

                </div>
                <div className={styles.layoutVideo}>
                    <div className={styles.videoWrapper} ref={wrapperRef}>
                        <div className={styles.videoContainer} ref={videoRef}>
                            {alreadyWatched ? (
                                <div className={styles.alreadyWatchedContainer}>
                                    <div className={styles.alreadyWatchedBox}>
                                        <img src="/src/assets/icons/no-repeat.svg" alt="" />
                                        <p>Dieses Video wurde bereits angesehen und kann nicht erneut abgespielt werden.</p>
                                    </div>
                                    <img className={styles.alreadyWatchedBG} src={`/src/assets/thumbnails/${questionId}.jpg`} alt="" />
                                </div>
                            ) : (
                                <>
                                    {isLoading && <div className={styles.loader}></div>}
                                    <video
                                        src={`/videos/${questionId}.mp4`}
                                        controls
                                        playsInline
                                        onCanPlay={() => setIsLoading(false)}
                                        onLoadedData={() => setIsLoading(false)}
                                        onEnded={() => {
                                            if (!answer) {
                                                localStorage.setItem(`videoWatched_${questionId}`, 'true');
                                                setAlreadyWatched(true);
                                            }
                                        }}
                                        className={isLoading ? styles.hidden : ''}
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    <div className={styles.contentSection}>
                        <p className={styles.headline}>Video #{questionId}</p>
                        <p className={styles.text}>Du darfst das Video genau einmal anschauen. Entscheide dann selbst, ob das Video KI-generiert oder real ist. Du kannst auch direkt die Ergebnisse der Befragung aufdecken.</p>
                    </div>
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
