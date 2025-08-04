import { useState } from 'react';
import { Upload, Plus, Award, Briefcase, FileText, Calendar, MapPin, Building, Edit3, Trash2, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import EditAchievementDialog, { Achievement } from '@/components/EditAchievementDialog';
import AIAssistant from '@/components/AIAssistant';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { toast } from '@/hooks/use-toast';

const Achievements = () => {
  const { achievements, addAchievement } = usePortfolio();
  const [editDialog, setEditDialog] = useState<{
    isOpen: boolean;
    achievement: Achievement | null;
    type: 'internship' | 'certificate' | 'award';
  }>({
    isOpen: false,
    achievement: null,
    type: 'internship'
  });
  
  const [localAchievements, setLocalAchievements] = useState({
    internships: [
      {
        id: 1,
        title: 'Sample Work Experience',
        organization: 'Sample Inc.',
        duration: 'Jun 2024 - Aug 2024',
        location: 'Sample, CA',
        description: 'Sample Work Experience, improved API performance by 40%, and collaborated with cross-functional teams.',
        skills: ['React', 'Node.js', 'AWS', 'Docker'],
        status: 'completed'
      },
    ],
    certificates: [
      {
        id: 2,
        title: 'Sample Certificate',
        issuer: 'Sample Web Services',
        year: '2024',
        credentialId: 'SAMPLE-12345',
        description: 'Sample Desctiption',
        status: 'verified'
      },
    ],
    awards: [
      {
        id: 3,
        title: 'Best Sample Award',
        organization: 'University Sample',
        year: '2024',
        description: 'Sample Description.',
        category: 'Competition'
      },
    ]
  });

  const handleDeleteInternship = (internshipId: number) => {
    setLocalAchievements(prev => ({
      ...prev,
      internships: prev.internships.filter(item => item.id !== internshipId)
    }));
  };

  const handleDeleteCertificate = (certId: number) => {
    setLocalAchievements(prev => ({
      ...prev,
      certificates: prev.certificates.filter(item => item.id !== certId)
    }));
  };

  const handleDeleteAward = (awardId: number) => {
    setLocalAchievements(prev => ({
      ...prev,
      awards: prev.awards.filter(item => item.id !== awardId)
    }));
  };

  const handleEditInternship = (internship: any) => {
    setEditDialog({
      isOpen: true,
      achievement: internship,
      type: 'internship'
    });
  };

  const handleEditCertificate = (certificate: any) => {
    setEditDialog({
      isOpen: true,
      achievement: certificate,
      type: 'certificate'
    });
  };

  const handleEditAward = (award: any) => {
    setEditDialog({
      isOpen: true,
      achievement: award,
      type: 'award'
    });
  };

  const handleSaveEdit = (updatedAchievement: Achievement) => {
    const { type } = editDialog;
    
    setLocalAchievements(prev => ({
      ...prev,
      [type === 'internship' ? 'internships' : 
        type === 'certificate' ? 'certificates' : 'awards']: 
        prev[type === 'internship' ? 'internships' : 
            type === 'certificate' ? 'certificates' : 'awards'].map((item: any) =>
          item.id === updatedAchievement.id ? updatedAchievement : item
        )
    }));
  };


  return (
    <div className="min-h-screen pt-16 bg-gradient-soft">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl lg:text-4xl font-space font-bold text-gradient-primary mb-2">
            Achievements
          </h1>
          <p className="text-foreground-muted">
            Track your internships, certifications, and awards
          </p>
        </div>


        {/* Internships Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-space font-bold flex items-center">
              <Briefcase className="w-6 h-6 mr-2 text-primary" />
              Work Experience
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Work Experience
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Work Experience</DialogTitle>
                </DialogHeader>
                  <InternshipForm 
                    onAdd={(data) => {
                      setLocalAchievements(prev => ({...prev, internships: [...prev.internships, {id: Date.now(), ...data}]}));
                      addAchievement('internships', data);
                    }} 
                  />
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {localAchievements.internships.map((internship, index) => (
              <Card key={internship.id} className="glass-card interactive animate-slide-in-right" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{internship.title}</h3>
                    <div className="flex items-center space-x-4 text-foreground-muted text-sm mt-1">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-1" />
                        {internship.organization}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {internship.duration}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {internship.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="w-8 h-8 p-0"
                      onClick={() => handleEditInternship(internship)}
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="w-8 h-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteInternship(internship.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-foreground-muted text-sm mb-4">{internship.description}</p>
                
                <div className="flex flex-wrap gap-1">
                  {internship.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Certificates Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-space font-bold flex items-center">
                <Award className="w-6 h-6 mr-2 text-electric" />
                Certificates
              </h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Certificate</DialogTitle>
                  </DialogHeader>
                  <CertificateForm 
                    onAdd={(data) => {
                      setLocalAchievements(prev => ({...prev, certificates: [...prev.certificates, {id: Date.now(), ...data}]}));
                      addAchievement('certificates', data);
                    }} 
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {localAchievements.certificates.map((cert, index) => (
                <Card key={cert.id} className="glass-card interactive animate-slide-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold">{cert.title}</h3>
                      <p className="text-foreground-muted text-sm">{cert.issuer} • {cert.year}</p>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="w-8 h-8 p-0"
                        onClick={() => handleEditCertificate(cert)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="w-8 h-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteCertificate(cert.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-foreground-muted text-sm mb-3">{cert.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      ID: {cert.credentialId}
                    </Badge>
                    <Badge className="text-xs bg-success/10 text-success">
                      ✓ Verified
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Awards Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-space font-bold flex items-center">
                <Award className="w-6 h-6 mr-2 text-pulse" />
                Highlights
              </h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Highlight</DialogTitle>
                  </DialogHeader>
                    <AwardForm 
                      onAdd={(data) => {
                        setLocalAchievements(prev => ({...prev, awards: [...prev.awards, {id: Date.now(), ...data}]}));
                        addAchievement('awards', data);
                      }} 
                    />
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {localAchievements.awards.map((award, index) => (
                <Card key={award.id} className="glass-card interactive animate-slide-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold">{award.title}</h3>
                      <p className="text-foreground-muted text-sm">{award.organization} • {award.year}</p>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="w-8 h-8 p-0"
                        onClick={() => handleEditAward(award)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="w-8 h-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteAward(award.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-foreground-muted text-sm mb-3">{award.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {award.category}
                  </Badge>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <EditAchievementDialog
        isOpen={editDialog.isOpen}
        onClose={() => setEditDialog({ ...editDialog, isOpen: false })}
        achievement={editDialog.achievement}
        onSave={handleSaveEdit}
        type={editDialog.type}
      />
      
      <AIAssistant />
    </div>
  );

  function InternshipForm({ onAdd }) {
    const [open, setOpen] = useState(true);
    const [title, setTitle] = useState('');
    const [organization, setOrganization] = useState('');
    const [duration, setDuration] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState('');

    const handleSubmit = () => {
      if (title && organization) {
        onAdd({
          title,
          organization,
          duration,
          location,
          description,
          skills: skills.split(',').map(s => s.trim()).filter(s => s),
          status: 'completed'
        });
        setTitle('');
        setOrganization('');
        setDuration('');
        setLocation('');
        setDescription('');
        setSkills('');
        setOpen(false);
        // Close dialog via parent
        setTimeout(() => {
          const closeButton = document.querySelector('[data-state="open"] button[aria-label="Close"]') as HTMLButtonElement;
          closeButton?.click();
        }, 100);
      }
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="int-title">Job Title</Label>
            <Input id="int-title" placeholder="Software Engineer Intern" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="int-company">Company</Label>
            <Input id="int-company" placeholder="TechCorp Inc." value={organization} onChange={(e) => setOrganization(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="int-duration">Duration</Label>
            <Input id="int-duration" placeholder="Jun 2024 - Aug 2024" value={duration} onChange={(e) => setDuration(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="int-location">Location</Label>
            <Input id="int-location" placeholder="San Francisco, CA" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="int-description">Description</Label>
          <Textarea id="int-description" placeholder="Describe your responsibilities and achievements..." rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="int-skills">Skills Gained</Label>
          <Input id="int-skills" placeholder="React, Node.js, AWS" value={skills} onChange={(e) => setSkills(e.target.value)} />
        </div>
        <div className="flex space-x-3">
          <Button className="btn-primary flex-1" onClick={handleSubmit} disabled={!title || !organization}>Add Work Experience</Button>
          <Button variant="outline" onClick={() => {
            const closeButton = document.querySelector('[role="dialog"] [data-state="open"] button[aria-label="Close"]') as HTMLButtonElement;
            closeButton?.click();
          }}>Cancel</Button>
        </div>
      </div>
    );
  }

  function CertificateForm({ onAdd }) {
    const [open, setOpen] = useState(true);
    const [title, setTitle] = useState('');
    const [issuer, setIssuer] = useState('');
    const [year, setYear] = useState('');
    const [credentialId, setCredentialId] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
      if (title && issuer) {
        onAdd({ title, issuer, year, credentialId, description, status: 'verified' });
        setTitle('');
        setIssuer('');
        setYear('');
        setCredentialId('');
        setDescription('');
        setOpen(false);
        // Close dialog via parent
        setTimeout(() => {
          const closeButton = document.querySelector('[data-state="open"] button[aria-label="Close"]') as HTMLButtonElement;
          closeButton?.click();
        }, 100);
      }
    };

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cert-title">Certificate Title</Label>
          <Input id="cert-title" placeholder="AWS Certified Solutions Architect" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="cert-issuer">Issuer</Label>
            <Input id="cert-issuer" placeholder="Amazon Web Services" value={issuer} onChange={(e) => setIssuer(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cert-year">Year</Label>
            <Input id="cert-year" placeholder="2024" value={year} onChange={(e) => setYear(e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cert-id">Credential ID (optional)</Label>
          <Input id="cert-id" placeholder="AWS-12345" value={credentialId} onChange={(e) => setCredentialId(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cert-description">Description</Label>
          <Textarea id="cert-description" placeholder="Brief description of the certification..." rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="flex space-x-3">
          <Button className="btn-primary flex-1" onClick={handleSubmit} disabled={!title || !issuer}>Add Certificate</Button>
          <Button variant="outline" onClick={() => {
            const closeButton = document.querySelector('[role="dialog"] [data-state="open"] button[aria-label="Close"]') as HTMLButtonElement;
            closeButton?.click();
          }}>Cancel</Button>
        </div>
      </div>
    );
  }

  function AwardForm({ onAdd }) {
    const [open, setOpen] = useState(true);
    const [title, setTitle] = useState('');
    const [organization, setOrganization] = useState('');
    const [year, setYear] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
      if (title && organization) {
        onAdd({ title, organization, year, category, description });
        setTitle('');
        setOrganization('');
        setYear('');
        setCategory('');
        setDescription('');
        setOpen(false);
        // Close dialog via parent
        setTimeout(() => {
          const closeButton = document.querySelector('[data-state="open"] button[aria-label="Close"]') as HTMLButtonElement;
          closeButton?.click();
        }, 100);
      }
    };

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="award-title">Highlight Title</Label>
          <Input id="award-title" placeholder="Best Innovation Award" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="award-org">Organization</Label>
            <Input id="award-org" placeholder="University Hackathon" value={organization} onChange={(e) => setOrganization(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="award-year">Year</Label>
            <Input id="award-year" placeholder="2024" value={year} onChange={(e) => setYear(e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="award-category">Category</Label>
          <Input id="award-category" placeholder="Competition, Academic, etc." value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="award-description">Description</Label>
          <Textarea id="award-description" placeholder="Describe the achievement..." rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="flex space-x-3">
          <Button className="btn-primary flex-1" onClick={handleSubmit} disabled={!title || !organization}>Add Highlight</Button>
          <Button variant="outline" onClick={() => {
            const closeButton = document.querySelector('[role="dialog"] [data-state="open"] button[aria-label="Close"]') as HTMLButtonElement;
            closeButton?.click();
          }}>Cancel</Button>
        </div>
      </div>
    );
  }
};

export default Achievements;