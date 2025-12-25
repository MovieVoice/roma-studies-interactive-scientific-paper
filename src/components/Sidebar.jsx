import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

const LG_QUERY = '(min-width: 992px)';

function Sidebar() {
    const location = useLocation();
    const isInQuestionnaire = location.pathname.startsWith("/questionnaire");
    const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(isInQuestionnaire);

    const initialIsDesktop = typeof window !== 'undefined'
        ? window.matchMedia(LG_QUERY).matches
        : true;

    const [isDesktop, setIsDesktop] = useState(initialIsDesktop);
    const [open, setOpen] = useState(initialIsDesktop ? true : false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mql = window.matchMedia(LG_QUERY);
        const handler = (e) => setIsDesktop(e.matches);

        if (mql.addEventListener) mql.addEventListener('change', handler);

        setIsDesktop(mql.matches);

        return () => {
            if (mql.removeEventListener) mql.removeEventListener('change', handler);
        };
    }, []);

    useEffect(() => {
        if (isInQuestionnaire && !isQuestionnaireOpen) {
            setIsQuestionnaireOpen(true);
        }
        if (!isInQuestionnaire) {
            setIsQuestionnaireOpen(false);
        }
    }, [location.pathname]);

    useEffect(() => {
        if (isDesktop) {
            setOpen(true);
        }
    }, [isDesktop]);

    const handleToggle = () => {
        if (isDesktop) return;
        setOpen(o => o ? false : true);
    };

    function handleNavigate() {
        if (!isDesktop) setOpen(false);
    }

    return (
        <>
            <button
                type="button"
                className={`${styles.toggleSidebar} ${open ? styles.isOpen : ''} ${isDesktop ? styles.hideToggle : ''}`}
                aria-expanded={open}
                aria-controls="app-sidebar"
                onClick={handleToggle}
            >
                <img src="/src/assets/sidebar-open.svg" alt="Sidebar öffnen" className={styles.iconOpen} />
                <img src="/src/assets/sidebar-close.svg" alt="Sidebar schließen" className={styles.iconClose} />
            </button>

            {open && !isDesktop && (
                <div className={styles.overlay} aria-hidden="true" onClick={() => { setOpen(false); }} />
            )}

            <aside
                id="app-sidebar"
                className={[
                    styles.sidebar,
                    open ? styles.open : '',
                    isDesktop ? styles.desktop : '',
                ].join(' ')}
                aria-hidden={!open && !isDesktop}
            >

                <nav className={styles.nav}>
                    <NavLink
                        to="/"
                        end
                        className={`${styles.logoContainer} ${styles.link}`}
                        onClick={() => !isDesktop && setOpen(false)}
                        title="Zur Hauptseite"
                    >
                        <img src="/src/assets/logo-big.svg" alt="RoMa Studies" className={styles.logo} />
                    </NavLink>

                    <div className={styles.links}>
                        <p className={styles.navTitle}>Navigation</p>
                        <NavLink
                            to="/"
                            end
                            title="Forschungsfrage & Zielsetzung"
                            className={({ isActive }) =>
                                isActive
                                    ? `${styles.navLink} ${styles.navLinkActive}`
                                    : `${styles.navLink}`
                            }
                            onClick={() => !isDesktop && setOpen(false)}
                        >
                            {({ isActive }) => (
                                <span className={styles.linkTitleBox}>
                                    <img
                                        src={isActive ? "/src/assets/nav-1-active.svg" : "/src/assets/nav-1.svg"}
                                        alt=""
                                    />
                                    <span className={styles.linkTitle}>Forschungsfrage & Zielsetzung</span>
                                </span>
                            )}
                        </NavLink>

                        <NavLink
                            to="/method"
                            end
                            title="Methodik"
                            className={({ isActive }) =>
                                isActive
                                    ? `${styles.navLink} ${styles.navLinkActive}`
                                    : `${styles.navLink}`
                            }
                            onClick={() => !isDesktop && setOpen(false)}
                        >
                            {({ isActive }) => (
                                <span className={styles.linkTitleBox}>
                                    <img
                                        className={styles.linkIcon}
                                        src={isActive ? "/src/assets/nav-2-active.svg" : "/src/assets/nav-2.svg"}
                                        alt=""
                                    />
                                    <span className={styles.linkTitle}>Methodik</span>
                                </span>
                            )}
                        </NavLink>

                        <NavLink
                            to="/questionnaire/"
                            title="Fragebogen"
                            className={({ isActive }) =>
                                [
                                    styles.navLink,
                                    isActive && styles.navLinkActive,
                                    isQuestionnaireOpen && styles.navLinkQuestionnaire,
                                ]
                                    .filter(Boolean)
                                    .join(" ")
                            }
                            onClick={() => !isDesktop && setOpen(false)}
                        >
                            {({ isActive }) => (
                                <span className={styles.navLinkQuestionnaireContainer}>
                                    <span className={styles.linkTitleBox}>
                                        <img
                                            className={styles.linkIcon}
                                            src={isActive ? "/src/assets/nav-3-active.svg" : "/src/assets/nav-3.svg"}
                                            alt=""
                                        />
                                        <span className={styles.linkTitle}>Fragebogen</span>
                                    </span>
                                    {isActive && (
                                        <button
                                            className={styles.navLinkQuestionaireToggleButton}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setIsQuestionnaireOpen(v => !v);
                                            }}
                                        >
                                            <img
                                                src="/src/assets/arrow-down.svg"
                                                alt=""
                                                style={{
                                                    transform: isQuestionnaireOpen ? "rotate(0deg)" : "rotate(180deg)",
                                                }}
                                            />
                                        </button>
                                    )}
                                </span>
                            )}
                        </NavLink>
                        {isInQuestionnaire && isQuestionnaireOpen && (
                            <>
                                <div className={styles.spacerContainer}>
                                    <div className={styles.spacer}></div>
                                </div>
                                <div className={styles.submenu}>
                                    {[...Array(16)].map((_, i) => (
                                        <NavLink
                                            key={i}
                                            to={`/questionnaire/${i + 1}`}
                                            className={styles.sub}
                                            onClick={() => !isDesktop && setOpen(false)}
                                        >
                                            {({ isActive }) => (
                                                <span className={styles.subLinkBox}>
                                                    {isActive ? <img className={styles.subIcon} src="/src/assets/arrow-right.svg" alt="" /> : <div className={styles.subIconPlaceholder} />}
                                                    <span className={styles.linkTitle}>Video #{i + 1}</span>
                                                </span>
                                            )}
                                        </NavLink>
                                    ))}
                                    {[...Array(3)].map((_, i) => (
                                        <NavLink
                                            key={i + 16}
                                            to={`/questionnaire/${i + 17}`}
                                            className={styles.sub}
                                            onClick={() => !isDesktop && setOpen(false)}
                                        >
                                            {({ isActive }) => (
                                                <span className={styles.subLinkBox}>
                                                    {isActive ? <img className={styles.subIcon} src="/src/assets/arrow-right.svg" alt="" /> : <div className={styles.subIconPlaceholder} />}
                                                    <span className={styles.linkTitle}>Einstellungsfrage #{i + 1}</span>
                                                </span>
                                            )}
                                        </NavLink>
                                    ))}
                                </div>
                            </>
                        )}

                        <NavLink
                            to="/results"
                            end
                            title="Ergebnisübersicht"
                            className={({ isActive }) =>
                                isActive
                                    ? `${styles.navLink} ${styles.navLinkActive}`
                                    : `${styles.navLink}`
                            }
                            onClick={() => !isDesktop && setOpen(false)}
                        >
                            {({ isActive }) => (
                                <span className={styles.linkTitleBox}>
                                    <img
                                        className={styles.linkIcon}
                                        src={isActive ? "/src/assets/nav-4-active.svg" : "/src/assets/nav-4.svg"}
                                        alt=""
                                    />
                                    <span className={styles.linkTitle}>Ergebnisübersicht</span>
                                </span>
                            )}
                        </NavLink>

                        <NavLink
                            to="/conclusion"
                            end
                            title="Fazit"
                            className={({ isActive }) =>
                                isActive
                                    ? `${styles.navLink} ${styles.navLinkActive}`
                                    : `${styles.navLink}`
                            }
                            onClick={() => !isDesktop && setOpen(false)}
                        >
                            {({ isActive }) => (
                                <span className={styles.linkTitleBox}>
                                    <img
                                        className={styles.linkIcon}
                                        src={isActive ? "/src/assets/nav-5-active.svg" : "/src/assets/nav-5.svg"}
                                        alt=""
                                    />
                                    <span className={styles.linkTitle}>Fazit</span>
                                </span>
                            )}
                        </NavLink>

                    </div>
                </nav>
                <div className={styles.downloadBox}>
                    <div className={styles.downloadTextContainer}>
                        <p className={styles.downloadHeadline}>Studie in Textform herunterladen</p>
                        <p className={styles.downloadDescription}>Jetzt kostenlos herunterladen und alle Forschungsergebnisse anschauen.</p>
                    </div>
                    <a href="/docs/Studie_KI_Produktvideos_Erkennbarkeit_Auswirkungen_2025-Robert_Stein-Marcel_Otto.pdf" download className={styles.downloadBtn}>
                        Herunterladen
                    </a>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;