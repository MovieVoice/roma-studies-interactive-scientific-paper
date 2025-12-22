import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const LG_QUERY = '(min-width: 992px)';

function Sidebar() {
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
                        <NavLink
                            to="/"
                            end
                            title="Forschungsfrage & Zielsetzung"
                            className={({ isActive }) => (isActive ? "navlink active" : "navlink")}
                            onClick={() => !isDesktop && setOpen(false)}
                        >
                            <span className={styles.linkTitleBox}>
                                <img className={styles.linkIcon} src={({ isActive }) => (isActive ? "/src/assets/nav-1-active.svg" : "/src/assets/nav-1.svg")} alt="" />
                                <span className={styles.linkTitle}>Forschungsfrage & Zielsetzung</span>
                            </span>
                        </NavLink>
                        <NavLink
                            to="/"
                            end
                            title="Methodik"
                            className={({ isActive }) => (isActive ? "navlink active" : "navlink")}
                            onClick={() => !isDesktop && setOpen(false)}
                        >
                            <span className={styles.linkTitleBox}>
                                <img className={styles.linkIcon} src={({ isActive }) => (isActive ? "/src/assets/nav-2-active.svg" : "/src/assets/nav-2.svg")} alt="" />
                                <span className={styles.linkTitle}>Methodik</span>
                            </span>
                        </NavLink>
                        <NavLink
                            to="/"
                            end
                            title="Fragebogen"
                            className={({ isActive }) => (isActive ? "navlink active" : "navlink")}
                            onClick={() => !isDesktop && setOpen(false)}
                        >
                            <span className={styles.linkTitleBox}>
                                <img className={styles.linkIcon} src={({ isActive }) => (isActive ? "/src/assets/nav-3-active.svg" : "/src/assets/nav-3.svg")} alt="" />
                                <span className={styles.linkTitle}>Fragebogen</span>
                            </span>
                        </NavLink>
                        <NavLink
                            to="/"
                            end
                            title="Ergebnisübersicht"
                            className={({ isActive }) => (isActive ? "navlink active" : "navlink")}
                            onClick={() => !isDesktop && setOpen(false)}
                        >
                            <span className={styles.linkTitleBox}>
                                <img className={styles.linkIcon} src={({ isActive }) => (isActive ? "/src/assets/nav-4-active.svg" : "/src/assets/nav-4.svg")} alt="" />
                                <span className={styles.linkTitle}>Ergebnisübersicht</span>
                            </span>
                        </NavLink>
                        <NavLink
                            to="/"
                            end
                            title="Fazit"
                            className={({ isActive }) => (isActive ? "navlink active" : "navlink")}
                            onClick={() => !isDesktop && setOpen(false)}
                        >
                            <span className={styles.linkTitleBox}>
                                <img className={styles.linkIcon} src={({ isActive }) => (isActive ? "/src/assets/nav-5-active.svg" : "/src/assets/nav-5.svg")} alt="" />
                                <span className={styles.linkTitle}>Fazit</span>
                            </span>
                        </NavLink>
                    </div>
                </nav>
                <div className={styles.sidebarBottom}>
                    {/* <VoiceControl hasUsers={(users?.length || 0) > 0} />
                    <MoreOptionsMenu onNavigate={handleNavigate} /> */}
                </div>






            </aside>
        </>
    );
}

export default Sidebar;