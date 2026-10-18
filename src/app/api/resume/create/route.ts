import { connect } from "@/app/lib/db";
import { getCurrentUser } from "@/app/lib/getCurrentUser";
import ResumeModel from "@/models/resume.model";
import { Apiresponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        await connect();

        const userId =  await getCurrentUser();
        const newResume = await ResumeModel.create({
            user_id: userId,
            title: "",
            summary: "",
            personalInfo: {},
            workexperience: [],
            projects: [],
            education: [],
            skills: [],
            certifications: [],
        })

        return NextResponse.json<Apiresponse>({
            success: true,
            message: "Resume created successfully",
            data: newResume,
        }, {status: 201}
        )

    }catch(err){
        console.log("Error creating resume: ", err);
        return NextResponse.json<Apiresponse>({
            success: false,
            message: "Error in creating resume",
            error: {
                err: err,
            }
            }, {status: 500}
        )
    }
}