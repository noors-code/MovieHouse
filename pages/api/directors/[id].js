import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  const { id } = req.query;

  const filePath = path.join(process.cwd(), 'public/data/movies.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const director = data.directors.find((d) => d.id === id);
 

  const moviesByDirector = data.movies.filter((m) => m.directorId === id);

  return res.status(200).json({
    director,
    movies: moviesByDirector,
  });
}
