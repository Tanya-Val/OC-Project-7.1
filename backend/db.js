/*require('dotenv').config();

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});
module.exports = connection;*/

require('dotenv').config();
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

(async function updateOrCreateTables() {
  try {
    const pool = await connection.getConnection();

    // Create or update "users" table
    const [usersRows] = await pool.query('SHOW TABLES LIKE "users"');
    if (usersRows.length === 0) {
      console.log('Creating users table...');
      await pool.query(`
        CREATE TABLE users (
          userID INT NOT NULL AUTO_INCREMENT,
          name VARCHAR(60) NOT NULL,
          email VARCHAR(60) NOT NULL,
          password VARCHAR(60) NOT NULL,
          bio VARCHAR(500) DEFAULT NULL,
          PRIMARY KEY (userID),
          UNIQUE KEY email_UNIQUE (email)
        )
      `);
    } else {
      console.log('Dropping users table...');
      await pool.query('DROP TABLE users');
      console.log('Creating users table...');
      await pool.query(`
        CREATE TABLE users (
          userID INT NOT NULL AUTO_INCREMENT,
          name VARCHAR(60) NOT NULL,
          email VARCHAR(60) NOT NULL,
          password VARCHAR(60) NOT NULL,
          bio VARCHAR(500) DEFAULT NULL,
          PRIMARY KEY (userID),
          UNIQUE KEY email_UNIQUE (email)
        )
      `);
    }

    // Create or update "posts" table
    const [postsRows] = await pool.query('SHOW TABLES LIKE "posts"');
    if (postsRows.length === 0) {
      console.log('Creating posts table...');
      await pool.query(`
        CREATE TABLE posts (
          postID INT NOT NULL AUTO_INCREMENT,
          userID INT NOT NULL,
          name VARCHAR(60) NOT NULL,
          media LONGBLOB,
          title VARCHAR(45) NOT NULL,
          created_date DATETIME NOT NULL,
          updated_date DATETIME NOT NULL,
          readBy VARCHAR(45) NOT NULL,
          PRIMARY KEY (postID),
          KEY userID_idx (userID),
          CONSTRAINT userID FOREIGN KEY (userID) REFERENCES users (userID)
        )
      `);
    } else {
      console.log('Dropping posts table...');
      await pool.query('DROP TABLE posts');
      console.log('Creating posts table...');
      await pool.query(`
        CREATE TABLE posts (
          postID INT NOT NULL AUTO_INCREMENT,
          userID INT NOT NULL,
          name VARCHAR(60) NOT NULL,
          media LONGBLOB,
          title VARCHAR(45) NOT NULL,
          created_date DATETIME NOT NULL,
          updated_date DATETIME NOT NULL,
          readBy VARCHAR(45) NOT NULL,
          PRIMARY KEY (postID),
          KEY userID_idx (userID),
          CONSTRAINT userID FOREIGN KEY (userID) REFERENCES users (userID)
        )
      `);
    }

    // Create or update "comments" table
    const [commentsRows] = await pool.query('SHOW TABLES LIKE "comments"');
    if (commentsRows.length === 0) {
      console.log('Creating comments table...');
      await pool.query(`
        CREATE TABLE comments (
          commentID INT NOT NULL AUTO_INCREMENT,
          postID INT NOT NULL,
          userID INT NOT NULL,
          name VARCHAR(60) NOT NULL,
          comment VARCHAR(1000) NOT NULL,
          created_date DATETIME NOT NULL,
          modified_date DATETIME NOT NULL,
          PRIMARY KEY (commentID),
          UNIQUE KEY commentID_UNIQUE (commentID),
          UNIQUE KEY postID_UNIQUE (postID),
          UNIQUE KEY userID_UNIQUE (userID),
          CONSTRAINT fk_comments_posts FOREIGN KEY (postID) REFERENCES posts (postID),
          CONSTRAINT fk_comments_users FOREIGN KEY (userID) REFERENCES users (userID)
        )
      `);
    } else {
      console.log('Dropping comments table...');
      await pool.query('DROP TABLE comments');
      console.log('Creating comments table...');
      await pool.query(`
        CREATE TABLE comments (
          commentID INT NOT NULL AUTO_INCREMENT,
          postID INT NOT NULL,
          userID INT NOT NULL,
          name VARCHAR(60) NOT NULL,
          comment VARCHAR(1000) NOT NULL,
          created_date DATETIME NOT NULL,
          modified_date DATETIME NOT NULL,
          PRIMARY KEY (commentID),
          UNIQUE KEY commentID_UNIQUE (commentID),
          UNIQUE KEY postID_UNIQUE (postID),
          UNIQUE KEY userID_UNIQUE (userID),
          CONSTRAINT fk_comments_posts FOREIGN KEY (postID) REFERENCES posts (postID),
          CONSTRAINT fk_comments_users FOREIGN KEY (userID) REFERENCES users (userID)
        )
      `);
    }

    console.log('Tables "users", "posts", and "comments" updated or created successfully.');
    pool.release();
  } catch (error) {
    console.error('Error updating or creating tables:', error);
  } finally {
    connection.end();
  }
})();

