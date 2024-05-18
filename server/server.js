const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();

const app = express();

const tasksRoutes = require('./routes/tasks.js');
const usersRoutes = require('./routes/users.js');

app.use(cors({
    origin: ['https://taskify-orcin.vercel.app'],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}));
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next()
});
app.options('*', cors());

// Routes
app.use('/tasks',tasksRoutes);
app.use('/login',usersRoutes);

// Contecting to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then( () => {
        console.log("MongoDB Connected!");
        app.listen(process.env.PORT, () => {
            console.log('Server running on port http://localhost:'+process.env.PORT);
        });
    })
    .catch( (err) => {
        console.log(err);
    })