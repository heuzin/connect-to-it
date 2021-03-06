import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import usersRoutes from './routes/api/users';
import profileRoutes from './routes/api/profile';
import postsRoutes from './routes/api/posts';
import authRoutes from './routes/api/auth';
import path from 'path';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postsRoutes);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
