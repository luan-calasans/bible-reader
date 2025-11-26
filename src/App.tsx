import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider, CacheProvider } from '@/contexts/ThemeContext';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import VerseOfTheDay from '@/pages/VerseOfTheDay';
import WhyStudy from '@/pages/WhyStudy';
import Donation from '@/pages/Donation';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Imagens from '@/pages/Imagens';
import SearchPage from '@/pages/SearchPage';
import BibleReader from '@/pages/BibleReader';
import BiblicalChatbot from '@/pages/BiblicalChatbot';
import BiblicalTimeline from '@/pages/BiblicalTimeline';
import Models3D from '@/pages/Models3D';
import Model3DViewer from '@/pages/Model3DViewer';
import LandingPage from '@/pages/LandingPage';
import NotFound from '@/pages/NotFound';
import AccessibilityMenu from '@/components/AccessibilityMenu';
import Footer from '@/components/Footer';

// Reading Plan Pages
import ReadingPlans from '@/pages/ReadingPlans';
import OneMonthPlan from '@/pages/ReadingPlans/OneMonthPlan';
import ThreeMonthPlan from '@/pages/ReadingPlans/ThreeMonthPlan';
import SixMonthPlan from '@/pages/ReadingPlans/SixMonthPlan';
import OneYearPlan from '@/pages/ReadingPlans/OneYearPlan';
import { CarouselProvider } from '@/contexts/CarouselContext';

// Cria a instância do client apenas uma vez
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme='light'>
      <CacheProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <SonnerToaster position='top-center' />
            <BrowserRouter>
              <CarouselProvider>
                <div className='min-h-screen bg-background flex flex-col'>
                  <Navbar />
                  <main className='container mx-auto px-2 sm:px-4 py-4 sm:py-8 flex-1'>
                    <Routes>
                      <Route path='/' element={<LandingPage />} />
                      <Route path='/planos' element={<Home />} />
                      <Route
                        path='/planos/pre-prontos'
                        element={<ReadingPlans />}
                      />
                      <Route path='/planos/1-mes' element={<OneMonthPlan />} />
                      <Route
                        path='/planos/3-meses'
                        element={<ThreeMonthPlan />}
                      />
                      <Route
                        path='/planos/6-meses'
                        element={<SixMonthPlan />}
                      />
                      <Route path='/planos/1-ano' element={<OneYearPlan />} />
                      <Route
                        path='/plano'
                        element={<Navigate to='/planos' replace />}
                      />
                      <Route
                        path='/versiculo-do-dia'
                        element={<VerseOfTheDay />}
                      />
                      <Route
                        path='/sobre'
                        element={<Navigate to='/por-que-estudar' replace />}
                      />
                      <Route path='/por-que-estudar' element={<WhyStudy />} />
                      <Route path='/doacao' element={<Donation />} />
                      <Route path='/imagens' element={<Imagens />} />
                      <Route path='/pesquisa' element={<SearchPage />} />
                      <Route path='/leitura' element={<BibleReader />} />
                      <Route path='/chatbot' element={<BiblicalChatbot />} />
                      <Route
                        path='/linha-do-tempo'
                        element={<BiblicalTimeline />}
                      />
                      <Route path='/modelos-3d' element={<Models3D />} />
                      <Route
                        path='/modelos-3d/:modelId'
                        element={<Model3DViewer />}
                      />
                      <Route path='/privacidade' element={<PrivacyPolicy />} />
                      <Route path='*' element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                  <AccessibilityMenu />
                </div>
              </CarouselProvider>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </CacheProvider>
    </ThemeProvider>
  );
};

export default App;
