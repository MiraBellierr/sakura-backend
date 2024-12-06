# Sakura Backend

Sakura Backend is a Node.js-based RESTful API designed to create complaint and feedback management for SAKURA college. Built with **Express.js** and **TypeScript**, it supports role-based access and integrates seamlessly with **MongoDB** for data storage.

## ❤️ About

Sakura Backend is a system for managing complaints, feedback, FAQs, and contacts. With JWT-based authentication, only authorized users can access protected resources.

## 🧡 Features

- 🌟 **User Authentication**: Role-based access for admins and students.
- 🛠 **Complaint Management**: Students can create complaints; admins can update and resolve them.
- 📋 **FAQ Management**: Admins can manage frequently asked questions.
- 📞 **Contact Management**: Admins can update contact details.
- 🔒 **Secure API**: JWT-based authentication protects sensitive endpoints.

## 🛠 Installation

### Prerequisites

- **Node.js** (version 14+ recommended)  
- **MongoDB** (local or hosted instance)  
- **Git**

### Steps to Install

1. Clone the repository:
   ```bash
   git clone https://github.com/MiraBellierr/sakura-backend.git
   cd sakura-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the environment:
Create a `.env` file in the project root and add the following:
     ```env
     PORT=3000
     MONGO_URI=mongodb://localhost:27017/sakura
     JWT_SECRET=your_secret_key
     ```
## 🚀 Running the Project

### Development Mode

1. Start the development server with hot-reloading:
   ```bash
   npm start
   ```
2. Open the API at `http://localhost:3000`.



## 🧡 API Endpoints

| **Method** | **Endpoint**                  | **Description**                                            | **Access Level**         |
|------------|--------------------------------|------------------------------------------------------------|--------------------------|
| `POST`     | `/users/students/login`        | Login for students, returns JWT token                      | Public                   |
| `POST`     | `/users/admins/login`          | Login for admins, returns JWT token                        | Public                   |
| `POST`     | `/complaints`                  | Create a new complaint                                     | Student (Authenticated)  |
| `GET`      | `/complaints`                  | List all complaints                                        | Student (Authenticated)  |
| `PUT`      | `/complaints/:id`              | Update complaint status and comment                        | Admin (Authenticated)    |
| `POST`     | `/faqs`                        | Create a new FAQ                                           | Admin (Authenticated)    |
| `GET`      | `/faqs`                        | List all FAQs                                              | Student (Authenticated)  |
| `PUT`      | `/faqs/:id`                    | Update an FAQ                                              | Admin (Authenticated)    |
| `DELETE`   | `/faqs/:id`                    | Delete an FAQ                                              | Admin (Authenticated)    |
| `GET`      | `/contacts`                    | Get contact details                                        | Student (Authenticated)  |
| `PUT`      | `/contacts`                    | Update contact details                                     | Admin (Authenticated)    |
| `POST`     | `/feedbacks`                   | Post a feedback                                            | Student (Authenticated)  |
| `GET`      | `/feedbacks`                   | Get all feedback                                           | Student (Authenticated)  |



## 💛 Contributing

We welcome contributions to Sakura Backend! If you'd like to help:

1. Fork the repository.  
2. Create a branch for your feature or fix.  
3. Submit a pull request, and we’ll review it!  

## 📚 Assets and Tools

- **[Node.js](https://nodejs.org/)**: JavaScript runtime  
- **[TypeScript](https://www.typescriptlang.org/)**: Static type-checking  
- **[MongoDB](https://www.mongodb.com/)**: Database  
- **[Express.js](https://expressjs.com/)**: Web framework  
