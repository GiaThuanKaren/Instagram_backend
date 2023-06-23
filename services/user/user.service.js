const Following = require("../../models/Following")
const User = require("../../models/User")
const MSG = require("../../utils/constant")

const UserService = {
    followOrUnfollowUser: async function (IdUser, ActionType, IdUserRequest) {
        try {
            switch (ActionType) {
                case "INSERT": {
                    console.log("Follow")
                    await Following.findOneAndUpdate({
                        idUser: IdUser
                    }, {
                        $addToSet: {
                            idUserFollowing: IdUserRequest
                        }
                    }, {
                        upsert: true,
                        new: true
                    })
                    return MSG("Done");


                }

                case "DELETE": {
                    console.log("UnFollow")
                    await Following.findOneAndUpdate({
                        idUser: IdUser
                    }, {
                        $pull: {
                            idUserFollowing: IdUserRequest
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