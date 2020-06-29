const express = require('express');
const router = express.Router();
const controller = require('../controllers/lesson.controller.js')
const authUserMiddleware = require('../middlewares/auth-user.middleware')
const authAdminMiddleware = require('../middlewares/auth-admin.middleware')
const validateLesson = require('../validate/lesson.validate')


router.get('/', controller.index);
router.post('/newLesson', authUserMiddleware.requireAuth, authAdminMiddleware.requireAuthAdmin, validateLesson.validateLessonInput, validateLesson.postCreate, controller.postCreate);
router.delete('/:id', authUserMiddleware.requireAuth, authAdminMiddleware.requireAuthAdmin, controller.delete);
router.put('/updateLesson/:id', authUserMiddleware.requireAuth, authAdminMiddleware.requireAuthAdmin, controller.update);

module.exports = router;