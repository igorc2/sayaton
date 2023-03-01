import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { PlayerSection } from '@/components/PlayerSection'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={styles.main}>

      <PlayerSection />
    </div>
  )
}
