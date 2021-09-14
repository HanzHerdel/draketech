## [DrakeTech]

To run both servers (Express.js) and client (React.js) simply clone this repo and run the docker-compose file

`git clone https://github.com/HanzHerdel/draketech.git`

`cd draketech`

`docker-compose up --build`

*Note: tokens only last 1 minute, refresh token not implemented yet*

once the images be downloaded and the containers mounted the client side runs over http://localhost:3000, the products microservice on http://localhost:5000 and the auth microservice http://localhost:4000

## Arquitecture Diagram
![alt text](https://fv9-2.failiem.lv/thumb_show.php?i=qhnm9dxxb&download_checksum=6acb3f9a04eb798bc92f4437324298c546052a43&download_timestamp=1631590126)

## Backend auth
was built with oauth2.0 and jwt as format of token, redis for token and mongodb to store users, haves 4 endpo## Backend authints
post:`oauth/user/create` token creation
post:`oauth/user/token` obtain token
get:`oauth/user/validate` validate token
delete:`oauth/user/token` delete token

## Backend api

was built with mongoose for storage and uses the middleware validateToken to protect certain routes
get:`products/` get products (this is the only unprotected route)
post:`products/` creation of new products
patch:`products/:id` edition of new products
delete:`products/:id` delete products

## Frontend
was built on React with Material Ui for components, Material Ui grids as core structure, Formsy to validations and form creation, Redux with Redux thunk as data manager and Redux Persist as Rehydrate method

## Arquitecture
Docker compose to manage and run the containers