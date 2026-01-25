import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './Modals.module.css';

function PrivacyPolicyModal() {
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
                        <p>Datenschutzerklärung</p>
                        <button onClick={handleClose} title='Fenster schließen'>
                            <img src="/src/assets/icons/close.svg" alt="Fenster schließen" />
                        </button>
                    </div>
                    <div className={styles.content}>
                        <p className={styles.subheading}>Allgemeines</p>
                        <div className={styles.contentSpacer}></div>
                        <p className={styles.text}>Datenschutzerklärung hinzufügen, sobald das Projekt über das Web erreichbar ist.</p>
                        <div className={styles.contentSpacer}></div>
                        <div className={styles.contentSpacer}></div>
                        <p className={styles.subheading}>Icons</p>
                        <div className={styles.contentSpacer}></div>
                        <p className={styles.text}>Die verwendeten Icons unterliegen der Lucide License: </p>
                        <div className={styles.contentSpacer}></div>
                        <p className={styles.text}>ISC License</p>
                        <p className={styles.text}>Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.</p>
                        <p className={styles.text}>Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.</p>
                    </div>
                </div>
            </div>
            <div className={styles.overlay} onClick={handleClose}></div>
        </>
    );
}

export default PrivacyPolicyModal;
