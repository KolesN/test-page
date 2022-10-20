import CoinModel from '../models/Coin.js'

export const getAll = async (req, res) => {
  try {
    const coins = (await CoinModel.find({})).map(({ _doc }) => _doc).map(({ _id, __v, ...data }) => data)
    res.json(coins)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Could not get coins'
    })
  }
}

export const getOne = async (req, res) => {
  try {
    await CoinModel.findOne({
      id: req.params.id
    },
    (err, coin) => {
      if (err) {
        return res.status(500).json('Could not get coin')
      }

      if (!coin) {
        return res.status(404).json({
          message: 'Coin not found'
        })
      }
      res.json(coin)
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Could not get coin'
    })
  }
}

export const create = async (req, res) => {
  try {
    const { body } = req
    const coinNew = new CoinModel({
      id: body.id,
      user_id: body.user_id,
      price: body.price,
      action: body.action
    })

    const coin = await coinNew.save()
    res.json(coin)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: ''
    })
  }
}

export const getBalance = async (req, res, next) => {
  try {
    const balance = (await CoinModel.aggregate(
      [
        {
          $match: {
            user_id: req.userId
          }
        },
        {
          $group: {
            _id: "$action",
            price: { $first: "$price" }
          }
        }
      ]
    )).reduce((acc, rec) => {
      return acc + rec.price
    }, 0)

    req.userBalance = balance

    next()
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Error ocured'
    })
  }
}

export const remove = async (req, res) => {
  try {

    CoinModel.findOneAndDelete({
      id: req.params.id
    }, (err, doc) => {
      if (err) {
        console.log(err)
        return res.status(500).json({
          message: 'Could not delete coin'
        })
      }

      if (!doc) {
        return res.status(404).json({
          message: 'Coins not found'
        })
      }

      res.json({
        message: 'Success'
      })
    })

  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Could not remove coin'
    })
  }
}