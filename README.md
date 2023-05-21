npm init -y

npx tsc --init

npm install -D typescript

npm install express cors bcrypt jsonwebtoken dotenv passport passport-google-oauth20 passport-facebook passport-github

npm install --save-dev typescript @types/node @types/express @types/cors

npm install prisma --save-dev

npx prisma init

npx prisma generate

export DB_URL='the_postgres_url'

prisma migrate dev --name initial_migration

