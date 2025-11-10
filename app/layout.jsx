import './globals.css'
import { Orbitron, Inter, Montserrat } from 'next/font/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AIAssistant from '../components/AIAssistant'

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata = {
  title: 'Skill Mittra',
  description: 'Futuristic Robotics & IoT Learning Platform',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${orbitron.variable} ${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-[#0F1428] text-textWhite dark:bg-[#0A0F1F]">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8">
          {children}
        </main>
        <Footer />
        <AIAssistant />
      </body>
    </html>
  )
}
