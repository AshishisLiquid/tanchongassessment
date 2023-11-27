# Tan Chong Motors Assessment Project

## Overview

This repository contains the code and documentation for the Tan Chong Motors assessment project. 

## Table of Contents
- [Installation](#installation)
- [Technology and Version](#technology)
- [API Endpoints](#apiendpoints)

## Installation

### Database installation
1. Download Mongo DB Server [download link](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.3-signed.msi)
2. Install Mongo DB Server, along with MongoDBCompass (It will ask for installation)
3. Download MongoDB Shell [download link](https://downloads.mongodb.com/compass/mongosh-2.1.0-win32-x64.zip)
4. Extract the Zip file and cut, then paste it into the MongoDB server installed location inside the bin folder.
5. Start Bash/CMD from the Bin folder and enter the command
   ```bash
   mongod
6. Then start the server with this command.
   ```bash
   mongosh
7. Make sure MongoDB connection URL is the same as the server location in the backend `index.js` file.

### Backend Installation
1. Clone the repository.
   ```bash
   git clone https://github.com/AshishisLiquid/tanchongassessment.git
2. Enter into cloned folder then change directory to **Backend** Directory
   ```bash
   cd backend
3. Run the NPM install command to install all the Dependencies.
   ```bash
   npm i
4. After installation Run Express JS using nodemon.
   ```bash
   nodemon index.js

### Frontend Installation
1. Open another bash in the cloned directory
2. Change the directory to Frontend.
   ```bash
   cd frontend
3. Install all the dependencies.
   ```bash
   npm i
4. After installing dependencies serve the project.
   ```bash
   ng serve -o


## Technology
1. Backend: Express JS
2. Frontend: Angular
3. Database: MongoDB
4. ORM Tool: Mongoose
5. API Testing: Postman


## APIEndpoints

### 1. Get Users

**Endpoint:** `/getUsers`

**Method:** `GET`

**Description:** Retrieves a list of all users.

**Example:**
```bash
curl -X GET http://localhost:3000/getUsers
```

### 2. Create User

**Endpoint:** `/createUser`

**Method:** `POST`

**Description:** Create New User

**Parameters:**
1. name: String
2. age: Number
3. email: String
4. contact: Number

**Example:**
```bash
curl -X POST http://localhost:3000/createUser
```

### 3. Get User

**Endpoint:** `/getUser?id=`

**Method:** `GET`

**Description:** Retrieve a specific user, Replace `%id%` with user_id

**Example:**
```bash
curl -X GET http://localhost:3000/getUser?id=
```

### 4. Update User

**Endpoint:** `/updateUser?id=`

**Method:** `PUT`

**Description:** Update specific user, Replace `%id%` with user_id

**Parameters:**
1. name: String
2. age: Number
3. email: String
4. contact: Number
   
**Example:**
```bash
curl -X PUT http://localhost:3000/updateUser?id=
```

### 5. Delete User

**Endpoint:** `/deleteUser?id=%id%`

**Method:** `DELETE`

**Description:** Delete specific user, Replace `%id%` with user_id

**Example:**
```bash
curl -X DELETE http://localhost:3000/deleteUser?id=%id%
```

### 5. Search User

**Endpoint:** `/searchUser?query=`

**Method:** `GET`

**Description:** Get a List of Users whose email or name matches regex.

**Example:**
```bash
curl -X GET http://localhost:3000/searchUser?query=
```
