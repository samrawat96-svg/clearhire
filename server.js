const express = require('express');
const cors = require('cors');
const { DatabaseSync } = require('node:sqlite');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new DatabaseSync('clearhire.db');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT
  );

  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    company TEXT,
    location TEXT,
    salary TEXT,
    description TEXT,
    status TEXT DEFAULT 'Live'
  );

  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    job_id INTEGER,
    status TEXT DEFAULT 'Applied',
    match_score INTEGER
  );

  -- Insert some mock jobs if empty
  INSERT OR IGNORE INTO jobs (id, title, company, location, salary, status) VALUES 
  (1, 'Senior Product Designer', 'Stripe', 'Remote', '$140–180k', 'Live'),
  (2, 'UX Designer II', 'Airbnb', 'SF', '$120–150k', 'Live');
`);

// API Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const stmt = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?');
  const user = stmt.get(email, password);
  
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const stmt = db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)');
    const info = stmt.run(name, email, password, role);
    res.json({ success: true, userId: info.lastInsertRowid });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Email already exists' });
  }
});

app.get('/api/jobs', (req, res) => {
  const stmt = db.prepare('SELECT * FROM jobs');
  res.json(stmt.all());
});

app.post('/api/jobs', (req, res) => {
  const { title, company, location, salary, description } = req.body;
  const stmt = db.prepare('INSERT INTO jobs (title, company, location, salary, description) VALUES (?, ?, ?, ?, ?)');
  const info = stmt.run(title, company, location, salary, description);
  res.json({ success: true, jobId: info.lastInsertRowid });
});

app.get('/api/applications/:userId', (req, res) => {
  const stmt = db.prepare('SELECT applications.*, jobs.title, jobs.company, jobs.location FROM applications JOIN jobs ON applications.job_id = jobs.id WHERE user_id = ?');
  res.json(stmt.all());
});

app.post('/api/applications', (req, res) => {
  const { userId, jobId, matchScore } = req.body;
  const stmt = db.prepare('INSERT INTO applications (user_id, job_id, match_score) VALUES (?, ?, ?)');
  const info = stmt.run(userId, jobId, matchScore);
  res.json({ success: true, applicationId: info.lastInsertRowid });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
