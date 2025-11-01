// Use CommonJS style requires so ts-node's register (used by the runner)
// transpiles this file to CommonJS and `require` is available.
/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
// Load .env.local first (commonly used by Next.js). Fall back to .env.
const envLocal = path.resolve(process.cwd(), ".env.local");
const envDefault = path.resolve(process.cwd(), ".env");
const envPath = fs.existsSync(envLocal) ? envLocal : envDefault;
dotenv.config({ path: envPath });

const connectToDatabase = require("../src/lib/mongodb").default;
const initial = require("../src/lib/initial-data");
const Course = require("../src/models/course").Course || require("../src/models/course").default || require("../src/models/course");
const BlogPost = require("../src/models/blog").BlogPost || require("../src/models/blog").default || require("../src/models/blog");
const Announcement = require("../src/models/announcement").Announcement || require("../src/models/announcement").default || require("../src/models/announcement");
const Admin = require("../src/models/admin").Admin || require("../src/models/admin").default || require("../src/models/admin");

async function seed() {
    try {
      console.log("Connecting to database...");
      await connectToDatabase();

      const courses = initial.courses;
      const blogPosts = initial.blogPosts;
      const initialAnnouncements = initial.initialAnnouncements;

      console.log(`Seeding ${courses.length} courses...`);
      for (const c of courses) {
        await Course.updateOne({ slug: c.slug }, { $set: c }, { upsert: true });
      }

      console.log(`Seeding ${blogPosts.length} blog posts...`);
      for (const p of blogPosts) {
        // convert date strings to Date if present
        const payload = { ...p, date: p.date ? new Date(p.date) : undefined };
        await BlogPost.updateOne({ slug: p.slug }, { $set: payload }, { upsert: true });
      }

      console.log(`Seeding ${initialAnnouncements.length} announcements...`);
      for (const a of initialAnnouncements) {
        await Announcement.updateOne({ title: a.title }, { $set: a }, { upsert: true });
      }

      // Optional admin seed if env provided
      const adminEmail = process.env.SEED_ADMIN_EMAIL;
      const adminPassword = process.env.SEED_ADMIN_PASSWORD;
      if (adminEmail && adminPassword) {
        console.log(`Seeding admin user ${adminEmail}...`);
        const bcrypt = require("bcryptjs");
        const hash = await bcrypt.hash(adminPassword, 10);
        await Admin.updateOne({ email: adminEmail }, { $set: { email: adminEmail, passwordHash: hash } }, { upsert: true });
        console.log("Admin created (or updated).");
      } else {
        console.log("No admin credentials provided in env. Skipping admin creation.");
      }

      console.log("Seed complete.");
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
}

seed();