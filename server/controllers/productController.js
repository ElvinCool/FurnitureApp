const uuid = require('uuid')
const path = require('path')
const {Product, ProductInfo} = require('../modules/modules')
const ApiError = require('../error/ApiError');

class productController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: product.id
                    })
                )
            }

            const product = await Product.create({name, price, brandId, typeId, img: fileName});

            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {brandId, categoryId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products;
        if (!brandId && !categoryId) {
            products = await Product.findAndCountAll({limit, offset})
        }
        if (brandId && !categoryId) {
            products = await Product.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && categoryId) {
            products = await Product.findAndCountAll({where:{categoryId}, limit, offset})
        }
        if (brandId && categoryId) {
            products = await Product.findAndCountAll({where:{categoryId, brandId}, limit, offset})
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }
}

module.exports= new productController()