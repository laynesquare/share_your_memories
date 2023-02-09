import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET;

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //checking whether there is existing email
    const existingUser = await User.findOne({ email }).lean();

    if (!existingUser)
      return res.status(404).json({ message: 'user does not exist' }); //interception -- if the email isnt there, stop the code here.

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'invalide credentials ' }); //interception -- if the password is not right, stop the code here.

    //If the user wants to do anything, BE will check the token to allow the execution.
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secret,
      { expiresIn: '1h' }
    );

    delete existingUser.password;

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'sth when wrong' });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    //checking whether there is existing email
    const existingUser = await User.findOne({ email });

    //if yes, then return an error message
    if (existingUser)
      return res.status(400).json({ message: 'user already exists.' });

    //comparing passwords
    if (password !== confirmPassword)
      return res.status(400).json({ message: 'passwords dont match' });

    const hashedPassword = await bcrypt.hash(password, 12);

    //IMPORTANT!!! user ID is auto generated here, sent from the MongoDB (stored in result object)

    let result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    //generating token for FE usages
    //if the user wants to do anything, BE will check the token to allow the execution (validation via middleware)
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: '1h',
    });

    result = result.toObject();
    delete result.password;

    res.status(200).json({ result: result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
