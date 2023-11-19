import styles from './page.module.css';
import Parser from './song';

export default async function Home() {
    return (
        <main className={styles.main}>
            <Parser />
        </main>
    );
}
