const Pet = require("../models/Pet")

//helpers
const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")

module.exports = class PetController {

    //criando um pet
    static async create(req, res){

        const {name, age, weight, color} = req.body

        const available = true


        // images upload
        const images = req.files

        // validação
        if(!name){
            res.status(422).json({message: "O nome é obrigatório!"})
            return
        }
        if(!age){
            res.status(422).json({message: "A idade é obrigatório!"})
            return
        }
        if(!weight){
            res.status(422).json({message: "O peso é obrigatório!"})
            return
        }
        if(!color){
            res.status(422).json({message: "A cor é obrigatória!"})
            return
        }
        if(images.length === 0){
            res.status(422).json({message: "A imagem é obrigatória!"})
            return
        }

        // pegando o dono do pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        //criando um pet
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })

        try {
            
            const newPet = await pet.save()
            res.status(201).json({
                message: "Pet cadastrado com sucesso!",
                newPet
            })

        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    //Pegando todos os pets e exibindo eles
    static async getAll(req, res){

        const pets = await Pet.find().sort("-createAt")

        res.status(200).json({
            pets: pets
        })

    }

    //Pegando todos os pet que eu mandei para a adoção
    static async getAllUserPets(req, res){

        //get user from token
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({'user._id': user._id}).sort("-createAt")

        res.status(200).json({pets})

    }

    //Pegando todos os pets que eu quero adotar
    static async getAllUserAdoptions(req, res){
        //get user from token
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({'adopter._id': user._id}).sort("-createAt")

        res.status(200).json({pets})
    }

}