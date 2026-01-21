import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
    Github,
    Linkedin,
    Mail,
    Send,
    Loader2,
    ExternalLink,
    MessageCircle,
    Twitter,
    FileText
} from 'lucide-react';
import { API_URL } from '@/utils/api';

interface ContactSectionProps {
    username: string;
    email?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    resumeUrl?: string;
}

const ContactSection = ({ username, email, github, linkedin, twitter, resumeUrl }: ContactSectionProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/contact/${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to send message');

            toast({
                title: "Message sent!",
                description: "Your message has been delivered successfully.",
            });

            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to send message. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div id="contact" className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent opacity-50" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-space font-bold mb-4">
                        Get In <span className="text-gradient-primary">Touch</span>
                    </h2>
                    <p className="text-foreground-muted max-w-2xl mx-auto">
                        Have a project in mind or want to collaborate? Feel free to reach out directly or send a message below.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Info & Socials */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold">Connect with me</h3>
                            <p className="text-foreground-muted">
                                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                            </p>

                            <div className="space-y-4">
                                {email && (
                                    <a href={`mailto:${email}`} className="flex items-center p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-colors group">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                            <Mail className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Email Me</h4>
                                            <p className="text-sm text-foreground-muted group-hover:text-primary transition-colors">{email}</p>
                                        </div>
                                    </a>
                                )}

                                {linkedin && (
                                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-colors group">
                                        <div className="h-12 w-12 rounded-full bg-[#0A66C2]/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                            <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">LinkedIn</h4>
                                            <p className="text-sm text-foreground-muted group-hover:text-[#0A66C2] transition-colors">Connect professionally</p>
                                        </div>
                                        <ExternalLink className="w-4 h-4 ml-auto text-foreground-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                )}

                                {github && (
                                    <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-colors group">
                                        <div className="h-12 w-12 rounded-full bg-foreground/5 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                            <Github className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">GitHub</h4>
                                            <p className="text-sm text-foreground-muted group-hover:text-foreground transition-colors">Check my code</p>
                                        </div>
                                        <ExternalLink className="w-4 h-4 ml-auto text-foreground-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                )}

                                {resumeUrl && (
                                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-colors group">
                                        <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                            <FileText className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Resume</h4>
                                            <p className="text-sm text-foreground-muted group-hover:text-orange-600 transition-colors">View my CV</p>
                                        </div>
                                        <ExternalLink className="w-4 h-4 ml-auto text-foreground-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <Card className="glass-card p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            required
                                            className="bg-background/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                            required
                                            className="bg-background/50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="How can I help you?"
                                        value={formData.message}
                                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                        required
                                        className="min-h-[150px] bg-background/50"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full btn-primary"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        Send Message
                                    </>
                                )}
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
