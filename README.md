<!-- @format -->

For local development:

you should run this command for run postgress :

`docker run --name postgres-container -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=result-db -p 5432:5432 -d postgres`

or you can run postgress any otherway.

And run this command for start this app:
`npm run dev`

Afer run this app . you will get all api specification in this route:

`http://localhost:4005/docs`
