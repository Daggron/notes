import Express from 'express';
import Bcryptjs from 'bcryptjs';
import User from '../models/user.model';
const router = Express.Router();

router.route('/signup').post(async (req,res)=>{
    req.check('email','Email is not valid').isEmail();
    req.check('password','Minimum 4 Character are required for Password').isLength({min:4});

    let error = req.validationErrors();
    if (error){
        let err = error.map(er=>{
            return er.msg;
        })
       return  res.json({
            'error':err
        })
    }
    let user =await User.findOne({email:req.body.email});
    if(user){
        return res.json({
            message:"Email already Exists"
        })
    }
    else{
        let user = new User();
        user.email = req.body.email;
        let salt = await Bcryptjs.genSalt(10);
        let hash = await Bcryptjs.hash(req.body.password , salt);
        user.password = hash;
        user.save()
        .then(()=>{
            res.json({
                message : " User created successfully"
            })
        })
        .catch((err)=>{
            console.log(err);
            res.json({
                message:"Error while creating user"
            })
        })
    }
})


export default router;