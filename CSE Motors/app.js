const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 5501;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');

app.use(express.static(path.join(__dirname, 'public')));

const { getClassifications } = require('./models/inventory-model');
app.use((req, res, next) => {
  res.locals.classifications = [];
  res.locals.activeSection = null;
  try {
    const classes = getClassifications();
    res.locals.classifications = classes;
    const m = req.path.match(/^\/inv\/classification\/([^/]+)/i);
    if (m) res.locals.activeSection = String(m[1]).toLowerCase();
    if (req.path === '/') res.locals.activeSection = 'home';
    next();
  } catch (err) {
    console.error('Nav middleware failed:', err.message);
    next();
  }
});

const inventoryRouter = require('./routes/inventory');
app.use('/inv', inventoryRouter);
const errorRouter = require('./routes/error');
app.use('/error', errorRouter);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'CSE Motors'
  });
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status);
  res.render('error', {
    title: status === 404 ? 'Page Not Found' : 'Server Error',
    status,
    message: status === 404 ? 'The requested resource could not be found.' : 'An unexpected error occurred.'
  });
});

app.listen(PORT, () => {
  console.log(`CSE Motors server running on http://localhost:${PORT}/`);
});
