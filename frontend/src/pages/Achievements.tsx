import { useState } from 'react';
import { Upload, Plus, Award, Briefcase, FileText, Calendar, MapPin, Building, Edit3, Trash2, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import AIAssistant from '@/components/AIAssistant';

const Achievements = () => {
  const [uploadStatus, setUploadStatus] = useState(null);

  const achievements = {
    internships: [
      {
        id: 1,
        title: 'Software Engineering Intern',
        organization: 'TechCorp Inc.',
        duration: 'Jun 2024 - Aug 2024',
        location: 'San Francisco, CA',
        description: 'Developed microservices architecture, improved API performance by 40%, and collaborated with cross-functional teams.',
        skills: ['React', 'Node.js', 'AWS', 'Docker'],
        status: 'completed'
      },
      {
        id: 2,
        title: 'ML Research Intern',
        organization: 'AI Labs',
        duration: 'Dec 2023 - Feb 2024',
        location: 'Remote',
        description: 'Researched deep learning models for computer vision, published paper on image classification improvements.',
        skills: ['Python', 'TensorFlow', 'OpenCV', 'Research'],
        status: 'completed'
      }
    ],
    certificates: [
      {
        id: 3,
        title: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        year: '2024',
        credentialId: 'AWS-12345',
        description: 'Comprehensive cloud architecture certification covering design principles and best practices.',
        status: 'verified'
      },
      {
        id: 4,
        title: 'Google Data Analytics Certificate',
        issuer: 'Google',
        year: '2023',
        credentialId: 'GOOGLE-67890',
        description: 'Data analysis, visualization, and business intelligence using industry-standard tools.',
        status: 'verified'
      }
    ],
    awards: [
      {
        id: 5,
        title: 'Best Innovation Award',
        organization: 'University Hackathon',
        year: '2024',
        description: 'First place for developing an AI-powered sustainability platform that helps businesses reduce carbon footprint.',
        category: 'Competition'
      },
      {
        id: 6,
        title: 'Dean\'s List',
        organization: 'University of Technology',
        year: '2023',
        description: 'Academic excellence recognition for maintaining GPA above 3.8 for consecutive semesters.',
        category: 'Academic'
      }
    ]
  };

  const handleResumeUpload = () => {
    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('success');
      setTimeout(() => setUploadStatus(null), 3000);
    }, 2000);
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

        {/* Resume Upload Section */}
        <Card className="glass-card mb-8 animate-slide-in-up">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1 mb-4 md:mb-0">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Resume Upload
              </h2>
              <p className="text-foreground-muted text-sm">
                Upload your resume and we'll automatically extract achievements, skills, and experiences using AI.
              </p>
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={handleResumeUpload} 
                className="btn-primary"
                disabled={uploadStatus === 'uploading'}
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploadStatus === 'uploading' ? 'Processing...' : 'Upload Resume'}
              </Button>
            </div>
          </div>
          
          {uploadStatus && (
            <div className={`mt-4 p-4 rounded-lg border ${
              uploadStatus === 'success' 
                ? 'bg-success/10 border-success/20 text-success' 
                : 'bg-warning/10 border-warning/20 text-warning'
            }`}>
              <div className="flex items-center">
                {uploadStatus === 'success' ? (
                  <CheckCircle className="w-4 h-4 mr-2" />
                ) : (
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                )}
                {uploadStatus === 'success' 
                  ? 'Resume parsed successfully! 3 new achievements added.'
                  : 'Analyzing your resume with AI...'
                }
              </div>
            </div>
          )}
        </Card>

        {/* Internships Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-space font-bold flex items-center">
              <Briefcase className="w-6 h-6 mr-2 text-primary" />
              Internships
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Internship
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add Internship</DialogTitle>
                </DialogHeader>
                <InternshipForm />
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {achievements.internships.map((internship, index) => (
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
                    <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-destructive">
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
                  <CertificateForm />
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {achievements.certificates.map((cert, index) => (
                <Card key={cert.id} className="glass-card interactive animate-slide-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold">{cert.title}</h3>
                      <p className="text-foreground-muted text-sm">{cert.issuer} • {cert.year}</p>
                    </div>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-destructive">
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
                Awards
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
                    <DialogTitle>Add Award</DialogTitle>
                  </DialogHeader>
                  <AwardForm />
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {achievements.awards.map((award, index) => (
                <Card key={award.id} className="glass-card interactive animate-slide-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold">{award.title}</h3>
                      <p className="text-foreground-muted text-sm">{award.organization} • {award.year}</p>
                    </div>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-destructive">
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

      <AIAssistant />
    </div>
  );

  function InternshipForm() {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="int-title">Job Title</Label>
            <Input id="int-title" placeholder="Software Engineer Intern" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="int-company">Company</Label>
            <Input id="int-company" placeholder="TechCorp Inc." />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="int-duration">Duration</Label>
            <Input id="int-duration" placeholder="Jun 2024 - Aug 2024" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="int-location">Location</Label>
            <Input id="int-location" placeholder="San Francisco, CA" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="int-description">Description</Label>
          <Textarea id="int-description" placeholder="Describe your responsibilities and achievements..." rows={3} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="int-skills">Skills Gained</Label>
          <Input id="int-skills" placeholder="React, Node.js, AWS" />
        </div>
        <div className="flex space-x-3">
          <Button className="btn-primary flex-1">Add Internship</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    );
  }

  function CertificateForm() {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cert-title">Certificate Title</Label>
          <Input id="cert-title" placeholder="AWS Certified Solutions Architect" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="cert-issuer">Issuer</Label>
            <Input id="cert-issuer" placeholder="Amazon Web Services" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cert-year">Year</Label>
            <Input id="cert-year" placeholder="2024" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cert-id">Credential ID (optional)</Label>
          <Input id="cert-id" placeholder="AWS-12345" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cert-description">Description</Label>
          <Textarea id="cert-description" placeholder="Brief description of the certification..." rows={2} />
        </div>
        <div className="flex space-x-3">
          <Button className="btn-primary flex-1">Add Certificate</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    );
  }

  function AwardForm() {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="award-title">Award Title</Label>
          <Input id="award-title" placeholder="Best Innovation Award" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="award-org">Organization</Label>
            <Input id="award-org" placeholder="University Hackathon" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="award-year">Year</Label>
            <Input id="award-year" placeholder="2024" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="award-category">Category</Label>
          <Input id="award-category" placeholder="Competition, Academic, etc." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="award-description">Description</Label>
          <Textarea id="award-description" placeholder="Describe the achievement..." rows={2} />
        </div>
        <div className="flex space-x-3">
          <Button className="btn-primary flex-1">Add Award</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    );
  }
};

export default Achievements;