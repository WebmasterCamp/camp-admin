const express = require('express')

const app = express()

app.use('/', express.static(`${__dirname}/build`))

app.listen(7777, () => console.log('Admin System is starting at port 7777'))
