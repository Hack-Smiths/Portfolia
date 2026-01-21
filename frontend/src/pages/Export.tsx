import { useState, useEffect } from 'react';
import { Download, Link2, Share2, Palette, Eye, QrCode, Copy, CheckCircle, Globe, Mail, Github, Linkedin, MessageCircle, Facebook, FileText, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { pdf } from '@react-pdf/renderer';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { getPortfolioPreview, updatePortfolioSettings } from '@/utils/api';
import { ClassicResumePDF } from '@/components/pdf/ClassicResumePDF';
import { ModernResumePDF } from '@/components/pdf/ModernResumePDF';
import { mapPortfolioToResume, generatePDFFilename } from '@/utils/pdfMapper';

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
  const [savedTemplate, setSavedTemplate] = useState('');

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

  // PDF Export State
  const [pdfTemplate, setPdfTemplate] = useState<'classic' | 'modern'>('classic');
  const [pdfSections, setPdfSections] = useState({
    includeAbout: true,
    includeProjects: true,
    includeSkills: true,
    includeExperience: true,
    includeCertificates: true,
  });
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

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
        if (data.theme_preference) {
          setSelectedTemplate(data.theme_preference);
          setSavedTemplate(data.theme_preference);
        }
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

  const handleDownloadPDF = async () => {
    if (!portfolioData) {
      toast({
        title: "No data available",
        description: "Please wait for portfolio data to load",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingPDF(true);

    try {
      // Map portfolio data to resume format
      const resumeData = mapPortfolioToResume(portfolioData);

      // Select the appropriate PDF template component
      const PDFComponent = pdfTemplate === 'classic'
        ? <ClassicResumePDF data={resumeData} sections={pdfSections} />
        : <ModernResumePDF data={resumeData} sections={pdfSections} />;

      // Generate PDF blob
      const blob = await pdf(PDFComponent).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = generatePDFFilename(username);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "PDF Downloaded!",
        description: `Your ${pdfTemplate} resume has been downloaded successfully`,
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "PDF Generation Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
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

  const handleSaveTheme = async () => {
    try {
      await updatePortfolioSettings({ theme_preference: selectedTemplate });
      setSavedTemplate(selectedTemplate);
      toast({
        title: "Theme Saved",
        description: "Your portfolio theme has been updated successfully.",
      });
    } catch (error) {
      console.error("Failed to save theme:", error);
      toast({
        title: "Error",
        description: "Failed to save theme preference.",
        variant: "destructive",
      });
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
      <div className="container mx-auto px-4 py-4">
        {/* Header & Share Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 animate-fade-in">
          <div>
            <h1 className="text-2xl lg:text-3xl font-space font-bold text-gradient-primary mb-1">
              Export & Share
            </h1>
            <p className="text-sm text-foreground-muted">
              Customize your portfolio and share it with the world
            </p>
          </div>

          {/* Integrated Share Section within Header */}
          <Card className="glass-card p-3 flex flex-col gap-3 shadow-sm border-primary/20 bg-white/50 w-full lg:w-auto min-w-[320px] lg:min-w-[450px]">
            <div className="flex items-center space-x-2">
              <Input value={portfolioUrl} readOnly className="flex-1 bg-white h-8 text-xs" />
              <Button onClick={handleCopyLink} size="icon" variant="outline" className="h-8 w-8 shrink-0">
                <Copy className="w-3.5 h-3.5" />
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs shrink-0" onClick={handleViewMainPortfolio}>
                <Eye className="w-3.5 h-3.5 mr-1" />
                Public View
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-foreground-muted mr-2">Quick Share:</span>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleShare('twitter')}>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-[#0A66C2]" onClick={() => handleShare('linkedin')}><Linkedin className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-[#25D366]" onClick={() => handleShare('whatsapp')}><MessageCircle className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-[#1877F2]" onClick={() => handleShare('facebook')}><Facebook className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-primary" onClick={() => handleShare('email')}><Mail className="w-3.5 h-3.5" /></Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left Column */}
          <div className="space-y-4">
            {/* 1. PDF Resume Export */}
            <Card className="glass-card animate-slide-in-up">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-4 h-4 text-primary" />
                <h2 className="text-base font-semibold">Resume PDF Export</h2>
              </div>

              <div className="space-y-4">
                {/* PDF Template Selector (Compact Row) */}
                <div>
                  <Label className="text-xs font-medium mb-2 block">Choose PDF Template</Label>
                  <RadioGroup value={pdfTemplate} onValueChange={(value: 'classic' | 'modern') => setPdfTemplate(value)} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="classic" id="pdf-classic" className="scale-90" />
                      <Label htmlFor="pdf-classic" className="text-xs cursor-pointer">Classic</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="modern" id="pdf-modern" className="scale-90" />
                      <Label htmlFor="pdf-modern" className="text-xs cursor-pointer">Modern</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Section Selection (Compact Grid) */}
                <div>
                  <Label className="text-xs font-medium mb-2 block">Include Sections</Label>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-1.5 gap-x-2">
                    {Object.entries({
                      includeAbout: 'Summary',
                      includeSkills: 'Skills',
                      includeExperience: 'Expr.',
                      includeProjects: 'Projects',
                      includeCertificates: 'Certs'
                    }).map(([key, label]) => (
                      <div key={key} className="flex items-center space-x-1.5">
                        <Switch
                          id={`pdf-${key}`}
                          className="scale-[0.6] origin-left"
                          checked={pdfSections[key]}
                          onCheckedChange={(checked) =>
                            setPdfSections(prev => ({ ...prev, [key]: checked }))
                          }
                        />
                        <Label htmlFor={`pdf-${key}`} className="text-[10px] cursor-pointer whitespace-nowrap">{label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Download Button */}
                <Button
                  className="w-full btn-primary"
                  size="sm"
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF || isLoadingPortfolio}
                >
                  {isGeneratingPDF ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume PDF
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* 2. QR Code Section (Split Column) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* QR Preview (Left Sub-column) */}
              <Card className="glass-card animate-slide-in-up flex flex-col items-center justify-center p-4 bg-white/50">
                <h3 className="text-xs font-semibold mb-3 text-foreground-muted flex items-center">
                  <QrCode className="w-3 h-3 mr-2" />
                  Live Preview
                </h3>
                <div className="p-3 bg-white rounded-xl shadow-sm border border-border/50 mb-3">
                  <img
                    src={qrCodeUrl}
                    alt="Portfolio QR Code"
                    className="w-auto h-auto transition-all duration-300"
                    style={{ maxWidth: '140px', maxHeight: '140px' }}
                    onError={(e) => {
                      console.error('QR code failed to load');
                    }}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-8 text-xs"
                  onClick={handleDownloadQR}
                >
                  <Download className="w-3 h-3 mr-2" />
                  Save PNG
                </Button>
              </Card>

              {/* QR Options (Right Sub-column) */}
              <Card className="glass-card animate-slide-in-up">
                <h3 className="text-sm font-semibold mb-3">Customize QR</h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="qr-size" className="text-xs font-medium mb-1 block">Size</Label>
                    <Select
                      value={qrSettings.size}
                      onValueChange={(value) => setQrSettings(prev => ({ ...prev, size: value }))}
                    >
                      <SelectTrigger id="qr-size" className="h-8 text-xs">
                        <SelectValue placeholder="Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="150">Small (150px)</SelectItem>
                        <SelectItem value="200">Medium (200px)</SelectItem>
                        <SelectItem value="300">Large (300px)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs font-medium mb-1.5 block">Colors</Label>
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <Label htmlFor="qr-fg" className="text-[10px] text-foreground-muted mb-1 block">Foreground</Label>
                        <div className="flex items-center space-x-1">
                          <Input
                            id="qr-fg"
                            type="color"
                            value={`#${qrSettings.fgColor}`}
                            onChange={(e) => handleColorChange('fg', e.target.value)}
                            className="w-8 h-8 p-0 border-0 overflow-hidden rounded cursor-pointer"
                          />
                          <Input
                            value={`#${qrSettings.fgColor}`}
                            readOnly
                            className="h-8 text-xs font-mono px-2"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <div className="flex-1">
                        <Label htmlFor="qr-bg" className="text-[10px] text-foreground-muted mb-1 block">Background</Label>
                        <div className="flex items-center space-x-1">
                          <Input
                            id="qr-bg"
                            type="color"
                            value={`#${qrSettings.bgColor}`}
                            onChange={(e) => handleColorChange('bg', e.target.value)}
                            className="w-8 h-8 p-0 border-0 overflow-hidden rounded cursor-pointer"
                          />
                          <Input
                            value={`#${qrSettings.bgColor}`}
                            readOnly
                            className="h-8 text-xs font-mono px-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetQrSettings}
                    className="w-full text-xs h-8"
                  >
                    Reset Defaults
                  </Button>
                </div>
              </Card>
            </div>


            {/* 3. Export Settings & Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="glass-card animate-slide-in-up">
                <h2 className="text-base font-semibold mb-3">Export Settings</h2>
                <div className="space-y-2">
                  {Object.entries({
                    includeContact: 'Contact Info',
                    includeProjects: 'Projects',
                    includeAchievements: 'Experience',
                    includeSkills: 'Skills'
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between">
                      <Label htmlFor={key} className="text-xs font-medium cursor-pointer">
                        {label}
                      </Label>
                      <Switch
                        id={key}
                        className="scale-75 origin-right"
                        checked={exportSettings[key]}
                        onCheckedChange={(checked) =>
                          setExportSettings(prev => ({ ...prev, [key]: checked }))
                        }
                      />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="glass-card animate-slide-in-up">
                <h2 className="text-base font-semibold mb-3">Analytics</h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold text-primary">{projects.length}</div>
                    <div className="text-[10px] text-foreground-muted uppercase tracking-wider">Projects</div>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded-lg">
                    <div className="text-xl font-bold text-electric">{skills.length}</div>
                    <div className="text-[10px] text-foreground-muted uppercase tracking-wider">Skills</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* 1. Theme Selection (Compact Square Grid - RESTORED TO TOP) */}
            <Card className="glass-card animate-slide-in-right">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Palette className="w-4 h-4 text-primary" />
                  <h2 className="text-base font-semibold">Theme Selection</h2>
                </div>
                {/* Save Button integrated in header */}
                <Button
                  size="sm"
                  className={`transition-all duration-300 ${selectedTemplate === savedTemplate
                    ? 'bg-muted text-foreground-muted cursor-default border border-border'
                    : 'btn-primary shadow-lg'
                    }`}
                  onClick={handleSaveTheme}
                  disabled={selectedTemplate === savedTemplate}
                >
                  {selectedTemplate === savedTemplate ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1.5" />
                      Saved
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`relative rounded-md border shadow-sm cursor-pointer transition-all duration-200 flex items-center justify-center py-2.5 px-2 ${selectedTemplate === template.id
                      ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary/20'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50 text-foreground-muted hover:text-foreground'
                      }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <span className="font-semibold text-sm text-center truncate z-10">
                      {template.name.split(' ')[0]}
                    </span>

                    {selectedTemplate === template.id && (
                      <div className="absolute top-1 right-1 text-primary">
                        <CheckCircle className="w-2 h-2" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* 2. Live Preview (RESTORED TO BELOW THEME) */}
            <Card className="glass-card animate-slide-in-right">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold flex items-center">
                  <Eye className="w-4 h-4 mr-2 text-primary" />
                  Live Preview
                </h2>
                <Badge className="bg-success/10 text-success text-xs px-2 py-0.5">
                  <Globe className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>

              {/* Portfolio Hero Section Preview */}
              <div className="mb-2">
                {isLoadingPortfolio ? (
                  <div className="p-6 bg-muted/50 rounded-lg flex items-center justify-center h-[200px]">
                    <p className="text-sm text-foreground-muted flex items-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </p>
                  </div>
                ) : (
                  <PortfolioHeroPreview
                    template={selectedTemplate}
                    profile={portfolioData || profile}
                  />
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Export;