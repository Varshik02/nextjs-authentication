import {connect} from '../../../dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import  jwt  from 'jsonwebtoken'
import User from '@/models/userModel'

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email} = reqBody

        console.log(reqBody);

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: 'User Not Exists'}, {status: 400})
        }

        console.log(user);
        

        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined
        await user.save()

        return NextResponse.json({
            message: "Email Found",
            success: true
        })
    
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}