# Installation
`cd backend`
`npm init -y`
`npm install apollo-server graphql prisma @prisma/client dotenv`
`npx prisma init`

# open shell in docker: 
`docker-compose exec backend sh`

# create migration

`npx prisma migrate dev --name [enter custom name]`

`npx prisma generate`