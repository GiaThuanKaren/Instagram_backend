const { PrismaClient } = require("@prisma/client")

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = client
const ConnectPrismaClient = async function () {
    try {
        await client.$connect()
    } catch (e) {
        await prisma.$disconnect()
        throw e
    }
}



module.exports ={ConnectPrismaClient}