import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
        throw new Error('Admin password is not set in environment variables.');
      }
    
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            firstName: 'Admin',
            lastName: 'User',
            username: 'admin',
            password: hashedPassword,
            email: 'admin@example.com',
        },
    });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
