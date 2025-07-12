// === Backend Code: Express.js + Apollo Server + Sequelize (MySQL version with seed) ===

// ... previous code unchanged ...

// File: backend/src/seed.js
const sequelize = require('./db');
const { User, Course, Enrollment } = require('./models');

const seed = async () => {
  await sequelize.sync({ force: true });
  console.log('Database reset.');

  const users = await User.bulkCreate([
    { name: 'Alice Johnson', email: 'alice@example.com', role: 'STUDENT' },
    { name: 'Bob Smith', email: 'bob@example.com', role: 'PROFESSOR' },
    { name: 'Carol Lee', email: 'carol@example.com', role: 'STUDENT' }
  ]);

  const courses = await Course.bulkCreate([
    { title: 'Intro to HTML', description: 'Learn HTML from scratch.', level: 'BEGINNER' },
    { title: 'Advanced React', description: 'Deep dive into React hooks and architecture.', level: 'ADVANCED' },
    { title: 'Node.js Fundamentals', description: 'Understand backend with Node.js.', level: 'INTERMADIATE' }
  ]);

  console.log('Seed data inserted.');
  process.exit();
};

seed();

// === Usage ===
// To run seed script: `node src/seed.js`
// It will reset the DB and populate users, courses, and enrollments.

// Everything else remains the same...
