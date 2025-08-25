const express = require('express')
const movies = require('./movies.json')

const app = express()
app.disable('x-powered-by') // deshabilita el header x-powered-by; Express

app.get('/', (req, res) => {
  res.json({ message: 'Hola mundo' })
})

app.get('/movies', (req, res) => {
  res.json(movies)
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
