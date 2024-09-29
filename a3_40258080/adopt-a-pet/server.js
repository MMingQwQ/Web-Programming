const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5055;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));


app.get('/', (req, res) => {
    res.render('home', {
        loggedin: req.session.loggedin,
        username: req.session.username
    });
});

app.get('/create-account', (req, res) => {
    res.render('create-account',{
        loggedin: req.session.loggedin,
        username: req.session.username
    });
});

app.post('/create-account', (req, res) => {
    const { username, password } = req.body;

    fs.readFile('login.txt', 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') { // If the file does not exist
                const newUser = `${username}:${password}\n`;
                fs.appendFile('login.txt', newUser, (err) => {
                    if (err) {
                        res.send(`<script>alert("Error creating account."); window.location = '/create-account';</script>`);
                    } else {
                        res.send(`<script>alert("Create an account successfully! You can sign in now :)"); window.location = '/sign-in';</script>`);
                    }
                });
            }
        } else {
            const users = data.split('\n').map(line => line.split(':'));
            const userExists = users.find(([user, _]) => user === username);

            if (userExists) {
                res.send(`<script>alert('Username already exists. Please choose another one.'); window.location = '/create-account';</script>`);
            } else {
                const newUser = `${username}:${password}\n`;
                fs.appendFile('login.txt', newUser, (err) => {
                    if (err) {
                        res.send(`<script>alert("Error creating account."); window.location = '/create-account';</script>`);
                    } else {
                        res.send(`<script>alert("Create an account successfully! You can sign in now :)"); window.location = '/sign-in';</script>`);
                    }
                });
            }
        }
    });
});

app.get('/sign-in', (req, res) => {
    if (req.session.loggedin) {
        // If the user is already logged in, alert them and redirect.
        res.send(`<script>alert("You have already signed in."); window.location = '/';</script>`);
    } else {
        // Render the sign-in page if the user is not logged in.
        res.render('sign-in', {
            loggedin: false,
            username: 'Guest'
        });
    }
});

app.post('/sign-in', (req, res) => {
    if (req.session.loggedin) {
        // If the user is already logged in, redirect them with a message.
        res.send(`<script>alert("You are already logged in."); window.location = '/';</script>`);
        return;
    }

    const { username, password } = req.body;
    fs.readFile('login.txt', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading user data: ", err);
            res.send(`<script>alert("Error reading user data."); window.location = '/sign-in';</script>`);
            return;
        }

        const users = data.trim().split('\n');
        const userExists = users.find(user => user === `${username}:${password}`);

        if (userExists) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/');
        } else {
            res.send(`<script>alert("Incorrect Username or Password!"); window.location = '/sign-in';</script>`);
        }
    });
});


app.get('/sign-out', (req, res) => {
    if (req.session.loggedin) {
        // If user is logged in, destroy the session and redirect to home with a success message
        req.session.destroy((err) => {
            if (err) {
                console.error("Failed to destroy the session", err);
                res.send(`<script>alert("Error signing out. Please try again."); window.location = '/';</script>`);
            } else {
                res.send(`<script>alert("You have successfully signed out."); window.location = '/';</script>`);
            }
        });
    } else {
        // If no user is logged in, redirect to the sign-in page
        res.send(`<script>alert("You are not currently signed in. Please sign in first."); window.location = '/sign-in';</script>`);
    }

});

app.get('/cat-care', (req, res) => {
    res.render('cat-care',{
        loggedin: req.session.loggedin,
        username: req.session.username
    });
});

app.get('/contact', (req, res) => {
    res.render('contact',{
        loggedin: req.session.loggedin,
        username: req.session.username
    });
});

app.get('/dog-care', (req, res) => {
    res.render('dog-care',{
        loggedin: req.session.loggedin,
        username: req.session.username
    });
});


app.get('/giveaway-pet', (req, res) => {
    if (req.session.loggedin) {
        res.render('giveaway-pet',{
        loggedin: req.session.loggedin,
        username: req.session.username
    });
    } else {
        // If no user is logged in, redirect to the sign-in page
        res.send(`<script>alert("You are not currently signed in. Please sign in first."); window.location = '/sign-in';</script>`);
    }
});

app.post('/giveaway-pet', (req, res) => {
const username = req.session.username; 

const {
    pet_type,
    breed,
    age,
    gender,
    compatibility, // This will be an array if multiple checkboxes are checked
    comments,
    owner_name,
    owner_email
} = req.body;

const compatibilityStr = compatibility ? compatibility.join(', ') : '';

const petInfoFilePath = 'pets.txt';

fs.readFile(petInfoFilePath, 'utf8', (err, data) => {
    const fileExists = !err;

    // Parse existing records and determine the new ID
    const lines = data ? data.trim().split('\n') : [];
    const lastId = lines.length > 0 ? parseInt(lines[lines.length - 1].split(':')[0]) : 0;
    const newId = lastId + 1;

    // Construct the new pet record
    const petRecord = [
        newId,
        username,
        pet_type,
        breed,
        age,
        gender,
        compatibilityStr,
        comments.replace(/(\r\n|\n|\r)/gm, " "), // Remove new lines for file format consistency
        owner_name,
        owner_email
    ].join(':');

    // If the file doesn't exist, fs.appendFile will create it and write the record
    // If it exists, it will just append the record
    const writeData = fileExists ? '\n' + petRecord : petRecord; // Avoid adding an extra newline if the file is new
    fs.appendFile(petInfoFilePath, writeData, (err) => {
        if (err) {
            console.error("Error writing to pets data: ", err);
            return res.status(500).send('Error saving pet information.');
        }
        res.send(`<script>alert("Submit successfully. Now back to Home Page"); window.location = '/';</script>`);
    });
});
});

app.get('/pets', (req, res) => {
    res.render('pets',{
        loggedin: req.session.loggedin,
        username: req.session.username
    });
});

app.get('/find-pet', (req, res) => {
    res.render('find-pet',{
        loggedin: req.session.loggedin,
        username: req.session.username
    });
});

app.post('/find-pet', (req, res) => {
    const { pet_type, breed, age, gender, compatibility } = req.body;
    const petInfoFilePath = 'pets.txt';

    fs.readFile(petInfoFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading pets data: ", err);
            return res.status(500).send(`<script>alert("Error accessing pet data."); window.location = '/find-pet';</script>`);
        }

        const compatibilityArray = compatibility ? (Array.isArray(compatibility) ? compatibility : [compatibility]) : [];

        // Filter for matching pets
        const lines = data.trim().split('\n');
        const matches = lines.filter(line => {
            const parts = line.split(':');
            const type = parts[2];
            const brd = parts[3];
            const ag = parts[4];
            const gndr = parts[5];
            const comp = parts[6];

            return (pet_type === 'doesnt_matter' || pet_type === type) &&
                   (breed === 'doesnt_matter' || breed === brd) &&
                   (age === 'doesnt_matter' || age === ag) &&
                   (gender === 'doesnt_matter' || gender === gndr) &&
                   (compatibilityArray.length === 0 || compatibilityArray.some(compItem => comp.includes(compItem)));
        });

        if (matches.length > 0) {
            // Map matches to model objects
            const pets = matches.map(line => {
                const [id, username, type, brd, ag, gndr, comp, comments, owner_initials, owner_email] = line.split(':');
                return { id, username, type, breed: brd, age: ag, gender: gndr, compatibility: comp, comments, owner_initials, owner_email };
            });
            // Render a page to display the pets
            res.render('pets', {loggedin: req.session.loggedin,
                username: req.session.username, pets });
        } else {
            // No matches found, alert and redirect
            res.send(`<script>alert("No pets found matching the criteria."); window.location = '/find-pet';</script>`);
        }
    });
});

app.get('/privacy', (req, res) => {
    res.render('privacy',{
        loggedin: req.session.loggedin,
        username: req.session.username
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://soen287.encs.concordia.ca:${PORT}`);
});