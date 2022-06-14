# Thumbnail-generator

## Getting Started

This project was bootstrapped with Vite

### Prerequisites

- npm
  ```sh
  In your console, npm install npm@latest -g
  ```
- AWS
  ```sh
  Create an AWS account and a S3 bucket
  ```
- Auth0
  ```sh
  Create an Auth0 account and a Auth0 SPA
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/albanovigna/thumbnail-generator.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create .env file in api and client folder

4. .env in api
   ```js
   AWS_BUCKET_NAME = "your AWS bucket name";
   AWS_BUCKET_REGION = "your AWS bucket region";
   AWS_ACCESS_KEY = "your AWS bucket acces key";
   AWS_SECRET_KEY = "your AWS bucket secret key";
   ```
5. .env in client
   ```js
   VITE_AUTH0_DOMAIN = "your auth0 domain";
   VITE_AUTH0_CLIENT_ID = "your auth0 client id";
   VITE_API = "your localhost path. For example http://localhost:3001";
   VITE_INIT_IMAGE="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTelVna9__Qwt9GifGdE0R4FmsiTmZjoSE1vnC4LXdgozvqbjiOGufuXrladHL7nXowTt4&usqp=CAU"
   ```

## Usage

1. Open api folder in integrated terminal and start
   ```sh
   npm start
   ```
2. Open client folder in integrated terminal and start
   ```sh
   npm run dev
   ```
3. Happy hacking!
