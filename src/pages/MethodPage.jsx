import { NavLink } from 'react-router-dom';
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import data from '/src/assets/data/timeline.json';
import styles from './MethodPage.module.css';

function MethodPage() {

    const [modalOpen, setModalOpen] = useState(false);

    const [selectedStepId, setSelectedStepId] = useState(1);

    const [selectedTopStepId, setSelectedTopStepId] = useState(1);
    const [selectedTopVisible, setSelectedTopVisible] = useState(true);

    const [selectedMiddleStepId, setSelectedMiddleStepId] = useState(1);
    const [selectedMiddleVisible, setSelectedMiddleVisible] = useState(false);

    const [selectedBottomStepId, setSelectedBottomStepId] = useState(1);
    const [selectedBottomVisible, setSelectedBottomVisible] = useState(false);

    const containerRef = useRef(null);
    const contentRef = useRef(null);

    const middleContainerRef = useRef(null);
    const middleLargeContentRef = useRef(null);
    const middleArrowRef = useRef(null);

    const bottomContainerRef = useRef(null);
    const bottomLargeContentRef = useRef(null);
    const bottomArrowRef = useRef(null);

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

        const updatePosition = () => {
            // Höhe angleichen
            const sidebarHeight = sidebar.offsetHeight;
            const contentContainer = document.querySelector(`.${styles.timelineMediumContent}`);
            if (!contentContainer) return;
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
        };

        updatePosition();
        window.addEventListener("resize", updatePosition);

        return () => {
            window.removeEventListener("resize", updatePosition);
        };
    }, [selectedStepId]);


    useLayoutEffect(() => {
        const middleContainer = middleContainerRef.current;
        const arrow = middleArrowRef.current;

        if (selectedMiddleStepId < 2 || selectedMiddleStepId > 5) {
            if (middleContainer) {
                middleContainer.style.marginLeft = "";
                middleContainer.style.transformOrigin = "";
            }
            if (arrow) {
                arrow.style.marginLeft = "";
            }
            return;
        }

        const updateMiddlePosition = () => {
            const largeContent = middleLargeContentRef.current;
            const activeButton = document.querySelector(
                `.${styles.timelineLargeHorizontalContent} .${styles.timelineItemSelected}`
            );

            if (!middleContainer || !largeContent || !activeButton || !arrow) return;

            const largeRect = largeContent.getBoundingClientRect();
            const buttonRect = activeButton.getBoundingClientRect();

            const buttonLeft = buttonRect.left;
            const buttonCenter = buttonLeft + buttonRect.width / 2;
            const largeLeft = largeRect.left;
            const containerWidth = middleContainer.offsetWidth;

            const newMarginLeft = buttonCenter - largeLeft - containerWidth / 2;
            const boundedMarginLeft = Math.min(
                Math.max(newMarginLeft, 0),
                largeRect.width - containerWidth - 26
            );

            middleContainer.style.marginLeft = `${boundedMarginLeft}px`;

            const arrowMarginLeft = buttonLeft - largeLeft - boundedMarginLeft + (buttonRect.width / 2) - 16 - 8 - 1.5; //16px padding, 8px Arrow half width, 1.5px border
            arrow.style.marginLeft = `${arrowMarginLeft}px`;

            const arrowCenterX = arrowMarginLeft + arrow.offsetWidth / 2;
            middleContainer.style.transformOrigin = `${arrowCenterX}px top`;
        };

        updateMiddlePosition();
        window.addEventListener('resize', updateMiddlePosition);

        return () => {
            window.removeEventListener('resize', updateMiddlePosition);
        };
    }, [selectedMiddleStepId]);


    useLayoutEffect(() => {
        const bottomContainer = bottomContainerRef.current;
        const arrow = bottomArrowRef.current;

        if (selectedBottomStepId < 7 || selectedBottomStepId > 9) {
            if (bottomContainer) {
                bottomContainer.style.marginLeft = "";
                bottomContainer.style.transformOrigin = "";
            }
            if (arrow) {
                arrow.style.marginLeft = "";
            }
            return;
        }

        const updateBottomPosition = () => {
            const largeContent = bottomLargeContentRef.current;
            const activeButton = document.querySelector(
                `.${styles.timelineLargeHorizontalContent}:nth-of-type(2) .${styles.timelineItemSelected}`
            );

            if (!bottomContainer || !largeContent || !activeButton || !arrow) return;

            const largeRect = largeContent.getBoundingClientRect();
            const buttonRect = activeButton.getBoundingClientRect();

            const buttonLeft = buttonRect.left;
            const buttonCenter = buttonLeft + buttonRect.width / 2;
            const largeLeft = largeRect.left;
            const containerWidth = bottomContainer.offsetWidth;

            let newMarginLeft = buttonCenter - largeLeft - containerWidth / 2;
            newMarginLeft = Math.min(
                Math.max(newMarginLeft, 0),
                largeRect.width - containerWidth
            );

            bottomContainer.style.marginLeft = `${newMarginLeft}px`;

            const arrowMarginLeft = buttonLeft - largeLeft - newMarginLeft + (buttonRect.width / 2) - 16 - 8 - 1.5; //16px padding, 8px Arrow half width, 1.5px border
            arrow.style.marginLeft = `${arrowMarginLeft}px`;

            const arrowCenterX = arrowMarginLeft + arrow.offsetWidth / 2;
            bottomContainer.style.transformOrigin = `${arrowCenterX}px top`;
        };

        updateBottomPosition();
        window.addEventListener("resize", updateBottomPosition);

        return () => window.removeEventListener("resize", updateBottomPosition);
    }, [selectedBottomStepId]);


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


    function handleTimelineSelect(stepId, openModal = false) {
        setSelectedStepId(stepId);

        if (openModal) setModalOpen(true);

        if (stepId === 1) {
            setSelectedTopStepId(1);
            setSelectedTopVisible(true);
            setSelectedMiddleVisible(false);
            setSelectedBottomVisible(false);
        } else if (stepId >= 2 && stepId <= 6) {
            setSelectedMiddleStepId(stepId);
            setSelectedTopVisible(false);
            setSelectedMiddleVisible(true);
            setSelectedBottomVisible(false);
        } else if (stepId >= 7) {
            setSelectedBottomStepId(stepId);
            setSelectedTopVisible(false);
            setSelectedMiddleVisible(false);
            setSelectedBottomVisible(true);
        }
    }


    const selectedStep = data.find((step) => step.id === selectedStepId);


    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div className={styles.description}>
                        <p className={styles.headline}>Ablauf der Studie</p>
                        <p className={`${styles.text} ${styles.textMobile}`}>Tippe auf einen der Punkte, um mehr zu erfahren.</p>
                        <p className={`${styles.text} ${styles.textDesktop}`}>Hovere über einen der Punkte, um mehr zu erfahren.</p>
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
                                onClick={() => handleTimelineSelect(step.id, true)}
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
                                    onClick={() => handleTimelineSelect(step.id)}
                                    onMouseOver={() => handleTimelineSelect(step.id)}
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

                    <div className={styles.timelineLarge}>
                        <div className={styles.pointContainer}>
                            <div className={styles.point}></div>
                            <p className={styles.pointTitle}>Start der Studie</p>
                        </div>

                        <div className={styles.timelineLargeVerticalContent}>
                            <div className={styles.timelineLargeVerticalContentSidebar}>
                                <button
                                    className={`${styles.timelineItem} ${(selectedTopStepId === 1 && selectedTopVisible) ? styles.timelineItemSelected : ''}`}
                                    title={data[0].title}
                                    onClick={() => {
                                        setSelectedStepId(1);
                                        setSelectedTopStepId(1);
                                        setSelectedTopVisible(true);
                                        setSelectedMiddleVisible(false);
                                        setSelectedBottomVisible(false);
                                    }}
                                    onMouseOver={() => {
                                        setSelectedStepId(1);
                                        setSelectedTopStepId(1);
                                        setSelectedTopVisible(true);
                                        setSelectedMiddleVisible(false);
                                        setSelectedBottomVisible(false);
                                    }}
                                >
                                    <img src={`/src/assets/icons/timeline-1.svg`} alt={data[0].title} />
                                </button>
                                <div className={styles.timelineBar}></div>
                            </div>

                            <div className={styles.timelineLargeContent}>
                                <div className={`${styles.timelineLargeContentContainer} ${selectedTopVisible ? styles.timelineLargeContentContainerVisible : ""}`}>
                                    <div className={`${styles.timelineLargeContentArrow} ${styles.timelineLargeContentArrowLeft}`}></div>
                                    <p className={styles.timelineLargeContentHeadline}>Schritt {selectedTopStepId}: {data[selectedTopStepId - 1].title}</p>
                                    <div className={styles.timelineLargeContentSpacer}></div>
                                    <div
                                        className={styles.timelineLargeContentText}
                                        dangerouslySetInnerHTML={{ __html: parseMarkdown(data[selectedTopStepId - 1].content) }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.timelineLargeHorizontalContentBlock}>
                            <div className={`${styles.timelineCornerContainer} ${styles.timelineCornerContainerTopRight}`}>
                                <div className={styles.timelineCornerTopRight}></div>
                            </div>

                            <div className={styles.timelineLargeHorizontalContent}>
                                <div></div>
                                {data
                                    .filter(step => step.id >= 2 && step.id <= 5)
                                    .map(step => (
                                        <button
                                            key={step.id}
                                            className={`${styles.timelineItem} ${(selectedMiddleStepId === step.id && selectedMiddleVisible) ? styles.timelineItemSelected : ''
                                                }`}
                                            title={step.title}
                                            onClick={() => {
                                                setSelectedStepId(step.id);
                                                setSelectedMiddleStepId(step.id);
                                                setSelectedTopVisible(false);
                                                setSelectedMiddleVisible(true);
                                                setSelectedBottomVisible(false);
                                            }}
                                            onMouseOver={() => {
                                                setSelectedStepId(step.id);
                                                setSelectedMiddleStepId(step.id);
                                                setSelectedTopVisible(false);
                                                setSelectedMiddleVisible(true);
                                                setSelectedBottomVisible(false);
                                            }}
                                        >
                                            <img src={`/src/assets/icons/timeline-${step.id}.svg`} alt={step.title} />
                                        </button>
                                    ))}
                                <div></div>
                                <div className={styles.timelineBarHorizontal}></div>
                            </div>

                            <div className={`${styles.timelineCornerContainer} ${styles.timelineCornerContainerBottomLeft}`}>
                                <div className={styles.timelineCornerBottomLeft}></div>
                            </div>
                        </div>

                        <div className={styles.timelineLargeVerticalContent}>
                            <div ref={middleLargeContentRef} className={styles.timelineLargeContent}>
                                <div ref={middleContainerRef} className={`${styles.timelineLargeContentContainer} ${styles.timelineLargeContentMiddleContainer} ${selectedMiddleVisible ? styles.timelineLargeContentContainerVisible : ""} ${(selectedMiddleStepId === 6) ? styles.timelineLargeContentContainerRight : styles.timelineLargeContentContainerTop}`}>
                                    <div ref={middleArrowRef} className={`${styles.timelineLargeContentArrow} ${(selectedMiddleStepId === 6) ? styles.timelineLargeContentArrowRight : styles.timelineLargeContentArrowTop}`}></div>
                                    <p className={styles.timelineLargeContentHeadline}>Schritt {selectedMiddleStepId}: {data[selectedMiddleStepId - 1].title}</p>
                                    <div className={styles.timelineLargeContentSpacer}></div>
                                    <div
                                        className={styles.timelineLargeContentText}
                                        dangerouslySetInnerHTML={{ __html: parseMarkdown(data[selectedMiddleStepId - 1].content) }}
                                    ></div>
                                </div>
                            </div>

                            <div className={styles.timelineLargeVerticalContentSidebar}>
                                <button
                                    className={`${styles.timelineItem} ${(selectedMiddleStepId === 6 && selectedMiddleVisible) ? styles.timelineItemSelected : ''}`}
                                    title={data[5].title}
                                    onClick={() => {
                                        setSelectedStepId(6);
                                        setSelectedMiddleStepId(6);
                                        setSelectedTopVisible(false);
                                        setSelectedMiddleVisible(true);
                                        setSelectedBottomVisible(false);
                                    }}
                                    onMouseOver={() => {
                                        setSelectedStepId(6);
                                        setSelectedMiddleStepId(6);
                                        setSelectedTopVisible(false);
                                        setSelectedMiddleVisible(true);
                                        setSelectedBottomVisible(false);
                                    }}
                                >
                                    <img src={`/src/assets/icons/timeline-6.svg`} alt={data[5].title} />
                                </button>
                                <div className={styles.timelineBar}></div>
                            </div>
                        </div>

                        <div className={styles.timelineLargeHorizontalContentBlock}>
                            <div className={styles.timelineCornerContainer}></div>

                            <div className={styles.timelineLargeHorizontalContent}>
                                <div></div>
                                <div className={styles.timelineLargePointContainer}>
                                    <p className={styles.pointTitle}>Ende der Studie</p>
                                    <div className={styles.point}></div>
                                </div>
                                {data
                                    .filter(step => step.id >= 7 && step.id <= 9)
                                    .slice()
                                    .reverse()
                                    .map(step => (
                                        <button
                                            key={step.id}
                                            className={`${styles.timelineItem} ${(selectedBottomStepId === step.id && selectedBottomVisible) ? styles.timelineItemSelected : ''
                                                }`}
                                            title={step.title}
                                            onClick={() => {
                                                setSelectedStepId(step.id);
                                                setSelectedBottomStepId(step.id);
                                                setSelectedTopVisible(false);
                                                setSelectedMiddleVisible(false);
                                                setSelectedBottomVisible(true);
                                            }}
                                            onMouseOver={() => {
                                                setSelectedStepId(step.id);
                                                setSelectedBottomStepId(step.id);
                                                setSelectedTopVisible(false);
                                                setSelectedMiddleVisible(false);
                                                setSelectedBottomVisible(true);
                                            }}
                                        >
                                            <img
                                                src={`/src/assets/icons/timeline-${step.id}.svg`}
                                                alt={step.title}
                                            />
                                        </button>
                                    ))}

                                <div></div>
                                <div className={styles.timelineBarHorizontalShort}></div>
                            </div>

                            <div className={`${styles.timelineCornerContainer} ${styles.timelineCornerContainerTopLeft}`}>
                                <div className={styles.timelineCornerTopLeft}></div>
                            </div>
                        </div>

                        <div className={styles.timelineLargeVerticalContent}>
                            <div ref={bottomLargeContentRef} className={styles.timelineLargeContent}>
                                <div ref={bottomContainerRef} className={`${styles.timelineLargeContentContainer} ${styles.timelineLargeContentBottomContainer} ${selectedBottomVisible ? styles.timelineLargeContentContainerVisible : ""} ${styles.timelineLargeContentContainerTop}`}>
                                    <div ref={bottomArrowRef} className={`${styles.timelineLargeContentArrow} ${styles.timelineLargeContentArrowTop}`}></div>
                                    <p className={styles.timelineLargeContentHeadline}>Schritt {selectedBottomStepId}: {data[selectedBottomStepId - 1].title}</p>
                                    <div className={styles.timelineLargeContentSpacer}></div>
                                    <div
                                        className={styles.timelineLargeContentText}
                                        dangerouslySetInnerHTML={{ __html: parseMarkdown(data[selectedBottomStepId - 1].content) }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                    </div>
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
                        <img src="/src/assets/icons/previous-page.svg" alt="Vorherige Seite" />
                        <span className={styles.linkTitle}>Zurück</span>
                    </span>
                </NavLink>
                <NavLink
                    to="/questionnaire/0"
                    end
                    title="Fragebogen"
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

export default MethodPage;