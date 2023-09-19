import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

type Env = {
  DB: D1Database;
};

export async function loader({ context }: LoaderFunctionArgs) {
  const env = context.env as Env;
  let { results } = await env.DB.prepare("SELECT * FROM users").all();
  console.log("loader ~ results:", results);

  return json({ users: results });
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
