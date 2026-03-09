import { neon } from '@neondatabase/serverless';

if (!import.meta.env.VITE_DATABASE_URL && !process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not defined. Database operations will fail.");
}

// In Vite, we use import.meta.env for client-side environment variables
// However, the prompt asks for process.env.DATABASE_URL.
// We'll support both for compatibility.

const connectionString = import.meta.env.VITE_DATABASE_URL || process.env.DATABASE_URL || "postgresql://neondb_owner:npg_DBfz1cx8Erhe@ep-young-leaf-a7dpgvaj-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

export const sql = neon(connectionString);

/**
 * Executes a database query with error handling.
 */
export async function query<T = any>(queryString: string, params: any[] = []): Promise<T[]> {
    try {
        const result = await sql(queryString, params);
        return result as T[];
    } catch (error) {
        console.error("Database query error:", error);
        throw error;
    }
}
