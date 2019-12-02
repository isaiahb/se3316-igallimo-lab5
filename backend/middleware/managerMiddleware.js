
async function middleware(req, res, next) {

	if (req.user.manager)
		return next();
	else
		return res.status(401).send("unauthorized. only a manager can use this action");

}

module.exports = middleware;