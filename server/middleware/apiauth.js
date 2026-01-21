

const apiAuth = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }
    // Verify the token
    const privateKey = process.env.PRIVATEKEY;
    jwt.verify(token, privateKey, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized!" });
      } else {
        req.user = decoded;
        next();
      }
    });
}

module.exports = apiAuth;