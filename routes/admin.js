const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin,Course}=require('../db/index');
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;
    Admin.create({
        username:username,
        password:password
    })
    .then(()=>{
    return res.status(201).json({
        msg:"Admin created successfully"
    })
})
    .catch(()=>{
        return res.status(400).json({
            msg:"Admin not created"
        })
    })
});

router.post('/courses', adminMiddleware,async (req, res) => {
    // Implement course creation logic
    const title=req.body.title;
    const description=req.body.description;
    const imageLink=req.body.imageLink;
    const price=req.body.price;
    console.log(title,description,imageLink,price)
    Course.create({
        title:title,
        description:description,
        imageLink:imageLink,
        price:price
    })
    .then((newCourse)=>{
       return res.status(201).json({
            msg:"Course created successfully",
            course_id:newCourse._id
        })
    })
        .catch(()=>{
            return res.status(400).json({
                msg:"course not created"
            })
        })
});

router.get('/courses', adminMiddleware,async (req, res) => {
    // Implement fetching all courses logic
    const courses=await Course.find({});
    console.log(courses)
    res.status(200).send(courses);
});

module.exports = router;