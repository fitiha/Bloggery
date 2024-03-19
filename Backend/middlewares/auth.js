import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    console.log(req);
    const authHeader = req.headers["authorization"];
    if (!authHeader)
        return res.json({ msg: "Authorization denied. No authorization header provided." });
    var token;
    if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7, authHeader.length); // [ 7 , len )
    } else {
        return res.send("Can't find the token from the authorization header");
    }

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //returns the information you used to create the token (in this case the ID)
        req.user = decoded; // this is used for further authentication in the next step
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};