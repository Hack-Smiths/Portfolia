import { useState, useEffect } from 'react';
import { Download, Link2, Share2, Palette, Eye, QrCode, Copy, CheckCircle, Globe, Mail, Github, Linkedin, MessageCircle, Facebook } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getPortfolioPreview } from '@/utils/api';

// Portfolio Hero Section Preview Component
const PortfolioHeroPreview = ({ template, profile }) => {
  const heroStyles = {
    classic: 'bg-gradient-to-br from-gray-50 via-blue-50 to-white',
    creative: 'bg-gradient-to-br from-orange-50 via-white to-red-50',
    modern: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
  };

  const textStyles = {
    classic: 'text-gray-900',
    creative: 'text-gray-900',
    modern: 'text-white'
  };

  const mutedStyles = {
    classic: 'text-gray-600',
    creative: 'text-gray-700',
    modern: 'text-gray-300'
  };

  const accentStyles = {
    classic: 'bg-blue-600 text-white',
    creative: 'bg-gradient-to-r from-orange-600 to-red-600 text-white',
    modern: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  return (
    <div className={`p-8 rounded-lg ${heroStyles[template] || heroStyles.classic} min-h-[300px] flex items-center justify-center`}>
      <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-2xl">
        {/* Avatar */}
        <div className="flex-shrink-0 relative">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold ${template === 'modern' ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white' :
            template === 'creative' ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white' :
              'bg-gradient-to-br from-blue-500 to-indigo-500 text-white'
            } shadow-lg`}>
            {profile?.avatar ? (
              <img src={profile.avatar} alt={profile.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              getInitials(profile?.name || 'User')
            )}
          </div>
          {/* Available Badge */}
          <div className="absolute -bottom-1 -right-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <span>Available</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left space-y-3">
          <div>
            <h1 className={`text-2xl font-bold ${textStyles[template]} mb-1`}>
              {profile?.name || 'Your Name'}
            </h1>
            <p className={`text-base font-medium ${mutedStyles[template]}`}>
              {profile?.title || 'Full Stack Developer'}
            </p>
            <div className={`w-12 h-0.5 ${template === 'modern' ? 'bg-purple-500' : template === 'creative' ? 'bg-orange-500' : 'bg-blue-500'} mx-auto md:mx-0 mt-2 rounded-full`}></div>
          </div>

          <p className={`text-sm ${mutedStyles[template]} leading-relaxed`}>
            {profile?.bio?.substring(0, 80) || 'Building the future with code, one project at a time'}
            {profile?.bio?.length > 80 && '...'}
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start text-xs">
            {profile?.location && (
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${template === 'modern' ? 'bg-white/10 text-white' : 'bg-white border border-gray-200'
                }`}>
                <Globe className="w-3 h-3" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile?.email && (
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${template === 'modern' ? 'bg-white/10 text-white' : 'bg-white border border-gray-200'
                }`}>
                <Mail className="w-3 h-3" />
                <span>{profile.email.substring(0, 20)}{profile.email.length > 20 && '...'}</span>
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="flex gap-2 justify-center md:justify-start">
            {profile?.github && (
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${template === 'modern' ? 'bg-white/10 hover:bg-white/20' : 'bg-white border border-gray-200 hover:border-gray-300'
                } transition-colors cursor-pointer`}>
                <Github className="w-4 h-4" />
              </div>
            )}
            {profile?.linkedin && (
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${template === 'modern' ? 'bg-white/10 hover:bg-white/20' : 'bg-white border border-gray-200 hover:border-gray-300'
                } transition-colors cursor-pointer`}>
                <Linkedin className="w-4 h-4" />
              </div>
            )}
            {profile?.website && (
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${template === 'modern' ? 'bg-white/10 hover:bg-white/20' : 'bg-white border border-gray-200 hover:border-gray-300'
                } transition-colors cursor-pointer`}>
                <Globe className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Export = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuthContext();
  const { selectedTemplate, setSelectedTemplate, projects, skills, achievements, profile } = usePortfolio();

  const [exportSettings, setExportSettings] = useState({
    includeContact: true,
    includeProjects: true,
    includeAchievements: true,
    includeSkills: true,
    customDomain: false
  });

  const [qrSettings, setQrSettings] = useState({
    size: '200',
    fgColor: '000000', // hex without #
    bgColor: 'ffffff'  // hex without #
  });

  const [portfolioData, setPortfolioData] = useState(null);
  const [isLoadingPortfolio, setIsLoadingPortfolio] = useState(true);

  // Generate dynamic portfolio URL
  const username = user?.username || 'user';
  const portfolioUrl = `https://portfolia-ai.vercel.app/portfolio/${username}`;

  // Generate QR code URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSettings.size}x${qrSettings.size}&data=${encodeURIComponent(portfolioUrl)}&color=${qrSettings.fgColor}&bgcolor=${qrSettings.bgColor}`;

  const templates = [
    {
      id: 'classic',
      name: 'Classic Professional',
      preview: 'bg-white border-2 border-gray-200',
      description: 'Clean and professional design'
    },
    {
      id: 'creative',
      name: 'Creative Timeline',
      preview: 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200',
      description: 'Creative timeline layout'
    },
    {
      id: 'modern',
      name: 'Futuristic Modern',
      preview: 'bg-gradient-to-br from-purple-900 to-blue-900 border-2 border-electric',
      description: 'Bold and futuristic design'
    }
  ];

  // Fetch portfolio data for footer preview
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolioPreview();
        setPortfolioData(data);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setIsLoadingPortfolio(false);
      }
    };
    fetchPortfolio();
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioUrl);
    toast({
      title: "Link copied!",
      description: "Portfolio URL copied to clipboard",
    });
  };

  const handleDownloadPDF = () => {
    // Dummy PDF download
    console.log('Downloading PDF...');
    toast({
      title: "Coming soon!",
      description: "PDF export feature is under development",
    });
  };

  const handleDownloadQR = async () => {
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `portfolio-qr-${username}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "QR Code downloaded!",
        description: `Saved as portfolio-qr-${username}.png`,
      });
    } catch (error) {
      console.error('Failed to download QR code:', error);
      toast({
        title: "Download failed",
        description: "Failed to download QR code. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleOpenFullPreview = () => {
    navigate('/portfolio');
  };

  const handleViewMainPortfolio = () => {
    window.location.href = `https://portfolia-ai.vercel.app/portfolio/${username}`;
  };

  const handleShare = (platform: string) => {
    const userName = portfolioData?.name || user?.full_name || user?.username || 'My';
    const shareText = 'Check out my portfolio!';

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(portfolioUrl)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portfolioUrl)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent('Check out my portfolio: ' + portfolioUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(portfolioUrl)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(`Check out my portfolio - ${userName}`)}&body=${encodeURIComponent(`Hi! I'd love to share my portfolio with you: ${portfolioUrl}`)}`, '_blank');
        break;
    }
  };

  const resetQrSettings = () => {
    setQrSettings({
      size: '200',
      fgColor: '000000',
      bgColor: 'ffffff'
    });
    toast({
      title: "QR settings reset",
      description: "QR code settings restored to defaults",
    });
  };

  const handleColorChange = (type: 'fg' | 'bg', color: string) => {
    // Remove # from color
    const hexColor = color.replace('#', '');
    if (type === 'fg') {
      setQrSettings(prev => ({ ...prev, fgColor: hexColor }));
    } else {
      setQrSettings(prev => ({ ...prev, bgColor: hexColor }));
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-soft">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl lg:text-4xl font-space font-bold text-gradient-primary mb-2">
            Export & Share
          </h1>
          <p className="text-foreground-muted">
            Customize your portfolio and share it with the world
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Settings */}
          <div className="space-y-6">
            {/* Template Selection */}
            <Card className="glass-card animate-slide-in-up">
              <div className="flex items-center space-x-2 mb-6">
                <Palette className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Choose Template</h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedTemplate === template.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                      }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-8 rounded ${template.preview}`} />
                      <div className="flex-1">
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-foreground-muted">{template.description}</p>
                      </div>
                      {selectedTemplate === template.id && (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Export Settings */}
            <Card className="glass-card animate-slide-in-up">
              <h2 className="text-xl font-semibold mb-6">Export Settings</h2>

              <div className="space-y-4">
                {Object.entries({
                  includeContact: 'Contact Information',
                  includeProjects: 'Projects Section',
                  includeAchievements: 'Achievements & Experience',
                  includeSkills: 'Skills Section'
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label htmlFor={key} className="text-sm font-medium cursor-pointer">
                      {label}
                    </Label>
                    <Switch
                      id={key}
                      checked={exportSettings[key]}
                      onCheckedChange={(checked) =>
                        setExportSettings(prev => ({ ...prev, [key]: checked }))
                      }
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Share Options */}
            <Card className="glass-card animate-slide-in-up">
              <div className="flex items-center space-x-2 mb-6">
                <Share2 className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Share Options</h2>
              </div>

              <Tabs defaultValue="link" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="link">Share Link</TabsTrigger>
                  <TabsTrigger value="download">Download</TabsTrigger>
                </TabsList>

                <TabsContent value="link" className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <Input
                        value={portfolioUrl}
                        readOnly
                        className="flex-1"
                      />
                      <Button onClick={handleCopyLink}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>

                    <Button
                      className="w-full btn-primary"
                      onClick={handleViewMainPortfolio}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Main Portfolio
                    </Button>

                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('twitter')}
                        className="flex items-center justify-center"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('linkedin')}
                        className="flex items-center justify-center"
                      >
                        <Linkedin className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('whatsapp')}
                        className="flex items-center justify-center"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('facebook')}
                        className="flex items-center justify-center"
                      >
                        <Facebook className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('email')}
                        className="flex items-center justify-center col-span-2"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="download" className="space-y-4">
                  <div className="space-y-3">
                    <Button
                      className="w-full btn-primary"
                      onClick={handleDownloadPDF}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>

                    <div className="text-center">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleDownloadQR}
                      >
                        <QrCode className="w-4 h-4 mr-2" />
                        Download QR Code
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Analytics */}
            <Card className="glass-card animate-slide-in-up">
              <h2 className="text-xl font-semibold mb-4">Portfolio Analytics</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{projects.length}</div>
                  <div className="text-xs text-foreground-muted">Projects</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-electric">{skills.length}</div>
                  <div className="text-xs text-foreground-muted">Skills</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Side - Preview */}
          <div className="space-y-6">
            <Card className="glass-card animate-slide-in-right">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-primary" />
                  Live Preview
                </h2>
                <Badge className="bg-success/10 text-success">
                  <Globe className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>

              {/* Portfolio Hero Section Preview */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-3 text-foreground-muted">Hero Section Preview</h3>
                {isLoadingPortfolio ? (
                  <div className="p-6 bg-muted/50 rounded-lg flex items-center justify-center">
                    <p className="text-sm text-foreground-muted">Loading portfolio data...</p>
                  </div>
                ) : (
                  <PortfolioHeroPreview
                    template={selectedTemplate}
                    profile={portfolioData || profile}
                  />
                )}
              </div>

              {/* Preview Actions */}
              <div className="mt-4 space-y-3">
                <Button className="w-full btn-primary" onClick={handleOpenFullPreview}>
                  <Eye className="w-4 h-4 mr-2" />
                  Open Full Preview
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={handleDownloadPDF}>
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button variant="outline" onClick={handleCopyLink}>
                    <Link2 className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </div>
            </Card>

            {/* QR Code Display */}
            <Card className="glass-card animate-slide-in-right">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <QrCode className="w-5 h-5 mr-2 text-primary" />
                QR Code
              </h3>

              <div className="flex justify-center mb-4">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <img
                    src={qrCodeUrl}
                    alt="Portfolio QR Code"
                    className="w-auto h-auto"
                    style={{ maxWidth: `${qrSettings.size}px`, maxHeight: `${qrSettings.size}px` }}
                    onError={(e) => {
                      console.error('QR code failed to load');
                      toast({
                        title: "QR Code Error",
                        description: "Failed to generate QR code",
                        variant: "destructive",
                      });
                    }}
                  />
                </div>
              </div>

              <p className="text-center text-sm text-foreground-muted mb-4">
                Scan to view portfolio on mobile
              </p>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleDownloadQR}
              >
                <Download className="w-4 h-4 mr-2" />
                Download QR Code
              </Button>
            </Card>

            {/* QR Code Customization */}
            <Card className="glass-card animate-slide-in-right">
              <h3 className="text-lg font-semibold mb-4">Customize QR Code</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="qr-size" className="text-sm font-medium mb-2 block">
                    Size
                  </Label>
                  <Select
                    value={qrSettings.size}
                    onValueChange={(value) => setQrSettings(prev => ({ ...prev, size: value }))}
                  >
                    <SelectTrigger id="qr-size">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="150">Small (150x150)</SelectItem>
                      <SelectItem value="200">Medium (200x200)</SelectItem>
                      <SelectItem value="300">Large (300x300)</SelectItem>
                      <SelectItem value="500">XLarge (500x500)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="qr-fg-color" className="text-sm font-medium mb-2 block">
                    Foreground Color
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="qr-fg-color"
                      type="color"
                      value={`#${qrSettings.fgColor}`}
                      onChange={(e) => handleColorChange('fg', e.target.value)}
                      className="w-20 h-10"
                    />
                    <Input
                      value={`#${qrSettings.fgColor}`}
                      readOnly
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="qr-bg-color" className="text-sm font-medium mb-2 block">
                    Background Color
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="qr-bg-color"
                      type="color"
                      value={`#${qrSettings.bgColor}`}
                      onChange={(e) => handleColorChange('bg', e.target.value)}
                      className="w-20 h-10"
                    />
                    <Input
                      value={`#${qrSettings.bgColor}`}
                      readOnly
                      className="flex-1"
                    />
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={resetQrSettings}
                  className="w-full"
                >
                  Reset to Defaults
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Export;