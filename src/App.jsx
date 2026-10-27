import { useState } from 'react';
import FrameLoopProvider from './engine/FrameLoopProvider';
import IntroAnimation from './components/IntroAnimation';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import StatementSection from './components/StatementSection';
import StorySection from './components/StorySection';
import FinaleSection from './components/FinaleSection';
import DetailSection from './components/DetailSection';
import ContactFooter from './components/ContactFooter';
import { CAM_IDLE } from './data/content';

export default function App() {
  // Header "camera" label follows the story section's position and active phase.
  const [camLabel, setCamLabel] = useState(CAM_IDLE);

  return (
    <FrameLoopProvider>
      <IntroAnimation />
      <Header camLabel={camLabel} />
      <HeroSection />
      <StatementSection />
      <StorySection onCamLabel={setCamLabel} />
      <FinaleSection />
      <DetailSection />
      <ContactFooter />
    </FrameLoopProvider>
  );
}
