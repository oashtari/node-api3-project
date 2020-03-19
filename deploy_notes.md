1. add "start":"node index.js" to package.json
2. make port dynamic, get it out of code, into the environment
-- const port = process.env.PORT in index.js file; PORT is standard by heroku; 
-- all uppercase is convention for env variables
3. yarn add dotenv (may need npm i dotenv)
4. add "require('dotenv').config();"to index.js; don't need 
5. set environment variable as port is not in env list
-- env variables are local, so only your terminal session has it; if you want it elsewhere, you need to export 
-- for Mac the commans id export PORT=5000(or number of your choosing); can undo it with unset PORT
-- setting port in envinroment will override what is the in .env file
6. 'create new app' in heroku; creating a new application setting environment
7. connect to github repo (could FTP it, more old school)
8. pick the right branch
9. enable automatic deploys
-- you can view logs through terminal, or the 'more' tab
10. add MOTD value in .env file
11. add motd const in the main get
12. go to Luis notes in node-api4-guided :)






CI/CD pipeline stages:
* development (dev)
* test 
* staging 
* --- manual gate (not all places)
* production

12factor.net: structure of how to develop an application
12factor.net/config: want to store configuration values in the environment, not the code

what is the 'environment'?
every OS has ability to set variable values in an environment 

env in terminal will give you list of all environment in key value pairs; key=value