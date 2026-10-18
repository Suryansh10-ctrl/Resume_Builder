export interface GenerateSummaryBody {
    experienceLevel: string,
    skills: string[],
    jobTitle: string,
}

export interface GenerateSkillsBody {
    experienceLevel: string,
    jobTitle: string
}

export interface GenerateProjectsBody {
    experienceLevel: string,
    skills: string[],
    jobTitle: string
}

export interface GenerateExperienceBody {
    experienceLevel: string,
    skills: string[],
    jobTitle: string
}