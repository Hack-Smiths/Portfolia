import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PortfolioNavbarProps {
    name: string;
    activeSection: string;
}

const PortfolioNavbar = ({ name, activeSection }: PortfolioNavbarProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    const navItems = [
        { label: 'Home', id: 'home' },
        { label: 'About', id: 'about' },
        { label: 'Projects', id: 'projects' },
        { label: 'Skills', id: 'skills' },
        { label: 'Experience', id: 'experience' },
        { label: 'Contact', id: 'contact' },
    ];

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm' : 'bg-transparent'
            )}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div
                        className="text-xl font-bold cursor-pointer font-space text-gradient-primary"
                        onClick={() => scrollToSection('home')}
                    >
                        {name}
                        <span className="text-primary text-2xl leading-none">.</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={cn(
                                    'text-sm font-medium transition-colors hover:text-primary relative group',
                                    activeSection === item.id ? 'text-primary' : 'text-foreground-muted'
                                )}
                            >
                                {item.label}
                                <span className={cn(
                                    "absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300",
                                    activeSection === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                )} />
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg animate-slide-in-up">
                        <div className="flex flex-col space-y-2 px-4">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={cn(
                                        'text-left py-2 px-4 rounded-md text-sm font-medium transition-colors',
                                        activeSection === item.id
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-foreground-muted hover:bg-muted hover:text-foreground'
                                    )}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default PortfolioNavbar;
