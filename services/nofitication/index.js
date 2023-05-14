const NofiToken = require("../../models/NofiToken");
const MSG = require("../../utils/constant");

// require("fi")
const admin = require("firebase-admin")

const serviceAccount = require("./serviceAccount.json");
const mongoose = require("mongoose");
const User = require("../../models/User");


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

const SendMessage = async function (idUSer, msg, idparent) {
    console.log(idUSer)
    try {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            })
        }


        let UserFound = (await mongoose.connection.db.collection("User").find().toArray()).find((item) => {
            return item._id == idUSer
        })

        let Tokens = await NofiToken.findOne({
            idUser: idUSer
        })
        console.log(Tokens)
        let messageArr = Tokens.Token.map((item, index) => {
            if (idparent == "") {
                return {
                    notification: {
                        title: "Instagram Nofitication",
                        body: `${UserFound["name"]} Has Commented On Your Post `,
                    },
                    token: item
                };
            } else {
                return {
                    notification: {
                        title: "Instagram Nofitication",
                        body: `${UserFound["name"]} Has Replied Your Comment `,
                    },
                    token: item
                };
            }

        })
        const message = {
            notification: {
                title: "Gia THuan ",
                body: msg,
            },
            token: Tokens.Token
        };

        let result = await admin.messaging().sendEach(messageArr);


        return "klsjdnlkfds"
    } catch (error) {
        console.log(error)
        throw error
    }


}



module.exports = { SendMessage, UpdateToken }