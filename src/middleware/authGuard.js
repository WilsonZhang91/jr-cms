const { validateToken } = require("../utils/jwt");

module.exports = (req, res, next) => {
  const authorizationHeader = req.header("Authorization"); //req.headers.authorization
  if (!authorizationHeader) {
    //token missing
    return res.sendStatus(401);
  }
  //Bearer xxxxxxxx
  const tokenArray = authorizationHeader.split(" ");
  if (tokenArray.length !== 2 || tokenArray[0] !== "Bearer") {
    return res.sendStatus(401);
  }
  const decodePayload = validateToken(tokenArray[1]);
  if (!decodePayload) {
    return res.sendStatus(401);
  }
  //role
  // req.user = decodePayload
  //req.user.role  加一个adminGuard
  return next();
};
