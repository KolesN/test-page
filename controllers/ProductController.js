import ProductModel from '../models/Product.js'

export const getAll = async (req, res) => {
  try {
    const products = (await ProductModel.find({})).map(({ _doc }) => _doc).map(({ _id, __v, ...data }) => data)
    res.json(products)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Could not get products'
    })
  }
}

export const getOne = async (req, res) => {
  try {
    await ProductModel.findOne({
      id: req.params.id
    },
    (err, product) => {
      if (err) {
        return res.status(500).json('Could not get product')
      }

      if (!product) {
        return res.status(404).json({
          message: 'Product not found'
        })
      }
      res.json(product)
    })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Could not get product'
    })
  }
}

export const create = async (req, res) => {
  try {
    const { body } = req
    const productNew = new ProductModel({
      id: body.id,
      description: body.description,
      price: body.price,
    })

    const product = await productNew.save()
    res.json(product)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Could not get product'
    })
  }
}
