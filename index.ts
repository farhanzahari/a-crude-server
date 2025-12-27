import express from 'express'
import item from './item';

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/apiv1/item', item);

app.get('/', (req,res) => res.sendStatus(200))

app.listen(port, () => {
  console.log(`A Crude Server listening on port ${port}`)
})
