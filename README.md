# Project POOKWEET

In the context of my studies I made a copy of twitter named pookweet in a group of 4 students. This project covers the following twitter features :
- Authentification and profile personalisation
- Tweet / Retweet
- Retweet / Comment
- Like
- Follow

The project is managed via kubernetes and is made of 4 api :
* Api tweet
* Api like
* Api profile
* Api follow

And two front applications, the mobile version being coded in flutter and the web version in Angular.
The security is handled by keycloak.

<img alt="Missing image: software architecture schema" src="https://i.ibb.co/NyWLCqC/Archi-logicielle.png" />

--> This repository is the tweet api, handling the CRUD operations for tweets, retweets, comments, and the timeline.

## Getting Started

Here is a short guide helping you getting started with the application in a development environement

### Prerequisites

In order to use this API you need Node (npm), an internet connection, postman or any similar software, a valid authentification token

### Launch the application
To test the api locally :
- Clone the project
- if you dont have node, install npm
- Build the project with : 
```
npm install
```
- Start the project with : 
```
npm start
```
- The api is now running, you can access it with postman at the following adress : 
```
localhost:8081
```
- In order for any request to work, because of the keycloak authentification, you need to provide a valid token in the headers / bearer token field, you can find one when starting pookweet.social and exploring the "network" interface of google chrome
- In order to get a list of the routes, feel free to access the API's swagger at this adress :
```
localhost:8081/api-docs/#/
```

### Environement variables 

```
./dot.env 

NODE_ENV=production OR development
DB_USER= [Database username]
DB_HOST= [Database host]
DB_DATABASE= [Database name]
DB_PASSWORD= [User password]
DB_PORT= [Database port]
```
## Deployment

In a production environement the deployment will be fully managed by the CI (GitLab CI), after a push, a new build number will be generated, a docker image will be built and the application will be deployed on a kubernetes cluster (stored in Scaleway)

## Built With

* [Docker](https://www.docker.com/) - Used to build and deploy the solution
* [Kubernetes](https://kubernetes.io/) - Used to manage de different solutions and their instances
* [Keycloak](https://www.keycloak.org/) - Used to manage the security
* [Scaleway S3](https://www.scaleway.com/en/object-storage/) - Used to store images
* [Flutter](https://flutter.dev/) - Used to code the mobile front app
* [Angular](https://angular.io/) - Used to code the web front app
* [NodeJS](https://nodejs.org/en/) - Used to code the APIs
* [Scaleway PostgreSQL](https://www.postgresql.org/) - A SQL database used to store everything but the images

## Authors

* **Teddy-Gilles COLLIAUX** - *APIs / Database / Design* 
* **Thomas SOHIER** - *Front (web) / Kubernetes / CI / Design* 
* **Yann CLOAREC** - *Front (mobile) / Kubernetes / CI / Design* 
* **Anthony PERRUCHAS** - *APIs / Database / Design* - Left the school before the end of the project 

## Acknowledgments

* ***EPSI Nantes*** and the teaching corp for helping us and support us through the development
* ***My teammates*** for helping me go through the project learning alot 
* ***Anthony***, who left earlier in the project but still managed to help up from times to times and maintained 3 nodes that were hosted by his scaleway account
