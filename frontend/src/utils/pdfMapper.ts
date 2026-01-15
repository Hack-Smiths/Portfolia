/**
 * Portfolio to Resume Data Mapper
 * 
 * Maps portfolio data structure to resume-friendly format
 * Handles empty sections, formats dates, and ensures ATS compatibility
 */

export interface ResumeData {
    name: string;
    title: string;
    email: string;
    location: string;
    github: string;
    linkedin: string;
    website: string;
    about: string;
    skills: Array<{ name: string; category: string }>;
    projects: Array<{
        title: string;
        description: string;
        tech: string[] | string;
        link?: string;
    }>;
    achievements: Array<{
        title: string;
        issuer: string;
        date: string;
        description?: string;
        type: string;
    }>;
    certificates: Array<{
        title: string;
        issuer: string;
        date: string;
        credentialId?: string;
    }>;
}

/**
 * Maps portfolio data to resume format
 * @param portfolioData - Raw portfolio data from API
 * @returns Formatted resume data
 */
export const mapPortfolioToResume = (portfolioData: any): ResumeData => {
    return {
        // Basic Info
        name: portfolioData?.name || portfolioData?.username || 'Your Name',
        title: portfolioData?.title || portfolioData?.tagline || 'Professional Title',
        email: portfolioData?.email || '',
        location: portfolioData?.location || '',
        github: portfolioData?.github || '',
        linkedin: portfolioData?.linkedin || '',
        website: portfolioData?.website || '',
        about: portfolioData?.about || portfolioData?.bio || '',

        // Skills - ensure proper structure
        skills: Array.isArray(portfolioData?.skills)
            ? portfolioData.skills.map((skill: any) => ({
                name: skill.name || skill,
                category: skill.category || skill.type || 'Technical Skills',
            }))
            : [],

        // Projects - limit and format
        projects: Array.isArray(portfolioData?.projects)
            ? portfolioData.projects.map((project: any) => ({
                title: project.title || project.name || 'Untitled Project',
                description: project.description || '',
                tech: Array.isArray(project.tech)
                    ? project.tech
                    : typeof project.tech === 'string'
                        ? project.tech.split(',').map((t: string) => t.trim())
                        : project.technologies || [],
                link: project.link || project.github || project.demo || '',
            }))
            : [],

        // Achievements/Experience - format dates
        achievements: Array.isArray(portfolioData?.achievements)
            ? portfolioData.achievements.map((achievement: any) => ({
                title: achievement.title || achievement.name || '',
                issuer: achievement.issuer || achievement.organization || achievement.company || '',
                date: formatDate(achievement.date || achievement.year),
                description: achievement.description || '',
                type: achievement.type || 'achievement',
            }))
            : [],

        // Certificates
        certificates: Array.isArray(portfolioData?.certificates)
            ? portfolioData.certificates.map((cert: any) => ({
                title: cert.title || cert.name || '',
                issuer: cert.issuer || cert.organization || '',
                date: formatDate(cert.date || cert.year),
                credentialId: cert.credentialId || cert.id || '',
            }))
            : [],
    };
};

/**
 * Formats date for resume display
 * @param date - Date string or object
 * @returns Formatted date string
 */
const formatDate = (date: any): string => {
    if (!date) return '';

    // If it's already a formatted string, return it
    if (typeof date === 'string') {
        // Check if it's just a year
        if (/^\d{4}$/.test(date)) {
            return date;
        }
        return date;
    }

    // If it's a Date object
    if (date instanceof Date) {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    }

    return String(date);
};

/**
 * Validates if section has content
 * @param data - Resume data
 * @param section - Section name
 * @returns true if section has content
 */
export const hasSectionContent = (data: ResumeData, section: string): boolean => {
    switch (section) {
        case 'about':
            return !!data.about && data.about.length > 0;
        case 'skills':
            return Array.isArray(data.skills) && data.skills.length > 0;
        case 'projects':
            return Array.isArray(data.projects) && data.projects.length > 0;
        case 'experience':
            return Array.isArray(data.achievements) && data.achievements.length > 0;
        case 'certificates':
            return Array.isArray(data.certificates) && data.certificates.length > 0;
        default:
            return false;
    }
};

/**
 * Generates filename for PDF export
 * @param username - User's username
 * @returns Formatted filename
 */
export const generatePDFFilename = (username: string): string => {
    const sanitizedUsername = username.replace(/[^a-zA-Z0-9-_]/g, '');
    return `${sanitizedUsername}-portfolio.pdf`;
};
