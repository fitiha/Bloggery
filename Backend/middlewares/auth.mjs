import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    // console.log("auth header: ", authHeader);
    if (!authHeader)
        return res.json({ msg: "Authorization denied. No authorization header provided." });
    var token;
    if (authHeader.startsWith("Bearer ")) {
        // const token = authHeader.split(' ')[1];
        token = authHeader.substring(7, authHeader.length); // [ 7 , len )
    } else {
        return res.send("Can't find the token from the authorization header");
    }

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //returns the information you used to create the token (in this case the ID)
        req.user = decoded; // this is used for further authentication in the next step, by saying if(req.user)
        // console.log("decoded token: ", decoded); // gives us back the data we used to create the token
        // decoded token:  {
        //     userId: '65fc6a2ce9a773ce37508ac1',
        //     iat: 1711041781,
        //     exp: 1711041811
        //   }
        next();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};