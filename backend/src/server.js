const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const server = express()

// mongoose.connect('mongodb+srv://pedro_admin:rg22pedro@cluster0.abqxl.gcp.mongodb.net/omnistack8?retryWrites=true&w=majority')
mongoose.connect('mongodb://localhost/omnistack')

server.use(express.json())
server.use(routes)

server.listen(3333)