const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if(err){
            return res.status(404).json({
                success: "Success",
                message: "User Not Found",
              });
        }
        req.body.userId = decode.userId;
        next();
    })
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: "Failed",
      message: "Auth Failed",
    });
  }
};
