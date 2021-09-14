## [DrakeTech]

To run both servers (Express.js) and client (React.js) simply clone this repo and run the docker-compose file

`git clone https://github.com/HanzHerdel/draketech.git`

`cd draketech`

`docker-compose up --build`

once the images be downloaded and the containers mounted the client side runs over http://localhost:3000, the products microservice on http://localhost:5000 and the auth microservice http://localhost:4000