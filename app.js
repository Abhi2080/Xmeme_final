const express = require("express")
const morgan = require("morgan");
const cors = require("cors")
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser")
const helmet = require("helmet");
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")
const memeRoutes = require("./routes/memeRoutes")
const errorRoutes = require("./routes/errorRoutes")
const app = express();

// 1) GLOBAL MIDDLEWARES

// Setting secure http headers
app.use(helmet());


// Limiting the requests form a particular IP
const limiter = rateLimit({
    max: 10000,
    windowMs: 60*60*1000,
    message: 'Too many requests from the same IP, try within an hour'
})

// Use as a logger to log the requests made to the server
app.use( morgan(':method :url :status :res[content-length] - :response-time ms') )

// Parse the data coming form the frontend
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())

// Used to enable the CROS origin policy
app.use(cors())

const swaggerOptions = {
    swaggerDefinition : {
        info : {
            title : 'Memes Api',
            description : "Meme Api information",
            contact : {
                name : "abhinav Singh"
            },
            servers: ["http://localhost:8081"]
        }
    },
    apis : ["./routes/*.js"]
}
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// 2) ROUTE MIDDLEWARES
app.use('/swagger-ui', swaggerUI.serve, swaggerUI.setup(swaggerDocs));




app.use('/', memeRoutes)
app.use('*', errorRoutes )



module.exports = app;