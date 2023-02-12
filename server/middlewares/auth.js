import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const isCustomAuth = token.length < 500;
    let decodedData;

    if (token && isCustomAuth) {
      // manually created JWT token
      decodedData = jwt.verify(token, secret);
      // 1. req body is altered here. means upon controllers, req.userId will be decodedData.id assigned
      // 2. decodedData's id property has a value which is user ID (the ID auto generated by MongoDB)
      req.userId = decodedData?.id;
    } else {
      // auto created JWT token by google login
      decodedData = jwt.decode(token);
      //sub is goolgeLogin's built-in function used to differentiate users
      //req body is altered here, meaning upon controllers, req.userId will be the assigned decodedData.id
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: 'no token or token expired' });
  }
};

export default auth;