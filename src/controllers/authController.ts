import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import app from '../app';

app.post('/register', async (req, res) => {
    // const { username, email, password } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 12);
    //
    // const newUser = new User({
    //     username,
    //     email,
    //     password: hashedPassword,
    // });
    //
    // const user = await newUser.save();
    //
    // res.status(201).json({ message: 'User registered', user });
});

app.post('/login', async (req, res) => {
    // const { email, password } = req.body;
    //
    // const user = await User.findOne({ email });
    //
    // if (!user) {
    //     return res.status(404).json({ message: 'User not found' });
    // }
    //
    // const validPassword = await bcrypt.compare(password, user.password);
    //
    // if (!validPassword) {
    //     return res.status(400).json({ message: 'Invalid password' });
    // }
    //
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    //
    // res.json({
    //     message: 'Logged in successfully',
    //     token,
    //     user,
    // });
});

