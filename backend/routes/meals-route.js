const express= require('express')
const {check}= require('express-validator')
const router=express.Router();
const mealsControllers=require('../controllers/meals-controllers')
const checkAuth= require('../middleware/check-auth')

//改
const multer=require('multer')
const storage= multer.memoryStorage()
const upload=multer({storage:storage})



router.patch('/:mid/likePost',mealsControllers.likePost)
router.patch('/:mid/dislikePost',mealsControllers.dislikePost)

router.get('/:mid', mealsControllers.getMealById)

router.get('/user/:uid', mealsControllers.getMealsByUserId)

router.get('/',mealsControllers.getAllMeals)

router.use(checkAuth)

router.post(
    '/',
    upload.single('image'),
    [
        check('name').not().isEmpty(), 
        check('description').isLength({min:3})
    ],
    mealsControllers.createMeal
)


router.patch(
    '/:mid', 
    [
        check('name').not().isEmpty(), 
        check('description').isLength({min:3})
    ],
    mealsControllers.updateMealById)
router.delete('/:mid', mealsControllers.deleteMealById)



module.exports=router