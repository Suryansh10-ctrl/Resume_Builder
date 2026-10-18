import { IResume } from "@/types/resume.types";
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema<IResume>({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        default: '',
    },
    summary: {
        type: String,
        default: '',
    },
    personalInfo: {
        type: {
            fullname: String,
            email: String,
            mobile: String,
            location: String,
            github: String,
            linkedin: String,
            portfolio: String,
        },
        default: {}
    },
    education:{
        type: [
            {
                institution: String,
                degree: String,
                startDate: String,
                endDate: String,
                description: String,
            }
        ],
        default: [],
    },
    workexperience: {
        type: [
            {
                company: String,
                postion: String,
                startDate: String,
                endDate: String,
                description: String,
            }
        ],
        default: [],
    },
    projects: {
        type: [
            {
                title: String,
                description: String,
                githuburl: String,
                liveurl: String,
                techstack: [String],
            }
        ],
        default: [],
    },
    skills: {
        type: [String],
        default: [],
    },
    certifications: {
        type: [String],
        default: [],
    },
},{
    timestamps: true,
})


const ResumeModel = mongoose.model('Resume', resumeSchema);
export default ResumeModel;