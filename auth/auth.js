 const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const decoded = jwt.verify(token.split(" ")[1], 'masai')
            // console.log(decoded.foo) // bar
            if (decoded) {
                req.body.userID=decoded.userID;
                req.body.user=decoded.user;
                next();
            } else {
                res.send("please login!!!!")
            }
        } catch (err) {
            res.send({ "m": err.message })
        }
    } else {
        res.send("please login!!!")
    }
}

module.exports = {
    auth
}