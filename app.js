const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/user');
const methodOverride = require('method-override');

dotenv.config({ path: './.env' });

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use(methodOverride('_method'));

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

.then(() => console.log("MongoDB is connected"));

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');



app.get('/', async (req, res) => {
    try {
        const users = await User.find();

        res.render('index', {
            data: users
        })

    } catch (error) {
        
    }
    res.send('<h1>Home Page</h1>');
});

app.get('register', (req, res) => {
    res.render('register');
});

app.post('/register/user', async (req, res) => {
    console.log(req.body);
    const name = req.body.user_name;
    const email = req.body.user_email;
    const password = req.body.user_password;
    try {
        const newUser = await User.create({
            name: name,
            email: email,
            password: password
        })
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            status: error.message

        });
        res.send('<h1>User Registered</h1>');
    }
});

app.put('/edit/:id', async (req, res) => {
    const userId = req.params.id;

    const user = await User.findById(userID);

    res.render('edit', {
        data: user
    })
})

app.put('/edit/:id/success', async (req, res) => {
    const userId = req.params.id;

    const userUpdate = await User.findByIdAndUpdate(userId, {
        name: req.body.user_name,
        email: req.body.user_email,
        password: req.body.user_password
    });

    res.status(200).send('<h1>user updated</h1>')
});

app.delete('/delete/:id', async (req, res) => {
    const userId = req.params.id;

    const userToDelete = await User.findByIdAndRemove(userId);

    res.send('<h1>user deleted</h1>');
})
    
app.listen(5000, (req, res) => {
    console.log("server is running on port 5000");
})