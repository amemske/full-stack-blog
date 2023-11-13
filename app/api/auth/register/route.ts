import { NextResponse } from "next/server"

import prisma from "@/prisma"
import bcrypt from "bcrypt"
import { connectToDb } from "@/app/lib/helpers"

export const POST =async (req:Request) => {
    const {name, email, password} = await req.json()
    if(!name || !email || !password) {
        return NextResponse.json({message: "Invalid Data"}, {status: 422})
    }
    try{
        await connectToDb()
        const hashedpassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({data: {email,name, password: hashedpassword}}) 
        return NextResponse.json({
            message: "user successfully created",
            ...user
        }, {status: 201})
    } catch (error:any){
        return NextResponse.json({
            message: "server error",
            ...error
        }, {status: 500})

    } finally {
        await prisma.$disconnect()
    }
    
}