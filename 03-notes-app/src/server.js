const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/notes', require('./routes/note.routes'));

app.get('/', (req, res) => res.json({ message: 'Notes App API is running 🚀' }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error('❌ DB Error:', err));
