import { connect } from "@/app/lib/db";
import { generateToken } from "@/app/lib/jwt";
import userModel from "@/models/user.model";
import { Apiresponse } from "@/types/api.types";
import { LoginBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connect();
        let body: LoginBody = await req.json();

        let { email, password } = body;

        if (!email || !password) {
            return NextResponse.json<Apiresponse>({
                success: false,
                message: "All fields are required",
                error: {
                    Error
                }
            },
            {status: 400}
        )
    }

    let isExitisted = await userModel.findOne({ email });

    if(!isExitisted) return NextResponse.json<Apiresponse> ({
        success: false,
        message: "Invalid credentials",
    }, 
        {status: 409}
    )

    let matchPass = await isExitisted.comparePassword(password);

    if(!matchPass) return NextResponse.json<Apiresponse> ({
        success: false,
        message: "Invalid credentials",
    }, 
        {status: 401}
    )

    let token = generateToken({userId: isExitisted._id.toString()});
    let response =  NextResponse.json<Apiresponse>({
        success: true,
        message: "User logged in successfully",
        data: {
            user: {
                _id: isExitisted._id,
                name: isExitisted.name,
                email: isExitisted.email,
            }
        }
    },
        {status: 201,}
    )

    response.cookies.set("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 1000, // 1 hour
    })

    return response;

    } catch (err) {
        console.log("error in register api: ", err);
        return NextResponse.json<Apiresponse>({
            success: false,
            message: "something went wrong",
            error: {
                Error
            }
        }, 
            {status: 500}
        )
    }
}