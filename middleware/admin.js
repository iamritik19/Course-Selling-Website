const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username=req.headers.username;
    const password=req.headers.password;
    const user=await Admin.findOne({
        username,password
    })
    if(user){
        next();
    }
    else{
    return res.status(400).json({
        "msg":"Your username or password is not correct"
    })
}
}

module.exports = adminMiddleware;