import { connect } from "@/app/lib/db";
import { generateToken } from "@/app/lib/jwt";
import userModel from "@/models/user.model";
import { Apiresponse } from "@/types/api.types";
import { RegisterBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connect();
        let body: RegisterBody = await req.json();

        let { name, email, password, mobile } = body;

        if (!name || !email || !password) {
            return NextResponse.json<Apiresponse>({
                success: false,
                message: "All fields are required",
                error: {
                    message: "Missing required fields or invalid data",
                }
            },
        {
            status: 400
        })
    }

    let isExitisted = await userModel.findOne({ email });

    if(isExitisted) return NextResponse.json<Apiresponse> ({
        success: false,
        message: "User already exists",
    }, {
        status: 409
    })

    let newUser = new userModel({
        name,email,password,mobile
    })

    await newUser.save();

    let token = generateToken({userId: newUser._id.toString()});
    let response =  NextResponse.json<Apiresponse>({
        success: true,
        message: "User registered successfully",
        data: {
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        }
    },
    {
        status: 201,
    })

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
                message: "Missing required fields or invalid data",
            }
        }, {
            status: 500
        })
    }
}