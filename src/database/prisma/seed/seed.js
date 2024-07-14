import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Generate a salt
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash password
  const hashedPassword = await bcrypt.hash("Admin@123", salt);

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@example.com",
      password_hash: hashedPassword,
      role: "admin",
      is_active: true,
    },
  });

  // Create admin profile
  await prisma.profile.create({
    data: {
      user_id: adminUser.id,
      first_name: "Admin",
      last_name: "User",
      bio: "Administrator",
      avatar_url:
        "https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Clipart.png",
    },
  });

  console.log("Admin user and profile have been created.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
