Prisma + NextAuth Setup (local instructions)

1. Environment variables

Create a `.env` file at the project root with at minimum:

DATABASE_URL="file:./dev.db"
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=a-long-random-secret

2. Install dependencies

npm install

3. Generate Prisma client and migrate

npx prisma generate
npx prisma migrate dev --name init

4. Start dev server

npm run dev

Notes:
- We use SQLite by default for simplicity. Change `DATABASE_URL` to a Postgres or MySQL DSN for production.
- The API route `app/api/auth/[...nextauth]/route.ts` now uses the Prisma adapter. The schema lives in `prisma/schema.prisma`.
- The popup OAuth flow expects NextAuth to redirect to `/api/auth/popup-callback` after authentication; that page posts a message to the opener window.
