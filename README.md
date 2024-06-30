# Group Chat and Data Management Application

## Description

This is a simple application that provides web services to facilitate group chat and manage data. It includes APIs for user management, authentication, group management, and messaging within groups.

## Features

- **Admin APIs**
  - Create User
  - Edit User

- **Authentication APIs**
  - Register
  - Login
  - Logout

- **Group APIs**
  - Create Group
  - Delete Group
  - Search Groups
  - Add Members

- **Group Message APIs**
  - Send Message
  - Like Message

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Testing:** Jest, Supertest

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/divyanshutewari17/riktham-node-js-assignment.git
    cd riktham-node-js-assignment
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```
    
### Running Tests

1. To run the tests, use the following command:
    ```bash
    npm test
    ```
    
### Running the Application

In the .env file change the value of NODE_ENV="test" to NODE_ENV="development". Now execute the steps below:

1. Start the server:
    ```bash
    npm start
    ```

2. The server will be running at `http://localhost:5000`.

