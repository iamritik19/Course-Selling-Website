const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User}=require('../db/index');
const {Course}=require('../db/index');

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username=req.body.username;
    const password=req.body.password;
    User.create({
        username:username,
        password:password
    })
    .then(()=>{
    return res.status(201).json({
        msg:"user created successfully"
    })
})
    .catch(()=>{
        return res.status(400).json({
            msg:"user not created"
        })
    })
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
const allCourses=await Course.find({})
return res.status(200).send(allCourses);
});

router.post('/courses/:courseId',userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId=req.params.courseId;
    const username=req.headers.username;
    const userInfo=await User.findOneAndUpdate(
        {username:username},
        {$push:{purchasedCourses:courseId}}
    );
    if(userInfo){
        return res.status(201).json({
            "msg":`successfully purchased ${courseId}` 
        })
    }
   return res.status(400).json({
    "msg":"cannot complete purchase"
   })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const userInfo=await User.findOne({
        username:req.headers.username
    })
    const courses=await Course.find({
        _id:{
            "$in":userInfo.purchasedCourses
        }
    })
    res.status(400).send(courses);
});

module.exports = router