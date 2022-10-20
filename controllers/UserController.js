import UserModel from '../models/User.js'

export const getAll = async (req, res) => {
  try {
    const users = await UserModel.find({})
    res.json(users)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Could not get users'
    })
  }
}

export const getOne = async (req, res) => {
  try {
    await UserModel.findOne({
      id: req.params.id
    },
    (err, user) => {
      if (err) {
        return res.status(500).json('Could not get user')
      }

      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        })
      }
      res.json(user)
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Could not get user'
    })
  }
}

export const create = async (req, res) => {
  try {
    const { body } = req
    const userNew = new UserModel({
      id: body.id,
      name: body.name,
      login: body.login,
      pass: body.pass
    })

    const user = await userNew.save()
    res.json(user)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: ''
    })
  }
}

export const getUser = async (req, res, next) => {
  try {
    const login = req.params.login
    UserModel.findOne({
      login
    },
    (err, user) => {
      if (err) {
        return res.status(500).json('Could not get user from db')
      }

      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        })
      }
      req.userId = user.id
      next()
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Could not get user'
    })
  }
}

// export const template = async (req, res) => {
//   try {

//   } catch (e) {
//     console.log(e)
//     res.status(500).json({
//       message: ''
//     })
//   }
// }