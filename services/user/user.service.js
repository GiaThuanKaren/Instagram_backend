const User = require("../../models/User")
const MSG = require("../../utils/constant")

const UserService = {
    followOrUnfollowUser: async function (IdUser, ActionType, IdUserRequest) {
        try {
            switch (ActionType) {
                case "INSERT": {
                    await User.findByIdAndUpdate(IdUser, {
                        $addToSet: {
                            following: IdUserRequest
                        }
                    })
                    return MSG("Done");


                }

                case "DELETE": {
                    await User.findByIdAndUpdate(IdUser, {
                        $pull: {
                            following: IdUserRequest
                        }
                    })
                    return MSG("Done");
                }
            }
        } catch (error) {

        }
    }
}

module.exports = { UserService }