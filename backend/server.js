const app = require('./app');
const dotenv = require('dotenv');

// Load environment variables from config.env
dotenv.config({ path: './config.env' });

const PORT = process.env.PORT;

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
