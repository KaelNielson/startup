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

##HTML Deliverable:
- [x] **HTML Pages** Three HTML pages, for the Login, Scoreboard, and actual game page
- [x] **Links** Every page currently has links to every other page.
- [x] **Text** There is literaly so much text in this thing. Less so on the login and scoreboard pages, but so 
much on the game page. Text discussing money, employees, and most importantly, Events.
- [x] **Images** Image of the Stonk Meme as part of the header to every page, to convey to focus and tone of the 
game.
- [x] **DB/Login** A place for both Login and Account Creation on the login page, where the user would first start. 
The specs of the users business would be held in a database, and shown on the game page.
- [x] **WebSocket** On the scoreboard page, users would be able to see some of the specs of other users in realtime.

Note: While working through the HTML, it became apparent that some of my initial plans were a little ambitious. 
Instead of having the user control every aspect of their business, I'm moving to focus more on the events and their 
effects.
