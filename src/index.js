const express = require('express');
const cors = require('cors');
const sendEmail = require('./Routes/POST/SendEmail.js');
const app = express();
const PORT = 4000;


app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['POST'],
    allowedHeaders: ['Content-Type', 'Authentication']
}))


app.use(sendEmail);


app.get('/', (req, res) => {
    res.send('hello world')
});

app.listen(PORT, (err) => {
    if(err){
        console.log(err, 'Error has occurred');
        return;
    }

    console.log(`Server is running on port ${PORT}`);   
})

module.exports = app;
