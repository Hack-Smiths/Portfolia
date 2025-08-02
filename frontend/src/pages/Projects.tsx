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
import { usePortfolio } from '@/contexts/PortfolioContext';
// add this in your parent component (where the dialog is rendered)
const Projects = () => {
  const [openedit, setOpenEdit] = useState(false); 
  const [selectedProject, setSelectedProject] = useState(null); 
  const [openProject, setOpenProject] = useState(false); 
  const [openGithub, setOpenGithub] = useState(false); 
  const { projects, addProject, deleteProject, updateProject } = usePortfolio();
  const [selectedTab, setSelectedTab] = useState('all');
  const [localProjects, setLocalProjects] = useState([
    {
      id: 1,
      title: 'Sample Project',
      description: 'Sample is a demo project created to showcase the core functionalities of the Portfolia platform. It simulates a typical user project by demonstrating AI-generated summaries, tech stack visualization, and GitHub integration.',
      type: 'others',
      stack: ["React", "FastAPI", "PostgreSQL", "Tailwind CSS"],
      features: ["AI-enhanced project description", "GitHub stats simulation (stars, forks)", "Live project and code preview links"],
      status: { imported: true, aiSummary: true, saved: true },
      stars: 0,
      forks: 0,
      lastUpdated: 'now',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop'
    },
  ]);

  const handleDeleteProject = (projectId: number) => {
    setLocalProjects(localProjects.filter(p => p.id !== projectId));
    deleteProject(projectId);
  };

  const handleAddProject = (newProject: any) => {
    const project = {
      id: Date.now(),
      ...newProject,
      type: 'others',
      status: { imported: false, aiSummary: false, saved: true },
      lastUpdated: 'Just now'
    };
    setLocalProjects([...localProjects, project]);
    addProject({
      ...newProject,
      type: 'others' as const,
      status: { imported: false, aiSummary: false, saved: true },
      lastUpdated: 'Just now'
    });
  };

  const handleImportFromGitHub = (projectData: any) => {
    const project = {
      id: Date.now(),
      ...projectData,
      type: 'github',
      status: { imported: true, aiSummary: false, saved: true },
      lastUpdated: 'Just now'
    };
    setLocalProjects([...localProjects, project]);
    addProject({
      ...projectData,
      type: 'github' as const,
      status: { imported: true, aiSummary: false, saved: true },
      lastUpdated: 'Just now'
    });
  };

  const filteredProjects = localProjects.filter(project => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'github') return project.type === 'github';
    if (selectedTab === 'others') return project.type === 'others';
    return true;
  });

  const ProjectCard = ({ project }) => (
    <Card className="glass-card interactive group overflow-hidden">
      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:glow-primary transition-all">
        <Code className="w-6 h-6 text-white" />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <div className="flex space-x-1">
            <Dialog open={openedit} onOpenChange={setOpenEdit}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-8 h-8 p-0"   
                  onClick={() => {setSelectedProject(project); setOpenEdit(true);}}
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Project</DialogTitle>
                </DialogHeader>
                <EditProjectForm
                  project={selectedProject}
                  setProjects={setLocalProjects}
                  projects={localProjects}
                  onClose={() => setOpenEdit(false)} // 👈 pass close callback to form
                />
              </DialogContent>
            </Dialog>

            <Button 
              size="sm" 
              variant="ghost" 
              className="w-8 h-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => handleDeleteProject(project.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <p className="text-sm text-foreground-muted line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {project.stack.map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        {project.features && project.features.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-medium text-foreground mb-2">Key Features:</h4>
            <div className="flex flex-wrap gap-1">
              {project.features.map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}

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
            <Dialog open={openGithub} onOpenChange={setOpenGithub}>
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
                <GitHubImportForm 
                  onImport={handleImportFromGitHub} 
                  onClose={() => {
                    const dialog = document.querySelector('[role="dialog"]');
                    const closeButton = dialog?.querySelector('[aria-label="Close"]') as HTMLButtonElement;
                    closeButton?.click(); setOpenGithub(false)
                  }}
                />
              </DialogContent>
            </Dialog>
          <Dialog open={openProject} onOpenChange={setOpenProject}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Project Manually</DialogTitle>
              </DialogHeader>
              <ManualProjectForm 
                onAdd={handleAddProject} 
                onCloseProject={() => setOpenProject(false)}
              />
            </DialogContent>
          </Dialog>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="github">GitHub</TabsTrigger>
            <TabsTrigger value="others">Others</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <ProjectGrid projects={filteredProjects} />
          </TabsContent>
          <TabsContent value="github" className="mt-6">
            <ProjectGrid projects={localProjects.filter(p => p.type === 'github')} />
          </TabsContent>
          <TabsContent value="others" className="mt-6">
            <ProjectGrid projects={localProjects.filter(p => p.type === 'others')} />
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

  function GitHubImportForm({ onImport, onClose }) {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImport = async () => {
      setLoading(true);
      // Simulate GitHub import
      const projectData = {
        title: 'Imported GitHub Project',
        description: 'Project imported from GitHub repository',
        stack: ['React', 'TypeScript', 'Node.js'],
        stars: Math.floor(Math.random() * 100),
        forks: Math.floor(Math.random() * 20),
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop'
      };
      
      setTimeout(() => {
        onImport(projectData);
        setLoading(false);
        setUrl('');
        onClose?.();
      }, 1000);
    };

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="github-url">GitHub Repository URL</Label>
          <Input
            id="github-url"
            placeholder="https://github.com/username/repository"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-sm text-foreground-muted">
            We'll automatically extract project details, tech stack, and generate an AI-enhanced description.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            className="btn-primary flex-1" 
            onClick={handleImport}
            disabled={!url || loading}
          >
            <Code className="w-4 h-4 mr-2" />
            {loading ? 'Importing...' : 'Import Project'}
          </Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    );
  }

  function ManualProjectForm({ onAdd, onCloseProject }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [stack, setStack] = useState('');
    const [url, setUrl] = useState('');
    const [features, setFeatures] = useState('');

    const handleSubmit = () => {
      if (title && description) {
        onAdd({
          title,
          description,
          stack: stack.split(',').map(s => s.trim()).filter(s => s),
          features: features.split(',').map(s => s.trim()).filter(s => s),
          url
        });
        setTitle('');
        setDescription('');
        setStack('');
        setFeatures('');
        setUrl('');
        // Close dialog
        setTimeout(() => {
          const closeButton = document.querySelector('[data-state="open"] button[aria-label="Close"]') as HTMLButtonElement;
          closeButton?.click();
        }, 100);
      }
      onCloseProject();
      
    };
    const handleClose = () => {
      onCloseProject();
    };

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="project-title">Project Title</Label>
          <Input 
            id="project-title" 
            placeholder="My Awesome Project" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="project-description">Description</Label>
          <Textarea 
            id="project-description" 
            placeholder="Describe your project..."
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="project-stack">Tech Stack (comma-separated)</Label>
          <Input 
            id="project-stack" 
            placeholder="React, Node.js, MongoDB" 
            value={stack}
            onChange={(e) => setStack(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="project-features">Key Features (comma-separated)</Label>
          <Input 
            id="project-features" 
            placeholder="User Authentication, Real-time Updates, Payment Integration" 
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="project-url">Project URL (optional)</Label>
          <Input 
            id="project-url" 
            placeholder="https://myproject.com" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="flex space-x-3">
          <Button 
            className="btn-primary flex-1"
            onClick={handleSubmit}
            disabled={!title || !description}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
        </div>
      </div>
    );
  }

  function EditProjectForm({ project, setProjects, projects, onClose }) {
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);
    const [stack, setStack] = useState(project.stack.join(', '));

    const handleSave = () => {
      const updatedProject = {
        ...project,
        title,
        description,
        stack: stack.split(',').map(s => s.trim())
      };
      
      setProjects(projects.map(p => p.id === project.id ? updatedProject : p));
      onClose();
    };
    const handleClose = () => {
      setTitle(project.title);
      setDescription(project.description);
      setStack(project.stack.join(', '));
      onClose();
    };


    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="edit-title">Project Title</Label>
          <Input 
            id="edit-title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-description">Description</Label>
          <Textarea 
            id="edit-description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-stack">Tech Stack</Label>
          <Input 
            id="edit-stack" 
            value={stack}
            onChange={(e) => setStack(e.target.value)}
          />
        </div>
        <div className="flex space-x-3">
          <Button className="btn-electric flex-1">
            <Sparkles className="w-4 h-4 mr-2" />
            Enhance with AI
          </Button>
          <Button className="btn-primary" onClick={handleSave}>Save</Button>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
        </div>
      </div>
    );
  }
};

export default Projects;