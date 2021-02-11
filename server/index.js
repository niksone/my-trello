const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use('/login', (req, res) => {
    res.send({
        token: 'test'
    })
})

app.listen(5000, () => console.log('app is running'))