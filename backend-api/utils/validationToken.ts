import { Request, Response, NextFunction } from "express";
import axios from "axios";
export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validation = await axios.get(
      "http://back-auth:4000/oauth/user/validate",
      {
        headers: {
          authorization: req.headers.authorization,
        },
      }
    );
    if (validation.data.valid) return next();
    res.status(401).send("Invalid Session");
  } catch (error) {
    console.log("error validation token");
    res.status(401).send("Invalid Session");
  }
};

//The url we want is `www.nodejitsu.com:1337/`
