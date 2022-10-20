import OrdersUsersModel from '../models/OrdersUsers.js'

export const getAll = async (req, res) => {
  try {
    const ordersUserss = (await OrdersUsersModel.find({})).map(({ _doc }) => _doc).map(({ _id, __v, ...data }) => data)
    res.json(ordersUserss)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Could not get ordersUserss'
    })
  }
}

export const getOne = async (req, res) => {
  try {
    await OrdersUsersModel.findOne({
      id: req.params.id
    },
    (err, ordersUsers) => {
      if (err) {
        return res.status(500).json('Could not get ordersUsers')
      }

      if (!ordersUsers) {
        return res.status(404).json({
          message: 'ordersUsers not found'
        })
      }
      res.json(ordersUsers)
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Could not get ordersUsers'
    })
  }
}

export const create = async (req, res) => {
  try {
    const { body } = req
    const ordersUsersNew = new OrdersUsersModel({
      product_id: body.product_id,
      user_id: body.user_id,
    })

    const ordersUsers = await ordersUsersNew.save()
    res.json(ordersUsers)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Could not get ordersUsers'
    })
  }
}

export const getOrders = async (req, res, next) => {
  try {
    const userOrders = OrdersUsersModel.find({
      user_id: req.userId
    }, (err, orders) => {
      if (err) {
        console.log(err)
        return res.status(500).json({
          message: 'Could not get orders'
        })
      }

      if (!orders) {
        return res.status(404).json({
          message: 'Orders not found'
        })
      }
      const userOrders = orders.map(({ _doc }) => _doc ).reduce((acc, rec) => {
        return [...acc, rec.product_id]
      }, [])
      req.userOrders = userOrders
      next()
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Could not get orders'
    })
  }
}

export const remove = async (req, res) => {
  try {

    OrdersUsersModel.deleteMany({
      user_id: req.params.id
    }, (err, doc) => {
      if (err) {
        console.log(err)
        return res.status(500).json({
          message: 'Could not delete orders'
        })
      }

      if (!doc) {
        return res.status(404).json({
          message: 'Orders not found'
        })
      }

      res.json({
        message: 'Success'
      })
    })

  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Could not remode orders'
    })
  }
}