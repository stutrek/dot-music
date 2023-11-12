import styles from './page.module.css'
import { Parser } from './parser'

export default async function Home() {

  return (
    <main className={styles.main}>
      <Parser />
    </main>
  )
}
