import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { PortfolioProvider } from "./contexts/PortfolioContext";
import Navbar from "./components/Navbar";
import AIAssistant from "./components/AIAssistant";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Achievements from "./pages/Achievements";
import Skills from "./pages/Skills";
import Portfolio from "./pages/Portfolio";
import DummyPortfolio from "./pages/DummyPortfolio";
import Export from "./pages/Export";
import Profile from "./pages/Profile";
import MainPortfolio from "./pages/MainPortfolio";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isDummyPortfolio = location.pathname === '/dummy-portfolio';
  const isMainPortfolio = location.pathname === '/main-portfolio';
  const isAuthPage = location.pathname === '/auth';

  return (
    <>
      {!isDummyPortfolio && !isMainPortfolio && !isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/dummy-portfolio" element={<DummyPortfolio />} />
        <Route path="/main-portfolio" element={<MainPortfolio />} />
        <Route path="/export" element={<Export />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isDummyPortfolio && !isMainPortfolio && !isAuthPage && <AIAssistant />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PortfolioProvider>
          <AppContent />
        </PortfolioProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
