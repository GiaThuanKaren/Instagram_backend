const { UserService } = require("../../services/user/user.service");

const UserController = {
    followOrUnfollowUser: async function (req, res, next) {
        try {
            const BodyClient = req["body"];
            const ActionType = BodyClient["ACTION"];
            const IdUser = BodyClient["IDUSER"];
            const IdUserRequest = BodyClient["IDUSERREQ"]
            let result = await UserService.followOrUnfollowUser(IdUser, ActionType, IdUserRequest)
            res.json(result)
        } catch (error) {

        }
    },

}


module.exports = UserController