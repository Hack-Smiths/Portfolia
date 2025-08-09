import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, FileText, Award, Brain, ArrowRight, Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ResumeUploadDialog from '@/components/ResumeUploadDialog';

const Landing = () => {
  const [typewriterText, setTypewriterText] = useState('');
  const phrases = [
    'Import from GitHub...',
    'Upload Resume...',
    'Summarize with AI...',
    'Build & Share...'
  ];
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const phrase = phrases[currentPhrase];
    let index = 0;

    const typeInterval = setInterval(() => {
      setTypewriterText(phrase.slice(0, index + 1));
      index++;

      if (index >= phrase.length) {
        clearInterval(typeInterval);
        // Wait 2s, then switch to next phrase
        setTimeout(() => {
          setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval); // Cleanup on unmount/change
  }, [currentPhrase]);

  const features = [
    {
      icon: Github,
      title: 'Auto-Import Projects',
      description: 'Connect GitHub and automatically import your best repositories'
    },
    {
      icon: Brain,
      title: 'AI Enhancement',
      description: 'Let AI craft compelling descriptions and highlight your impact'
    },
    {
      icon: FileText,
      title: 'Resume Integration',
      description: 'Upload your resume and extract achievements automatically',
      interactive: false
    },
    {
      icon: Award,
      title: 'Smart Showcase',
      description: 'Beautiful portfolios that highlight your unique strengths'
    }
  ];

  const stats = [
    { value: '2+', label: 'Portfolios Created' },
    { value: '100%', label: 'Interview Success' },
    { value: '2.5x', label: 'Faster Hiring' }
  ];

  return (
    <div className="min-h-screen pt-10 relative overflow-hidden">
      {/* Epic Professional Background - Applied to Full Page */}
      <div className="fixed inset-0 overflow-hidden z-0">
        {/* Dynamic Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-indigo-900/30 dark:from-slate-950 dark:via-purple-950/30 dark:to-indigo-950/40" />
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-600/10 via-transparent to-indigo-600/10 animate-pulse" />
        
        {/* Floating Orbs with Complex Motion */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full blur-3xl animate-float-slow opacity-60" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-float-reverse opacity-60" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-gradient-to-r from-purple-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse-slow" />
        
        {/* Neural Network Pattern */}
        <div className="absolute inset-0 opacity-30">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.3" />
                <stop offset="50%" stopColor="rgb(99, 102, 241)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            
            {/* Animated Connection Lines */}
            <path d="M100,200 Q300,100 500,200 T900,200" stroke="url(#lineGradient)" strokeWidth="2" fill="none" className="animate-draw-line" />
            <path d="M200,600 Q400,500 600,600 T1000,600" stroke="url(#lineGradient)" strokeWidth="2" fill="none" className="animate-draw-line-reverse" />
            <path d="M150,100 Q350,350 550,100 T850,400" stroke="url(#lineGradient)" strokeWidth="1.5" fill="none" className="animate-draw-line-slow" />
            <path d="M50,400 Q250,200 450,400 T750,200" stroke="url(#lineGradient)" strokeWidth="1.5" fill="none" className="animate-draw-line-delayed" />
          </svg>
          
          {/* Network Nodes */}
          <div className="absolute top-1/4 left-1/6 w-3 h-3 bg-purple-400 rounded-full animate-pulse glow-primary" />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-indigo-400 rounded-full animate-pulse glow-primary" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-purple-500 rounded-full animate-pulse glow-primary" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 right-1/3 w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse glow-primary" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-purple-400 rounded-full animate-pulse glow-primary" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-20">
          {/* Hexagonal Grid */}
          <div className="absolute top-10 left-10 w-20 h-20 border border-purple-400/30 transform rotate-45 animate-spin-slow" />
          <div className="absolute top-20 right-20 w-16 h-16 border-2 border-indigo-400/40 rounded-full animate-pulse" />
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-purple-300/25 transform rotate-12 animate-float" />
          <div className="absolute bottom-10 right-10 w-14 h-14 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 transform rotate-45 animate-float-reverse" />
          
          {/* Circuit Board Elements */}
          <div className="absolute top-1/3 left-1/4">
            <div className="w-8 h-2 bg-gradient-to-r from-purple-400/30 to-transparent animate-pulse" />
            <div className="w-2 h-8 bg-gradient-to-b from-purple-400/30 to-transparent animate-pulse mt-2" />
          </div>
          <div className="absolute bottom-1/3 right-1/4">
            <div className="w-6 h-2 bg-gradient-to-r from-indigo-400/30 to-transparent animate-pulse" />
            <div className="w-2 h-6 bg-gradient-to-b from-indigo-400/30 to-transparent animate-pulse mt-2" />
          </div>
        </div>
        
        {/* Particle Effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/6 left-1/5 w-1 h-1 bg-purple-400 rounded-full animate-float opacity-60" />
          <div className="absolute top-1/4 right-1/6 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-float-reverse opacity-60" />
          <div className="absolute bottom-1/5 left-1/3 w-1 h-1 bg-purple-300 rounded-full animate-float opacity-60" />
          <div className="absolute bottom-1/6 right-1/5 w-1.5 h-1.5 bg-indigo-300 rounded-full animate-float-reverse opacity-60" />
          <div className="absolute top-2/3 left-2/3 w-1 h-1 bg-purple-400 rounded-full animate-float opacity-60" />
        </div>
        
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-50 animate-pulse-slow" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center z-10">
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Professional Tech Grid Background */}
          <div className="relative mb-8">
            {/* Animated Tech Grid */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Grid Lines */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse"></div>
                <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-0 bottom-0 left-1/4 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-0 bottom-0 right-1/4 w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              </div>
              
              {/* Animated Dots at Intersections */}
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-pulse glow-primary"></div>
              <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-indigo-500 rounded-full animate-pulse glow-primary" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-indigo-500 rounded-full animate-pulse glow-primary" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-purple-500 rounded-full animate-pulse glow-primary" style={{ animationDelay: '1.5s' }}></div>
              
              {/* Geometric Corner Elements */}
              <div className="absolute top-8 left-8 w-16 h-16 border-2 border-purple-500/30 rotate-45 animate-pulse"></div>
              <div className="absolute top-8 right-8 w-12 h-12 border-2 border-indigo-500/30 rotate-12 animate-pulse" style={{ animationDelay: '0.7s' }}></div>
              <div className="absolute bottom-8 left-8 w-14 h-14 border border-purple-400/20 rounded-full animate-pulse" style={{ animationDelay: '1.2s' }}></div>
              <div className="absolute bottom-8 right-8 w-10 h-10 bg-gradient-primary/20 rotate-45 animate-pulse" style={{ animationDelay: '1.8s' }}></div>
            </div>
            
            {/* Professional Main Heading with Better Background */}
            <div className="relative z-10 py-10 mt-10 pb-4">
            <h1 className="text-6xl lg:text-7xl font-black leading-tight animate-fade-in mb-2">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent drop-shadow-sm font-black tracking-tight">
                AI-Powered
              </span>
              <br />
              <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#5B0E8D] via-[#6A0DAD] to-[#3D0075] bg-clip-text text-transparent mt-2 block tracking-wide">
                Internship Portfolio Builder
              </span>
            </h1>
          </div>
        </div>

          {/* Enhanced Typewriter Effect */}
          <div className="h-8 mt-12 mb-3 flex items-center justify-center">
              <span className="text-lg text-foreground-muted typewriter font-mono bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                {typewriterText}
              </span>
            </div>

            {/* Enhanced Tagline */}
            <p className="text-xl lg:text-2xl text-foreground-muted max-w-3xl mx-auto mb-6 animate-slide-in-up font-medium leading-relaxed">
              One platform. <span className="text-gradient-primary font-semibold">Infinite potential.</span> Build your professional identity — smarter.
            </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-0 items-center mb-10 animate-slide-in-up">
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/dummy-portfolio">
              <Button
                variant="outline"
                className="border-2 border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Play className="w-4 h-4 mr-2" />
                View Live Demo
              </Button>
            </Link>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto animate-slide-in-up">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm p-5 rounded-xl border border-white/30 dark:border-slate-700/30">
                <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground-muted font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-space font-bold mb-6 text-gradient-primary">
              Everything you need to stand out
            </h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              From project imports to AI-enhanced descriptions, we've got every aspect of portfolio building covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const FeatureCard = (
                <Card key={index} className="glass-card interactive group animate-slide-in-up cursor-pointer" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:glow-primary transition-all">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-foreground-muted text-sm">{feature.description}</p>
                </Card>
              );

              return feature.interactive ? (
                <ResumeUploadDialog key={index}>
                  {FeatureCard}
                </ResumeUploadDialog>
              ) : (
                FeatureCard
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-space font-bold mb-6 text-gradient-primary">
              About PortFolia
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto mb-12">
              We believe every student deserves to showcase their potential. PortFolia combines cutting-edge AI with beautiful design to help you create portfolios that truly represent your skills and achievements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="glass-card text-center group transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:glow-primary transition-all">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Enhanced</h3>
              <p className="text-foreground-muted">
                Our AI analyzes your projects and achievements to craft compelling descriptions that highlight your unique impact and potential.
              </p>
            </Card>

            <Card className="glass-card text-center group transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:glow-primary transition-all">
                <Github className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Seamless Integration</h3>
              <p className="text-foreground-muted">
                Connect your GitHub, upload your resume, and watch as we automatically import and enhance your professional profile.
              </p>
            </Card>

            <Card className="glass-card text-center group transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:glow-primary transition-all">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Results</h3>
              <p className="text-foreground-muted">
                Create stunning, professional portfolios that stand out to recruiters and help you land your dream internship or job.
              </p>
            </Card>
          </div>

          {/* <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-6 text-gradient-primary">Join thousands of successful students</h3>
              <p className="text-foreground-muted mb-8 text-lg max-w-2xl mx-auto">
                Our AI-powered platform has helped students from top universities secure internships at leading tech companies, startups, and organizations worldwide.
              </p>
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient-primary">95%</div>
                  <div className="text-sm text-foreground-muted">Interview Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient-primary">2.5x</div>
                  <div className="text-sm text-foreground-muted">Faster Hiring Process</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient-primary">10K+</div>
                  <div className="text-sm text-foreground-muted">Portfolios Created</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto opacity-60">
                <div className="text-center p-3 bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm rounded-lg border border-white/20 dark:border-slate-700/20">
                  <div className="text-xs font-medium">Google</div>
                </div>
                <div className="text-center p-3 bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm rounded-lg border border-white/20 dark:border-slate-700/20">
                  <div className="text-xs font-medium">Microsoft</div>
                </div>
                <div className="text-center p-3 bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm rounded-lg border border-white/20 dark:border-slate-700/20">
                  <div className="text-xs font-medium">Meta</div>
                </div>
                <div className="text-center p-3 bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm rounded-lg border border-white/20 dark:border-slate-700/20">
                  <div className="text-xs font-medium">Apple</div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <Card className="bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm border border-white/20 dark:border-slate-700/20 max-w-4xl mx-auto p-8">
            <h2 className="text-3xl lg:text-4xl font-space font-bold mb-6">
              Ready to build your <span className="text-gradient-primary">standout portfolio</span>?
            </h2>
            <p className="text-xl text-foreground-muted mt-16 mb-8">
              Join thousands of students who've landed their dream internships with AI-enhanced portfolios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button className="btn-primary text-lg px-8 py-4">
                  Start Building Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img src="/programming.png" alt="Icon" className="w-7 h-7 object-contain" />
              <span className="font-space font-bold text-xl text-gradient-primary">
                PortFolia
              </span>
            </div>
            <div className="flex space-x-6 text-sm text-foreground-muted">
              <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Team Credits</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;