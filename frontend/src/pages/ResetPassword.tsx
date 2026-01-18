import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import API from '@/api/axios';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValidating, setIsValidating] = useState(true);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setIsValidating(false);
                setIsTokenValid(false);
                return;
            }

            try {
                const response = await API.get(`/validate-reset-token/${token}`);
                if (response.data.valid) {
                    setIsTokenValid(true);
                    setEmail(response.data.email);
                } else {
                    setIsTokenValid(false);
                }
            } catch (error) {
                console.error('Token validation error:', error);
                setIsTokenValid(false);
            } finally {
                setIsValidating(false);
            }
        };

        validateToken();
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast({
                title: "Passwords don't match",
                description: "Please make sure your passwords match.",
                variant: "destructive",
            });
            return;
        }

        if (password.length < 8) {
            toast({
                title: "Password too short",
                description: "Password must be at least 8 characters long.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            await API.post('/password-reset-confirm', {
                token,
                new_password: password
            });
            setIsSuccess(true);
            toast({
                title: "Password reset successful",
                description: "You can now log in with your new password.",
            });
            setTimeout(() => navigate('/auth'), 3000);
        } catch (error: any) {
            console.error('Password reset confirmation error:', error);
            toast({
                title: "Error",
                description: error.response?.data?.detail || "Failed to reset password. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isValidating) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-soft px-4">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-foreground-muted">Validating your reset token...</p>
                </div>
            </div>
        );
    }

    if (!isTokenValid) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-soft px-4">
                <Card className="max-w-md w-full p-8 text-center glass-card">
                    <div className="mb-6 flex justify-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-red-600" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Invalid or Expired Link</h2>
                    <p className="text-foreground-muted mb-8 text-sm">
                        This password reset link is invalid or has expired. Please request a new one.
                    </p>
                    <div className="space-y-4">
                        <Button className="w-full btn-primary" onClick={() => navigate('/forgot-password')}>
                            Request New Link
                        </Button>
                        <Link to="/auth" className="block text-sm text-foreground-muted hover:text-primary">
                            Back to login
                        </Link>
                    </div>
                </Card>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-soft px-4">
                <Card className="max-w-md w-full p-8 text-center glass-card animate-scale-in">
                    <div className="mb-6 flex justify-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Password reset!</h2>
                    <p className="text-foreground-muted mb-8 text-sm">
                        Your password has been successfully updated. Redirecting you to the login page...
                    </p>
                    <Button className="w-full btn-primary" onClick={() => navigate('/auth')}>
                        Go to Login Now
                    </Button>
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
                            <Lock className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Set New Password</h1>
                    <p className="text-sm text-foreground-muted">
                        Resetting password for <span className="font-medium text-foreground">{email}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="password">New Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="At least 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-background/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Repeat new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="bg-background/50"
                        />
                    </div>

                    <Button type="submit" className="w-full btn-primary mt-6" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Resetting Password...
                            </>
                        ) : (
                            "Reset Password"
                        )}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default ResetPassword;
