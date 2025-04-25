const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');

// Убедись, что обработчик для POST запроса существует
router.post('/', productController.create); // Маршрут для создания продукта
router.get('/', productController.getAll);   // Маршрут для получения всех продуктов
router.get('/:id', productController.getOne); // Маршрут для получения продукта по ID

module.exports = router;