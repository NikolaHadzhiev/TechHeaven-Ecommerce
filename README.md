# TechHeaven
Welcome to TechHeaven, an advanced ecommerce platform designed for buying a wide range of tech products, including    laptops, computers, and various other tech gadgets. This platform is built using cutting-edge technologies such as React with Redux Toolkit on the front end and C# .NET 7.0 on the back end.🌐💻📱

## Table of Contents

1. [Installation Guide](#installation-guide)
   - [Backend Installation](#installation-and-running-of-backend)
   - [Frontend Installation](#installation-and-running-of-frontend)
   - [Database Installation](#installation-and-running-of-database---postgresql-using-docker)
2. [Description](#description)
3. [Access Points](#access-points)

## Installation Guide

### 1. Installation and Running of Backend

Navigate to the `API` folder and run the following commands in the terminal:

```bash 
dotnet watch run
```
or
```bash
dotnet run
```

### 2. Installation and Running of Frontend

Navigate to the client folder and run the following commands in the terminal:

```bash
npm install
npm start
```

### 3. Installation and Running of Database - PostgreSQL using Docker

Make sure you have Docker Desktop installed. In the terminal, run the following command:

```bash
docker run --name dev -e POSTGRES_USER=appuser POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:latest
```

To connect to the local environment database, use the following credentials:

- Hostname: localhost  
- User: appuser   
- Password: secret   
- Port: 5432   
- Connection: Standard Connection - SSL   

## Description
TechHeaven is an advanced ecommerce platform with a comprehensive catalog, a user-friendly login and register page, a convenient shopping cart, and an admin panel for creating, editing, and deleting products. The platform is integrated with Stripe for secure and seamless orders and purchases. Additionally, TechHeaven utilizes Cloudinary for efficient product image cloud support. 🌟

### Access user - login

To access user functionallity simply login with:
 - username: Niki
 - password: Pa$$w0rd

### Access admin - login

To access admin functionallity simply login with:
 - username: admin
 - password: Pa$$w0rd

## Access points
- When the client is running, access it by visiting: http://localhost:3000
- When the server is running, access it by visiting: http://localhost:5095
- Test and access API endpoints via Swagger at: http://localhost:5095/swagger

Enjoy your tech shopping experience in TechHeaven! 🚀🛒
