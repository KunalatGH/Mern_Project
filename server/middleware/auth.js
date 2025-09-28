import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    // Access token
    const Token =
      req.cookies.accessToken || req.headers?.authorization?.split(" ")[1]; //['Bearer' ,'token']
    if (!Token) {
      return res.status(401).json({
        message: "Access token not found",
      });
    }
    const decode = await jwt.verify(Token, process.env.SECRET_KEY_ACCESS_TOKEN);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid access token",
        error: true,
        success: false,
      });
    }

    req.userId = decode.id;

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default auth;
