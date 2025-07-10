import { setupDatabase } from './src/config/database.js';
import app from './app.js';

const PORT = process.env.PORT || 8080;
setupDatabase();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});