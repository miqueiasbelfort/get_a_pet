const User = require("../models/User")

const bcrypt = require("bcrypt")
const createUserToken = require("../helpers/create-user-token")

module.exports = class UserController {

    static async register(req, res){
        
        const {name, email, phone, password, confirmpassword} = req.body

        // validações
        if(!name){
            res.status(422).json({message: `O nome é Obrigatório`})
            return

        }else if(!email){
            res.status(422).json({message: `O email é Obrigatório`})
            return

        }else if(!phone){
            res.status(422).json({message: `O phone é Obrigatório`})
            return

        }else if(!password){
            res.status(422).json({message: `A senha é Obrigatório`})
            return

        }else if(!confirmpassword){
            res.status(422).json({message: `A cifirmação da senha é Obrigatório`})
            return
        }


        if(password !== confirmpassword){
            res.status(422).json({message: `A senha e a confirmação da senha não são iguas!`})
            return
        }

        //checando se o usuário já existe
        const userExiste = await User.findOne({email: email})

        if(userExiste){
            res.status(422).json({message: "Usuário já cadastrado!"})
            return
        }

        // criando a senha criptografada
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })

        try {

            const newUser = await user.save()
            await createUserToken(newUser, req, res)

        } catch(err) {
            res.status(500).json({message: err})
        }

    }

    static async login(req, res){

        const {email, password} = req.body

        if(!email){
            res.status((422)).json({message: "O email é obrigatório!"})
            return

        } else if (!password){
            res.status((422)).json({message: "A senha é obrigatória"})
            return
        }

        // checando se o usuário existe
        const user = await User.findOne({email: email})

        if(!user){
            res.status(422).json({
                message: "Esse usuário não existe!"
            })
            return
        }

        // checando a senha
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            res.status(422).json({
                message: "Senha invalida!"
            })
            return
        }

        await createUserToken(user, req, res)

    }

    static async checkUser(req, res){
        let currentUser

        console.log(req.headers.authorization)

        if(req.headers.authorization) {

            

        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }
}