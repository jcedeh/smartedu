import dotenv from 'dotenv';
import app from './app.js'
import { connectDB } from './src/config/db.js';

dotenv.config()
const PORT = process.env.PORT

//connect database
connectDB();

console.log('=== ENV DEBUG ===');
console.log('MONGO_URL:', process.env.MONGO_URL);
console.log('PORT:', process.env.PORT);
console.log('=================');



//create server
app.listen(process.env.PORT, ()=> {
    console.log(`server listening on localhost:${PORT}`)
})

