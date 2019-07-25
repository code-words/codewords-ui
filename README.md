

## Table of contents
* [Intro](#CodeWords)
* [Screenshots](#Screenshots)
* [Getting Started](#Getting-Started)
* [How to Use](#How-to-Use)
* [Project Emphasis](#Project-Emphasis)
* [UI Design](#UI-Design)
* [Future Plans](#Future-Plans)
* [License](#License)


# CodeWords

This app was created by <a href="https://github.com/joequincy">Jon Peterson</a>, <a href="https://github.com/rdren0">Rachael Drennan</a>, <a href="https://github.com/siimonstark">Justin Pyktel</a>, and <a href="https://github.com/lynnerang">Lynne Rang</a>.

This project is a Turing cross-pollination project between students of the frontend and backend programs, primarily focused on working with React and ActionCable websockets implementation on the frontend and Ruby on Rails and ActionCable websockets definition on the back-end.

This app is based on the game Code Names from the Hitchhikers Guide to the Galaxy novel (with an added Archer theme), and it allows four players to join a game from four different client machines and play against each other on two teams.


## Screenshots

![New game](/screenshots/1.png)
![Lobby](/screenshots/2.png)
![Gameplay as hinter](/screenshots/3.png)
![Gameplay as guesser](/screenshots/4.png)
![Mid-game](/screenshots/5.png)


## Getting Started

You can view this application live on Heroku at: https://codewords-ui.herokuapp.com/ !

OR

If you'd like to clone this repository to your own local machine, run the following commands in your terminal:

```shell
git clone https://github.com/code-words/codewords-ui.git
git clone https://github.com/code-words/codewords-server.git
```

For the server repo, run the following commands:

1. ```bundle install``` to install dependencies
2. Prepare database with ```rails db:create```
3. Migrate with ```rails db:migrate```
4. Seed with ```rails db:seed```
5. Start the server with ```rails s```

Then for the ui repo, run the following commands:

1. ```npm install``` to install dependencies
2. Start the server with ```npm start```


Then, go to `http://localhost:3001/` to see the code running in the browser.  

---

## How to Use

1. Create a new game for your friends (or your three other browser tabs) to join!
2. Click the invite code to copy it and send to others to join your existing game.
3. Once all four players have joined, click "Continue" to start the game.  You can see who is on what team in the scoreboards to each side of the game board.
4. A player from each team will play the intel, and they will be able to see which cards are on their own team that they want their partner to guess.
5. One of the intel players will be chosen to go first, and they can enter a hint and indicate how many cards on the table are relate to that hint.  Be careful not to enter a word on the board, a word that relates to the other team's cards, or a word assigned to the assassin (instant death)!
6. The guesser on that same team can now enter guesses until they choose a bystander (no points), choose a card of the opposite team's (point for the other team), their total guesses run out, or they choose the assassin card (game over!).  In all cases other than ending the game with the assassin or all of one team's cards are guessed, it will then be the other team's turn.
7. The first team to have all their words guessed wins!


## UI Design

Given the limited time frame, we created a high-fidelity prototype of the design on Figma to have a more detailed idea of where we wanted everything to go on the different pages.

![Figma designs](/screenshots/7.png)


## Future Plans

We plan to keep working on this to add more features like the following:
- The option to choose a male or female agent image
- An ongoing record of all hints displayed for guessers
- The option to choose your team on game setup
- A inactivity timer, or timer that resctricts how long each turn is.


## Project Emphasis

View the project specification on the <a href="https://frontend.turing.io/projects/capstone.html">Turing webpage for this project</a>.

### Front-End
- [x] ActiveCable websockets
- [x] SCSS
- [x] Flex-box
- [x] Grid CSS
- [x] UI design
- [x] React
- [x] React router
- [x] Es6 classes
- [x] Async JavaScript
- [x] API fetches
- [x] Enzyme & Jest testing
- [x] Webpack
- [x] NPM

### Back-end
- [x] Ruby on Rails
- [x] ActionCable websockets
- [x] Relational Databases
- [x] SQL
- [x] Postgres
- [x] User Authentication


## Licensing

All credit goes to <a href="turing.io">Turing School of Software</a> for providing the project specifications.
