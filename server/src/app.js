import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import router from './routes/routes';

const swaggerDocument = YAML.load(`${process.cwd()}/swagger.yaml`);
const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = process.env.PORT || 2020;
app.use('/api/v1', router);
app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', (req, res) => {
  res.send({
    message: 'Welcome to WEConnect!'
  });
});
app.listen(PORT, () => console.log('server listening on port 2020'));

export default app;
