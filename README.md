# Device Management Hub

Device Management Hub is a MERN stack application that allows you to manage devices. This application is built using MySQL, Express.js, React, and Node.js.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Prerequisites
Before you begin, ensure you have met the following requirements:
- You have installed [Node.js](https://nodejs.org/en/download/) (Recommended version 14 or higher)
- You have installed [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- You have installed [MySQL](https://dev.mysql.com/downloads/mysql/) and it is running locally.

## Getting Started
To get a local copy up and running, follow these steps:

1. **Clone the repository**
    ```sh
    git clone https://github.com/elcamino666/DeviceManagementHub.git
    cd DeviceManagementHub
    ```

2. **Install Yarn packages**
    - Install server dependencies
      ```sh
      yarn install
      ```
    - Install client dependencies
      ```sh
      cd client
      yarn install
      cd ..
      ```

3. **Environment Variables**
   You need to set up your environment variables. Create a `.env` file in the root directory and set up your variables.
   Example:
    ```
       MYSQL_HOST='127.0.0.1'
       MYSQL_USER='your_mysql_username'
       MYSQL_PASSWORD='your_mysql_password'
       MYSQL_DATABASE='your_mysql_database_name'
       PORT=9999
    ```


## Running the Application
To run Device Management Hub, follow these steps:

1. **Start the server**
- From the main directory, run:
  ```sh
  yarn dev
  ```

2. **Start the client**
- Open another terminal, navigate to the `client` directory, and run:
  ```sh
  cd client
  yarn dev
  ```

3. **Access the application**
- Open your web browser and go to `http://localhost:3000`.

## Contributing
If you want to contribute to Device Management Hub, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`.
4. Push to the original branch: `git push origin <branch_name>`.
5. Create the pull request.

## License
This project uses the following license: [mit](#).

## Contact
If you want to contact the developer, you can reach Eni Veshi at eni@run4dev.com.

