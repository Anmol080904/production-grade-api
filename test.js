import 'dotenv/config'; // Make sure you have dotenv installed
import { neon } from '@neondatabase/serverless';

const run = async () => {
    if (!process.env.DATABASE_URL) {
        console.error("❌ DATABASE_URL is missing from .env");
        return;
    }

    try {
        console.log("Attempting to connect to:", process.env.DATABASE_URL.split('@')[1]); // Logs only the host part for privacy
        
        const sql = neon(process.env.DATABASE_URL);
        const result = await sql`SELECT NOW()`;
        
        console.log("✅ Connection Successful!");
        console.log("Database Time:", result[0].now);
        
        // Now let's check if the table is visible
        const tableCheck = await sql`SELECT count(*) FROM users`;
        console.log("✅ Users table found! Row count:", tableCheck[0].count);

    } catch (err) {
        console.error("\n❌ CONNECTION FAILED");
        console.error(err);
    }
};

run();