import { NextResponse } from "next/server"
import prisma from "@/prisma"
import {connectDb} from "../utils/database"

// + 7 * 24 * 60 * 60 * 1000
// @dev route to create new user message
export const POST = async(req) => {
    try {
        let {message,route,expireDate} = await req.json()
        let currentTime = new Date()
        const timeIntervals = {
            5: 5 * 60 * 1000,    // 5 minutes
            10: 10 * 60 * 1000,  // 10 minutes
            30: 30 * 60 * 1000,  // 30 minutes
            60: 60 * 60 * 1000,  // one hour
            24: 24 * 60 * 60 * 1000,  // one day
            7: 7 * 24 * 60 * 60 * 1000,  // one week
            31: 31 * 24 * 60 * 60 * 1000  // one month
          };
          if (timeIntervals.hasOwnProperty(expireDate)) {
            expireDate = new Date(currentTime.getTime() + timeIntervals[expireDate]);
        }
        await connectDb()
        // check the route isAlready in or not
        let find = await prisma.clip.findFirst({
            where: {
                route: route
            }
        })
        //  if not create the data
        if(!find){
            const post = await prisma.clip.create({
                data: {
                    message: message,
                    route: route,
                    expireDate: expireDate,   
                }
            })
            return NextResponse.json({message: "OK",post},{status: 200})
        } else {
            return NextResponse.json({message: "Already Data here",status: "Cannot use this route"},{status: 303})
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "error"},{status: 501})
    } finally {
        await prisma.$disconnect();
    }
}
