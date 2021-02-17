#!/bin/bash

. ~/.nvm/nvm.sh
npm install 

mongo <XmemeDB> --eval "db.dropDatabase()"

npm start
