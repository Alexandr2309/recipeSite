import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cord'
import db from './db/index';

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(apiPort, () => console.log(`Server running at port ${apiPort}`));

