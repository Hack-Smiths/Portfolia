import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Auth = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch("https://portfolia-production.up.railway.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setLoginError(errorData.detail || "Login failed");
        return;
      }
      window.location.href = "/dashboard";

      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      // navigate("/dashboard");
    } catch (err) {
      setLoginError("Something went wrong, Please try again");
      console.error(err);
    }
  };


  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');
    if (signupForm.password !== signupForm.confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("https://portfolia-production.up.railway.app/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: signupForm.name,
          email: signupForm.email,
          password: signupForm.password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setSignupError(errorData.detail || "Signup failed");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.access_token); // store JWT token
      window.location.href = "/dashboard";
    } catch (err) {
      setSignupError("Something went wrong during signup");
      console.error(err);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-scale-in">
        <Card className="glass-card">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <img src="/programming.png" alt="Icon" className="w-14 h-14 object-contain" />
            </div>
            <h1 className="text-2xl font-space font-bold text-gradient-primary mb-2">
              Welcome to PortFolia
            </h1>
            <p className="text-foreground-muted">
              Build your professional identity with AI
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      required
                    />
                  </div>
                </div>
                {loginError && (
                  <p className="text-sm text-red-500 text-center">{loginError}</p>
                )}
                <Button type="submit" className="btn-primary w-full">
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <div className="text-center">
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot your password?
                  </a>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10"
                      value={signupForm.name}
                      onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm" className="text-sm font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                </div>
                {signupError && (
                  <p className="text-sm text-red-500 text-center">{signupError}</p>
                )}
                <Button type="submit" className="btn-primary w-full">
                  Create Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-xs text-foreground-muted text-center">
                  By signing up, you agree to our{' '}
                  <a href="#" className="text-primary hover:underline">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </p>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-sm text-foreground-muted">
              Continue with social accounts
            </p>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" className="flex-1">
                GitHub
              </Button>
              <Button variant="outline" className="flex-1">
                Google
              </Button>
            </div>
          </div>
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;