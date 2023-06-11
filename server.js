import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import compression from 'compression'
import Database from './db/index.js'

import deviceRouter from './router/deviceRouter.js'

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', deviceRouter)

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`)
    await Database.setup()
})
