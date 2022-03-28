require('dotenv').config();
import connectMongo from './configs/mongo';
import bodyParser from 'body-parser';
import routes from './routes';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT! || 8000;
 
app.use(cors({ 
  origin:process.env.CLIENT_URL!,
  credentials:true
}));
app.use(bodyParser.json());
app.use(routes);

!(async function config() {
  try {
    const message = `The server start in the port ${port}`;
    await connectMongo();
    app.listen(port, () => console.log(message));
  }
  catch(err:unknown) {
    console.log(err);
  } 
})(); 