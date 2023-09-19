import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

interface Env {
  DB: D1Database;
}

interface User {
  id: number;
  name: string;
  lastname: string;
}

interface Database {
  users: User[];
}

export async function loader({ context }: LoaderFunctionArgs) {
  const env = context.env as Env;
  const db = new Kysely<Database>({
    dialect: new D1Dialect({ database: env.DB }),
  });

  return json({ users: db.selectFrom("users").selectAll().execute() });
}

export default function Index() {
  const { users } = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      {users.map((user) => (
        <span>{user.name}</span>
      ))}
    </div>
  );
}
