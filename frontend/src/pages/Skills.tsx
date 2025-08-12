import { useState, useEffect } from 'react';
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
import { getSkills as getSkillsAPI, addSkill as addSkillAPI, updateSkill as updateSkillAPI, deleteSkill as deleteSkillAPI } from '@/utils/api';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ openSkillForm, setOpenSkillForm ] = useState(false);
  const [ openEditSkillForm, setOpenEditSkillForm ] = useState(false);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDeleteSkill = async (skillId) => {
    try {
      await deleteSkillAPI(skillId);
      setSkills((prev) => prev.filter((s) => s.id !== skillId));
    } catch (err) {
      alert(err.message || "Failed to delete skill");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getSkillsAPI();
        setSkills(data);
      } catch (err) {
        setError(err.message || "Failed to load skills");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAddSkill = async (newSkill) => {
    try {
      const savedSkill = await addSkillAPI(newSkill);
      setSkills((prev) => [...prev, savedSkill]);
    } catch (err) {
      alert(err.message || "Failed to add skill");
    }
  };

  const handleEditSkill = async (updatedSkill) => {
    try {
      const savedSkill = await updateSkillAPI(updatedSkill.id, updatedSkill);
      setSkills((prev) =>
        prev.map((s) => (s.id === savedSkill.id ? savedSkill : s))
      );
    } catch (err) {
      alert(err.message || "Failed to update skill");
    }
  };

  const categories = ['all', 'Frontend', 'Backend', 'Programming', 'Cloud', 'DevOps', 'Database', 'Design', 'AI/ML', 'Soft Skills'];

  const allSkills = skills;
  const filteredSkills = selectedCategory === 'all' 
    ? allSkills 
    : allSkills.filter(skill => skill.category === selectedCategory);

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'bg-gradient-primary text-white border-primary/20';
      case 'Intermediate': return 'bg-accent/10 text-accent border-accent/20';
      case 'Beginner': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground border-border';
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
          bgColor: 'bg-gradient-primary', 
          iconColor: 'text-white',
          borderColor: 'border-primary/20'
        };
      case 'Backend': 
        return { 
          icon: Server, 
          bgColor: 'bg-gradient-primary', 
          iconColor: 'text-white',
          borderColor: 'border-primary/20'
        };
      case 'Programming': 
        return { 
          icon: Code, 
          bgColor: 'bg-gradient-primary', 
          iconColor: 'text-white',
          borderColor: 'border-primary/20'
        };
      case 'Cloud': 
        return { 
          icon: Cloud, 
          bgColor: 'bg-gradient-primary', 
          iconColor: 'text-white',
          borderColor: 'border-primary/20'
        };
      case 'DevOps': 
        return { 
          icon: Settings, 
          bgColor: 'bg-gradient-primary', 
          iconColor: 'text-white',
          borderColor: 'border-primary/20'
        };
      case 'Database': 
        return { 
          icon: Database, 
          bgColor: 'bg-gradient-primary', 
          iconColor: 'text-white',
          borderColor: 'border-primary/20'
        };
      case 'Design': 
        return { 
          icon: Palette, 
          bgColor: 'bg-gradient-primary', 
          iconColor: 'text-white',
          borderColor: 'border-primary/20'
        };
      case 'AI/ML': 
        return { 
          icon: Brain, 
          bgColor: 'bg-gradient-primary', 
          iconColor: 'text-white',
          borderColor: 'border-primary/20'
        };
      case 'Soft Skills': 
        return { 
          icon: Users, 
          bgColor: 'bg-gradient-primary', 
          iconColor: 'text-white',
          borderColor: 'border-primary/20'
        };
      default: 
        return { 
          icon: Lightbulb, 
          bgColor: 'bg-gradient-primary', 
          iconColor: 'text-white',
          borderColor: 'border-primary/20'
        };
    }
    
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Background with mesh effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-pink-50/30 dark:from-slate-900 dark:via-purple-900/10 dark:to-slate-900" />
        <div className="mesh-bg absolute inset-0" />
      </div>
      
      <div className="container mx-auto px-6 py-8 relative z-10">
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
          <Dialog open={openSkillForm} onOpenChange={setOpenSkillForm}>
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
                  onClose={() => setOpenSkillForm(false)}
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
                  <div className="w-12 h-1 bg-gradient-primary mx-auto mt-2 rounded-full"></div>
                </div>
                
                <div className="space-y-3">
                  {categorySkills.map((skill, skillIndex) => (
                    <div key={skill.id} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-foreground">{skill.name}</span>
                          <div className="flex items-center space-x-1">
                            <Dialog open={openEditSkillForm} onOpenChange={setOpenEditSkillForm}>
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
                                  onClose={() => setOpenEditSkillForm(false)}
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