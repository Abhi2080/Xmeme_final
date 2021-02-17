#!/bin/bash

. ~/.nvm/nvm.sh
npm install 

sudo kill -9 $(sudo lsof -t -i:8081)
mongo
use xmemeDB
db.dropDatabse()
exit

npm start
