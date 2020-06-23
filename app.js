const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const students = [{"id": 1, "name": ["mac", "kane"], "grades": [{"cs4033": "A+"}]}]

// // GET /students - returns a list of all students
// // this endpoint, optionally, accepts query parameters
// app.get('/students', (req, res) => res.send(students))

// GET /students?search=<query> - returns a list of students filtered on name matching the given query
app.get('/students', (req, res) => {
    /* GET a user by their name */
    let name = req.query.search
    foundStudent = null

    for (var student of students) {
        for (var studentName of student.name) {
            if (studentName === name) {
                foundStudent = student
                break
            }
        }
    }
    console.log(req.query)

    if (Object.keys(req.query).length !== 0) {
        if (foundStudent !== null) {
            res.send(foundStudent)
        } else {
            res.send("No students exist witht the name '" + name + "'")
        }
    } else {
        res.send(students)
    }
})

// GET /students/:studentId - returns details of a specific student by student id
app.get('/students/:studentId', (req, res) => {
    /* GET a user by their id */
    let id = req.params.studentId
    id = parseInt(id)
    foundUser = null

    for (var student of students) {
        if (student.id === id) {
            foundUser = student
            break
        }
    }

    if (foundUser !== null) {
        res.send(foundUser)
    } else {
        res.send("cannot find StudentId '" + id + "'")
    }
})

// GET /grades/:studentId - returns all grades for a given student by student id
app.get('/grades/:studentId', (req, res) => {
    /* GET a user by their id */
    let id = req.params.studentId
    id = parseInt(id)
    foundUser = null

    for (var student of students) {
        if (student.id === id) {
            foundUser = student
            break
        }
    }

    if (foundUser !== null) {
        if (foundUser.grades !== []) {
            res.send(foundUser.grades)
        } else {
            res.send("No grades associated with studentId '" + studentId + "'")
        }
    } else {
        res.send("cannot find StudentID '" + id + "'")
    }
})

// POST /grades - records a new grade, returns success status in JSON response (meaning you do not need to actually store the grade in a database. 
// You do need to validate that the user supplied at least a grade, and a studentId)
app.post('/grades', (req, res) => {
    /* POST user data using the request body */
     let grade = req.body.grade
     let studentId = req.body.studentId

     // Validate supplied body
     var valid = true

     if (studentId === undefined) {
         valid = false
     }

     if (grade === undefined) {
        valid = false
    }

    if (valid) {
        res.send("valid grade input")
    } else {
        res.status(400).send("invalid input")
    }

})

// POST /register - creates a new user, returns success status in JSON response (meaning you do not need to actually store the user info in a database. 
// You do need to validate that the user supplied username and email)

app.post('/register', (req, res) => {
    /* POST user data using the request body */
    let username = req.body.username
    let email = req.body.email

     // Validate supplied body
     var valid = true

     if (username === undefined) {
         valid = false
     }

     if (email === undefined) {
        valid = false
    }

    if (valid) {
        res.send("valid register input")
    } else {
        res.status(400).send("invalid register input")
    }

})


const port = 3003
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
