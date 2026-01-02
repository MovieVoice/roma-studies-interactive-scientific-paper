import { NavLink } from 'react-router-dom';
import data from '/src/assets/data/data.json';
import styles from './ResultsPage.module.css';

function ResultsPage() {
    const genderData = data.find(item => item.id === 1).genders;
    const avgAgeData = data.find(item => item.id === 2).avgAge;
    const productVideoData = data.find(item => item.id === 3).recognitionRate;


    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <p className={styles.headline}>Ergebnisübersicht der Befragung</p>
                    <div className={styles.dataContainer}>
                        <div className={styles.dataBlock}>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Geschlechterverteilung</p>
                                    <p className={styles.dataBlockItemText}>Angaben in Prozent</p>
                                </div>

                                <div className={styles.dataDiagram}>
                                    {/* Labels-Spalte */}
                                    <div className={styles.dataDiagramLabels}>
                                        {genderData.map((gender, index) => (
                                            <p key={index} className={styles.dataDiagramLabelsItem}>
                                                {gender.label}
                                            </p>
                                        ))}
                                    </div>

                                    {/* Balken-Spalte */}
                                    <div className={styles.dataDiagramBars}>
                                        {genderData.map((gender, index) => (
                                            <div key={index} className={styles.dataDiagramBarContainer}>
                                                <div
                                                    className={styles.dataDiagramBar}
                                                    style={{ width: `${gender.percentage}%` }}
                                                ></div>
                                                <div className={styles.tooltip}>{gender.tooltip}</div>
                                            </div>
                                        ))}
                                        <div className={styles.dataDiagramPercentageScaleContainer}>
                                            <div className={styles.dataDiagramPercentageScale}>
                                                <div className={styles.dataDiagramPercentageScaleMarker}></div>
                                                <div className={styles.dataDiagramPercentageScaleMarker}></div>
                                                <div className={styles.dataDiagramPercentageScaleMarker}></div>
                                                <div className={styles.dataDiagramPercentageScaleMarker}></div>
                                                <div className={styles.dataDiagramPercentageScaleMarker}></div>
                                                <div className={styles.dataDiagramPercentageScaleBar}></div>
                                            </div>
                                            <div className={styles.dataDiagramPercentageScaleLabels}>
                                                <span>0</span>
                                                <span>25</span>
                                                <span>50</span>
                                                <span>75</span>
                                                <span>100</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Durchschnittsalter</p>
                                    <p className={styles.dataBlockItemText}>{avgAgeData}</p>
                                </div>
                            </div>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Einordnung von Produktvideos</p>
                                    <p className={styles.dataBlockItemText}>Angaben in Prozent</p>
                                </div>

                                <div className={styles.dataLegend}>
                                    <div className={styles.dataLegendItem}>
                                        <div className={styles.dataLegendColorBoxReal}></div>
                                        <p className={styles.dataLegendLabel}>Real</p>
                                    </div>
                                    <div className={styles.dataLegendItem}>
                                        <div className={styles.dataLegendColorBoxVideo}></div>
                                        <p className={styles.dataLegendLabel}>KI-generiert</p>
                                    </div>
                                </div>

                                <div className={styles.dataDiagram}>
                                    {/* Labels-Spalte */}
                                    <div className={styles.dataDiagramLabels}>
                                        {productVideoData.map((video, index) => (
                                            <p key={index} className={styles.dataDiagramLabelsItem}>
                                                {video.label}
                                            </p>
                                        ))}
                                    </div>

                                    {/* Balken-Spalte */}
                                    <div className={styles.dataDiagramBars}>
                                        {productVideoData.map((video, index) => (
                                            <div key={index} className={`${styles.dataDiagramBarContainer} ${styles.dataDiagramBarContainerVideo}`}>
                                                <div
                                                    className={styles.dataDiagramBar}
                                                    style={{ width: `${video.realPercentage}%` }}
                                                ></div>
                                                <div className={styles.tooltip}>{video.tooltip}</div>
                                            </div>
                                        ))}
                                        <div className={styles.dataDiagramPercentageScaleContainer}>
                                            <div className={styles.dataDiagramPercentageScale}>
                                                <div className={styles.dataDiagramPercentageScaleMarker}></div>
                                                <div className={styles.dataDiagramPercentageScaleMarker}></div>
                                                <div className={styles.dataDiagramPercentageScaleMarker}></div>
                                                <div className={styles.dataDiagramPercentageScaleMarker}></div>
                                                <div className={styles.dataDiagramPercentageScaleMarker}></div>
                                                <div className={styles.dataDiagramPercentageScaleBar}></div>
                                            </div>
                                            <div className={styles.dataDiagramPercentageScaleLabels}>
                                                <span>0</span>
                                                <span>25</span>
                                                <span>50</span>
                                                <span>75</span>
                                                <span>100</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Gesamttrefferquote (“Accuracy”)</p>
                                    {/* <p className={styles.dataBlockItemText}>94,44 %</p> */}
                                </div>
                            </div>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Ausgewogene Genauigkeit (“Balanced Accuracy”)</p>
                                    {/* <p className={styles.dataBlockItemText}>94,44 %</p> */}
                                </div>
                            </div>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Mit Digen erzeugte KI-Videos</p>
                                    {/* <p className={styles.dataBlockItemText}>Mindest-Trefferquote: 95 %</p> */}
                                    {/* <p className={styles.dataBlockItemText}>Mittelwert: 98,25 %</p> */}
                                </div>
                            </div>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Mit Tasy erzeugte KI-Videos</p>
                                    {/* <p className={styles.dataBlockItemText}>Mindest-Trefferquote: 82 %</p> */}
                                    {/* <p className={styles.dataBlockItemText}>Mittelwert: 92,25 %</p> */}
                                </div>
                            </div>
                        </div>
                        <div className={styles.dataBlock}>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Konfusionsmatrix</p>
                                    <p className={styles.dataBlockItemText}>Zeigt die Anzahl korrekter und fehlerhafter Zuordnungen der Teilnehmenden zu den Kategorien “real” und “KI-generiert”.</p>
                                </div>
                                {/* TODO */}
                            </div>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Sensitivität für reale Videos</p>
                                    {/* <p className={styles.dataBlockItemText}>93,6 %</p> */}
                                </div>
                            </div>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Spezifität für KI-Videos</p>
                                    {/* <p className={styles.dataBlockItemText}>95,2 %</p> */}
                                </div>
                            </div>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Empfinden Sie KI-generierte Videos als störend in den Sozialen Medien?</p>
                                    <p className={styles.dataBlockItemText}>Mithilfe einer 7-stufigen Likert-Skala erhoben</p>
                                </div>
                                {/* TODO */}
                                {/* <p className={styles.dataBlockItemText}><span className={styles.dataBlockItemBold}>Mittelwert:</span> 5,74</p> */}
                                {/* <p className={styles.dataBlockItemText}><span className={styles.dataBlockItemBold}>Standardabweichung: </span> 1,31</p> */}
                            </div>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Wie sehr schadet der Einsatz von KI-generierten Produktvideos Ihrer Meinung nach dem Image eines Unternehmens?</p>
                                    <p className={styles.dataBlockItemText}>Mithilfe einer 7-stufigen Likert-Skala erhoben</p>
                                </div>
                                {/* TODO */}
                                {/* <p className={styles.dataBlockItemText}><span className={styles.dataBlockItemBold}>Mittelwert:</span> 5,31</p> */}
                                {/* <p className={styles.dataBlockItemText}><span className={styles.dataBlockItemBold}>Standardabweichung: </span> 1,41</p> */}
                            </div>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Beeinflussen KI-generierte Videos Ihre Kaufentscheidung?</p>
                                    <p className={styles.dataBlockItemText}>Angaben in Prozent</p>
                                </div>
                                {/* TODO */}
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Begründungen bei Antwort “Ja”:</p>
                                    {/* TODO */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.bottomNavbar}>
                <NavLink
                    to="/questionnaire/19"
                    end
                    title="Fragebogen"
                    className={styles.bottomNavbarItem}
                >
                    <span className={styles.bottomNavbarItemBox}>
                        <img src="/src/assets/icons/previous-page.svg" alt="" />
                        <span className={styles.linkTitle}>Zurück</span>
                    </span>
                </NavLink>
                <NavLink
                    to="/conclusion"
                    end
                    title="Fazit"
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

export default ResultsPage;