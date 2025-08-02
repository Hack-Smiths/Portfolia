import { useState } from 'react';
import { Plus, Brain, Edit3, Trash2, Filter, Star, Code, Server, Palette, Cloud, Settings, Database, Lightbulb, Users, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import AIAssistant from '@/components/AIAssistant';
import { usePortfolio } from '@/contexts/PortfolioContext';

const Skills = () => {
  const { skills, addSkill, deleteSkill, updateSkill } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [localSkills, setLocalSkills] = useState([
    { id: 1, name: 'React', category: 'Frontend', level: 'Expert', experience: '3+ years' },
    { id: 2, name: 'Node.js', category: 'Backend', level: 'Expert', experience: '2+ years' },
    { id: 3, name: 'Python', category: 'Programming', level: 'Expert', experience: '4+ years' },
    { id: 4, name: 'AWS', category: 'Cloud', level: 'Intermediate', experience: '1+ year' },
    { id: 5, name: 'Docker', category: 'DevOps', level: 'Intermediate', experience: '1 year' },
    { id: 6, name: 'MongoDB', category: 'Database', level: 'Intermediate', experience: '2 years' },
    { id: 7, name: 'GraphQL', category: 'Backend', level: 'Beginner', experience: '6 months' },
    { id: 8, name: 'TypeScript', category: 'Programming', level: 'Expert', experience: '2+ years' },
    { id: 9, name: 'Leadership', category: 'Soft Skills', level: 'Expert', experience: '3+ years' },
    { id: 10, name: 'Project Management', category: 'Soft Skills', level: 'Intermediate', experience: '2+ years' },
    { id: 11, name: 'UI/UX Design', category: 'Design', level: 'Intermediate', experience: '1+ year' },
    { id: 12, name: 'Machine Learning', category: 'AI/ML', level: 'Beginner', experience: '6 months' }
  ]);

  const handleDeleteSkill = (skillId: number) => {
    setLocalSkills(localSkills.filter(s => s.id !== skillId));
    deleteSkill(skillId);
  };

  const handleAddSkill = (newSkill: any) => {
    const skill = {
      id: Date.now(),
      ...newSkill
    };
    setLocalSkills([...localSkills, skill]);
    addSkill(newSkill);
  };

  const handleEditSkill = (updatedSkill: any) => {
    setLocalSkills(localSkills.map(s => s.id === updatedSkill.id ? updatedSkill : s));
    updateSkill(updatedSkill.id, updatedSkill);
  };

  const categories = ['all', 'Frontend', 'Backend', 'Programming', 'Cloud', 'DevOps', 'Database', 'Design', 'AI/ML', 'Soft Skills'];

  const allSkills = localSkills;
  const filteredSkills = selectedCategory === 'all' 
    ? allSkills
    : allSkills.filter(skill => skill.category === selectedCategory);

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Intermediate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStars = (level) => {
    switch (level) {
      case 'Expert': return 3;
      case 'Intermediate': return 2;
      case 'Beginner': return 1;
      default: return 0;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Frontend': 
        return { 
          icon: Code, 
          bgColor: 'bg-slate-500', 
          iconColor: 'text-white',
          borderColor: 'border-slate-200'
        };
      case 'Backend': 
        return { 
          icon: Server, 
          bgColor: 'bg-gray-600', 
          iconColor: 'text-white',
          borderColor: 'border-gray-200'
        };
      case 'Programming': 
        return { 
          icon: Code, 
          bgColor: 'bg-indigo-600', 
          iconColor: 'text-white',
          borderColor: 'border-indigo-200'
        };
      case 'Cloud': 
        return { 
          icon: Cloud, 
          bgColor: 'bg-blue-600', 
          iconColor: 'text-white',
          borderColor: 'border-blue-200'
        };
      case 'DevOps': 
        return { 
          icon: Settings, 
          bgColor: 'bg-orange-600', 
          iconColor: 'text-white',
          borderColor: 'border-orange-200'
        };
      case 'Database': 
        return { 
          icon: Database, 
          bgColor: 'bg-green-600', 
          iconColor: 'text-white',
          borderColor: 'border-green-200'
        };
      case 'Design': 
        return { 
          icon: Palette, 
          bgColor: 'bg-pink-600', 
          iconColor: 'text-white',
          borderColor: 'border-pink-200'
        };
      case 'AI/ML': 
        return { 
          icon: Brain, 
          bgColor: 'bg-purple-600', 
          iconColor: 'text-white',
          borderColor: 'border-purple-200'
        };
      case 'Soft Skills': 
        return { 
          icon: Users, 
          bgColor: 'bg-teal-600', 
          iconColor: 'text-white',
          borderColor: 'border-teal-200'
        };
      default: 
        return { 
          icon: Lightbulb, 
          bgColor: 'bg-gray-600', 
          iconColor: 'text-white',
          borderColor: 'border-gray-200'
        };
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-soft">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl lg:text-4xl font-space font-bold text-gradient-primary mb-2">
              Skills
            </h1>
            <p className="text-foreground-muted">
              AI-parsed skills and manual additions
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="btn-primary mt-4 sm:mt-0">
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Skill</DialogTitle>
                </DialogHeader>
                <SkillForm 
                  onAdd={handleAddSkill}
                  onClose={() => {
                    const closeButton = document.querySelector('[role="dialog"] [data-state="open"] button[aria-label="Close"]') as HTMLButtonElement;
                    closeButton?.click();
                  }}
                />
              </DialogContent>
          </Dialog>
        </div>

        {/* Category Filter */}
        <Card className="glass-card mb-8 animate-slide-in-up">
          <div className="flex items-center space-x-4 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Filter by Category</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "btn-primary" : ""}
              >
                {category === 'all' ? 'All Skills' : category}
              </Button>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.filter(cat => cat !== 'all').map((category, index) => {
            const categorySkills = skills.filter(skill => skill.category === category);
            if (categorySkills.length === 0) return null;
            
            const categoryData = getCategoryIcon(category);
            const IconComponent = categoryData.icon;
            
            return (
              <Card key={category} className={`glass-card p-6 hover:glow-primary transition-all duration-500 transform hover:-translate-y-2 animate-slide-in-up border ${categoryData.borderColor}`} style={{ animationDelay: `${index * 150}ms` }}>
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-xl ${categoryData.bgColor} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <IconComponent className={`w-8 h-8 ${categoryData.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{category}</h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-2 rounded-full"></div>
                </div>
                
                <div className="space-y-3">
                  {categorySkills.map((skill, skillIndex) => (
                    <div key={skill.id} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-foreground">{skill.name}</span>
                          <div className="flex items-center space-x-1">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="ghost" className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-all">
                                  <Edit3 className="w-3 h-3" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Edit Skill</DialogTitle>
                                </DialogHeader>
                                <EditSkillForm 
                                  skill={skill} 
                                  onEdit={handleEditSkill}
                                  onClose={() => {
                                    const closeButton = document.querySelector('[role="dialog"] [data-state="open"] button[aria-label="Close"]') as HTMLButtonElement;
                                    closeButton?.click();
                                  }}
                                />
                              </DialogContent>
                            </Dialog>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="w-6 h-6 p-0 text-destructive opacity-0 group-hover:opacity-100 transition-all"
                              onClick={() => handleDeleteSkill(skill.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <Badge className={getSkillLevelColor(skill.level)} variant="secondary">
                          {skill.level}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-foreground-muted">
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: getStars(skill.level) }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current text-yellow-500" />
                          ))}
                          {Array.from({ length: 3 - getStars(skill.level) }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-muted" />
                          ))}
                        </div>
                        <span>{skill.experience}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Skills Cloud Visualization */}
        <Card className="glass-card mt-8 animate-slide-in-up">
          <h2 className="text-2xl font-space font-bold text-gradient-primary mb-6">
            Skills Cloud
          </h2>
          <div className="flex flex-wrap gap-3 justify-center p-6">
            {allSkills.map((skill, index) => (
              <div
                key={skill.name}
                className={`${getSkillLevelColor(skill.level)} px-4 py-2 rounded-full border font-medium cursor-pointer hover:shadow-md transition-all duration-200 animate-scale-in hover:glow-primary`}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  fontSize: skill.level === 'Expert' ? '1.2rem' : skill.level === 'Intermediate' ? '1rem' : '0.875rem'
                }}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <AIAssistant />
    </div>
  );

  function SkillForm({ onAdd, onClose }) {
    const [skillLevel, setSkillLevel] = useState([2]);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [experience, setExperience] = useState('');
    
    const levelLabels = ['Beginner', 'Intermediate', 'Expert'];

    const handleSubmit = () => {
      if (name && category) {
        onAdd({
          name,
          category,
          level: levelLabels[skillLevel[0]],
          experience: experience || '1 year'
        });
        setName('');
        setCategory('');
        setExperience('');
        setSkillLevel([2]);
        // Close dialog
        setTimeout(() => {
          const closeButton = document.querySelector('[data-state="open"] button[aria-label="Close"]') as HTMLButtonElement;
          closeButton?.click();
        }, 100);
        onClose?.();
      }
    };
    
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="skill-name">Skill Name</Label>
          <Input 
            id="skill-name" 
            placeholder="e.g., React, Leadership" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="skill-category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Frontend">Frontend</SelectItem>
              <SelectItem value="Backend">Backend</SelectItem>
              <SelectItem value="Programming">Programming</SelectItem>
              <SelectItem value="Cloud">Cloud</SelectItem>
              <SelectItem value="DevOps">DevOps</SelectItem>
              <SelectItem value="Database">Database</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="AI/ML">AI/ML</SelectItem>
              <SelectItem value="Soft Skills">Soft Skills</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Proficiency Level</Label>
          <div className="px-2">
            <Slider
              value={skillLevel}
              onValueChange={setSkillLevel}
              max={2}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-foreground-muted mt-1">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Expert</span>
            </div>
          </div>
          <div className="text-center">
            <Badge className={getSkillLevelColor(levelLabels[skillLevel[0]])}>
              {levelLabels[skillLevel[0]]}
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="skill-experience">Experience</Label>
          <Input 
            id="skill-experience" 
            placeholder="e.g., 2+ years, 6 months" 
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>

        <div className="flex space-x-3">
          <Button 
            className="btn-primary flex-1"
            onClick={handleSubmit}
            disabled={!name || !category}
          >
            Add Skill
          </Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    );
  }

  function EditSkillForm({ skill, onEdit, onClose }) {
    const [name, setName] = useState(skill.name);
    const [category, setCategory] = useState(skill.category);
    const [level, setLevel] = useState(skill.level);
    const [experience, setExperience] = useState(skill.experience);

    const handleSubmit = () => {
      onEdit({
        ...skill,
        name,
        category,
        level,
        experience
      });
      onClose?.();
    };

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="edit-skill-name">Skill Name</Label>
          <Input 
            id="edit-skill-name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="edit-skill-category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Frontend">Frontend</SelectItem>
              <SelectItem value="Backend">Backend</SelectItem>
              <SelectItem value="Programming">Programming</SelectItem>
              <SelectItem value="Cloud">Cloud</SelectItem>
              <SelectItem value="DevOps">DevOps</SelectItem>
              <SelectItem value="Database">Database</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="AI/ML">AI/ML</SelectItem>
              <SelectItem value="Soft Skills">Soft Skills</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-skill-level">Level</Label>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-skill-experience">Experience</Label>
          <Input 
            id="edit-skill-experience" 
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>

        <div className="flex space-x-3">
          <Button className="btn-primary flex-1" onClick={handleSubmit}>
            Save Changes
          </Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    );
  }
};

export default Skills;
