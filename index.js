const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const PORT = 5001
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


const url = 'mongodb+srv://skanderlassoued:09101996Sk@cluster0.njcpm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const connectionParams = {
    useNewUrlParser: true,


}

mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })



const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    mail: String,
    password: String,
})

const User = new mongoose.model('User', userSchema)

// Routes
app.get('/', (req, res) => {

})

app.post('/register', (req, res) => {
    const { firstName, lastName, mail, password } = req.body
    User.findOne({ mail: mail }, (err, user) => {
        if (user) {
            res.send({ message: "Already exists" })
        } else {
            const user = new User({
                firstName,
                lastName,
                mail,
                password
            })
            user.save(err => {
                if (err) {
                    res.send('ERROR', err)
                } else {
                    res.send({ message: "Successfully Registered, Please login now." })
                }
            })

        }
    })

})

app.post('/login', (req, res) => {
    const { mail, password } = req.body
    User.findOne({ mail: mail }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login successfully", user: user })
            } else {
                res.send({ message: "Password is false" })
            }

        } else {
            res.send({ message: "User not found" })
        }
    })
})


app.listen(PORT, () => {
    console.log(`SERVER STARTED ON ${PORT}`);
})