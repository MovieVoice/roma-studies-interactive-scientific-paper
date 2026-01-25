import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import data from '/src/assets/data/data.json';
import styles from './ResultsPage.module.css';

function ResultsPage() {
    const genderData = data.find(item => item.id === 1).genders;
    const avgAgeData = data.find(item => item.id === 2).avgAge;
    const productVideoData = data.find(item => item.id === 3).recognitionRate;
    const accuracyData = data.find(item => item.id === 4).accuracy;
    const balancedAccuracyData = data.find(item => item.id === 5).balancedAccuracy;
    const digenData = data.find(item => item.id === 6);
    const tasyData = data.find(item => item.id === 7);
    const confusionMatrix = data.find(item => item.id === 8).confusionMatrix;
    const sensitivityData = data.find(item => item.id === 9).sensitivity;
    const specificityData = data.find(item => item.id === 10).specificity;
    const disturbanceData = data.find(item => item.id === 11);
    const imageImpactData = data.find(item => item.id === 12);
    const purchaseImpactData = data.find(item => item.id === 13);


    useEffect(() => {
        const scales = [
            { data: disturbanceData, prefix: "disturbance" },
            { data: imageImpactData, prefix: "image" },
        ];

        function updateScale(scaleInfo) {
            const { data, prefix } = scaleInfo;
            if (!data || !data.meanValue || !data.stdDev) return;

            const mean = parseFloat(data.meanValue);
            const std = parseFloat(data.stdDev);
            const min = 1, max = 7;
            const tickWidth = 16;
            const barEndWidth = 4;

            const bar = document.querySelector(`.${styles[`${prefix}ScaleBar`]}`);
            const meanDot = document.querySelector(`.${styles[`${prefix}ScaleMean`]}`);
            const axis = document.querySelector(`.${styles[`${prefix}ScaleAxis`]}`);
            if (!bar || !meanDot || !axis) return;

            const width = axis.offsetWidth;
            const halfTick = tickWidth / 2;
            const halfEnd = barEndWidth / 2;

            const xPx = ((mean - min) / (max - min)) * (width - tickWidth) + halfTick;
            const deltaPx = (std / (max - min)) * (width - tickWidth);

            let leftBarPx = xPx - deltaPx;
            let rightBarPx = xPx + deltaPx;

            leftBarPx = Math.max(halfTick, leftBarPx);
            rightBarPx = Math.min(width - halfTick, rightBarPx);

            const toPercent = (px) => (px / width) * 100;
            const meanLeft = toPercent(xPx - halfTick);
            const barLeft = toPercent(leftBarPx - halfEnd);
            const barWidth = toPercent((rightBarPx + halfEnd) - (leftBarPx - halfEnd));

            meanDot.style.left = `${meanLeft}%`;
            bar.style.left = `${barLeft}%`;
            bar.style.width = `${barWidth}%`;
        }

        scales.forEach(updateScale);

        const handleResize = () => scales.forEach(updateScale);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [disturbanceData, imageImpactData]);


    function formatNumberDE(num) {
        if (num === null || num === undefined || isNaN(num)) return '';
        return num.toString().replace('.', ',');
    }


    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <p className={styles.headline}>Ergebnisse der Befragung</p>
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
                                    <div className={styles.dataBlockItemTitleContainer}>
                                        <p className={styles.dataBlockItemTitle}>Einordnung von Produktvideos</p>
                                        <div className={styles.dataBlockItemTooltipContainer}>
                                            <img className={styles.dataBlockItemTooltipIcon} src="/src/assets/icons/info.svg" alt="Info zur Sortierung der Daten" />
                                            <div className={styles.dataBlockItemTooltip}>
                                                Sortierung nach Erstellungsart der Videos: KI-generiert (Digen, Tasy) und real.
                                            </div>
                                        </div>
                                    </div>
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
                                    <p className={styles.dataBlockItemText}>{accuracyData}</p>
                                </div>
                            </div>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Ausgewogene Genauigkeit (“Balanced Accuracy”)</p>
                                    <p className={styles.dataBlockItemText}>{balancedAccuracyData}</p>
                                </div>
                            </div>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Mit Digen erzeugte KI-Videos</p>
                                    <p className={styles.dataBlockItemText}>Mindest-Trefferquote: {digenData.minimumHitRate}</p>
                                    <p className={styles.dataBlockItemText}>Mittelwert: {digenData.meanValue}</p>
                                </div>
                            </div>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Mit Tasy erzeugte KI-Videos</p>
                                    <p className={styles.dataBlockItemText}>Mindest-Trefferquote: {tasyData.minimumHitRate}</p>
                                    <p className={styles.dataBlockItemText}>Mittelwert: {tasyData.meanValue}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.dataBlock}>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Konfusionsmatrix</p>
                                    <p className={styles.dataBlockItemText}>Zeigt die Anzahl korrekter und fehlerhafter Zuordnungen der Teilnehmenden zu den Kategorien "real" und "KI-generiert".</p>
                                </div>

                                <div className={styles.confusionMatrix}>
                                    <div className={styles.confusionMatrixLabels}>
                                        <p className={styles.confusionMatrixLabel}>Reales Video (wahr)</p>
                                        <p className={styles.confusionMatrixLabel}>KI-Video (wahr)</p>
                                    </div>
                                    <div className={styles.confusionMatrixSpacer}></div>
                                    <div className={styles.confusionMatrixData}>
                                        <div className={styles.confusionMatrixRow}>
                                            <div className={styles.confusionMatrixCell}>
                                                <p className={styles.confusionMatrixLabel}>Eingestuft als real</p>
                                            </div>
                                            <div className={styles.confusionMatrixSpacer}></div>
                                            <div className={styles.confusionMatrixCell}>
                                                <p className={styles.confusionMatrixLabel}>Eingestuft als KI-generiert</p>
                                            </div>
                                        </div>
                                        <div className={styles.confusionMatrixRow}>
                                            <div className={styles.confusionMatrixCell}>
                                                <p className={styles.confusionMatrixValue}>{confusionMatrix.tp}</p>
                                            </div>
                                            <div className={styles.confusionMatrixSpacer}></div>
                                            <div className={styles.confusionMatrixCell}>
                                                <p className={styles.confusionMatrixValue}>{confusionMatrix.fn}</p>
                                            </div>
                                        </div>
                                        <div className={styles.confusionMatrixRow}>
                                            <div className={styles.confusionMatrixCell}>
                                                <p className={styles.confusionMatrixValue}>{confusionMatrix.fp}</p>
                                            </div>
                                            <div className={styles.confusionMatrixSpacer}></div>
                                            <div className={styles.confusionMatrixCell}>
                                                <p className={styles.confusionMatrixValue}>{confusionMatrix.tn}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Sensitivität für reale Videos</p>
                                    <p className={styles.dataBlockItemText}>{sensitivityData}</p>
                                </div>
                            </div>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Spezifität für KI-Videos</p>
                                    <p className={styles.dataBlockItemText}>{specificityData}</p>
                                </div>
                            </div>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Empfinden Sie KI-generierte Videos als störend in den Sozialen Medien?</p>
                                    <p className={styles.dataBlockItemText}>Mithilfe einer 7-stufigen Likert-Skala erhoben</p>
                                </div>

                                <div className={styles.disturbanceScaleContainer}>
                                    <div className={styles.disturbanceScale}>
                                        <div className={styles.disturbanceScaleAxis}>
                                            {[...Array(7)].map((_, i) => {
                                                const num = i + 1;
                                                return (
                                                    <div key={num} className={styles.scaleTick} />
                                                );
                                            })}
                                        </div>
                                        <>
                                            <div className={styles.disturbanceScaleBar}>
                                                <div className={styles.scaleBarEnd}></div>
                                                <div className={styles.scaleBarEnd}></div>
                                            </div>
                                            <div className={styles.disturbanceScaleMean}></div>
                                        </>
                                    </div>
                                    <div className={styles.scaleNumbers}>
                                        {[...Array(7)].map((_, i) => (
                                            <div key={i} className={styles.scaleNumberBox}>
                                                <p className={styles.scaleNumber}>{i + 1}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.scaleLabels}>
                                        <p>{disturbanceData.minLabel}</p>
                                        <p>{disturbanceData.maxLabel}</p>
                                    </div>
                                </div>

                                <p className={styles.dataBlockItemText}><span className={styles.dataBlockItemTitle}>Mittelwert:</span> {formatNumberDE(disturbanceData.meanValue)}</p>
                                <p className={styles.dataBlockItemText}><span className={styles.dataBlockItemTitle}>Standardabweichung:</span> {formatNumberDE(disturbanceData.stdDev)}</p>
                            </div>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Wie sehr schadet der Einsatz von KI-generierten Produktvideos Ihrer Meinung nach dem Image eines Unternehmens?</p>
                                    <p className={styles.dataBlockItemText}>Mithilfe einer 7-stufigen Likert-Skala erhoben</p>
                                </div>

                                <div className={styles.imageScaleContainer}>
                                    <div className={styles.imageScale}>
                                        <div className={styles.imageScaleAxis}>
                                            {[...Array(7)].map((_, i) => {
                                                const num = i + 1;
                                                return (
                                                    <div key={num} className={styles.scaleTick} />
                                                );
                                            })}
                                        </div>
                                        <>
                                            <div className={styles.imageScaleBar}>
                                                <div className={styles.scaleBarEnd}></div>
                                                <div className={styles.scaleBarEnd}></div>
                                            </div>
                                            <div className={styles.imageScaleMean}></div>
                                        </>
                                    </div>
                                    <div className={styles.scaleNumbers}>
                                        {[...Array(7)].map((_, i) => (
                                            <div key={i} className={styles.scaleNumberBox}>
                                                <p className={styles.scaleNumber}>{i + 1}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.scaleLabels}>
                                        <p>{imageImpactData.minLabel}</p>
                                        <p>{imageImpactData.maxLabel}</p>
                                    </div>
                                </div>

                                <p className={styles.dataBlockItemText}><span className={styles.dataBlockItemTitle}>Mittelwert:</span> {formatNumberDE(imageImpactData.meanValue)}</p>
                                <p className={styles.dataBlockItemText}><span className={styles.dataBlockItemTitle}>Standardabweichung:</span> {formatNumberDE(imageImpactData.stdDev)}</p>
                            </div>
                            <div className={styles.dataBlockItem}>
                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Beeinflussen KI-generierte Videos Ihre Kaufentscheidung?</p>
                                    <p className={styles.dataBlockItemText}>Angaben in Prozent</p>
                                </div>

                                <div className={styles.dataDiagram}>
                                    {/* Labels-Spalte */}
                                    <div className={styles.dataDiagramLabels}>
                                        {purchaseImpactData.yesNoRatio.map((data, index) => (
                                            <p key={index} className={styles.dataDiagramLabelsItem}>
                                                {data.label}
                                            </p>
                                        ))}
                                    </div>

                                    {/* Balken-Spalte */}
                                    <div className={styles.dataDiagramBars}>
                                        {purchaseImpactData.yesNoRatio.map((data, index) => (
                                            <div key={index} className={styles.dataDiagramBarContainer}>
                                                <div
                                                    className={styles.dataDiagramBar}
                                                    style={{ width: `${data.data}%` }}
                                                ></div>
                                                <div className={styles.tooltip}>{data.tooltip}</div>
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

                                <div className={styles.dataBlockItemDescription}>
                                    <p className={styles.dataBlockItemTitle}>Begründungen bei Antwort "Ja":</p>
                                    {purchaseImpactData.quotes.map((quote, index) => (
                                        <div key={index} className={styles.dataQuoteContainer}>
                                            <div className={styles.dataQuoteIcon}>
                                                <img src="/src/assets/icons/arrow-right-blue.svg" alt="Pfeil nach rechts" />
                                            </div>
                                            <p className={styles.dataQuote}>
                                                "{quote}"
                                            </p>
                                        </div>
                                    ))}
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
                        <img src="/src/assets/icons/previous-page.svg" alt="Vorherige Seite" />
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
                        <img src="/src/assets/icons/next-page.svg" alt="Nächste Seite" />
                    </span>
                </NavLink>
            </div>
        </>
    );
}

export default ResultsPage;;