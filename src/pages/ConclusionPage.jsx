import { NavLink } from 'react-router-dom';
import styles from './ConclusionPage.module.css';

function ConclusionPage() {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <p className={styles.headline}>Beantwortung der Forschungsfrage</p>
                    <p className={styles.text}>Die Forschungsfrage dieser Arbeit lässt sich in zwei Teilaspekte gliedern: (1) die Erkennbarkeit von KI‑generierten Produktvideos auf Social‑Media‑Plattformen in der Altersgruppe der 18‑ bis 29‑Jährigen und (2) die Reaktion dieser Zielgruppe auf entsprechende Inhalte.</p>
                    <p className={styles.text}>Bezüglich der Erkennbarkeit zeigen die Ergebnisse eine sehr hohe Differenzierungsleistung. Die Teilnehmenden konnten KI‑generierte und reale Videos in der Mehrzahl der Fälle korrekt zuordnen. Dies deutet darauf hin, dass im untersuchten Social‑Media‑nahen Setting eine klare visuelle Unterscheidbarkeit beider Videotypen gegeben war, wobei visuelle und auditive Merkmale (z. B. Texturen, Bewegungsdynamik, Toncharakter) als Heuristiken gedient haben könnten.</p>
                    <p className={styles.text}>Ein genauerer Blick zeigt leichte Unterschiede zwischen den getesteten KI‑Plattformen. Mit Digen erzeugte Videos wurden im Durchschnitt etwas häufiger erkannt als mit Tasy produzierte Videos. Diese Differenz könnte auf Variationen in Modellarchitektur, Render‑ und Audiosynthesequalität oder Bewegungsdynamik zurückzuführen sein. Da pro Plattform nur vier Videos einbezogen wurden, ist dieser Befund als deskriptiver Hinweis und nicht als statistisch belastbarer Unterschied zu verstehen. Für zukünftige Untersuchungen wäre eine größere Stimuluszahl je Modell erforderlich, um plattformspezifische Effekte zu prüfen.</p>
                    <p className={styles.text}>Der zweite Teil der Forschungsfrage betrifft die Reaktionen auf KI‑generierte Inhalte. In den Einstellungsfragen wurden diese im Mittel als störend und potenziell schädlich für das Unternehmensimage bewertet. Zudem gaben 55 % der Teilnehmenden an, dass KI‑Videos ihre Kaufentscheidung beeinflussen. Alle schriftlichen Begründungen beschrieben diesen Einfluss ausschließlich negativ (z. B. als “unnatürlich”, “unauthentisch” oder “weniger vertrauenswürdig”). Diese Rückmeldungen geben Einblick in die Ursachen der kritischen Wahrnehmung.</p>
                    <p className={styles.text}>Insgesamt konnte die Forschungsfrage im ersten Teil (Erkennbarkeit) klar beantwortet werden, während der zweite Teil (Reaktion) deskriptive, aber keine abschließend kausalen Rückschlüsse zulässt. Die Ergebnisse zeigen ein differenziertes Bild: KI‑generierte Produktvideos sind für die untersuchte Zielgruppe deutlich erkennbar, werden jedoch überwiegend kritisch eingeschätzt.</p>
                    <div className={styles.spacer}></div>
                    <p className={styles.headline}>Handlungsanweisungen für Unternehmen</p>
                    <p className={styles.text}>Vor dem Einsatz von KI‑generierten Produktvideos ist Zurückhaltung geboten. Die Befunde deuten nicht nur auf eine hohe Erkennbarkeit hin, sondern auch auf eine überwiegend kritische Haltung in der Zielgruppe: Viele Teilnehmende schildern in den Freitexten, dass KI‑Clips "unauthentisch" wirken, "Skepsis" auslösen und "Unglaubwürdigkeit" ausstrahlen. Entsprechend berichten sie einen negativen Einfluss auf ihre Kaufentscheidung. In image- und vertrauenssensiblen Kontexten kann der Einsatz von KI‑Videos das Markenvertrauen schwächen und Konversionen gefährden. Unternehmen sollten deshalb bevorzugt auf echte, glaubwürdige Inhalte setzen, mit realen Personen und realem Ton. Wird der Einsatz von KI‑Material dennoch erwogen, sollte er klar gekennzeichnet, sparsam und kontextsensibel erfolgen.</p>
                </div>
            </div>
            <div className={styles.bottomNavbar}>
                <NavLink
                    to="/results"
                    end
                    title="Ergebnisübersicht"
                    className={styles.bottomNavbarItem}
                >
                    <span className={styles.bottomNavbarItemBox}>
                        <img src="/src/assets/icons/previous-page.svg" alt="" />
                        <span className={styles.linkTitle}>Zurück</span>
                    </span>
                </NavLink>
                <NavLink
                    to="/"
                    end
                    title="Forschungsfrage & Zielsetzung"
                    className={styles.bottomNavbarItem}
                >
                    <span className={styles.bottomNavbarItemBox}>
                        <span className={styles.linkTitle}>Zum Anfang</span>
                        <img src="/src/assets/icons/next-page.svg" alt="" />
                    </span>
                </NavLink>
            </div>
        </>
    );
}

export default ConclusionPage;