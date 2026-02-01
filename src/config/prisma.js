import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"], // optional
});

// Optional: Handle shutdown to close Prisma connection gracefully
async function shutdownPrisma() {
  try {
    await prisma.$disconnect();
    
    console.log("Prisma disconnected successfully");
  } catch (err) {
    console.error("Error disconnecting Prisma:", err);
  }
}

// Capture app termination signals
process.on("SIGINT", shutdownPrisma);
process.on("SIGTERM", shutdownPrisma);

export default prisma;
