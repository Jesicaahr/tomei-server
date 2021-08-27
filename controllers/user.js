const { User } = require("../models")

class UserControllers {
    static async signUp(req, res, next) {
        const {name, email, password} = req.body;

        
        try{
            if(req.file == undefined) {
                return next({
                    name: "Bad Request",
                    errors: [{ message: "Please upload your avatar" }],
                });
            }
            let user = await User.create({
                name, 
                email, 
                password,
                imageUrl: `avatar/${req.file.filename}`
            })

            let result = {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.imageUrl
            }
            res.status(201).json({
				msg: "Successfully Sign Up",
				result,
			});
        }
        catch(err) {
            return next(err)
        }
    }
}

module.exports = UserControllers