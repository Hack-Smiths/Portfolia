// Validation utilities for profile form fields

/**
 * Validates professional title field
 * Required: 3-60 characters
 */
export function validateTitle(value: string): string | null {
    if (!value || value.trim().length === 0) {
        return "Professional title is required";
    }
    if (value.trim().length < 3) {
        return "Professional title must be at least 3 characters";
    }
    if (value.length > 60) {
        return "Professional title must not exceed 60 characters";
    }
    return null;
}

/**
 * Validates location field
 * Optional: max 50 characters
 */
export function validateLocation(value: string): string | null {
    if (value && value.length > 50) {
        return "Location must not exceed 50 characters";
    }
    return null;
}

/**
 * Validates bio/about me field
 * Optional: max 500 characters
 */
export function validateBio(value: string): string | null {
    if (value && value.length > 500) {
        return "About me must not exceed 500 characters";
    }
    return null;
}

/**
 * Validates GitHub URL
 * Optional: must be valid GitHub profile URL if provided
 */
export function validateGitHubUrl(value: string): string | null {
    if (!value || value.trim().length === 0) {
        return null; // Optional field
    }

    const githubPattern = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/;
    if (!githubPattern.test(value.trim())) {
        return "Please enter a valid GitHub profile URL (e.g., https://github.com/username)";
    }
    return null;
}

/**
 * Validates LinkedIn URL
 * Optional: must be valid LinkedIn profile URL if provided
 */
export function validateLinkedInUrl(value: string): string | null {
    if (!value || value.trim().length === 0) {
        return null; // Optional field
    }

    const linkedinPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
    if (!linkedinPattern.test(value.trim())) {
        return "Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)";
    }
    return null;
}

/**
 * Validates website URL
 * Optional: must be valid URL if provided
 */
export function validateWebsiteUrl(value: string): string | null {
    if (!value || value.trim().length === 0) {
        return null; // Optional field
    }

    try {
        const url = new URL(value.trim());
        if (!url.protocol.startsWith('http')) {
            return "Website URL must start with http:// or https://";
        }
        return null;
    } catch {
        return "Please enter a valid website URL (e.g., https://yourwebsite.com)";
    }
}

/**
 * Validates image file for avatar upload
 * Checks file type and size
 */
export function validateImageFile(file: File): string | null {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        return "Please select a valid image file (JPG, PNG, or WebP)";
    }

    // Check file size (2MB = 2 * 1024 * 1024 bytes)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
        return "Image file size must not exceed 2MB";
    }

    return null;
}

/**
 * Validates entire profile form
 * Returns object with field names as keys and error messages as values
 */
export function validateProfileForm(data: {
    title: string;
    location: string;
    bio: string;
    github: string;
    linkedin: string;
    website: string;
}): Record<string, string> {
    const errors: Record<string, string> = {};

    const titleError = validateTitle(data.title);
    if (titleError) errors.title = titleError;

    const locationError = validateLocation(data.location);
    if (locationError) errors.location = locationError;

    const bioError = validateBio(data.bio);
    if (bioError) errors.bio = bioError;

    const githubError = validateGitHubUrl(data.github);
    if (githubError) errors.github = githubError;

    const linkedinError = validateLinkedInUrl(data.linkedin);
    if (linkedinError) errors.linkedin = linkedinError;

    const websiteError = validateWebsiteUrl(data.website);
    if (websiteError) errors.website = websiteError;

    return errors;
}
