import prisma from "../../../prisma/index"

export const connectDb = async () => {
    try {
        await prisma.$connect()
        console.log("Database Connected...");
    } catch (error) {
        console.log("Error: ",error.message)
    }
}