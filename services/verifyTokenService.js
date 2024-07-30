const connectDB = require("../model/main.database");
const ORM = require("../model/CharlieDB");

const verifyTokenService = async (res, accessToken) => {
  var status = false;
  const queryDB = () => {
    return new Promise((resolve, reject) => {
      var sql = ORM.select("*", "tokens");
      connectDB.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  };

  var result = await queryDB();
  
  var tokenOk = result.find(
    (each) => each.token == accessToken && each.status == "new"
  );
  console.log(tokenOk,result);
  if (tokenOk) {
    status = true;
    markTicketAsUsed(accessToken);
  } else {
    res.status(401).json("Token has been used");
  }
  return status;
};

function markTicketAsUsed(accessToken) {
  var sql = ORM.update("tokens", "status", "used", "token", `${accessToken}`);
  connectDB.query(sql, (err, result) => {
    if (err) throw new Error("error updating DB to mark ticke as used: ", err);
  });
}

module.exports = verifyTokenService;
