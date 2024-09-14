# NOTES

## General Notes
  Website URL: http://98.82.255.193

## Github Notes
  Git clone grabs a repository and puts it in a local file
  Git commit saves changes to the "waiting room"
  Git push adds commits to the true repositories
  Git pull updates a local repository
  Git fetch then git status show if there are any pulls or pushes needed

## Startup Notes, thoughts, and ideas
###  Possible Startup Options:
    Fan Theory Sharing Website
    Money Game/Economy Simulator(with fake money)
    RPG party finder, similar to a dating site
####    **I'm going with the Economy Simulator**

###  Startup Specification Notes:
    HTML - 3 pages, one for login, one for your own business, and one for scoreboard
    CSS - Simple color usage, nothing distracting, green for good things, red for bad things, greys for normal things, empty space to feel less crowded.
    JavaScript/React - Randomized events affecting the simulated businesses. Different choices and actions by users would affect the percent chances of different events. 
    Web Service/API - Users could generate random business names using the Wordnik API. Calls would also be made to store player choices, retrieve random events, and retrieve scoreboard updates.
    Data/Authentication - Store users, their choices, their business statistics and their simulated money.
    WebSocket Data - Users would be able to see other users and their businesses on the scoreboard
