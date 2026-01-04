import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import data from '/src/assets/data/timeline.json';
import styles from './MethodPage.module.css';

function MethodPage() {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedStepId, setSelectedStepId] = useState(null);


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