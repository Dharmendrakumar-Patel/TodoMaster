import connectDB from './database/database.js';
import { app } from './index.js';

// Connect to database
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.Node_ENV} mode`);
});