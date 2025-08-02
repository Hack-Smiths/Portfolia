import { useState } from 'react';
import { Download, Link2, Share2, Palette, Eye, QrCode, Copy, CheckCircle, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const Export = () => {
  const navigate = useNavigate();
  const { selectedTemplate, setSelectedTemplate, projects, skills, achievements, profile } = usePortfolio();
  const [exportSettings, setExportSettings] = useState({
    includeContact: true,
    includeProjects: true,
    includeAchievements: true,
    includeSkills: true,
    customDomain: false
  });

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

  const portfolioUrl = 'https://portfolia.dev/alex-johnson';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(portfolioUrl);
  };

  const handleDownloadPDF = () => {
    // Dummy PDF download
    console.log('Downloading PDF...');
  };

  const handleOpenFullPreview = () => {
    navigate('/portfolio');
  };

  const handleViewMainPortfolio = () => {
    navigate(`/main-portfolio?template=${selectedTemplate}`);
  };

  const handleShare = (platform) => {
    const shareText = `Check out my portfolio: ${portfolioUrl}`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`);
        break;
      case 'linkedin':
        window.open(`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portfolioUrl)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=My Portfolio&body=${encodeURIComponent(shareText)}`);
        break;
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
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTemplate === template.id 
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
                      >
                        Twitter
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleShare('linkedin')}
                      >
                        LinkedIn
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleShare('email')}
                      >
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
                      <Button variant="outline" className="w-full">
                        <QrCode className="w-4 h-4 mr-2" />
                        Generate QR Code
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

              {/* Portfolio Preview */}
              <div className={`relative overflow-hidden rounded-lg border-2 ${
                selectedTemplate === 'classic' ? 'bg-white border-gray-200' :
                selectedTemplate === 'creative' ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200' :
                'bg-gradient-to-br from-purple-900 to-blue-900 border-electric'
              }`}>
                {/* Mini Portfolio Preview */}
                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full" />
                    <div>
                      <div className={`h-3 rounded mb-1 ${
                        selectedTemplate === 'modern' ? 'bg-white/80' : 'bg-foreground/80'
                      }`} style={{ width: `${profile.name.length * 8}px` }} />
                      <div className={`h-2 rounded ${
                        selectedTemplate === 'modern' ? 'bg-white/60' : 'bg-foreground/60'
                      }`} style={{ width: `${profile.location.length * 6}px` }} />
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <div className={`h-2 rounded ${
                      selectedTemplate === 'modern' ? 'bg-white/60' : 'bg-foreground/60'
                    }`} />
                    <div className={`h-2 rounded ${
                      selectedTemplate === 'modern' ? 'bg-white/60' : 'bg-foreground/60'
                    }`} style={{ width: '85%' }} />
                  </div>

                  {/* Projects */}
                  {exportSettings.includeProjects && (
                    <div className="grid grid-cols-2 gap-2">
                      {projects.slice(0, 2).map((_, i) => (
                        <div 
                          key={i}
                          className={`aspect-video rounded ${
                            selectedTemplate === 'modern' ? 'bg-white/20' : 'bg-foreground/10'
                          }`} 
                        />
                      ))}
                    </div>
                  )}

                  {/* Skills */}
                  {exportSettings.includeSkills && (
                    <div className="flex flex-wrap gap-1">
                      {skills.slice(0, 5).map((skill, i) => (
                        <div 
                          key={skill.id}
                          className={`h-4 rounded-full ${
                            selectedTemplate === 'modern' ? 'bg-electric/60' : 'bg-primary/60'
                          }`}
                          style={{ width: `${30 + skill.name.length * 3}px` }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Template Label */}
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="text-xs">
                    {templates.find(t => t.id === selectedTemplate)?.name}
                  </Badge>
                </div>
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

            {/* QR Code */}
            <Card className="glass-card animate-slide-in-right">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <QrCode className="w-5 h-5 mr-2 text-primary" />
                QR Code
              </h3>
              
              <div className="flex justify-center mb-4">
                <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-foreground-muted" />
                </div>
              </div>
              
              <p className="text-center text-sm text-foreground-muted mb-4">
                Scan to view portfolio on mobile
              </p>
              
              <Button variant="outline" className="w-full">
                Download QR Code
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Export;