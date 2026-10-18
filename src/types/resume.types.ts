import { Types } from "mongoose";

export interface IPersonalInfo {
    fullname:  string,
    email: string,
    mobile: string,
    location: string,
    github: string,
    linkedin: string,
    portfolio: string,
}

export interface IExperience {
    company: string,
    position: string,
    startDate: string,
    endDate: string,
    description: string,
}

export interface IProject {
    title: string,
    description: string,
    githuburl: string,
    liveurl: string,
    techstack: string[],
}

export interface IEducation {
    institution: string,
    degree: string,
    startDate: string,
    endDate: string,
    description: string,
}

export interface IResume {
    _id?: string,
    user_id: Types.ObjectId;
    title: string,
    summary: string,
    personalInfo: IPersonalInfo,
    workexperience?: IExperience[],
    projects: IProject[],
    skills: string[],
    education: IEducation[],
    certifications?: string[],
    createdAt?: Date,
    updatedAt?: Date,
}