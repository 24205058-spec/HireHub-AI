const app = require('./app');
const connectDB = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`HireHub AI Server listening on port ${PORT}`);
    console.log(`Admin SSR Reports available at http://localhost:${PORT}/api/admin/reports`);
  });
};

start();
