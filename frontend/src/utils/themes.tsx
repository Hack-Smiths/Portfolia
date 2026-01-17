
import { Briefcase, Code2, Zap } from "lucide-react";
import React from "react";

export type TemplateType = 'classic' | 'creative' | 'modern';

export interface TemplateStyle {
    background: string;
    card: string;
    text: string;
    accent: string;
    glow: string;
    header: string;
    mesh: string;
}

export interface TemplateDefinition {
    name: string;
    icon: React.ReactNode;
    layout: string;
    styles: TemplateStyle;
}

export const templates: Record<TemplateType, TemplateDefinition> = {
    classic: {
        name: 'Classic Pro',
        icon: <Briefcase className="w-4 h-4" />,
        layout: 'corporate-clean',
        styles: {
            background: 'bg-gradient-to-br from-gray-50 via-blue-50 to-white dark:from-slate-900 dark:via-blue-950 dark:to-slate-900',
            card: 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300',
            text: 'text-gray-900 dark:text-gray-100',
            accent: 'bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300',
            glow: 'shadow-xl hover:shadow-2xl',
            header: 'bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-gray-200 dark:border-slate-700',
            mesh: 'opacity-5'
        }
    },
    creative: {
        name: 'Dev Terminal',
        icon: <Code2 className="w-4 h-4" />,
        layout: 'terminal-dev',
        styles: {
            background: 'bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-slate-900 dark:via-orange-950 dark:to-slate-900',
            card: 'bg-white dark:bg-slate-800 border border-orange-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300',
            text: 'text-slate-900 dark:text-slate-100',
            accent: 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white transition-all duration-300',
            glow: 'shadow-lg hover:shadow-xl',
            header: 'bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-orange-200 dark:border-slate-700',
            mesh: 'opacity-10'
        }
    },
    modern: {
        name: 'Modern Grid',
        icon: <Zap className="w-4 h-4" />,
        layout: 'tech-sidebar',
        styles: {
            background: 'bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900',
            card: 'bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 shadow-md hover:shadow-lg transition-all duration-300',
            text: 'text-gray-900 dark:text-gray-100',
            accent: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-indigo-500/30',
            glow: 'shadow-lg hover:shadow-xl',
            header: 'bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600',
            mesh: 'opacity-10'
        }
    }
};
