import { createClient } from '@/utils/supabase/server';

// Disposable Supabase connection smoke-test (originally the quickstart demo
// dropped at the repo root). Safe to delete. Renders an empty list if the
// `todos` table doesn't exist or RLS blocks anon reads.
export default async function Page() {
  const supabase = await createClient();
  const { data: todos } = await supabase.from('todos').select();

  return (
    <main className="mx-auto max-w-md px-4 pt-40">
      <ul>
        {todos?.map((todo: { id: string | number; name: string }) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </main>
  );
}
