import jwt from 'jsonwebtoken';

const checkAuthentication = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'random#secret');
    if(decoded.role != 'User' && decoded.role != 'Employee'){
        res.status(404).json({success:false, message:"Your are not authenticated"})
    }
    next();
}
export {
    checkAuthentication
};