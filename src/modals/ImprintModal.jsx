import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './Modals.module.css';

function ImprintModal() {
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
                        <p>Impressum</p>
                        <button onClick={handleClose}>
                            <img src="/src/assets/icons/close.svg" alt="Fenster schließen" />
                        </button>
                    </div>
                    <div className={`${styles.content} ${styles.contentCenter}`}>
                        <p>Impressum hinzufügen, sobald das Projekt über das Web erreichbar ist.</p>
                    </div>
                </div>
            </div>
            <div className={styles.overlay} onClick={handleClose}></div>
        </>
    );
}

export default ImprintModal;
