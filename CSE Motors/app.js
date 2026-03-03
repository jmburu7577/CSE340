const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5500;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'CSE Motors'
  });
});

app.listen(PORT, () => {
  console.log(`CSE Motors server running on http://localhost:${PORT}/`);
});
