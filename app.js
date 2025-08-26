const express = require('express')
const movies = require('./data/movies.json')

const app = express()
app.disable('x-powered-by') // deshabilita el header x-powered-by; Express

// app.get('/movies', (req, res) => {
//   res.json(movies)
// })

app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovie = movies.filter(
      (movie) => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
    return res.json(filteredMovie)
  }
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
