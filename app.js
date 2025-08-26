const express = require('express')
const crypto = require('node:crypto')
const movies = require('./data/movies.json')
const { validateMovie } = require('./schemas/movies')

const app = express()
app.use(express.json()) // middleware que parsea el body a json
app.disable('x-powered-by') // deshabilita el header x-powered-by; Express

app.get('/movies', (req, res) => {
  res.json(movies)
})

app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovie = movies.filter(
      (movie) => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
    return res.json(filteredMovie)
  }
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const newNMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }
  // Esto no seria REST, porque estamos guardando
  // el estado en memoria
  movies.push(newNMovie)
  res.status(201).json(newNMovie) // actualizar la cache del cliente
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
