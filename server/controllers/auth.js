
const User = require ('../models/user')

exports.createOrUpdateUser = async (req, res) => {
    const {displayName, picture, email } = req.user

    const user = await User.findOneAndUpdate({email : email}, {name : displayName, picture : picture}, { new: true})

    if(user){
        console.log("User Upadated:", user)
        res.json(user)
    }else{
        const newUser = await new User({
            email : email,
            name : displayName,
            picture : picture
        }).save();
        res.json(newUser)
        console.log("New User", newUser)
    }
}

