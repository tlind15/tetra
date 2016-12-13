NOTE: Use zip file to test.  Node module folder too large to upoad, resides inside the .zip file.

Work in progress: Do note that the insert queries for FKs are being worked on. Primary intent is to determine error checking for order insertion of the FKs. Intention is to 
create the system to operate on a "black" box DB as much as possible, without explicit commands. 


Needed to run this server is node, all modules are contained in this directory. 

To start the server, simply go to the cmd line and cd into the appropriate directory and enter the following command:

node server.js

This will execute the server.

Index.html is a debugging page created specifically to interact with the backend server, to access the web page associated with the system
use the http://localhost:3000 in any browser. 

Tetra.html is the actual browser, css folder houses the CSS files for system asthetics, and public folder houses client side JS files. 

In order to use this program the following add-on is needed:


    https://chrome.google.com/webstore/detail/cors-toggle/omcncfnpmcabckcddookmnajignpffnh?utm_source=gmail


Additonally, this only works in chrome due to cross origin repsonse errors. 

Other dependencies:

mysql and mysql server.

Import all tables into a DB located in the mysql folder in the zip file.

Go into the server.js and modify connect = mysql.createConnection({

	Look at the comments to set up appropriately. Ensure that the DB used contains the tables in the zip file.

})
