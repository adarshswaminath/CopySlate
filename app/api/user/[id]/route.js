import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { isExpired } from "./isExpired"
import { connectDb } from "../../utils/database";

export const GET = async (req, res) => {
  try {
    const route = await req.url.split("/user/")[1];
    await connectDb(); // connect db
    // find data from the db
    const post = await prisma.clip.findFirst({
      where: {
        route: route
      }
    })
    // @dev if post is null 
    if(post === null){
      return NextResponse.json({message: "NOT FOUND"},{status: 403})
    }
    //  check isVisited is true ? check for expire date : return post
    if(post.isVisited){
      let expireDataResult = isExpired(post)
      // true: not-expired 
      if(expireDataResult){
            return NextResponse.json({message: "OK",post},{status: 200})
      } else {
        // false ? delete : expired 
        await prisma.clip.delete({ 
          where: {id: post.id}
        })
        return NextResponse.json({message: "Post Expired"},{status: 404})
      }
    } else {
      // isVisited is false update it into true
      await prisma.clip.update({
        where: {
          id: post.id
        },data: {
          isVisited: true
        }
      })
      return NextResponse.json({message: "OK",post},{status: 200})
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: "Error: Bad Request"},{status: 400})
  }
};
