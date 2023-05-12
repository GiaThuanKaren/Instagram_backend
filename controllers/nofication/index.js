const { UpdateToken } = require("../../services/nofitication");


const NoficationController = {
    updateToken: async function (req, res, next) {
        try {
            const BodyClient = req.body;
            const action = BodyClient["ACTION"];
            const TOKENP = BodyClient["TOKEN"];
            const idUser = BodyClient["IDUSER"];
            let result = await UpdateToken(idUser, TOKENP, action);
            res.json(result)
        } catch (error) {

        }
    }
}


module.exports = NoficationController