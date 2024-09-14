# startup - Business Simulator
Startup application for BYU CS260

## Specification:

### Elevator Pitch:
    Everbody loves simulators. No matter what they simulate, people love to play and experiment with something they don't have the time to in 
  real life. One of the things that many people are interested in but for whatever reason do not pursue is running their own business. My 
  application would allow one to experience some of the joys and trials of trying to run a business, while random events continually 
  complicate it. Then, different users can compare and show off their business to each other.

### Design Diagrams:


### Features:


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
