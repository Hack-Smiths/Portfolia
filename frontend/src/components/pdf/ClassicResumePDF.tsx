import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Define styles for Classic Resume Template
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 11,
        fontFamily: 'Helvetica',
        lineHeight: 1.5,
    },
    header: {
        marginBottom: 20,
        borderBottom: '2 solid #000000',
        paddingBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    title: {
        fontSize: 14,
        color: '#333333',
        marginBottom: 8,
    },
    contactInfo: {
        fontSize: 10,
        color: '#555555',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    contactItem: {
        marginRight: 15,
    },
    section: {
        marginTop: 15,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
        textTransform: 'uppercase',
        borderBottom: '1 solid #CCCCCC',
        paddingBottom: 4,
    },
    subsectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    text: {
        fontSize: 10,
        marginBottom: 4,
        color: '#333333',
    },
    bulletPoint: {
        fontSize: 10,
        marginBottom: 3,
        marginLeft: 15,
        color: '#333333',
    },
    skillCategory: {
        marginBottom: 6,
    },
    skillCategoryName: {
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    skillsList: {
        fontSize: 10,
        color: '#444444',
    },
    projectItem: {
        marginBottom: 10,
    },
    projectTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    projectDescription: {
        fontSize: 10,
        marginBottom: 3,
        color: '#444444',
    },
    techStack: {
        fontSize: 9,
        color: '#666666',
        fontStyle: 'italic',
    },
    experienceItem: {
        marginBottom: 10,
    },
    experienceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3,
    },
    experienceTitle: {
        fontSize: 11,
        fontWeight: 'bold',
    },
    experienceDuration: {
        fontSize: 10,
        color: '#666666',
    },
    experienceOrg: {
        fontSize: 10,
        color: '#555555',
        marginBottom: 3,
    },
});

interface ClassicResumePDFProps {
    data: any;
    sections: {
        includeAbout: boolean;
        includeProjects: boolean;
        includeSkills: boolean;
        includeExperience: boolean;
        includeCertificates: boolean;
    };
}

export const ClassicResumePDF = ({ data, sections }: ClassicResumePDFProps) => {
    // Group skills by category
    const skillsByCategory = data.skills?.reduce((acc: any, skill: any) => {
        const category = skill.category || 'Other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(skill.name);
        return acc;
    }, {});

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.name}>{data.name || 'Your Name'}</Text>
                    <Text style={styles.title}>{data.title || 'Professional Title'}</Text>
                    <View style={styles.contactInfo}>
                        {data.email && <Text style={styles.contactItem}>Email: {data.email}</Text>}
                        {data.location && <Text style={styles.contactItem}>Location: {data.location}</Text>}
                        {data.github && <Text style={styles.contactItem}>GitHub: github.com/{data.github}</Text>}
                        {data.linkedin && <Text style={styles.contactItem}>LinkedIn: linkedin.com/in/{data.linkedin}</Text>}
                        {data.website && <Text style={styles.contactItem}>Website: {data.website}</Text>}
                    </View>
                </View>

                {/* About/Summary */}
                {sections.includeAbout && data.about && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Professional Summary</Text>
                        <Text style={styles.text}>{data.about}</Text>
                    </View>
                )}

                {/* Skills */}
                {sections.includeSkills && data.skills && data.skills.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        {Object.entries(skillsByCategory).map(([category, skills]: [string, any]) => (
                            <View key={category} style={styles.skillCategory}>
                                <Text style={styles.skillCategoryName}>{category}:</Text>
                                <Text style={styles.skillsList}>{skills.join(', ')}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Experience */}
                {sections.includeExperience && data.achievements && data.achievements.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {data.achievements
                            .filter((item: any) => item.type === 'internship' || item.type === 'work')
                            .slice(0, 5)
                            .map((exp: any, index: number) => (
                                <View key={index} style={styles.experienceItem}>
                                    <View style={styles.experienceHeader}>
                                        <Text style={styles.experienceTitle}>{exp.title}</Text>
                                        <Text style={styles.experienceDuration}>{exp.date}</Text>
                                    </View>
                                    <Text style={styles.experienceOrg}>{exp.issuer}</Text>
                                    {exp.description && (
                                        <Text style={styles.bulletPoint}>• {exp.description}</Text>
                                    )}
                                </View>
                            ))}
                    </View>
                )}

                {/* Projects */}
                {sections.includeProjects && data.projects && data.projects.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Projects</Text>
                        {data.projects.slice(0, 5).map((project: any, index: number) => (
                            <View key={index} style={styles.projectItem}>
                                <Text style={styles.projectTitle}>{project.title}</Text>
                                <Text style={styles.projectDescription}>
                                    {project.description?.substring(0, 150)}
                                    {project.description?.length > 150 && '...'}
                                </Text>
                                {project.tech && project.tech.length > 0 && (
                                    <Text style={styles.techStack}>
                                        Technologies: {Array.isArray(project.tech) ? project.tech.join(', ') : project.tech}
                                    </Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* Certificates */}
                {sections.includeCertificates && data.certificates && data.certificates.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Certifications</Text>
                        {data.certificates.slice(0, 5).map((cert: any, index: number) => (
                            <View key={index} style={styles.experienceItem}>
                                <View style={styles.experienceHeader}>
                                    <Text style={styles.experienceTitle}>{cert.title}</Text>
                                    <Text style={styles.experienceDuration}>{cert.date}</Text>
                                </View>
                                <Text style={styles.experienceOrg}>{cert.issuer}</Text>
                                {cert.credentialId && (
                                    <Text style={styles.text}>Credential ID: {cert.credentialId}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}
            </Page>
        </Document>
    );
};
