import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
    User, Briefcase, Code, Award, GraduationCap, Trophy,
    Plus, Trash2, X, MapPin, Mail, Github, Linkedin, Globe
} from 'lucide-react';

interface ExtractedData {
    name: string;
    title: string;
    location: string;
    email: string;
    about: string;
    github: string;
    linkedin: string;
    website: string;
    projects: Array<{
        title: string;
        description: string;
        tech: string[];
        features: string[];
    }>;
    skills: Array<{
        name: string;
        level: string;
        category: string;
    }>;
    work_experience: Array<{
        title: string;
        company: string;
        duration: string;
        location: string;
        description: string;
    }>;
    certifications: Array<{
        name: string;
        issuer: string;
        year: string;
        description: string;
    }>;
    achievements: Array<{
        title: string;
        issuer: string;
        date: string;
        type: string;
        description: string;
    }>;
}

interface ResumeDataEditorProps {
    data: ExtractedData;
    onDataChange: (updatedData: ExtractedData) => void;
    selectedItems: {
        work_experience: Set<number>;
        projects: Set<number>;
        skills: Set<number>;
        certifications: Set<number>;
        achievements: Set<number>;
    };
    onSelectionChange: (selectedItems: {
        work_experience: Set<number>;
        projects: Set<number>;
        skills: Set<number>;
        certifications: Set<number>;
        achievements: Set<number>;
    }) => void;
}

const SKILL_CATEGORIES = [
    'Frontend',
    'Backend',
    'Programming',
    'Cloud',
    'DevOps',
    'Database',
    'Design',
    'AI/ML',
    'Soft Skills'
];

const ResumeDataEditor: React.FC<ResumeDataEditorProps> = ({ data, onDataChange, selectedItems, onSelectionChange }) => {
    const updateField = (field: keyof ExtractedData, value: any) => {
        onDataChange({ ...data, [field]: value });
    };

    const updateArrayItem = <T,>(
        arrayField: keyof ExtractedData,
        index: number,
        updatedItem: T
    ) => {
        const array = [...(data[arrayField] as T[])];
        array[index] = updatedItem;
        onDataChange({ ...data, [arrayField]: array });
    };

    const addArrayItem = <T,>(arrayField: keyof ExtractedData, newItem: T) => {
        const array = [...(data[arrayField] as T[]), newItem];
        onDataChange({ ...data, [arrayField]: array });
    };

    const removeArrayItem = (arrayField: keyof ExtractedData, index: number) => {
        const array = (data[arrayField] as any[]).filter((_, i) => i !== index);
        onDataChange({ ...data, [arrayField]: array });
    };

    // Selection helper functions
    const toggleSelection = (section: keyof typeof selectedItems, index: number) => {
        const newSet = new Set(selectedItems[section]);
        if (newSet.has(index)) {
            newSet.delete(index);
        } else {
            newSet.add(index);
        }
        onSelectionChange({ ...selectedItems, [section]: newSet });
    };

    const selectAll = (section: keyof typeof selectedItems) => {
        const arrayField = section as keyof ExtractedData;
        const array = data[arrayField] as any[];
        const newSet = new Set(array.map((_, i) => i));
        onSelectionChange({ ...selectedItems, [section]: newSet });
    };

    const deselectAll = (section: keyof typeof selectedItems) => {
        onSelectionChange({ ...selectedItems, [section]: new Set() });
    };

    // Group skills by category
    const skillsByCategory = data.skills.reduce((acc, skill) => {
        const category = skill.category || 'Other';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(skill);
        return acc;
    }, {} as Record<string, typeof data.skills>);

    return (
        <div className="space-y-3">
            <Accordion type="multiple" defaultValue={['personal', 'work', 'projects', 'skills']} className="w-full space-y-3">

                {/* Personal Information Section */}
                <AccordionItem value="personal" className="border rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                    <AccordionTrigger className="hover:no-underline px-4 py-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold text-blue-900 dark:text-blue-100">Personal Information</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                        <div className="space-y-4 pt-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                                        Full Name *
                                    </label>
                                    <Input
                                        value={data.name}
                                        onChange={(e) => updateField('name', e.target.value)}
                                        placeholder="John Doe"
                                        className="bg-white dark:bg-slate-900"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                                        Professional Title *
                                    </label>
                                    <Input
                                        value={data.title}
                                        onChange={(e) => updateField('title', e.target.value)}
                                        placeholder="Software Engineer"
                                        className="bg-white dark:bg-slate-900"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1">
                                        <Mail className="w-3 h-3" />
                                        Email *
                                    </label>
                                    <Input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => updateField('email', e.target.value)}
                                        placeholder="john@example.com"
                                        className="bg-white dark:bg-slate-900"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        Location
                                    </label>
                                    <Input
                                        value={data.location}
                                        onChange={(e) => updateField('location', e.target.value)}
                                        placeholder="San Francisco, CA"
                                        className="bg-white dark:bg-slate-900"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                                    About / Bio
                                </label>
                                <Textarea
                                    value={data.about}
                                    onChange={(e) => updateField('about', e.target.value)}
                                    placeholder="Tell us about yourself..."
                                    rows={4}
                                    className="resize-none bg-white dark:bg-slate-900"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1">
                                        <Github className="w-3 h-3" />
                                        GitHub
                                    </label>
                                    <Input
                                        value={data.github}
                                        onChange={(e) => updateField('github', e.target.value)}
                                        placeholder="github.com/username"
                                        className="bg-white dark:bg-slate-900"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1">
                                        <Linkedin className="w-3 h-3" />
                                        LinkedIn
                                    </label>
                                    <Input
                                        value={data.linkedin}
                                        onChange={(e) => updateField('linkedin', e.target.value)}
                                        placeholder="linkedin.com/in/username"
                                        className="bg-white dark:bg-slate-900"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1">
                                        <Globe className="w-3 h-3" />
                                        Website
                                    </label>
                                    <Input
                                        value={data.website}
                                        onChange={(e) => updateField('website', e.target.value)}
                                        placeholder="yourwebsite.com"
                                        className="bg-white dark:bg-slate-900"
                                    />
                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Work Experience Section */}
                <AccordionItem value="work" className="border rounded-lg bg-purple-50/50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900">
                    <AccordionTrigger className="hover:no-underline px-4 py-3">
                        <div className="flex items-center gap-2 flex-1">
                            <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center">
                                <Briefcase className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold text-purple-900 dark:text-purple-100">Work Experience</span>
                            <Badge variant="secondary" className="ml-2 bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100">
                                {selectedItems.work_experience.size} / {data.work_experience.length}
                            </Badge>
                            <div className="ml-auto flex gap-2" onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => selectAll('work_experience')}>
                                    Select All
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => deselectAll('work_experience')}>
                                    Deselect All
                                </Button>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                        <div className="space-y-3 pt-2">
                            {data.work_experience.map((work, index) => (
                                <Card key={index} className="p-4 relative bg-white dark:bg-slate-900 border-purple-200 dark:border-purple-900">
                                    <div className="flex items-start gap-3">
                                        <Checkbox
                                            checked={selectedItems.work_experience.has(index)}
                                            onCheckedChange={() => toggleSelection('work_experience', index)}
                                            className="mt-1"
                                        />
                                        <div className="flex-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900"
                                                onClick={() => removeArrayItem('work_experience', index)}
                                            >
                                                <Trash2 className="w-4 h-4 text-destructive" />
                                            </Button>

                                            <div className="space-y-3 pr-8">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                                            Job Title
                                                        </label>
                                                        <Input
                                                            value={work.title}
                                                            onChange={(e) => updateArrayItem('work_experience', index, { ...work, title: e.target.value })}
                                                            placeholder="Software Engineer"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                                            Company
                                                        </label>
                                                        <Input
                                                            value={work.company}
                                                            onChange={(e) => updateArrayItem('work_experience', index, { ...work, company: e.target.value })}
                                                            placeholder="Tech Corp"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                                            Duration
                                                        </label>
                                                        <Input
                                                            value={work.duration}
                                                            onChange={(e) => updateArrayItem('work_experience', index, { ...work, duration: e.target.value })}
                                                            placeholder="Jan 2020 - Present"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                                            Location
                                                        </label>
                                                        <Input
                                                            value={work.location}
                                                            onChange={(e) => updateArrayItem('work_experience', index, { ...work, location: e.target.value })}
                                                            placeholder="Remote"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                                        Description
                                                    </label>
                                                    <Textarea
                                                        value={work.description}
                                                        onChange={(e) => updateArrayItem('work_experience', index, { ...work, description: e.target.value })}
                                                        placeholder="Describe your responsibilities..."
                                                        rows={3}
                                                        className="resize-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}

                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full border-purple-300 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950"
                                onClick={() => addArrayItem('work_experience', {
                                    title: '',
                                    company: '',
                                    duration: '',
                                    location: '',
                                    description: ''
                                })}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Work Experience
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Projects Section */}
                <AccordionItem value="projects" className="border rounded-lg bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
                    <AccordionTrigger className="hover:no-underline px-4 py-3">
                        <div className="flex items-center gap-2 flex-1">
                            <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                                <Code className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold text-green-900 dark:text-green-100">Projects</span>
                            <Badge variant="secondary" className="ml-2 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100">
                                {selectedItems.projects.size} / {data.projects.length}
                            </Badge>
                            <div className="ml-auto flex gap-2" onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => selectAll('projects')}>
                                    Select All
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => deselectAll('projects')}>
                                    Deselect All
                                </Button>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                        <div className="space-y-3 pt-2">
                            {data.projects.map((project, index) => (
                                <Card key={index} className="p-4 relative bg-white dark:bg-slate-900 border-green-200 dark:border-green-900">
                                    <div className="flex items-start gap-3">
                                        <Checkbox
                                            checked={selectedItems.projects.has(index)}
                                            onCheckedChange={() => toggleSelection('projects', index)}
                                            className="mt-1"
                                        />
                                        <div className="flex-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900"
                                                onClick={() => removeArrayItem('projects', index)}
                                            >
                                                <Trash2 className="w-4 h-4 text-destructive" />
                                            </Button>

                                            <div className="space-y-3 pr-8">
                                                <div>
                                                    <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                                        Project Title
                                                    </label>
                                                    <Input
                                                        value={project.title}
                                                        onChange={(e) => updateArrayItem('projects', index, { ...project, title: e.target.value })}
                                                        placeholder="My Awesome Project"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                                        Description
                                                    </label>
                                                    <Textarea
                                                        value={project.description}
                                                        onChange={(e) => updateArrayItem('projects', index, { ...project, description: e.target.value })}
                                                        placeholder="Describe your project..."
                                                        rows={3}
                                                        className="resize-none"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                                        Tech Stack
                                                    </label>
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        {project.tech.map((tech, techIndex) => (
                                                            <Badge key={techIndex} variant="secondary" className="gap-1 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100">
                                                                {tech}
                                                                <button
                                                                    className="ml-1 hover:text-destructive"
                                                                    onClick={() => {
                                                                        const newTech = project.tech.filter((_, i) => i !== techIndex);
                                                                        updateArrayItem('projects', index, { ...project, tech: newTech });
                                                                    }}
                                                                >
                                                                    <X className="w-3 h-3" />
                                                                </button>
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                    <Input
                                                        placeholder="Type technology and press Enter..."
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                                                const newTech = [...project.tech, e.currentTarget.value.trim()];
                                                                updateArrayItem('projects', index, { ...project, tech: newTech });
                                                                e.currentTarget.value = '';
                                                            }
                                                        }}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                                        Key Features
                                                    </label>
                                                    <div className="space-y-2 mb-2">
                                                        {project.features.map((feature, featureIndex) => (
                                                            <div key={featureIndex} className="flex gap-2 items-center">
                                                                <Input
                                                                    value={feature}
                                                                    onChange={(e) => {
                                                                        const newFeatures = [...project.features];
                                                                        newFeatures[featureIndex] = e.target.value;
                                                                        updateArrayItem('projects', index, { ...project, features: newFeatures });
                                                                    }}
                                                                    placeholder="Feature description..."
                                                                />
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900"
                                                                    onClick={() => {
                                                                        const newFeatures = project.features.filter((_, i) => i !== featureIndex);
                                                                        updateArrayItem('projects', index, { ...project, features: newFeatures });
                                                                    }}
                                                                >
                                                                    <Trash2 className="w-4 h-4 text-destructive" />
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-green-300 dark:border-green-800"
                                                        onClick={() => {
                                                            const newFeatures = [...project.features, ''];
                                                            updateArrayItem('projects', index, { ...project, features: newFeatures });
                                                        }}
                                                    >
                                                        <Plus className="w-3 h-3 mr-1" />
                                                        Add Feature
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}

                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full border-green-300 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950"
                                onClick={() => addArrayItem('projects', {
                                    title: '',
                                    description: '',
                                    tech: [],
                                    features: []
                                })}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Project
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Skills Section - Compact Layout */}
                <AccordionItem value="skills" className="border rounded-lg bg-orange-50/50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900">
                    <AccordionTrigger className="hover:no-underline px-4 py-3">
                        <div className="flex items-center gap-2 flex-1">
                            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                                <Award className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold text-orange-900 dark:text-orange-100">Skills</span>
                            <Badge variant="secondary" className="ml-2 bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100">
                                {selectedItems.skills.size} / {data.skills.length}
                            </Badge>
                            <div className="ml-auto flex gap-2" onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => selectAll('skills')}>
                                    Select All
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => deselectAll('skills')}>
                                    Deselect All
                                </Button>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                        <div className="space-y-4 pt-2">
                            {/* Categorized Skills Display */}
                            {SKILL_CATEGORIES.map((category) => {
                                const categorySkills = skillsByCategory[category] || [];
                                if (categorySkills.length === 0) return null;

                                return (
                                    <div key={category} className="bg-white dark:bg-slate-900 border border-orange-200 dark:border-orange-900 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="font-semibold text-sm text-orange-900 dark:text-orange-100">{category}</h4>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-6 text-xs hover:bg-red-100 dark:hover:bg-red-900"
                                                onClick={() => {
                                                    // Remove all skills in this category
                                                    const newSkills = data.skills.filter(s => s.category !== category);
                                                    onDataChange({ ...data, skills: newSkills });
                                                }}
                                            >
                                                <Trash2 className="w-3 h-3 mr-1" />
                                                Remove All
                                            </Button>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {categorySkills.map((skill, skillIndex) => {
                                                const globalIndex = data.skills.findIndex(s => s === skill);
                                                return (
                                                    <div key={skillIndex} className="flex items-center gap-1">
                                                        <Checkbox
                                                            checked={selectedItems.skills.has(globalIndex)}
                                                            onCheckedChange={() => toggleSelection('skills', globalIndex)}
                                                            className="h-4 w-4"
                                                        />
                                                        <Badge
                                                            variant="secondary"
                                                            className="gap-1 bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 px-3 py-1"
                                                        >
                                                            <input
                                                                type="text"
                                                                value={skill.name}
                                                                onChange={(e) => updateArrayItem('skills', globalIndex, { ...skill, name: e.target.value })}
                                                                className="bg-transparent border-none outline-none w-auto min-w-[60px] max-w-[150px] text-sm"
                                                                placeholder="Skill name"
                                                            />
                                                            <button
                                                                className="ml-1 hover:text-destructive"
                                                                onClick={() => removeArrayItem('skills', globalIndex)}
                                                            >
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </Badge>
                                                    </div>
                                                );
                                            })}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 text-xs border border-dashed border-orange-300 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900"
                                                onClick={() => addArrayItem('skills', {
                                                    name: '',
                                                    category: category,
                                                    level: 'intermediate'
                                                })}
                                            >
                                                <Plus className="w-3 h-3 mr-1" />
                                                Add
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Add New Category */}
                            <div className="flex gap-2">
                                <Select
                                    onValueChange={(category) => {
                                        addArrayItem('skills', {
                                            name: '',
                                            category: category,
                                            level: 'intermediate'
                                        });
                                    }}
                                >
                                    <SelectTrigger className="w-full border-orange-300 dark:border-orange-800">
                                        <SelectValue placeholder="Add skills to a category..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SKILL_CATEGORIES.map((cat) => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Certifications Section */}
                <AccordionItem value="certifications" className="border rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900">
                    <AccordionTrigger className="hover:no-underline px-4 py-3">
                        <div className="flex items-center gap-2 flex-1">
                            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                                <GraduationCap className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold text-indigo-900 dark:text-indigo-100">Certifications</span>
                            <Badge variant="secondary" className="ml-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100">
                                {selectedItems.certifications.size} / {data.certifications.length}
                            </Badge>
                            <div className="ml-auto flex gap-2" onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => selectAll('certifications')}>
                                    Select All
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => deselectAll('certifications')}>
                                    Deselect All
                                </Button>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                        <div className="space-y-3 pt-2">
                            {data.certifications.map((cert, index) => (
                                <Card key={index} className="p-4 relative bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900">
                                    <div className="flex items-start gap-3">
                                        <Checkbox
                                            checked={selectedItems.certifications.has(index)}
                                            onCheckedChange={() => toggleSelection('certifications', index)}
                                            className="mt-1"
                                        />
                                        <div className="flex-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900"
                                                onClick={() => removeArrayItem('certifications', index)}
                                            >
                                                <Trash2 className="w-4 h-4 text-destructive" />
                                            </Button>

                                            <div className="space-y-3 pr-8">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                                            Certification Name
                                                        </label>
                                                        <Input
                                                            value={cert.name}
                                                            onChange={(e) => updateArrayItem('certifications', index, { ...cert, name: e.target.value })}
                                                            placeholder="AWS Certified Developer"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                                            Issuer
                                                        </label>
                                                        <Input
                                                            value={cert.issuer}
                                                            onChange={(e) => updateArrayItem('certifications', index, { ...cert, issuer: e.target.value })}
                                                            placeholder="Amazon Web Services"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                                            Year
                                                        </label>
                                                        <Input
                                                            value={cert.year}
                                                            onChange={(e) => updateArrayItem('certifications', index, { ...cert, year: e.target.value })}
                                                            placeholder="2023"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                                        Description
                                                    </label>
                                                    <Textarea
                                                        value={cert.description}
                                                        onChange={(e) => updateArrayItem('certifications', index, { ...cert, description: e.target.value })}
                                                        placeholder="Brief description..."
                                                        rows={2}
                                                        className="resize-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}

                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full border-indigo-300 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950"
                                onClick={() => addArrayItem('certifications', {
                                    name: '',
                                    issuer: '',
                                    year: '',
                                    description: ''
                                })}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Certification
                            </Button>

                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Achievements Section */}
                <AccordionItem value="achievements" className="border rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
                    <AccordionTrigger className="hover:no-underline px-4 py-3">
                        <div className="flex items-center gap-2 flex-1">
                            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                                <Trophy className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-semibold text-amber-900 dark:text-amber-100">Achievements</span>
                            <Badge variant="secondary" className="ml-2 bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100">
                                {selectedItems.achievements.size} / {data.achievements.length}
                            </Badge>
                            <div className="ml-auto flex gap-2" onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => selectAll('achievements')}>
                                    Select All
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => deselectAll('achievements')}>
                                    Deselect All
                                </Button>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                        <div className="space-y-3 pt-2">
                            {data.achievements.map((achievement, index) => (
                                <Card key={index} className="p-4 relative bg-white dark:bg-slate-900 border-amber-200 dark:border-amber-900">
                                    <div className="flex items-start gap-3">
                                        <Checkbox
                                            checked={selectedItems.achievements.has(index)}
                                            onCheckedChange={() => toggleSelection('achievements', index)}
                                            className="mt-1"
                                        />
                                        <div className="flex-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900"
                                                onClick={() => removeArrayItem('achievements', index)}
                                            >
                                                <Trash2 className="w-4 h-4 text-destructive" />
                                            </Button>

                                            <div className="space-y-3 pr-8">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                                            Achievement Title
                                                        </label>
                                                        <Input
                                                            value={achievement.title}
                                                            onChange={(e) => updateArrayItem('achievements', index, { ...achievement, title: e.target.value })}
                                                            placeholder="Hackathon Winner"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                                            Issuer/Organization
                                                        </label>
                                                        <Input
                                                            value={achievement.issuer}
                                                            onChange={(e) => updateArrayItem('achievements', index, { ...achievement, issuer: e.target.value })}
                                                            placeholder="Tech Conference 2023"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                                            Date
                                                        </label>
                                                        <Input
                                                            value={achievement.date}
                                                            onChange={(e) => updateArrayItem('achievements', index, { ...achievement, date: e.target.value })}
                                                            placeholder="March 2023"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                                            Type
                                                        </label>
                                                        <Select
                                                            value={achievement.type}
                                                            onValueChange={(value) => updateArrayItem('achievements', index, { ...achievement, type: value })}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="award">Award</SelectItem>
                                                                <SelectItem value="internship">Internship</SelectItem>
                                                                <SelectItem value="competition">Competition</SelectItem>
                                                                <SelectItem value="recognition">Recognition</SelectItem>
                                                                <SelectItem value="other">Other</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="text-xs font-medium text-muted-foreground mb-1 block">
                                                        Description
                                                    </label>
                                                    <Textarea
                                                        value={achievement.description}
                                                        onChange={(e) => updateArrayItem('achievements', index, { ...achievement, description: e.target.value })}
                                                        placeholder="Describe the achievement..."
                                                        rows={2}
                                                        className="resize-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}

                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full border-amber-300 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-950"
                                onClick={() => addArrayItem('achievements', {
                                    title: '',
                                    issuer: '',
                                    date: '',
                                    type: 'award',
                                    description: ''
                                })}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Achievement
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div >
    );
};

export default ResumeDataEditor;
