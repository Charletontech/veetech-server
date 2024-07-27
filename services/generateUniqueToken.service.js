// models
const connectDB = require("../model/main.database");
const ORM = require("../model/CharlieDB");

// Function to generate a random token
function generateToken() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "VEE-";
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

// Function to check if the token already exists in the database
function checkIfTokenExists(token) {
  return new Promise((resolve, reject) => {
    const sql = ORM.select("*", "tokens");
    connectDB.query(sql, (err, result) => {
      if (err) {
        return reject(new Error("Error querying database for existing tokens"));
      }

      // Handle empty result set
      if (result.length === 0) {
        return resolve(false);
      }

      // Check if token exists
      const tokenExists = result.some((each) => each.token === token);
      resolve(tokenExists);
    });
  });
}

// Function to generate a unique token
async function generateUniqueToken() {
  let token;
  let tokenExists;

  do {
    token = generateToken();
    tokenExists = await checkIfTokenExists(token);
  } while (tokenExists);

  return token;
}

module.exports = generateUniqueToken;
