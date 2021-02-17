#!/bin/bash

. ~/.nvm/nvm.sh
npm install 

sudo kill -9 $(sudo lsof -t -i:8081)
mongo xmemeDB --eval "db.dropDatabase()"

npm start
