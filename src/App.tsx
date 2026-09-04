import './index.css'
import AuroraBackground from './components/AuroraBackground'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Chatbot from './components/Chatbot'
import Contact from './components/Contact'

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#06060e", color: "#eeeef8", fontFamily: "var(--font-body)", overflowX: "hidden" }}>
      <AuroraBackground />
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Chatbot />
    </div>
  )
}
