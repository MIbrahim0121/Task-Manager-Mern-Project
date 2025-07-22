const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const cors = require('cors')
const app = express()

// env config
dotenv.config()
// connect to mongodb
connectDB();


// middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", 
    credentials: true,
  })
);

// routes
app.get('/', (req, res) => 
  res.send('Hello World!'));
app.use('/api/v1/test', require('./routes/testRouter'));
app.use('/abt', require('./routes/abtRouter'));
app.use('/api/v1/users',require('./routes/userRoutes'));
app.use('/api/v1/todo', require('./routes/toDoRoutes')); // <-- Add this line



// port
const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${port}`);

})
