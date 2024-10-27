const app = require('./app');
const dotenv = require('dotenv');

try {
   dotenv.config({ path: './config.env' });
} catch (error) {
   console.log('error server.js', error);
}
// Load environment variables from config.env

const PORT = process.env.PORT;

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
