"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/api/users"));
const profile_1 = __importDefault(require("./routes/api/profile"));
const posts_1 = __importDefault(require("./routes/api/posts"));
const auth_1 = __importDefault(require("./routes/api/auth"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/users', users_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/profile', profile_1.default);
app.use('/api/posts', posts_1.default);
if (process.env.NODE_ENV === 'production') {
    app.get('/', (req, res) => {
        app.use(express_1.default.static(path_1.default.join(__dirname, '/client/build')));
        res.sendFile(path_1.default.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
