import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import type { DB } from "db/types";
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

export async function loader({ context }: LoaderFunctionArgs) {
  const env = context.env as Env;
  const db = new Kysely<DB>({
    dialect: new D1Dialect({ database: env.DB }),
  });

  await db
    .insertInto("users")
    .values([{ lastname: "accetta", name: "nicolas", username: "niconiahi" }])
    .execute();

  const users = await db.selectFrom("users").select("id").execute();
  return json({ users });
}

export default function Index() {
  const { users } = useLoaderData<typeof loader>();

  return (
    <div>
      {users.map((user) => (
        <span key={user.id} style={{ display: "block" }}>
          {user.id}
        </span>
      ))}
    </div>
  );
}
