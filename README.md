### Expectations
In this repo you'll learn how to setup a D1 database starting from Remix's @cloudflare/pages template and how to interact with it using Kysely query builder

### Demo
In this demo you can see how an user is created every time you refresh - [demo](https://remix-d1-kysely-demo.pages.dev/)

### Files to pay attention
1. [_index.tsx](/app/routes/_index.tsx)
2. [wrangler.toml](/wrangler.toml)
3. [package.json](/package.json)
4. [.env](/.env)

### Links
- [D1 local development](https://developers.cloudflare.com/d1/learning/local-development/)
- [D1 and Remix](https://developers.cloudflare.com/d1/examples/d1-and-remix/)
- [D1 and Cloudflare pages](https://developers.cloudflare.com/d1/examples/d1-and-remix/)

### Demos
- [jacob-ebey/remix-dashboard-d1](https://github.com/jacob-ebey/remix-dashboard-d1)
- [aidenwallis/kysely-d1](https://github.com/aidenwallis/kysely-d1)

### Instructions

#### Setup database
1. Create your application and deploy it to Cloudflare Pages 
2. Create a D1 database through Cloudflare's dashboard
3. Bind the created D1 database to your application via the application's settings
4. Add a `wrangler.toml` configuration file and add the D1 database information there
```
[[ d1_databases ]]
binding = "DB"
database_name = "remix-d1-kysely-demo"
database_id = "a6ebbd89-9ddf-4ec3-b212-267f13553460"
preview_database_id = "DB"
```
5. Deploy everything by commiting a change so the binding takes effect

#### Add migrations
1. Add a `/migrations` folder and add some SQL migration file to be applied. In this code we just create a very simple `users` table

#### Applying migrations locally
1. Add a command that will apply the migrations locally
```
"db:migrate:local": "wrangler d1 migrations apply remix-d1-kysely-demo --local"
```

#### Autogenerate types
1. Install [kysely-codegen](https://github.com/RobinBlomberg/kysely-codegen)
2. Add a command that will instrospect the already created `/migrations` folder (with valid SQL in it) and it will output the types for your DB. Nullable fields will be typed with null, non-nullable won't, as expected
```
"db:types": "npx kysely-codegen --out-file db/types.ts --dialect=sqlite"
```

#### Working locally
1. Add a command that will consume a local D1 database. This is done by adding the `--d1={DB_NAME}` flag to the command that starts the page's development 
```
"start:dev": "wrangler pages dev --compatibility-date=2023-06-21 ./public --d1=DB"
```

#### Applying migrations to production
1. Add a command that will apply the migrations defined in the `migrations` folder 
```
"db:migrate": "wrangler d1 migrations apply remix-d1-kysely-demo",
```

#### Deploying to production
1. Deploy everything by commiting a change so the binding takes effect
