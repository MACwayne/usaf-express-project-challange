const express = require('express')
const app = express()
const users = require('./users.json')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/:id', (req, res) => {
    /* GET a user by their id */
    let id = req.params.id
    id = parseInt(id)
    foundUser = null

    for (var user of users) {
        if (user.id === id) {
            foundUser = user
            break
        }
    }

    if (foundUser !== null) {
        res.send(foundUser)
    } else {
        res.send("cannot find user")
    }
})

app.post('/', (req, res) => {
    /* POST user data using the request body */
    // let id = req.body.userid

    // create new ID based off highest ID found + 1
    var maxID = 0
    for (var user of users) {
        
        if (user.id > maxID) {
            maxID = user.id
        }
    }
    var id = maxID + 1

    var newPerson = req.body
    newPerson['id'] = id

    console.log(newPerson)

    if (newPerson !== null) {
        res.send(newPerson)
    } else {
        res.send("cannot post new user data")
    }
})

app.get('/?', (req, res) => {
    /* GET a user by their name */
    let name = req.query.name
    foundUser = null

    for (var user of users) {
        for (var userName of user.name) {
            if (userName === name) {
                foundUser = user
                break
            }
        }
    }

    if (foundUser !== null) {
        res.send(foundUser)
    } else {
        res.send("cannot find user")
    }
})

// app.get('/', (req, res) => res.send(users))

const port = 3002
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))