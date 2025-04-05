// 02-express - task 8 onwards...
import express from 'express';
const hostname = 'localhost';
const app = express();
const port = 3000;

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.get('/api/v1/cat', (req, res) => {
  const catData = {
    cat_id: 1,
    name: "Whiskers",
    birthdate: "2022-07-14",
    weight: 5,
    owner: "Olivia",
    image: "https://loremflickr.com/320/240/cat"
  }
  res.json(catData);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
