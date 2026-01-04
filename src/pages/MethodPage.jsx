import { NavLink } from 'react-router-dom';
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import data from '/src/assets/data/timeline.json';
import styles from './MethodPage.module.css';

function MethodPage() {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedStepId, setSelectedStepId] = useState(1);

    const containerRef = useRef(null);
    const contentRef = useRef(null);


    useEffect(() => {
        const handleResize = () => {
            if (modalOpen) setModalOpen(false);
        };

        if (modalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        window.addEventListener('resize', handleResize);
        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('resize', handleResize);
        };
    }, [modalOpen]);


    // Position aktualisieren, wenn sich der ausgewählte Step ändert
    useLayoutEffect(() => {
        const sidebar = document.querySelector(`.${styles.timelineMediumSidebar}`);
        const content = contentRef.current;
        if (!sidebar || !content) return;

        // Höhe angleichen
        const sidebarHeight = sidebar.offsetHeight;
        const contentContainer = document.querySelector(`.${styles.timelineMediumContent}`);
        contentContainer.style.height = `${sidebarHeight - 102}px`;

        // Button finden und Blase positionieren
        const activeButton = sidebar.querySelector(`.${styles.timelineItemSelected}`);
        if (!activeButton) return;

        const sidebarRect = sidebar.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();

        const bubbleHeight = content.offsetHeight;
        const buttonMidY = buttonRect.top + buttonRect.height / 2 - sidebarRect.top;

        const minTop = 0;
        const maxTop = sidebarHeight - 102 - bubbleHeight;
        let newTop = buttonMidY - bubbleHeight / 2;

        newTop = Math.min(Math.max(newTop, minTop), maxTop);

        content.style.top = `${newTop}px`;

        // Pfeil-Position korrigieren
        const arrow = content.querySelector(`.${styles.timelineMediumContentArrow}`);
        if (!arrow) return;

        const bubbleRect = content.getBoundingClientRect();
        const buttonCenterInBubble = buttonRect.top + buttonRect.height / 2 - bubbleRect.top;
        const arrowHeight = arrow.offsetHeight;

        const visualOffset = -9;

        let newArrowTop = buttonCenterInBubble + visualOffset;

        const minArrowTop = arrowHeight / 2;
        const maxArrowTop = content.offsetHeight - arrowHeight / 2;
        newArrowTop = Math.min(Math.max(newArrowTop, minArrowTop), maxArrowTop);

        arrow.style.top = `${newArrowTop}px`;
    }, [selectedStepId]);


    function parseMarkdown(text) {
        if (!text) return "";

        // Sicherheitsmaßnahmen und Basisformatierungen
        let html = text
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/^### (.*$)/gim, "<h3>$1</h3>")
            .replace(/^## (.*$)/gim, "<h2>$1</h2>")
            .replace(/^# (.*$)/gim, "<h1>$1</h1>")
            .replace(
                /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
                '<a href="$2" target="_blank" rel="noopener noreferrer"><img src="/src/assets/icons/link.svg" alt="(externer Link)" /> $1</a>'
            );

        // Nummerierte Listen
        html = html.replace(
            /(^|\n)(\d+\.\s+.*(?:\n\d+\.\s+.*)*)/g,
            (_, lineStart, items) => {
                const lis = items
                    .split(/\n/)
                    .map(l => l.trim())
                    .filter(l => /^\d+\./.test(l))
                    .map(l => `<li>${l.replace(/^\d+\.\s+/, "")}</li>`)
                    .join("");
                return `${lineStart}<ol>${lis}</ol>`;
            }
        );

        // Unnummerierte Listen (- oder *)
        html = html.replace(
            /(^|\n)([*-]\s+.*(?:\n[*-]\s+.*)*)/g,
            (_, lineStart, items) => {
                const lis = items
                    .split(/\n/)
                    .map(l => l.trim())
                    .filter(l => /^[-*]\s+/.test(l))
                    .map(l => `<li>${l.replace(/^[-*]\s+/, "")}</li>`)
                    .join("");
                return `${lineStart}<ul>${lis}</ul>`;
            }
        );

        // Zeilenumbrüche
        html = html.replace(/\\n/g, "<br>").replace(/\n/g, "<br>");
        return html;
    }

    const selectedStep = data.find((step) => step.id === selectedStepId);


    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div className={styles.description}>
                        <p className={styles.headline}>Ablauf der Studie</p>
                        <p className={styles.text}>Klicke auf einen der Punkte, um mehr zu erfahren.</p>
                    </div>

                    <div className={styles.timelineSmall}>
                        <div className={styles.pointContainer}>
                            <p className={styles.pointTitle}>Start der Studie</p>
                            <div className={styles.point}></div>
                        </div>

                        {data.map((step) => (
                            <button
                                key={step.id}
                                className={styles.timelineItem}
                                title={step.title}
                                onClick={() => {
                                    setSelectedStepId(step.id);
                                    setModalOpen(true);
                                }}
                            >
                                <img src={`/src/assets/icons/timeline-${step.id}.svg`} alt={step.title} />
                            </button>
                        ))}

                        <div className={styles.pointContainer}>
                            <div className={styles.point}></div>
                            <p className={styles.pointTitle}>Ende der Studie</p>
                        </div>

                        <div className={styles.timelineBar}></div>
                    </div>

                    {modalOpen && selectedStep && (
                        <>
                            <div className={styles.timelineSmallModalWrapper}>
                                <div className={styles.timelineSmallModal}>
                                    <div className={styles.timelineSmallModalAppbar}>
                                        <p>Schritt {selectedStep.id}:</p>
                                        <button onClick={() => setModalOpen(false)}>
                                            <img src="/src/assets/icons/close.svg" alt="Fenster schließen" />
                                        </button>
                                    </div>
                                    <div className={styles.timelineSmallModalContent}>
                                        <p className={styles.timelineSmallModalHeadline}>{selectedStep.title}</p>
                                        <div className={styles.timelineSmallModalSpacer}></div>
                                        <div
                                            className={styles.timelineSmallModalText}
                                            dangerouslySetInnerHTML={{ __html: parseMarkdown(selectedStep.content) }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.overlay} onClick={() => setModalOpen(false)}></div>
                        </>
                    )}

                    <div className={styles.timelineMedium}>
                        <div className={styles.timelineMediumSidebar}>
                            <div className={styles.pointContainer}>
                                <p className={styles.pointTitle}>Start der Studie</p>
                                <div className={styles.point}></div>
                            </div>

                            {data.map((step) => (
                                <button
                                    key={step.id}
                                    className={`${styles.timelineItem} ${selectedStepId === step.id ? styles.timelineItemSelected : ''}`}
                                    title={step.title}
                                    onClick={() => { setSelectedStepId(step.id); }}
                                    onMouseOver={() => { setSelectedStepId(step.id); }}
                                >
                                    <img src={`/src/assets/icons/timeline-${step.id}.svg`} alt={step.title} />
                                </button>
                            ))}

                            <div className={styles.pointContainer}>
                                <div className={styles.point}></div>
                                <p className={styles.pointTitle}>Ende der Studie</p>
                            </div>

                            <div className={styles.timelineBar}></div>
                        </div>
                        <div className={styles.timelineMediumContent} ref={containerRef}>
                            <div className={styles.timelineMediumContentContainer} ref={contentRef}>
                                <div className={styles.timelineMediumContentArrow}></div>
                                <p className={styles.timelineMediumContentHeadline}>Schritt {selectedStep.id}: {selectedStep.title}</p>
                                <div className={styles.timelineMediumContentSpacer}></div>
                                <div
                                    className={styles.timelineMediumContentText}
                                    dangerouslySetInnerHTML={{ __html: parseMarkdown(selectedStep.content) }}
                                ></div>
                            </div>
                        </div>
                    </div>


                    {/* timelinecorner */}

                </div>
            </div>

            <div className={styles.bottomNavbar}>
                <NavLink
                    to="/"
                    end
                    title="Forschungsfrage & Zielsetzung"
                    className={styles.bottomNavbarItem}
                >
                    <span className={styles.bottomNavbarItemBox}>
                        <img src="/src/assets/icons/previous-page.svg" alt="" />
                        <span className={styles.linkTitle}>Zurück</span>
                    </span>
                </NavLink>
                <NavLink
                    to="/questionnaire/1"
                    end
                    title="Fragebogen"
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

export default MethodPage;;