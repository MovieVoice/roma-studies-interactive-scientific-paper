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
    const [visibleQuotes, setVisibleQuotes] = useState(5);

    const videoRef = useRef(null);
    const wrapperRef = useRef(null);


    useEffect(() => {
        const timeout = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "auto" });
        }, 50);
        return () => clearTimeout(timeout);
    }, [questionId]);


    useEffect(() => {
        const handleStorageClear = () => {
            setAnswer(null);
            setAlreadyWatched(false);
        };
        window.addEventListener("storageCleared", handleStorageClear);

        return () => window.removeEventListener("storageCleared", handleStorageClear);
    }, []);

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

        const resizeObserver = new ResizeObserver(() => adjustVideoSize());

        window.addEventListener("resize", adjustVideoSize);
        window.addEventListener("load", adjustVideoSize);
        resizeObserver.observe(wrapper);

        setTimeout(adjustVideoSize, 50);

        return () => {
            window.removeEventListener("resize", adjustVideoSize);
            window.removeEventListener("load", adjustVideoSize);
            resizeObserver.disconnect();
            clearTimeout(resizeTimeout);
        };
    }, []);


    // Ungültige IDs -> zurück
    if (isNaN(questionId) || questionId < 0 || questionId > 19) {
        return <Navigate to="/" replace />;
    }


    // Antwort speichern
    const handleAnswer = (type) => {
        localStorage.setItem(`answer_${questionId}`, type);
        setAnswer(type);
    };

    // Textdarstellung der Antwort
    const translate = (type) =>
        type === 'real' ? 'Echtes Video' : type === 'ai' ? 'KI-generiertes Video' : type === 'yes' ? 'Ja' : type === 'no' ? 'Nein' : 'Keine Angabe';

    // Ergebnisse aus JSON holen
    const resultData = results.find((r) => r.id === questionId);


    useEffect(() => {
        if (questionId !== 17 && questionId !== 18) return;
        if (!answer || !resultData) return;

        const mean = parseFloat(resultData.meanValue);
        const std = parseFloat(resultData.standardDeviation);
        const min = 1, max = 7;
        const tickWidth = 16;
        const barEndWidth = 4;

        const bar = document.querySelector(`.${styles.scaleBar}`);
        const meanDot = document.querySelector(`.${styles.scaleMean}`);
        const scaleAxis = document.querySelector(`.${styles.scaleAxis}`);
        if (!bar || !meanDot || !scaleAxis) return;

        const halfTick = tickWidth / 2;
        const halfEnd = barEndWidth / 2;

        function updateScale() {
            const width = scaleAxis.offsetWidth;

            // Mittelpunkt (Zentrum) des Mean in Pixeln von links bis Mitte des Mean-Ticks
            const xPx = ((mean - min) / (max - min)) * (width - tickWidth) + halfTick;

            // Pixel-Entfernung, die die Standardabweichung abbildet
            const deltaPx = (std / (max - min)) * (width - tickWidth);

            // Rohbereiche der Balkenmitte (bevor geclamped)
            let leftBarPx = xPx - deltaPx;
            let rightBarPx = xPx + deltaPx;

            // Clamping, so dass Balken-End-MITTEN auf Tick 1/7 sitzen
            const boundLeft = halfTick;
            const boundRight = width - halfTick;
            leftBarPx = Math.max(boundLeft, leftBarPx);
            rightBarPx = Math.min(boundRight, rightBarPx);

            // Prozent-Umrechnung
            const toPercent = (px) => (px / width) * 100;

            // Endgültige Positionsberechnung
            const meanLeft = toPercent(xPx - halfTick);
            const barLeft = toPercent(leftBarPx - halfEnd);
            const barWidth = toPercent(
                (rightBarPx + halfEnd) - (leftBarPx - halfEnd)
            );

            // CSS setzen
            meanDot.style.left = `${meanLeft}%`;
            bar.style.left = `${barLeft}%`;
            bar.style.width = `${barWidth}%`;
        }

        updateScale();

        window.addEventListener("resize", updateScale);

        return () => {
            window.removeEventListener("resize", updateScale);
        };
    }, [questionId, resultData, answer]);


    function formatNumberDE(num) {
        if (num === null || num === undefined || isNaN(num)) return '';
        return num.toString().replace('.', ',');
    }


    let pageContent;

    // ID 0 (Intro)
    if (questionId === 0) {
        pageContent = (
            <div className={styles.content}>
                <p className={styles.headline}>Fragebogen</p>
                <p className={styles.text}>Im Folgenden findest du einen Fragebogen mit denselben Fragen wie in der Online-Befragung. Beantworte sie selbst und vergleiche deine Antworten mit den Ergebnissen der Studie oder decke die Ergebnisse direkt auf. Der Fragebogen besteht aus insgesamt 19 Fragen:</p>

                <div className={styles.introQuestionTypesWrapper}>
                    <div className={styles.introQuestionTypeContainer}>
                        <p className={styles.introQuestionTypeHeadline}>16 Video-Fragen</p>
                        <p className={styles.introQuestionTypeText}>Schau dir jeweils ein Video an und entscheide, ob es KI-generiert oder real ist. Jedes Video darfst du nur ein einziges Mal ansehen, bevor du deine Entscheidung treffen musst.</p>
                    </div>
                    <div className={styles.introQuestionTypeContainer}>
                        <p className={styles.introQuestionTypeHeadline}>3 Einstellungsfragen</p>
                        <p className={styles.introQuestionTypeText}>Beantworte, wie du zu KI-Videos in den sozialen Medien stehst, wie sie deiner Meinung nach das Image eines Unternehmens beeinflussen und welchen Einfluss sie auf die Kaufentscheidungen haben könnten.</p>
                    </div>
                </div>

                <p className={styles.text}>Drücke auf "Weiter", um zu starten.</p>
            </div>
        );
    }

    // IDs 1–16
    if (questionId >= 1 && questionId <= 16) {
        pageContent = (
            <>
                <div className={styles.layoutVideoMobile}>
                    <p className={styles.headline}>Video #{questionId}</p>
                    <p className={styles.text}>Du darfst das Video genau einmal anschauen. Entscheide dann selbst, ob das Video KI-generiert oder real ist. Du kannst auch direkt die Ergebnisse der Befragung aufdecken.</p>

                    {answer ? (<>
                        <div className={styles.answerSection}>
                            <div className={styles.onlineResults}>
                                <p className={styles.onlineResultsHeadline}>Ergebnis der Online‑Befragung:</p>
                                <div className={`${styles.barContainer} ${answer === 'real' ? styles.barActive : ''}`}>
                                    <span className={styles.barLabel}>Echtes Video</span>
                                    <span className={styles.barPercentage}>{resultData.realPercentage}%</span>
                                    <div className={styles.bar} style={{ 'width': `${resultData.realPercentage}%` }}></div>
                                </div>

                                <div className={`${styles.barContainer} ${answer === 'ai' ? styles.barActive : ''}`}>
                                    <span className={styles.barLabel}>KI-generiertes Video</span>
                                    <span className={styles.barPercentage}>{resultData.aiPercentage}%</span>
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
                        {resultData.correctAnswer === "ai" && (
                            <div className={styles.aiContainer}>
                                {(() => {
                                    const isDigen = resultData.aiModel === "digen";

                                    const headline = isDigen ? "Video erstellt mit Digen" : "Video erstellt mit Tasy";

                                    const text = isDigen
                                        ? "Digen ist eine Plattform zur Generierung von Videos aller Art auf Basis künstlicher Intelligenz. Verwendet wird das KI-Modell Sora 2 von OpenAI."
                                        : "Tasy ist eine Plattform spezialisiert auf die Generierung von UGC-Videos auf Basis künstlicher Intelligenz. Dabei kommt eine Kombination verschiedener KI-Modelle zum Einsatz: Kling, ElevenLabs, Higgsfield, Mirage, Google Nano Banana, Sync und Veed Lipsync.";

                                    const link = isDigen ? "https://digen.ai/" : "https://www.tasy.ai/";

                                    return (
                                        <>
                                            <p className={styles.aiHeadline}>{headline}</p>
                                            <p className={styles.aiText}>{text}</p>
                                            <a className={styles.aiLink} href={link} target="_blank" rel="noopener noreferrer" >
                                                <img src="/src/assets/icons/link.svg" alt="Link zur Website" />
                                                Zur Website
                                            </a>
                                        </>
                                    );
                                })()}
                            </div>
                        )}
                    </>
                    ) : (
                        <>
                            <div className={styles.btnContainer}>
                                <button
                                    className={styles.voteBtn}
                                    onClick={() => handleAnswer('real')}
                                >
                                    <img src="/src/assets/icons/real.svg" alt="Echtes Video" />
                                    Echtes Video
                                </button>

                                <button
                                    className={styles.voteBtn}
                                    onClick={() => handleAnswer('ai')}
                                >
                                    <img src="/src/assets/icons/ai.svg" alt="KI-generiertes Video" />
                                    KI-generiertes Video
                                </button>

                                <button
                                    className={styles.revealBtn}
                                    onClick={() => handleAnswer('-')}
                                >
                                    <img src="/src/assets/icons/reveal.svg" alt="Ergebnisse direkt aufdecken" />
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
                                        <img src="/src/assets/icons/no-repeat.svg" alt="Video kann nicht wiederholt werden" />
                                        <p>Dieses Video wurde bereits angesehen und kann nicht erneut abgespielt werden.</p>
                                    </div>
                                    <img className={styles.alreadyWatchedBG} src={`/src/assets/thumbnails/${questionId}.jpg`} alt="Vorschaubild des Videos" />
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
                                        <img src="/src/assets/icons/no-repeat.svg" alt="Video kann nicht wiederholt werden" />
                                        <p>Dieses Video wurde bereits angesehen und kann nicht erneut abgespielt werden.</p>
                                    </div>
                                    <img className={styles.alreadyWatchedBG} src={`/src/assets/thumbnails/${questionId}.jpg`} alt="Vorschaubild des Videos" />
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

                        <div className={styles.answerSection}>
                            {!answer && (
                                <div className={styles.answerHidden}>
                                    <button
                                        className={styles.revealBtn}
                                        onClick={() => handleAnswer('-')}
                                    >
                                        <img src="/src/assets/icons/reveal.svg" alt="Ergebnisse direkt aufdecken" />
                                        Direkt aufdecken
                                    </button>
                                </div>
                            )}
                            <div className={styles.onlineResults}>
                                <p className={styles.onlineResultsHeadline}>Ergebnis der Online‑Befragung:</p>
                                <div className={`${styles.barContainer} ${answer === 'real' ? styles.barActive : ''}`}>
                                    <span className={styles.barLabel}>Echtes Video</span>
                                    <span className={styles.barPercentage}>{answer ? resultData.realPercentage : 0}%</span>
                                    {answer && <div className={styles.bar} style={{ 'width': `${resultData.realPercentage}%` }}></div>}
                                </div>

                                <div className={`${styles.barContainer} ${answer === 'ai' ? styles.barActive : ''}`}>
                                    <span className={styles.barLabel}>KI-generiertes Video</span>
                                    <span className={styles.barPercentage}>{answer ? resultData.aiPercentage : 0}%</span>
                                    {answer && <div className={styles.bar} style={{ 'width': `${resultData.aiPercentage}%` }}></div>}
                                </div>
                            </div>

                            <p>
                                <span className={styles.resultLabel}>Richtige Antwort: </span>
                                {answer && <span className={styles.resultValue}>{translate(resultData.correctAnswer)}</span>}
                            </p>
                            <p>
                                <span className={styles.resultLabel}>Deine Antwort: </span>
                                {answer && <span className={styles.resultValue}>{translate(answer)}</span>}
                            </p>
                        </div>

                        {answer && resultData.correctAnswer === "ai" && (
                            <div className={styles.aiContainer}>
                                {(() => {
                                    const isDigen = resultData.aiModel === "digen";

                                    const headline = isDigen ? "Video erstellt mit Digen" : "Video erstellt mit Tasy";

                                    const text = isDigen
                                        ? "Digen ist eine Plattform zur Generierung von Videos aller Art auf Basis künstlicher Intelligenz. Verwendet wird das KI-Modell Sora 2 von OpenAI."
                                        : "Tasy ist eine Plattform spezialisiert auf die Generierung von UGC-Videos auf Basis künstlicher Intelligenz. Dabei kommt eine Kombination verschiedener KI-Modelle zum Einsatz: Kling, ElevenLabs, Higgsfield, Mirage, Google Nano Banana, Sync und Veed Lipsync.";

                                    const link = isDigen ? "https://digen.ai/" : "https://www.tasy.ai/";

                                    return (
                                        <>
                                            <p className={styles.aiHeadline}>{headline}</p>
                                            <p className={styles.aiText}>{text}</p>
                                            <a className={styles.aiLink} href={link} target="_blank" rel="noopener noreferrer" >
                                                <img src="/src/assets/icons/link.svg" alt="Link zur Website" />
                                                Zur Website
                                            </a>
                                        </>
                                    );
                                })()}
                            </div>
                        )}

                        {!answer && (
                            <>
                                <p className={styles.subheading}>Stimme selbst ab:</p>
                                <div className={styles.btnContainer}>
                                    <button
                                        className={styles.voteBtn}
                                        onClick={() => handleAnswer('real')}
                                    >
                                        <img src="/src/assets/icons/real.svg" alt="Echtes Video" />
                                        <span className={styles.voteBtnEllipsis}>Echtes Video</span>
                                    </button>

                                    <button
                                        className={styles.voteBtn}
                                        onClick={() => handleAnswer('ai')}
                                    >
                                        <img src="/src/assets/icons/ai.svg" alt="KI-generiertes Video" />
                                        <span className={styles.voteBtnEllipsis}>KI-generiertes Video</span>
                                    </button>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </>
        );
    }

    // IDs 17–18
    if (questionId >= 17 && questionId <= 18) {
        pageContent = (
            <div className={styles.layoutSettingsQuestion}>
                <p className={`${styles.headline} ${styles.settingsMargin}`}>{resultData.question}</p>
                <p className={`${styles.text} ${styles.settingsMargin}`}>Entscheide selbst, wie du auf diese Frage antworten würdest. Du kannst auch direkt die Ergebnisse der Befragung aufdecken.</p>

                <div className={`${styles.answerSection} ${styles.settingsAnswerSection}`}>
                    {!answer && (
                        <div className={`${styles.answerHidden} ${styles.settingsAnswerHidden}`}>
                            <button
                                className={`${styles.revealBtn} ${styles.settingsRevealBtn}`}
                                onClick={() => handleAnswer('Keine Angabe')}
                            >
                                <img src="/src/assets/icons/reveal.svg" alt="Ergebnisse direkt aufdecken" />
                                Direkt aufdecken
                            </button>
                        </div>
                    )}
                    <div className={styles.onlineResults}>
                        <p className={styles.onlineResultsHeadline}>Ergebnis der Online‑Befragung:</p>
                        <div className={styles.scale}>
                            <div className={styles.scaleAxis}>
                                {[...Array(7)].map((_, i) => {
                                    const num = i + 1;
                                    return (
                                        <div
                                            key={num}
                                            className={`${styles.scaleTick} ${Number(answer) === num ? styles.scaleActive : ''}`}
                                        />
                                    );
                                })}
                            </div>
                            {answer && (
                                <>
                                    <div className={styles.scaleBar}>
                                        <div className={styles.scaleBarEnd}></div>
                                        <div className={styles.scaleBarEnd}></div>
                                    </div>
                                    <div className={styles.scaleMean}></div>
                                </>
                            )}
                        </div>
                        <div className={styles.scaleNumbers}>
                            {[...Array(7)].map((_, i) => (
                                <div key={i} className={styles.scaleNumberBox}>
                                    <p className={styles.scaleNumber}>{i + 1}</p>
                                </div>
                            ))}
                        </div>
                        <div className={styles.scaleLabels}>
                            <p className={styles.text}>{resultData.minLabel}</p>
                            <p className={styles.text}>{resultData.maxLabel}</p>
                        </div>
                    </div>

                    <p>
                        <span className={styles.resultLabel}>Mittelwert: </span>
                        {answer && <span className={styles.resultValue}>{formatNumberDE(resultData.meanValue)}</span>}
                    </p>
                    <p>
                        <span className={styles.resultLabel}>Standardabweichung: </span>
                        {answer && <span className={styles.resultValue}>{formatNumberDE(resultData.standardDeviation)}</span>}
                    </p>
                    <p>
                        <span className={styles.resultLabel}>Deine Antwort: </span>
                        {answer && <span className={styles.resultValue}>{answer}</span>}
                    </p>
                </div>

                {!answer && (
                    <>
                        <p className={`${styles.subheading} ${styles.settingsMargin}`}>Stimme selbst ab:</p>
                        <div className={styles.settingsVote}>
                            <div className={styles.settingsBtnContainer}>
                                {[...Array(7)].map((_, i) => {
                                    const num = i + 1;
                                    return (
                                        <button
                                            key={num}
                                            className={styles.settingsLickertBtn}
                                            onClick={() => handleAnswer(num)}
                                        >
                                            {num}
                                        </button>
                                    );
                                })}

                            </div>
                            <div className={`${styles.settingsMargin} ${styles.settingsLabels}`}>
                                <p className={styles.text}>{resultData.minLabel}</p>
                                <p className={styles.text}>{resultData.maxLabel}</p>
                            </div>
                        </div>
                    </>
                )}

            </div>
        );
    }

    // ID 19
    if (questionId === 19) {
        const quotes = resultData.quotes || [];

        const showMore = () => {
            setVisibleQuotes((prev) => Math.min(prev + 5, quotes.length));
        };

        pageContent = (
            <div className={styles.layoutSettingsQuestion}>
                <p className={`${styles.headline} ${styles.settingsMargin}`}>Beeinflussen KI-generierte Videos Ihre Kaufentscheidung?</p>
                <p className={`${styles.text} ${styles.settingsMargin}`}>Entscheide selbst, wie du auf diese Frage antworten würdest. Du kannst auch direkt die Ergebnisse der Befragung aufdecken.</p>

                <div className={`${styles.answerSection} ${styles.settingsAnswerSection}`}>
                    {!answer && (
                        <div className={`${styles.answerHidden} ${styles.settingsAnswerHidden}`}>
                            <button
                                className={`${styles.revealBtn} ${styles.settingsRevealBtn}`}
                                onClick={() => handleAnswer('-')}
                            >
                                <img src="/src/assets/icons/reveal.svg" alt="Ergebnisse direkt aufdecken" />
                                Direkt aufdecken
                            </button>
                        </div>
                    )}
                    <div className={styles.onlineResults}>
                        <p className={styles.onlineResultsHeadline}>Ergebnis der Online‑Befragung:</p>
                        <div className={`${styles.barContainer} ${answer === 'yes' ? styles.barActive : ''}`}>
                            <span className={styles.barLabel}>Ja</span>
                            <span className={styles.barPercentage}>{answer ? resultData.yesPercentage : 0}%</span>
                            {answer && <div className={styles.bar} style={{ 'width': `${resultData.yesPercentage}%` }}></div>}
                        </div>

                        <div className={`${styles.barContainer} ${answer === 'no' ? styles.barActive : ''}`}>
                            <span className={styles.barLabel}>Nein</span>
                            <span className={styles.barPercentage}>{answer ? resultData.noPercentage : 0}%</span>
                            {answer && <div className={styles.bar} style={{ 'width': `${resultData.noPercentage}%` }}></div>}
                        </div>
                    </div>

                    <p>
                        <span className={styles.resultLabel}>Deine Antwort: </span>
                        {answer && <span className={styles.resultValue}>{translate(answer)}</span>}
                    </p>

                    {answer && (
                        <div className={styles.freeTextResponsesContainer}>
                            <p className={styles.onlineResultsHeadline}>Begründungen bei Antwort "Ja":</p>
                            <div className={styles.freeTextResponses}>
                                {quotes.slice(0, visibleQuotes).map((quote, index) => (
                                    <div key={index} className={styles.quoteBox}>
                                        <p className={styles.quoteText}>{quote}</p>
                                    </div>
                                ))}
                                {visibleQuotes < quotes.length && (
                                    <button className={styles.showMoreBtn} onClick={showMore}>
                                        <img src="/src/assets/icons/more.svg" alt="Mehr Begründungen anzeigen" />
                                        Mehr anzeigen
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {!answer && (
                    <>
                        <p className={`${styles.subheading} ${styles.settingsMargin}`}>Stimme selbst ab:</p>
                        <div className={`${styles.btnContainer} ${styles.binaryBtnContainer}`}>
                            <button
                                className={styles.voteBtn}
                                onClick={() => handleAnswer('yes')}
                            >
                                <img src="/src/assets/icons/yes.svg" alt="Antwort Ja" />
                                Ja
                            </button>

                            <button
                                className={styles.voteBtn}
                                onClick={() => handleAnswer('no')}
                            >
                                <img src="/src/assets/icons/no.svg" alt="Antwort Nein" />
                                Nein
                            </button>
                        </div>
                    </>
                )}

            </div>
        );
    }


    return (
        <>
            <div className={`${styles.container} ${questionId < 17 ? styles.containerVideo : ''}`}>
                {pageContent}
            </div>

            <div className={`${styles.bottomNavbar} ${questionId < 17 ? styles.bottomNavbarVideo : ''}`}>
                <NavLink
                    to={questionId > 0 ? `/questionnaire/${questionId - 1}` : '/method'}
                    title="Zurück"
                    className={styles.bottomNavbarItem}
                >
                    <span className={styles.bottomNavbarItemBox}>
                        <img src="/src/assets/icons/previous-page.svg" alt="Vorherige Seite" />
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
                        <img src="/src/assets/icons/next-page.svg" alt="Nächste Seite" />
                    </span>
                </NavLink>
            </div>
        </>
    );
}

export default QuestionnairePage;
