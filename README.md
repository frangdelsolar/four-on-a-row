## Connect Four - Multiplayer Game

This project implements a classic Connect Four game with separate clients for players and an admin, alongside a server managing game logic and communication.

**Technologies:**

* Server: Node.js
* Clients: JavaScript (p5.js)
* Communication: Socket.IO

**Running the Project:**

**Server:**

1. Navigate to the server directory.
2. Run `node server.js` to start the server on port 3000.

**Clients:**

**Player Client:**

1. Navigate to the client (player) directory.
2. Run `npm install` to install dependencies.
3. Run `npm run serve` to start a development server on port 5500.
4. Open http://localhost:5500 in your browser to access the player client.

**Admin Client:**

1. Follow the same steps as the player client for installation and running the server (steps 2a and 2b).
2. Open http://localhost:5500/admin in your browser to access the admin client.

**Gameplay:**

* Players can join and create games through the player client interface.
* The admin client provides a visual representation of the current game state and connected players.
* Players take turns dropping their pieces into the game board.
* The first player to connect four pieces of their color horizontally, vertically, or diagonally wins the game.

**Note:**

* This is a development project and might require further configuration depending on your environment.
* Additional features and functionalities can be implemented based on your needs.

**Further Notes:**

* Consider adding instructions on how to install Node.js and npm if your target audience may not have them pre-installed.
* You can mention any specific libraries or frameworks used within the project (e.g., Express for the server, p5.js libraries for visuals).
* Include a license file if you intend to share your code publicly.
* This is a basic example, and you can customize the readme to include more details like features under development, known issues, and contribution guidelines.
