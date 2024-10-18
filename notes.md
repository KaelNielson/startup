# NOTES

## General Notes
  Website URL: http://98.82.255.193

## Github Notes
  Git clone grabs a repository and puts it in a local file
  Git commit saves changes to the "waiting room"
  Git push adds commits to the true repositories
  Git pull updates a local repository
  Git fetch then git status show if there are any pulls or pushes needed
  Don't forget to use git add to prepare files for commits
  The following code deploys the files: 
"./deployFiles.sh -k ../random_project_tibits.pem -h nielsoneconomy.click -s startup"

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

## Midterm Notes:
  Questions on the Review I was uncertain about:
    In the following code, what is the difference between the #title and .grid selector?
    	The "#" selector refers to an element's id, while the "." selector refers to an element's class.	
    In the following code, what is the difference between padding and margin?
    	Padding is the space between the element's content and the element's border. Margin is the space around the border.*
    What does the following code using map with an array output?
    	The map Array method applies a function to every item in the array.
    In the CSS box model, what is the ordering of the box layers starting at the inside and working out?
	Content, Padding, Border, Margin.
    How do you declare the document type to be html?
	<!DOCTYPE html>
    Javascript switch statments
	Evaluate the switch statement once, then check its answer against the different cases. If none of the cases get it, got to default.
    Is it possible to add new properties to javascript objects?
    	Yes.    	
    Which of the following correctly describes JSON?
	JSON stands for JavaScript Object Notation. It's used for data storage and delivery.
    What does the console command chmod, man, ssh, ps, wget?
    	chmod can change the permissions of a file or directory, man displays the manual, ssh stands for secure shell and provides connection between to machines, ps shows you information on any running processes, wget allows you to download files from the Internet.
    Which of the following is true when the -la parameter is specified for the ls console command?
    	-a shows hidden flies, -l shows additional information like file permissions and ownership.
    Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?
    	The top level domain is .click, the root domain is bozo.click, and banana.fruit is the subdomain.
    Is a web certificate is necessary to use HTTPS?
    	Yes
    Can a DNS A record can point to an IP address or another A record.
	A DNS can point to an IP address, but not another A record.
    Port 443, 80, 22 is reserved for which protocol?
	Port 443 is the standard HTTPS Port for all the secured transactions. Port 80 is the default network port for web servers using HTTP. The 22 port is used for Secure Shell (SSH) communication and allows remote administration access to the VM.

