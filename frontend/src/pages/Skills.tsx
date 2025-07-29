import { useState } from 'react';
import { Plus, Brain, Edit3, Trash2, Filter, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import AIAssistant from '@/components/AIAssistant';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const aiParsedSkills = [
    { name: 'React', category: 'Frontend', level: 'Expert', confidence: 95, experience: '3+ years' },
    { name: 'Node.js', category: 'Backend', level: 'Expert', confidence: 90, experience: '2+ years' },
    { name: 'Python', category: 'Programming', level: 'Expert', confidence: 88, experience: '4+ years' },
    { name: 'AWS', category: 'Cloud', level: 'Intermediate', confidence: 82, experience: '1+ year' },
    { name: 'Docker', category: 'DevOps', level: 'Intermediate', confidence: 75, experience: '1 year' },
    { name: 'MongoDB', category: 'Database', level: 'Intermediate', confidence: 78, experience: '2 years' },
    { name: 'GraphQL', category: 'Backend', level: 'Beginner', confidence: 65, experience: '6 months' },
    { name: 'TypeScript', category: 'Programming', level: 'Expert', confidence: 92, experience: '2+ years' }
  ];

  const manualSkills = [
    { name: 'Leadership', category: 'Soft Skills', level: 'Expert' },
    { name: 'Project Management', category: 'Soft Skills', level: 'Intermediate' },
    { name: 'UI/UX Design', category: 'Design', level: 'Intermediate' },
    { name: 'Machine Learning', category: 'AI/ML', level: 'Beginner' },
    { name: 'Public Speaking', category: 'Soft Skills', level: 'Intermediate' }
  ];

  const categories = ['all', 'Frontend', 'Backend', 'Programming', 'Cloud', 'DevOps', 'Database', 'Design', 'AI/ML', 'Soft Skills'];

  const allSkills = [...aiParsedSkills, ...manualSkills];
  const filteredSkills = selectedCategory === 'all' 
    ? allSkills 
    : allSkills.filter(skill => skill.category === selectedCategory);

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'skill-tag expert';
      case 'Intermediate': return 'skill-tag intermediate';
      case 'Beginner': return 'skill-tag beginner';
      default: return 'skill-tag';
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
              <SkillForm />
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI-Parsed Skills */}
          <div>
            <div className="flex items-center mb-6">
              <Brain className="w-6 h-6 mr-2 text-electric" />
              <h2 className="text-2xl font-space font-bold text-gradient-primary">
                AI-Parsed Skills
              </h2>
            </div>
            
            <div className="space-y-4">
              {aiParsedSkills.filter(skill => 
                selectedCategory === 'all' || skill.category === selectedCategory
              ).map((skill, index) => (
                <Card key={skill.name} className="glass-card interactive animate-slide-in-right" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold">{skill.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {skill.category}
                      </Badge>
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

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: getStars(skill.level) }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-warning" />
                      ))}
                      {Array.from({ length: 3 - getStars(skill.level) }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-muted" />
                      ))}
                      <span className="text-sm text-foreground-muted ml-2">{skill.level}</span>
                    </div>
                    <div className="text-xs text-foreground-muted">
                      {skill.experience}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-foreground-muted">AI Confidence</span>
                      <span className="font-medium">{skill.confidence}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.confidence}%` }}
                      />
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3 text-xs"
                  >
                    <Brain className="w-3 h-3 mr-1" />
                    Enhance with AI
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Manual Skills */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-space font-bold text-gradient-primary">
                Manual Skills
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
                    <DialogTitle>Add Manual Skill</DialogTitle>
                  </DialogHeader>
                  <SkillForm />
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {manualSkills.filter(skill => 
                selectedCategory === 'all' || skill.category === selectedCategory
              ).map((skill, index) => (
                <Card key={skill.name} className="glass-card interactive animate-slide-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold">{skill.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {skill.category}
                      </Badge>
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

                  <div className="flex items-center space-x-1 mb-3">
                    {Array.from({ length: getStars(skill.level) }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-warning" />
                    ))}
                    {Array.from({ length: 3 - getStars(skill.level) }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-muted" />
                    ))}
                    <span className="text-sm text-foreground-muted ml-2">{skill.level}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
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
                className={`${getSkillLevelColor(skill.level)} interactive animate-scale-in hover:glow-primary`}
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

  function SkillForm() {
    const [skillLevel, setSkillLevel] = useState([2]);
    
    const levelLabels = ['Beginner', 'Intermediate', 'Expert'];
    
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="skill-name">Skill Name</Label>
          <Input id="skill-name" placeholder="e.g., React, Leadership" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="skill-category">Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frontend">Frontend</SelectItem>
              <SelectItem value="backend">Backend</SelectItem>
              <SelectItem value="programming">Programming</SelectItem>
              <SelectItem value="cloud">Cloud</SelectItem>
              <SelectItem value="devops">DevOps</SelectItem>
              <SelectItem value="database">Database</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="ai-ml">AI/ML</SelectItem>
              <SelectItem value="soft-skills">Soft Skills</SelectItem>
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

        <div className="flex space-x-3">
          <Button className="btn-primary flex-1">Add Skill</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    );
  }
};

export default Skills;