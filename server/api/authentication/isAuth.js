export default  function isAuth(req,res,next) {
    if (req.isAuthenticated()){
        return next();
    }
    else{
        return res.redirect('/authenticate/login');
    }
}