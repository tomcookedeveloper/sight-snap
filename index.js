const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello Sight Snap user!')
})

app.listen(port, () => {
    console.log(`Sight Snap static file server listening on port ${port}`)
})

app.use(express.static('.'))