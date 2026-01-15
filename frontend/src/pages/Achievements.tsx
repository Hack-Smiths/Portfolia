import { useEffect, useState } from 'react';
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
import { addAchievementAPI, getAchievementsAPI, deleteAchievementAPI, updateAchievementAPI } from '@/utils/api';

const Achievements = () => {
  const { achievements, addAchievement } = usePortfolio();
  const [openInternshipForm, setOpenInternshipForm] = useState(false);
  const [openCertificateForm, setOpenCertificateForm] = useState(false);
  const [openAwardForm, setOpenAwardForm] = useState(false);
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
    internships: [],
    certificates: [],
    awards: []
  });
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const [internshipsRes, certificatesRes, awardsRes] = await Promise.all([
          getAchievementsAPI("work-experience"),   // GET /achievements/work-experience
          getAchievementsAPI("certificates"),      // GET /achievements/certificates
          getAchievementsAPI("awards")             // GET /achievements/awards
        ]);
        setLocalAchievements({
          internships: internshipsRes || [],
          certificates: certificatesRes || [],
          awards: awardsRes || []
        });
      } catch (err) {
        console.error("Failed to fetch achievements:", err);
      }
    };

    fetchAchievements();
  }, []);
  const handleAddInternship = async (newInternship: any) => {
    const payload = {
      title: newInternship.title,
      organization: newInternship.organization ?? '',
      duration: newInternship.duration ?? '',
      location: newInternship.location ?? '',
      description: newInternship.description ?? '',
      skills: newInternship.skills ?? [],
      status: newInternship.status ?? 'completed',
    };

    const created = await addAchievementAPI('work-experience', payload);

    setLocalAchievements(prev => ({
      ...prev,
      internships: [...prev.internships, created],
    }));

    setOpenInternshipForm(false);
  };

  const handleAddCertificate = async (newCertificate: any) => {
    const payload = {
      title: newCertificate.title,
      issuer: newCertificate.issuer ?? '',
      year: newCertificate.year ?? '',
      credentialId: newCertificate.credentialId ?? '',
      description: newCertificate.description ?? '',
      status: newCertificate.status ?? 'verified',
    };

    const created = await addAchievementAPI('certificates', payload);

    setLocalAchievements(prev => ({
      ...prev,
      certificates: [...prev.certificates, created],
    }));
  };

  const handleAddAward = async (newAward: any) => {
    const payload = {
      title: newAward.title,
      organization: newAward.organization ?? '',
      year: newAward.year ?? '',
      description: newAward.description ?? '',
      category: newAward.category ?? '',
    };

    const created = await addAchievementAPI('awards', payload);

    setLocalAchievements(prev => ({
      ...prev,
      awards: [...prev.awards, created],
    }));
  };

  const handleDeleteInternship = async (internshipId: number) => {
    try {
      await deleteAchievementAPI('work-experience', internshipId);
      setLocalAchievements(prev => ({
        ...prev,
        internships: prev.internships.filter(item => item.id !== internshipId)
      }));
      toast({ title: "Deleted internship successfully", variant: "default" });
    } catch (error) {
      toast({ title: "Failed to delete internship", variant: "destructive" });
    }
  };

  const handleDeleteCertificate = async (certId: number) => {
    try {
      await deleteAchievementAPI('certificates', certId);
      setLocalAchievements(prev => ({
        ...prev,
        certificates: prev.certificates.filter(item => item.id !== certId)
      }));
      toast({ title: "Deleted certificate successfully", variant: "default" });
    } catch (error) {
      toast({ title: "Failed to delete certificate", variant: "destructive" });
    }
  };

  const handleDeleteAward = async (awardId: number) => {
    try {
      await deleteAchievementAPI('awards', awardId);
      setLocalAchievements(prev => ({
        ...prev,
        awards: prev.awards.filter(item => item.id !== awardId)
      }));
      toast({ title: "Deleted award successfully", variant: "default" });
    } catch (error) {
      toast({ title: "Failed to delete award", variant: "destructive" });
    }
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

  const handleSaveEdit = async (updatedAchievement: Achievement) => {
    const { type } = editDialog;

    try {
      // Map your local types to API route segments
      const apiType =
        type === 'internship' ? 'work-experience' :
          type === 'certificate' ? 'certificates' :
            'awards';

      const updatedFromServer = await updateAchievementAPI(apiType, updatedAchievement.id, updatedAchievement);

      setLocalAchievements(prev => ({
        ...prev,
        [type === 'internship' ? 'internships' :
          type === 'certificate' ? 'certificates' : 'awards']:
          prev[type === 'internship' ? 'internships' :
            type === 'certificate' ? 'certificates' : 'awards'].map(item =>
              item.id === updatedFromServer.id ? updatedFromServer : item
            )
      }));

      toast({ title: `${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully`, variant: 'default' });
      setEditDialog({ isOpen: false, achievement: null, type: 'internship' });

    } catch (error) {
      toast({ title: `Failed to update ${type}`, variant: 'destructive' });
    }
  };



  return (
    <div className="min-h-screen pt-16">
      {/* Background with mesh effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-pink-50/30 dark:from-slate-900 dark:via-purple-900/10 dark:to-slate-900" />
        <div className="mesh-bg absolute inset-0" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
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
            <h2 className="text-2xl font-space font-bold flex items-center text-gradient-primary">
              <Briefcase className="w-6 h-6 mr-2" />
              Work Experience
            </h2>
            <Dialog open={openInternshipForm} onOpenChange={setOpenInternshipForm}>
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
                  onAdd={handleAddInternship}
                  onCloseInternshipForm={() => setOpenInternshipForm(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {localAchievements.internships?.map((internship, index) => (
              <Card key={internship.id} className="glass-card interactive animate-slide-in-right group hover:shadow-xl transition-all duration-300" style={{ animationDelay: `${index * 100}ms` }}>
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

                <div className="flex flex-wrap gap-2">
                  {internship.skills?.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
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
              <h2 className="text-2xl font-space font-bold flex items-center text-gradient-primary">
                <Award className="w-6 h-6 mr-2" />
                Certificates
              </h2>
              <Dialog open={openCertificateForm} onOpenChange={setOpenCertificateForm}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Certificate
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Certificate</DialogTitle>
                  </DialogHeader>
                  <CertificateForm
                    onAdd={handleAddCertificate}
                    onCloseCertificateForm={() => setOpenCertificateForm(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {localAchievements.certificates?.map((cert, index) => (
                <Card key={cert.id} className="glass-card interactive animate-slide-in-up group hover:shadow-xl transition-all duration-300" style={{ animationDelay: `${index * 150}ms` }}>
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
                    <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                      ID: {cert.credentialId}
                    </Badge>
                    <Badge className="text-xs bg-success/10 text-success border-success/20">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Awards Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-space font-bold flex items-center text-gradient-primary">
                <Award className="w-6 h-6 mr-2" />
                Highlights
              </h2>
              <Dialog open={openAwardForm} onOpenChange={setOpenAwardForm}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Highlight
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Highlight</DialogTitle>
                  </DialogHeader>
                  <AwardForm
                    onAdd={handleAddAward}
                    onCloseAwardForm={() => setOpenAwardForm(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {localAchievements.awards?.map((award, index) => (
                <Card key={award.id} className="glass-card interactive animate-slide-in-up group hover:shadow-xl transition-all duration-300" style={{ animationDelay: `${index * 150}ms` }}>
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
                  <Badge variant="outline" className="text-xs border-primary/30 text-primary">
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

  function InternshipForm({ onAdd, onCloseInternshipForm }) {
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
        // Use setTimeout to ensure the dialog closes after state updates
        setTimeout(() => {
          const closeButton = document.querySelector('[data-state="open"] button[aria-label="Close"]') as HTMLButtonElement;
          closeButton?.click();
        }, 100);

        onCloseInternshipForm();
      }
    };
    const handleCloseInternshipForm = () => {
      setOpen(false);
      onCloseInternshipForm();
      // Use setTimeout to ensure the dialog closes after state updates
      setTimeout(() => {
        const closeButton = document.querySelector('[data-state="open"] button[aria-label="Close"]') as HTMLButtonElement;
        closeButton?.click();
      }, 100);
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
          <Button variant="outline" onClick={handleCloseInternshipForm}>Cancel</Button>
        </div>
      </div>
    );
  }

  function CertificateForm({ onAdd, onCloseCertificateForm }) {
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
        onCloseCertificateForm();
        setTimeout(() => {
          const closeButton = document.querySelector('[data-state="open"] button[aria-label="Close"]') as HTMLButtonElement;
          closeButton?.click();
        }, 100);
      }
    };
    const handleCloseCertificateForm = () => {
      setOpen(false);
      onCloseCertificateForm();
      // Use setTimeout to ensure the dialog closes after state updates
      setTimeout(() => {
        const closeButton = document.querySelector('[data-state="open"] button[aria-label="Close"]') as HTMLButtonElement;
        closeButton?.click();
      }, 100);
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
          <Button variant="outline" onClick={handleCloseCertificateForm}>Cancel</Button>
        </div>
      </div>
    );
  }

  function AwardForm({ onAdd, onCloseAwardForm }) {
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
        onCloseAwardForm();
        setTimeout(() => {
          const closeButton = document.querySelector('[data-state="open"] button[aria-label="Close"]') as HTMLButtonElement;
          closeButton?.click();
        }, 100);
      }
    };
    const handleCloseAwardForm = () => {
      setOpen(false);
      onCloseAwardForm();
      // Use setTimeout to ensure the dialog closes after state updates
      setTimeout(() => {
        const closeButton = document.querySelector('[data-state="open"] button[aria-label="Close"]') as HTMLButtonElement;
        closeButton?.click();
      }, 100);
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
          <Button variant="outline" onClick={handleCloseAwardForm}>Cancel</Button>
        </div>
      </div>
    );
  }
};

export default Achievements;