import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPublicPortfolio } from '@/utils/api';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, AlertCircle, Lock } from "lucide-react";
import MainPortfolio from './MainPortfolio';

interface PortfolioData {
    username: string;
    name: string;
    title: string;
    tagline: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    about: string;
    theme_preference: string;
    projects: any[];
    skills: any[];
    achievements: any[];
    certificates: any[];
}

const PublicPortfolioPage = () => {
    const { username } = useParams<{ username: string }>();
    const navigate = useNavigate();
    const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<{ type: 'not-found' | 'private' | 'network'; message: string } | null>(null);

    useEffect(() => {
        if (!username) {
            navigate('/');
            return;
        }

        const fetchPortfolio = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getPublicPortfolio(username);
                setPortfolioData(data);
            } catch (err: any) {
                console.error('Portfolio fetch error:', err);
                if (err.status === 404) {
                    setError({ type: 'not-found', message: 'Portfolio not found' });
                } else if (err.status === 403) {
                    setError({ type: 'private', message: 'This portfolio is private' });
                } else {
                    setError({ type: 'network', message: 'Failed to load portfolio. Please try again.' });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolio();
    }, [username, navigate]);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-white dark:from-slate-900 dark:via-blue-950 dark:to-slate-900">
                <Helmet>
                    <title>Loading Portfolio... | PortFolia</title>
                </Helmet>
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">Loading portfolio...</p>
                </div>
            </div>
        );
    }

    // Error states
    if (error) {
        return (
            <>
                <Helmet>
                    <title>
                        {error.type === 'not-found' ? 'Portfolio Not Found' :
                            error.type === 'private' ? 'Portfolio is Private' :
                                'Error Loading Portfolio'} | PortFolia
                    </title>
                </Helmet>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-white dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 px-6">
                    <Card className="max-w-md w-full p-8 text-center">
                        {error.type === 'not-found' && (
                            <>
                                <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                                <h1 className="text-2xl font-bold text-foreground mb-2">Portfolio Not Found</h1>
                                <p className="text-muted-foreground mb-6">
                                    The portfolio you're looking for doesn't exist. Maybe they haven't created one yet?
                                </p>
                                <div className="space-y-3">
                                    <Button onClick={() => navigate('/')} className="w-full">
                                        Go to Home
                                    </Button>
                                    <Button onClick={() => navigate('/auth')} variant="outline" className="w-full">
                                        Create Your Own Portfolio
                                    </Button>
                                </div>
                            </>
                        )}

                        {error.type === 'private' && (
                            <>
                                <Lock className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                                <h1 className="text-2xl font-bold text-foreground mb-2">Portfolio is Private</h1>
                                <p className="text-muted-foreground mb-6">
                                    This user has chosen to keep their portfolio private.
                                </p>
                                <Button onClick={() => navigate('/')} className="w-full">
                                    Go to Home
                                </Button>
                            </>
                        )}

                        {error.type === 'network' && (
                            <>
                                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                                <h1 className="text-2xl font-bold text-foreground mb-2">Connection Error</h1>
                                <p className="text-muted-foreground mb-6">{error.message}</p>
                                <div className="space-y-3">
                                    <Button onClick={() => window.location.reload()} className="w-full">
                                        Retry
                                    </Button>
                                    <Button onClick={() => navigate('/')} variant="outline" className="w-full">
                                        Go to Home
                                    </Button>
                                </div>
                            </>
                        )}
                    </Card>
                </div>
            </>
        );
    }

    // Success - render portfolio with SEO
    if (!portfolioData) return null;

    // Truncate description for meta tags (155 characters max for SEO)
    const metaDescription = portfolioData.about
        ? `${portfolioData.title} - ${portfolioData.about.substring(0, 155)}${portfolioData.about.length > 155 ? '...' : ''}`
        : `${portfolioData.title} - View ${portfolioData.name}'s professional portfolio`;

    return (
        <>
            <Helmet>
                {/* Primary Meta Tags */}
                <title>{portfolioData.name} - Portfolio | PortFolia</title>
                <meta name="title" content={`${portfolioData.name} - Portfolio | PortFolia`} />
                <meta name="description" content={metaDescription} />

                {/* Canonical URL */}
                <link rel="canonical" href={`${window.location.origin}/portfolio/${portfolioData.username}`} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="profile" />
                <meta property="og:url" content={`${window.location.origin}/portfolio/${portfolioData.username}`} />
                <meta property="og:title" content={`${portfolioData.name}'s Portfolio`} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:site_name" content="PortFolia" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={`${window.location.origin}/portfolio/${portfolioData.username}`} />
                <meta name="twitter:title" content={`${portfolioData.name}'s Portfolio`} />
                <meta name="twitter:description" content={metaDescription} />

                {/* Additional SEO */}
                <meta name="author" content={portfolioData.name} />
                <meta name="robots" content="index, follow" />
            </Helmet>

            {/* Reuse MainPortfolio component but pass data as props */}
            <MainPortfolio portfolioData={portfolioData} isPublicView={true} />
        </>
    );
};

export default PublicPortfolioPage;
