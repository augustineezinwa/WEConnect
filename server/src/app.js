import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import Router from './routes/routes';

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 2020;
app.use('/api/v1', Router);
app.use('/', (req, res) => {
  res.send({
    message: 'Welcome to WEConnect!'
  });
});
app.listen(PORT, () => console.log('server listening on port 2020'));

export default app;
