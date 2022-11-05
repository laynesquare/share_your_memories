import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

//wants to like a post
//click the like button => auth middleware(next) => like controller...

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

      console.log(req.userId, 'realshit');
    } else {
      // auto created JWT token by google login
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;

      console.log(req.userId, 'realshit');

      //sub is goolgeLogin's built-in function used to differentiate users
      //req body is altered here, meaning upon controllers, req.userId will be the assigned decodedData.id
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: 'no token' });
  }
};

export default auth;
