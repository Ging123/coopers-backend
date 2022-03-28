require('dotenv').config();
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.SERVER_PORT! || 8000;
 
app.use(cors({ 
  origin:process.env.CLIENT_URL!,
  credentials:true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hellow world')
});

!(async function config() {
  try {
    const message = `The server start in the port ${port}`;
    app.listen(port, () => console.log(message));
  }
  catch(err:unknown) {
    console.log(err);
  }
})(); 