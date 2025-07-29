import { useState } from 'react';
import { Github, Plus, Edit3, Trash2, ExternalLink, Star, GitBranch, Code, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AIAssistant from '@/components/AIAssistant';

const Projects = () => {
  const [selectedTab, setSelectedTab] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-commerce React App',
      description: 'Full-stack e-commerce platform with React, Node.js, and Stripe integration',
      type: 'github',
      stack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      status: { imported: true, aiSummary: true, saved: true },
      stars: 24,
      forks: 8,
      lastUpdated: '2 days ago',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'AI Chat Application',
      description: 'Real-time chat app with AI-powered responses using OpenAI API',
      type: 'github',
      stack: ['Next.js', 'OpenAI', 'Socket.io', 'PostgreSQL'],
      status: { imported: true, aiSummary: false, saved: true },
      stars: 16,
      forks: 3,
      lastUpdated: '1 week ago',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Data Visualization Dashboard',
      description: 'Interactive dashboard for business analytics with D3.js and Python backend',
      type: 'manual',
      stack: ['D3.js', 'Python', 'Flask', 'SQLite'],
      status: { imported: false, aiSummary: true, saved: true },
      lastUpdated: '3 weeks ago',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'Mobile Weather App',
      description: 'Cross-platform weather application built with React Native',
      type: 'manual',
      stack: ['React Native', 'Expo', 'Weather API'],
      status: { imported: false, aiSummary: false, saved: true },
      lastUpdated: '1 month ago',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=200&fit=crop'
    }
  ];

  const filteredProjects = projects.filter(project => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'github') return project.type === 'github';
    if (selectedTab === 'manual') return project.type === 'manual';
    return true;
  });

  const ProjectCard = ({ project }) => (
    <Card className="glass-card interactive group overflow-hidden">
      <div className="aspect-video bg-gradient-soft rounded-lg mb-4 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <div className="flex space-x-1">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                  <Edit3 className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Project</DialogTitle>
                </DialogHeader>
                <EditProjectForm project={project} />
              </DialogContent>
            </Dialog>
            <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-destructive hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <p className="text-sm text-foreground-muted line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1">
          {project.stack.map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        {project.type === 'github' && (
          <div className="flex items-center space-x-4 text-xs text-foreground-muted">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3" />
              <span>{project.stars}</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitBranch className="w-3 h-3" />
              <span>{project.forks}</span>
            </div>
            <span>{project.lastUpdated}</span>
          </div>
        )}

        <div className="flex items-center space-x-2 pt-2">
          <div className="flex space-x-1">
            <div className={`w-2 h-2 rounded-full ${project.status.imported ? 'bg-success' : 'bg-muted'}`} />
            <div className={`w-2 h-2 rounded-full ${project.status.aiSummary ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`w-2 h-2 rounded-full ${project.status.saved ? 'bg-electric' : 'bg-muted'}`} />
          </div>
          <div className="flex-1" />
          <Button size="sm" variant="ghost" className="text-xs">
            <ExternalLink className="w-3 h-3 mr-1" />
            View
          </Button>
          {!project.status.aiSummary && (
            <Button size="sm" className="btn-primary text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Enhance
            </Button>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen pt-16 bg-gradient-soft">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl lg:text-4xl font-space font-bold text-gradient-primary mb-2">
              Projects
            </h1>
            <p className="text-foreground-muted">
              Showcase your best work and let AI enhance your descriptions
            </p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="btn-primary">
                  <Github className="w-4 h-4 mr-2" />
                  Import from GitHub
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Import from GitHub</DialogTitle>
                </DialogHeader>
                <GitHubImportForm />
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Manual
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Project Manually</DialogTitle>
                </DialogHeader>
                <ManualProjectForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="github">GitHub</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <ProjectGrid projects={filteredProjects} />
          </TabsContent>
          <TabsContent value="github" className="mt-6">
            <ProjectGrid projects={filteredProjects} />
          </TabsContent>
          <TabsContent value="manual" className="mt-6">
            <ProjectGrid projects={filteredProjects} />
          </TabsContent>
        </Tabs>
      </div>

      <AIAssistant />
    </div>
  );

  function ProjectGrid({ projects }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={project.id} className="animate-slide-in-up" style={{ animationDelay: `${index * 100}ms` }}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    );
  }

  function GitHubImportForm() {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="github-url">GitHub Repository URL</Label>
          <Input
            id="github-url"
            placeholder="https://github.com/username/repository"
          />
        </div>
        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-sm text-foreground-muted">
            We'll automatically extract project details, tech stack, and generate an AI-enhanced description.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button className="btn-primary flex-1">
            <Code className="w-4 h-4 mr-2" />
            Import Project
          </Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    );
  }

  function ManualProjectForm() {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="project-title">Project Title</Label>
          <Input id="project-title" placeholder="My Awesome Project" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="project-description">Description</Label>
          <Textarea 
            id="project-description" 
            placeholder="Describe your project..."
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="project-stack">Tech Stack (comma-separated)</Label>
          <Input id="project-stack" placeholder="React, Node.js, MongoDB" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="project-url">Project URL (optional)</Label>
          <Input id="project-url" placeholder="https://myproject.com" />
        </div>
        <div className="flex space-x-3">
          <Button className="btn-primary flex-1">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    );
  }

  function EditProjectForm({ project }) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="edit-title">Project Title</Label>
          <Input id="edit-title" defaultValue={project.title} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-description">Description</Label>
          <Textarea 
            id="edit-description" 
            defaultValue={project.description}
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-stack">Tech Stack</Label>
          <Input id="edit-stack" defaultValue={project.stack.join(', ')} />
        </div>
        <div className="flex space-x-3">
          <Button className="btn-electric flex-1">
            <Sparkles className="w-4 h-4 mr-2" />
            Enhance with AI
          </Button>
          <Button className="btn-primary">Save</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    );
  }
};

export default Projects;