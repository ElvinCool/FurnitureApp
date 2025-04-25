const {Brand} = require('../modules/modules')
const ApiError = require('../error/ApiError');

class brandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async getALL(req, res) {
        const brands =await Brand.findAll()
        return res.json(brands)
    }
}

module.exports= new brandController()