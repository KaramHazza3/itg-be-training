import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function authenticateToken(req, res, next) {

    const token = req.cookies.token;
    if (!token) {
      res.locals.user = null
      return res.redirect('/login');
    }
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = verified;
      res.locals.user = verified;
      next();
    } catch (err) {
      console.log(err);
      res.clearCookie('token');
      return res.redirect('/login');
    }
  }

  export default authenticateToken;
