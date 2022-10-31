
const express = require('express');
const router = express.Router();
const movies = [
  {
    id: 1,
    name: 'Pulp Fiction',
  },
  {
    id: 2,
    name: 'Iron Man',
  },
  {
    id: 3,
    name: 'Skyfall',
  },
];
router.get('/', (req, res) => {
  res.status(200).json(movies);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;    //destructuring
  const movie = movies.find((m) => m.id === Number(id));
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.post('/', (req, res) => {
  const { id, name } = req.body;
  movies.push({ id, name });
  res.status(201).json({ message: 'Created' });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const index = movies.findIndex((m) => m.id === Number(id));
  const updatedMovie = {
    id: Number(id),
    name,
  };
  movies[index] = updatedMovie;
  res.status(200).json({ message: 'Updated' });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  movies = movies.filter((m) => m.id !== Number(id));
  res.status(200).json({ message: 'Deleted' });
});


module.exports = router;