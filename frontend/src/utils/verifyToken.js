import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decodedToken;
  } catch (error) {
    console.log(error);
  }
};
