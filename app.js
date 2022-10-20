import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import path from 'path'

import { UserController, CoinController, ProductController, OrdersUsersController } from './controllers/index.js'



const app = express()
const port = 3000

mongoose.connect('mongodb+srv://KolesN:HiThere@cluster0.z8bpk8z.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('DB connected'))
  .catch((e) => console.log('Error occured: ', err))


app.use(express.json())
app.use(cors())
app.use('/', express.static('./'))

app.get('/', function(req, res) {
  res.sendFile(path.join(path.resolve() + '/index.html'))
});


app.get('/user/:login', UserController.getUser, CoinController.getBalance, OrdersUsersController.getOrders, (req, res) => {
  res.json([req.userId, req.userBalance, req.userOrders])
})

app.get('/user', UserController.getAll)
// app.get('/user/:id', UserController.getOne)
app.post('/user', UserController.create)
// // app.patch('/user/:id', )
// // app.delete('/user/:id', )

app.get('/coin', CoinController.getAll)
// app.get('/coin/:id', CoinController.getOne)
app.post('/coin', CoinController.create)
// // app.patch('/coin/:id', )
app.delete('/coin/:id', CoinController.remove)

app.get('/product', ProductController.getAll)
// app.get('/product/:id', ProductController.getOne)
app.post('/product', ProductController.create)
// // app.patch('/product/:id', )
// // app.delete('/product/:id', )

app.get('/order', OrdersUsersController.getAll)
// app.get('/order', OrdersUsersController.getOne)
app.post('/order', OrdersUsersController.create)
// app.patch('/order', )
app.delete('/order/:id', OrdersUsersController.remove)



app.listen(port, console.log(`Serving at ${port}`))