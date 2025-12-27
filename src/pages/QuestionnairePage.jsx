import { useParams } from 'react-router-dom';
import styles from './QuestionnairePage.module.css';

function QuestionnairePage() {
    const { id } = useParams();

    return (
        <div className={styles.container}>
            <h1>Fragebogen-Seite #{id}</h1>
        </div>
    );
}

export default QuestionnairePage;
