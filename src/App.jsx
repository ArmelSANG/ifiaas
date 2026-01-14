import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Vision from './components/Vision';
import Ecosystem from './components/Ecosystem';
import Roadmap from './components/Roadmap';
import WhyIFIAAS from './components/WhyIFIAAS';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
        <Header />
        <main>
          <Hero />
          <Vision />
          <Ecosystem />
          <Roadmap />
          <WhyIFIAAS />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
