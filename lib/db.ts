import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function set(key: string, value: any): Promise<void> {
  await sql`
    INSERT INTO kv_store (key, value)
    VALUES (${key}, ${JSON.stringify(value)}::jsonb)
    ON CONFLICT (key)
    DO UPDATE SET value = ${JSON.stringify(value)}::jsonb, updated_at = NOW()
  `;
}

export async function get<T = any>(key: string): Promise<T | null> {
  const result = await sql`SELECT value FROM kv_store WHERE key = ${key}`;
  return result[0]?.value || null;
}

export async function del(key: string): Promise<void> {
  await sql`DELETE FROM kv_store WHERE key = ${key}`;
}

export async function getByPrefix<T = any>(prefix: string): Promise<T[]> {
  const result = await sql`
    SELECT value FROM kv_store WHERE key LIKE ${prefix + '%'} ORDER BY created_at DESC
  `;
  return result.map(r => r.value);
}
