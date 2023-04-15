
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, number, array ,boolean} from 'yup';
// test route for https://<PROJECTID>.api.codehooks.io/dev/
const listEntry = object({
  desc: string().required(),
  category:  string().required(),
  userId: string().required(),
  completed: boolean().default(false),
  createdOn: date().default(() => new Date()),
})

const userData = object({
  userId: string().required(),
  // array of strings
  categories: array().of(string()).required(),
})


app.get('/', (req, res) => {
  res.send('CRUD server ready')
})

// // Use Crudlify to create a REST API for any collection
// // crudlify(app)

// app.get('/hello', async (req, res) => {
//   const db = await Datastore.open();
//   // increment visit counter in key-value database
//   const visits  = await db.incr('hits', 1);
//   res.json({ "message": "Hello React world!", "visits": visits });
// });

crudlify(app, {listEntries: listEntry})


// bind to serverless runtime
export default app.init();
