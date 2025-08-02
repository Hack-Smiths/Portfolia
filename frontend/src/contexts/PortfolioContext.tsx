import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

// Types for all data structures
export interface Project {
  id: number;
  title: string;
  description: string;
  type: 'github' | 'manual';
  stack: string[];
  features?: string[];
  status?: { imported: boolean; aiSummary: boolean; saved: boolean };
  stars?: number;
  forks?: number;
  lastUpdated: string;
  image?: string;
  url?: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  level: string;
  experience: string;
}

export interface Achievement {
  id: number;
  title: string;
  organization: string;
  duration: string;
  location?: string;
  description: string;
  skills?: string[];
  status?: string;
  issuer?: string;
  credentialId?: string;
  validUntil?: string;
}

export interface AchievementsData {
  internships: Achievement[];
  certificates: Achievement[];
  awards: Achievement[];
}

export interface Activity {
  id: number;
  type: 'project_added' | 'skill_updated' | 'profile_updated' | 'achievement_added';
  message: string;
  timestamp: string;
}

export interface ProfileData {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  portfolio: {
    isPublic: boolean;
    showContact: boolean;
  };
  completionPercentage: number;
}

interface PortfolioContextType {
  // Data
  projects: Project[];
  skills: Skill[];
  achievements: AchievementsData;
  profile: ProfileData;
  activities: Activity[];
  
  // Template selection
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  
  // Projects actions
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: number, project: Partial<Project>) => void;
  deleteProject: (id: number) => void;
  
  // Skills actions
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: number, skill: Partial<Skill>) => void;
  deleteSkill: (id: number) => void;
  
  // Achievements actions
  addAchievement: (type: keyof AchievementsData, achievement: Omit<Achievement, 'id'>) => void;
  updateAchievement: (type: keyof AchievementsData, id: number, achievement: Partial<Achievement>) => void;
  deleteAchievement: (type: keyof AchievementsData, id: number) => void;
  
  // Profile actions
  updateProfile: (profile: Partial<ProfileData>) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

interface PortfolioProviderProps {
  children: ReactNode;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ children }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: 'Sample Project',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
      type: 'github',
      stack: ['React', 'TypeScript'],
      features: ['Sample Feature'],
      status: { imported: false, aiSummary: false, saved: false },
      stars: 0,
      forks: 0,
      lastUpdated: 'Just now',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop'
    }
  ]);

  const [skills, setSkills] = useState<Skill[]>([
    { id: 1, name: 'Sample Skill', category: 'Programming', level: 'Beginner', experience: '0 months' }
  ]);

  const [achievements, setAchievements] = useState<AchievementsData>({
    internships: [
      {
        id: 1,
        title: 'Sample Work Experience',
        organization: 'Sample Organization',
        duration: 'No duration',
        location: 'Sample Location',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
        skills: ['Sample Skill'],
        status: 'not started'
      }
    ],
    certificates: [
      {
        id: 2,
        title: 'Sample Certificate',
        organization: 'Sample Organization',
        duration: 'No date',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
        issuer: 'Sample Organization',
        credentialId: 'SAMPLE-000',
        validUntil: 'No expiry'
      }
    ],
    awards: [
      {
        id: 3,
        title: 'Sample Award',
        organization: 'Sample Organization',
        duration: 'No date',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
        skills: ['Sample Skill']
      }
    ]
  });

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      type: 'project_added',
      message: 'Sample activity: Lorem ipsum dolor sit amet',
      timestamp: 'Just now'
    }
  ]);

  const [profile, setProfile] = useState<ProfileData>({
    name: 'Sample',
    email: 'sample@example.com',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    location: 'Sample Location',
    website: 'https://sample.example.com',
    github: 'sample',
    linkedin: 'sample',
    twitter: 'sample',
    portfolio: {
      isPublic: false,
      showContact: false
    },
    completionPercentage: 0
  });

  // Projects actions
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now() };
    setProjects(prev => [...prev, newProject]);
    toast({
      title: "New project added",
      description: `${project.title} has been added to your portfolio.`,
    });
  };

  const updateProject = (id: number, projectUpdate: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...projectUpdate } : p));
  };

  const deleteProject = (id: number) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Skills actions
  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill = { ...skill, id: Date.now() };
    setSkills(prev => [...prev, newSkill]);
    toast({
      title: "New skill added",
      description: `${skill.name} has been added to your skills.`,
    });
  };

  const updateSkill = (id: number, skillUpdate: Partial<Skill>) => {
    setSkills(prev => prev.map(s => s.id === id ? { ...s, ...skillUpdate } : s));
  };

  const deleteSkill = (id: number) => {
    setSkills(prev => prev.filter(s => s.id !== id));
  };

  // Achievements actions
  const addAchievement = (type: keyof AchievementsData, achievement: Omit<Achievement, 'id'>) => {
    const newAchievement = { ...achievement, id: Date.now() };
    setAchievements(prev => ({
      ...prev,
      [type]: [...prev[type], newAchievement]
    }));
    const typeLabels = {
      internships: 'internship',
      certificates: 'certificate', 
      awards: 'award'
    };
    toast({
      title: `New ${typeLabels[type]} added`,
      description: `${achievement.title} has been added to your ${type}.`,
    });
  };

  const updateAchievement = (type: keyof AchievementsData, id: number, achievementUpdate: Partial<Achievement>) => {
    setAchievements(prev => ({
      ...prev,
      [type]: prev[type].map(a => a.id === id ? { ...a, ...achievementUpdate } : a)
    }));
  };

  const deleteAchievement = (type: keyof AchievementsData, id: number) => {
    setAchievements(prev => ({
      ...prev,
      [type]: prev[type].filter(a => a.id !== id)
    }));
  };

  // Profile actions
  const updateProfile = (profileUpdate: Partial<ProfileData>) => {
    setProfile(prev => ({ ...prev, ...profileUpdate }));
  };

  const value: PortfolioContextType = {
    projects,
    skills,
    achievements,
    profile,
    activities,
    selectedTemplate,
    setSelectedTemplate,
    addProject,
    updateProject,
    deleteProject,
    addSkill,
    updateSkill,
    deleteSkill,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    updateProfile
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};