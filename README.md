
# RoomZee

RoomZee is an intuitive platform for booking and managing accommodations. It features a user-friendly interface, real-time availability, personalized recommendations, and an integrated chat for seamless communication between guests and hosts.
![RoomZee Preview](./assets/doc-logo.jpg)
## Features

- **User-friendly interface**: Simple and easy-to-navigate design for an enhanced user experience.
- **Real-time availability**: Instantly check the availability of accommodations.
- **Personalized recommendations**: Get tailored accommodation suggestions based on preferences.
- **Integrated chat**: Communicate directly with hosts for quick responses and seamless bookings.
- **Modern web technologies**: Built with the latest tools to ensure speed, reliability, and performance.

## Tech Stack

- **Frontend**: React, GSAP (for animations)
- **Backend**: Node.js, Express (or other backend technologies you are using)
- **Database**: MongoDB / MySQL (or your preferred database)
- **Other**: WebSockets (for real-time chat), RESTful APIs

## Installation

To run RoomZee locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/roomzee.git
   ```

2. Navigate into the `api` directory and start the backend:

   ```bash
   cd api
   nodemon app.js
   ```

3. In a new terminal window, navigate into the `client` directory and run the frontend:

   ```bash
   cd client
   npm run dev
   ```

4. In another terminal window, navigate into the `socket` directory and start the socket server:

   ```bash
   cd socket
   nodemon app.js
   ```

5. Open your browser and go to `http://localhost:3000` to view the app.

## Usage

Once the app is running:

- Sign in to browse and book accommodations.
- Hosts can list new properties and manage bookings.
- Use the integrated chat to communicate directly with hosts or guests.

## Contributing

We welcome contributions! To contribute to the project:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
