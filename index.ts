import express from 'express';
import connectDB from './config/db';
import usersRoutes from './routes/api/users';
import profileRoutes from './routes/api/profile';
import postsRoutes from './routes/api/posts';
import authRoutes from './routes/api/auth';

const app = express();

connectDB();
app.use(express.json());

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
