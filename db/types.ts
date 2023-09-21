import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface D1Migrations {
  id: Generated<number | null>;
  name: string | null;
  applied_at: Generated<string>;
}

export interface Users {
  id: Generated<number>;
  name: string;
  lastname: string;
  username: string | null;
}

export interface DB {
  d1_migrations: D1Migrations;
  users: Users;
}
