<h1>NestJS Task Management</h1>
<p>A NestJS task management application built as part of the <a href="https://www.udemy.com/course/nestjs-zero-to-hero/">NestJS Zero to Hero - Modern Typescript Back-end Development</a> course</p>
<h1>Technologies used</h1>
<ul>
  <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
  <li><a href="https://nestjs.com/">NestJS</a> for the back-end</li>
  <li><a href="https://reactjs.org/">ReactJS</a> for the front-end</li>
</ul>

<h1>Running this app</h1>
<p>The steps to run this app are pretty simple, please make sure to have the following installed before proceeding</p>
<ul>
  <li><a href="https://nodejs.org/">NodeJS</a></li>
  <li><a href="https://www.docker.com/">Docker</a></li>
  <li><a href="https://docs.docker.com/compose/">Docker-Compose</a></li>
</ul>

<p>Now to run the app:</p>
<ul>
  <li>Clone the repo</li>
  <li>Add a `.env` file to the root of the project and add the variables `PGADMIN_DEFAULT_EMAIL` `PGADMIN_DEFAULT_PASSWORD` `POSTGRES_PASSWORD`. They can have whatever value you'd like.</li>
  <li>Do `docker-compose up`, this will spool up postgres as well as PGAdmin which will be exposed on port 5050</li>
  <li> Enter PGAdmin and connect to your service. To connect simply add a server, as a hostname add the docker service name `postgres-service` and then your username and password.</li>
  <li>There will already be a database called `TASK_DB`</li>
  <li>Now run the API by running in your terminal `yarn start:dev`</li>
</ul>
