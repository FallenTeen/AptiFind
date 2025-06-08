import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import Hero from '@/components/landing/Hero';
import IsiSoalSection from '@/components/landing/IsiSoalSection';

export default function Landing() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <IsiSoalSection />
      </main>
      <Footer />
    </div>
  );
}
