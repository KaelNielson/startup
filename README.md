# startup - Business Simulator
Startup application for BYU CS260

## Specification:

### Elevator Pitch:
      Everbody loves simulators. No matter what they simulate, people love to play and experiment with something they don't have the time to in 
    real life. One of the things that many people are interested in but for whatever reason do not pursue is running their own business. My 
    application would allow one to experience some of the joys and trials of trying to run a business, while random events continually 
    complicate it. Then, different users can compare and show off their business to each other.

### Design Diagrams:
Login and Scoreboard HTML pages:
![IMG_20240914_183409270](https://github.com/user-attachments/assets/029cef02-2aff-4cf3-b549-6ec51f6a3621)
User's business simulator HTML page:
![IMG_20240914_183416471](https://github.com/user-attachments/assets/ccab4cbc-0b25-4261-bdaf-05cd6f13afe8)


### Features:
    1. Secure user login with HTTPS
    2. Options for pricing, sales, advertisement, security, products, and general business practice.
    3. Options for how the user reacts to random events.
    4. Options for employees and hiring practice.
    5. Storage of the users account details, including their business choices and their in-game balance.
    6. Inter-user comparisions, allowing users to see how their business is doing vs other users.
    7. User search that allows users to search for other users by their username

### Technologies:
      HTML - 3 pages, one for login, one for your own business, and one for scoreboard
      CSS - Simple color usage, nothing distracting, green for good things, red for bad things, greys for normal things, empty space to feel less 
    crowded.
      JavaScript/React - Randomized events affecting the simulated businesses. Different choices and actions by users would affect the percent 
    chances of different events.
      Web Service/API - Users could generate random business names using the Wordnik API. Calls would also be made to store player choices, retrieve 
    random events, and retrieve scoreboard updates.
      Data/Authentication - Store users, their choices, their business statistics and their simulated money.
      WebSocket Data - Users would be able to see other users and their businesses on the scoreboard

## HTML Deliverable:
- [x] **HTML Pages** - Three HTML pages, for the Login, Scoreboard, and actual game page
- [x] **Links** - Every page currently has links to every other page.
- [x] **Text** - There is literaly so much text in this thing. Less so on the login and scoreboard pages, but so 
much on the game page. Text discussing money, employees, and most importantly, Events.
- [x] **Images** - Image of the Stonk Meme as part of the header to every page, to convey to focus and tone of the 
game.
- [x] **DB/Login** - A place for both Login and Account Creation on the login page, where the user would first start. 
The specs of the users business would be held in a database, and shown on the game page.
- [x] **WebSocket** - On the scoreboard page, users would be able to see some of the specs of other users in realtime.

Note: While working through the HTML, it became apparent that some of my initial plans were a little ambitious. 
Instead of having the user control every aspect of their business, I'm moving to focus more on the events and their 
effects.


## CSS Deliverable:
- [x] **Header/Footer/Main** - Headers and Footers colored apart from Main.
- [x] **Navigation Elements** - Colored links in contrast of background. Added different colors for the link 
normally, when it's moused over, and when its clicked.
- [x] **Response to Window Size** - All the windows use flex to change to the size of the window. For the elements 
that require a lot of text, they are outfited with scroll bars that react to the size of the screen as well.
- [x] **Application Elements** - Used spacing and coloration to make a visually pleasing output.
- [x] **Application Text** - Consistant fonts. Use of special coloration for text that represents important 
information for the user.
- [x] **Application Image** - Used CSS to relocate the image into a non-intrusive situation.

### General Note:
	While working on the React, it became clear that an About Page was necessary for user experience.

## React Deliverable:
- [x] **Bundled and Transpiled** - yep
- [x] **Components** - Login, scoreboard, and game have mocks. Game nearly works.

  - [x] **login** - The login or sign up button takes you to the next page.

  - [x] **database** - Currently, the statistics of the business are held locally but not saved between refreshes.

  - [x] **Websocket** - Currently, the scoreboard is just representory, not responsive.

  - [x] **logic** - Can partially interact with the event objects.
- [x] **Router** - Routing between login and scoreboard page
- [x] **Hooks** - Many instances of useState in the game.jsx

## Service Deliverable:
- [x] **Node.js/Express HTTP service** - complete.
- [x] **Static middleware for frontend** - complete.
- [x] **Calls to third party endpoints** - Random Name button calls on the wordnik api.
- [x] **Backend service endpoints** - barebones login system similar to the simon service
- [x] **Frontend calls service endpoints** - Fetch calls in login
In the near future, backend and frontend system will be created for scores as well.

## Login/DB Deliverable:
- [x] **Atlas Database created** - complete.
- [x] **MongoDB Data Stored** - complete.
- [x] **User registration** - Creation of user works now
- [x] **Existing User** - Login a user works now
- [x] **Credentials** - Users are saved in DB, scores are not yet, but will be soon.
- [x] **Restrictions** - Can't access scoreboard and game until logged in.
