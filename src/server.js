require("dotenv").config();

const express = require('express');
const app = express();
const db = require('./db/db_configuration');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/journal', (req,res)=>{
    db.query('SELECT * FROM posts;', (err,data)=>{
        if(err) {
            console.log(err);
            res.append("Content-Type", "plain/text");
            res.status(400).send("Oh noes an error has occurred!");
        } else {
            res.append("Content-Type", "application/json");
            res.json(data.rows);
        }
    })
});

app.post('/api/journal/', (req,res)=>{
    const {content} = req.body;

    db.query('INSERT INTO posts (content) VALUES ($1);', [content], (err,data)=>{
        if(err) {
            console.log(err)
            res.append('Content-Type', 'plain/text');
            res.status(400).send('An error has occurred!');
        } else {
            res.append('Content-Type', 'plain/text');
            res.status(200).send('Your post was successfully added!');
        }
    })
});

app.put('/api/journal/:id', (req,res)=>{
    const {content} = req.body;
    const {id} = req.params;

    db.query('UPDATE posts SET content=$1 WHERE id=$2;', [content, id], (err,data)=>{
        if(err) {
            res.append("Content-Type", "plain/text");
            res.status(400).send('Oh Noes an error has occurred!');
        } else {
            res.append('Content-Type', 'plain/text');
            res.status(200).send('Congrats your post was successfull updated!');
        }
    })
});

app.delete('/api/journal/:id', (req,res)=>{
    const {id} = req.params;

    db.query('DELETE FROM posts WHERE id=$1;', [id], (err,data)=>{
        if(err) {
            console.log(err);
            res.append('Content-Type', 'plain/text');
            res.status(400).send('Oh noes an error has occurred!');
        } else {
            res.append('Content-Type', 'plain/text');
            res.status(200).send('Congrats your post was successfully deleted!');
        }
    })
});

app.listen(process.env.PORT, () => {
    console.log('listening on Port 9000');
});