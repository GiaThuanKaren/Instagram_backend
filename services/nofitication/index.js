const NofiToken = require("../../models/NofiToken");
const MSG = require("../../utils/constant");


const UpdateToken = async function (idUser, Token, Action) {
    try {
        switch (Action) {
            case "INSERT": {
                await NofiToken.findOneAndUpdate({
                    idUser: idUser
                }, {
                    $addToSet: {
                        Token: Token
                    }
                }, {
                    upsert: true,
                    new: true
                })
                return MSG("Done");
            }
            case "DELETE": {
                await NofiToken.findOneAndUpdate({
                    idUser: idUser
                }, {
                    $pull: {
                        Token: Token
                    }
                })
                return MSG("Done");
            }
        }

    } catch (error) {
        return MSG("Error");
    }
}


module.exports = { UpdateToken }