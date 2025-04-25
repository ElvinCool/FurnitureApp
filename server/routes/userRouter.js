const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Публичные
router.post('/registration', userController.registration);
router.post('/login', userController.login);

// Защищённый
router.get('/auth', authMiddleware, userController.check);

module.exports = router;