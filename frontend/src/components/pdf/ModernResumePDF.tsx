import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles for Modern Resume Template (Two-column layout)
const styles = StyleSheet.create({
    page: {
        padding: 0,
        fontSize: 10,
        fontFamily: 'Helvetica',
        flexDirection: 'row',
    },
    leftColumn: {
        width: '35%',
        backgroundColor: '#2D3748',
        padding: 25,
        color: '#FFFFFF',
    },
    rightColumn: {
        width: '65%',
        padding: 30,
    },
    // Left Column Styles
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#4A5568',
        marginBottom: 15,
        alignSelf: 'center',
    },
    leftName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    leftTitle: {
        fontSize: 11,
        marginBottom: 15,
        textAlign: 'center',
        color: '#CBD5E0',
    },
    leftSection: {
        marginTop: 20,
    },
    leftSectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#63B3ED',
        textTransform: 'uppercase',
    },
    contactItem: {
        fontSize: 9,
        marginBottom: 8,
        color: '#E2E8F0',
        lineHeight: 1.4,
    },
    skillItem: {
        fontSize: 9,
        marginBottom: 5,
        color: '#E2E8F0',
    },
    skillBullet: {
        marginBottom: 3,
    },
    // Right Column Styles
    rightSection: {
        marginBottom: 20,
    },
    rightSectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2D3748',
        borderBottom: '2 solid #4299E1',
        paddingBottom: 5,
    },
    aboutText: {
        fontSize: 10,
        lineHeight: 1.6,
        color: '#4A5568',
        textAlign: 'justify',
    },
    itemContainer: {
        marginBottom: 12,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    itemTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#2D3748',
    },
    itemDate: {
        fontSize: 9,
        color: '#718096',
    },
    itemOrg: {
        fontSize: 10,
        color: '#4A5568',
        marginBottom: 4,
        fontStyle: 'italic',
    },
    itemDescription: {
        fontSize: 9,
        color: '#4A5568',
        lineHeight: 1.5,
        marginBottom: 3,
    },
    techStack: {
        fontSize: 8,
        color: '#718096',
        marginTop: 3,
    },
    bulletPoint: {
        fontSize: 9,
        marginLeft: 10,
        marginBottom: 2,
        color: '#4A5568',
    },
});

interface ModernResumePDFProps {
    data: any;
    sections: {
        includeAbout: boolean;
        includeProjects: boolean;
        includeSkills: boolean;
        includeExperience: boolean;
        includeCertificates: boolean;
    };
}

export const ModernResumePDF = ({ data, sections }: ModernResumePDFProps) => {
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
                {/* Left Column */}
                <View style={styles.leftColumn}>
                    {/* Name & Title */}
                    <Text style={styles.leftName}>{data.name || 'Your Name'}</Text>
                    <Text style={styles.leftTitle}>{data.title || 'Professional Title'}</Text>

                    {/* Contact Information */}
                    <View style={styles.leftSection}>
                        <Text style={styles.leftSectionTitle}>Contact</Text>
                        {data.email && (
                            <Text style={styles.contactItem}>📧 {data.email}</Text>
                        )}
                        {data.location && (
                            <Text style={styles.contactItem}>📍 {data.location}</Text>
                        )}
                        {data.github && (
                            <Text style={styles.contactItem}>💻 github.com/{data.github}</Text>
                        )}
                        {data.linkedin && (
                            <Text style={styles.contactItem}>🔗 linkedin.com/in/{data.linkedin}</Text>
                        )}
                        {data.website && (
                            <Text style={styles.contactItem}>🌐 {data.website}</Text>
                        )}
                    </View>

                    {/* Skills in Left Column */}
                    {sections.includeSkills && data.skills && data.skills.length > 0 && (
                        <View style={styles.leftSection}>
                            <Text style={styles.leftSectionTitle}>Skills</Text>
                            {Object.entries(skillsByCategory).map(([category, skills]: [string, any]) => (
                                <View key={category} style={styles.skillBullet}>
                                    <Text style={styles.skillItem}>
                                        {category}
                                    </Text>
                                    {skills.slice(0, 5).map((skill: string, idx: number) => (
                                        <Text key={idx} style={styles.skillItem}>
                                            • {skill}
                                        </Text>
                                    ))}
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* Right Column */}
                <View style={styles.rightColumn}>
                    {/* About/Summary */}
                    {sections.includeAbout && data.about && (
                        <View style={styles.rightSection}>
                            <Text style={styles.rightSectionTitle}>Professional Summary</Text>
                            <Text style={styles.aboutText}>{data.about}</Text>
                        </View>
                    )}

                    {/* Experience */}
                    {sections.includeExperience && data.achievements && data.achievements.length > 0 && (
                        <View style={styles.rightSection}>
                            <Text style={styles.rightSectionTitle}>Experience</Text>
                            {data.achievements
                                .filter((item: any) => item.type === 'internship' || item.type === 'work')
                                .slice(0, 4)
                                .map((exp: any, index: number) => (
                                    <View key={index} style={styles.itemContainer}>
                                        <View style={styles.itemHeader}>
                                            <Text style={styles.itemTitle}>{exp.title}</Text>
                                            <Text style={styles.itemDate}>{exp.date}</Text>
                                        </View>
                                        <Text style={styles.itemOrg}>{exp.issuer}</Text>
                                        {exp.description && (
                                            <Text style={styles.bulletPoint}>• {exp.description}</Text>
                                        )}
                                    </View>
                                ))}
                        </View>
                    )}

                    {/* Projects */}
                    {sections.includeProjects && data.projects && data.projects.length > 0 && (
                        <View style={styles.rightSection}>
                            <Text style={styles.rightSectionTitle}>Projects</Text>
                            {data.projects.slice(0, 4).map((project: any, index: number) => (
                                <View key={index} style={styles.itemContainer}>
                                    <Text style={styles.itemTitle}>{project.title}</Text>
                                    <Text style={styles.itemDescription}>
                                        {project.description?.substring(0, 120)}
                                        {project.description?.length > 120 && '...'}
                                    </Text>
                                    {project.tech && project.tech.length > 0 && (
                                        <Text style={styles.techStack}>
                                            Tech: {Array.isArray(project.tech) ? project.tech.join(', ') : project.tech}
                                        </Text>
                                    )}
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Certificates */}
                    {sections.includeCertificates && data.certificates && data.certificates.length > 0 && (
                        <View style={styles.rightSection}>
                            <Text style={styles.rightSectionTitle}>Certifications</Text>
                            {data.certificates.slice(0, 4).map((cert: any, index: number) => (
                                <View key={index} style={styles.itemContainer}>
                                    <View style={styles.itemHeader}>
                                        <Text style={styles.itemTitle}>{cert.title}</Text>
                                        <Text style={styles.itemDate}>{cert.date}</Text>
                                    </View>
                                    <Text style={styles.itemOrg}>{cert.issuer}</Text>
                                    {cert.credentialId && (
                                        <Text style={styles.itemDescription}>ID: {cert.credentialId}</Text>
                                    )}
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </Page>
        </Document>
    );
};
