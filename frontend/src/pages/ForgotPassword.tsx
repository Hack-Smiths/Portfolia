import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import API from '@/api/axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await API.post('/api/v1/auth/password-reset-request', { email });
            setIsSubmitted(true);
            toast({
                title: "Reset link sent",
                description: "If an account exists with this email, you will receive a reset link shortly.",
            });
        } catch (error: any) {
            console.error('Password reset request error:', error);
            toast({
                title: "Error",
                description: error.response?.data?.detail || "Failed to send reset link. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-soft px-4">
                <Card className="max-w-md w-full p-8 text-center glass-card animate-fade-in">
                    <div className="mb-6 flex justify-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Check your email</h2>
                    <p className="text-foreground-muted mb-8 text-sm">
                        We've sent a password reset link to <span className="font-semibold text-foreground">{email}</span>.
                        Please check your inbox and follow the instructions.
                    </p>
                    <div className="space-y-4">
                        <Button className="w-full" variant="outline" onClick={() => setIsSubmitted(false)}>
                            Try another email
                        </Button>
                        <Link to="/auth" className="block text-sm text-primary hover:underline">
                            Back to login
                        </Link>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-soft px-4">
            <Card className="max-w-md w-full p-8 glass-card animate-slide-in-up">
                <div className="mb-8 text-center">
                    <div className="mb-4 flex justify-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Mail className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Forgot Password?</h1>
                    <p className="text-sm text-foreground-muted">
                        No worries! Enter your email and we'll send you a link to reset your password.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-background/50"
                        />
                    </div>

                    <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Sending Link...
                            </>
                        ) : (
                            "Send Reset Link"
                        )}
                    </Button>

                    <Link
                        to="/auth"
                        className="flex items-center justify-center text-sm text-foreground-muted hover:text-primary transition-colors gap-2"
                    >
                        <ArrowLeft className="w-3 h-3" />
                        Back to Login
                    </Link>
                </form>
            </Card>
        </div>
    );
};

export default ForgotPassword;
