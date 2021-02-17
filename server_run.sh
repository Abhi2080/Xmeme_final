#!/bin/bash

. ~/.nvm/nvm.sh
npm install 

mongo <xmemeDB> --eval "db.dropDatabase()"

npm start
