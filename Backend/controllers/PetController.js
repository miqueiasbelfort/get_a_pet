const Pet = require("../models/Pet")

//helpers
const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")
const ObjectId = require("mongoose").Types.ObjectId

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

    // rota para informações do pet
    static async getPetById(req, res){

        const id = req.params.id

        //verificar se o id e valido
        if(!ObjectId.isValid(id)){
            res.status(422).json({message: "ID invalido!"})
            return
        }

        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({message: "Pet não encontrado!"})
            return
        }

        res.status(200).json({pet: pet})

    }

    //Rotas de remover pets
    static async removePetById(req, res){
        const id = req.params.id

        //verificar se o id e valido
        if(!ObjectId.isValid(id)){
            res.status(422).json({message: "ID invalido!"})
            return
        }

        // checando se o pet existe
        const pet = await Pet.findOne({_id: id})

        if(!pet) {
            res.status(404).json({message: "Pet não encontrado!"})
            return
        }

        //Se é o usuário que cadastrou o pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()) { // Se o id do user dentro de pet for diferente ao id do usuário que foi pego pelo token
            res.status(422).json({message: "Houve um problema em processar a sua solicitação, tente novamente!"})
            return
        }

        //deletar pet
        await Pet.findByIdAndRemove(id)
        res.status(200).json({message: "Pet removido com sucesso!"})

    }

    //Atualizando o pet
    static async updatePet(req, res){

        const id = req.params.id

        const {name, age, weight, color, available} = req.body
        // images upload
        const images = req.files

        const updatedData = {}

        //verificar se o id e valido
        if(!ObjectId.isValid(id)){
            res.status(422).json({message: "ID invalido!"})
            return
        }

        // checando se o pet existe
        const pet = await Pet.findOne({_id: id})

        if(!pet) {
            res.status(404).json({message: "Pet não encontrado!"})
            return
        }

        //Se é o usuário que cadastrou o pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()) { // Se o id do user dentro de pet for diferente ao id do usuário que foi pego pelo token
            res.status(422).json({message: "Houve um problema em processar a sua solicitação, tente novamente!"})
            return
        }

        // validação
        if(!name){
            res.status(422).json({message: "O nome é obrigatório!"})
            return
        } else {
            updatedData.name = name
        }

        if(!age){
            res.status(422).json({message: "A idade é obrigatório!"})
            return
        } else {
            updatedData.age = age
        }

        if(!weight){
            res.status(422).json({message: "O peso é obrigatório!"})
            return
        } else {
            updatedData.weight = weight
        }

        if(!color){
            res.status(422).json({message: "A cor é obrigatória!"})
            return
        } else {
            updatedData.color = color
        }

        if(images.length > 0){
            updatedData.images = [] 
            images.map(image => { //Percorer o array e adicionar a image nele um por vez
                updatedData.images.push(image.filename)
            })
        }

        await Pet.findByIdAndUpdate(id, updatedData)
        res.status(200).json({message: "Pet atualizado com sucesso!"})
    }

    //Marcar agendamento
    static async schedule(req, res){

        const id = req.params.id

        // checando se o pet existe
        const pet = await Pet.findOne({_id: id})

        if(!pet) {
            res.status(404).json({message: "Pet não encontrado!"})
            return
        }

        //Se é o usuário que cadastrou o pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.equals(user._id)) { // Se o id do user dentro de pet for diferente ao id do usuário que foi pego pelo token
            res.status(422).json({message: "Você não pode agendar uma visita com seu proprio Pet!"})
            return
        }


        // checando se o usuário já agendou a visita
        if(pet.adopter) {
            if(pet.adopter._id.equals(user._id)){
                res.status(422).json({message: "Você já agendou uma visita para esse Pet!"})
                return
            }
        }

        // adicionar usuário como adotante do pet
        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image
        }

        await Pet.findByIdAndUpdate(id, pet)
        res.status(200).json({
            message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`
        })

    }

    //Concluizão da adoção
    static async concludeAdoption(req, res){

        const id = req.params.id

        // checando se o pet existe
        const pet = await Pet.findOne({_id: id})

        if(!pet) {
            res.status(404).json({message: "Pet não encontrado!"})
            return
        }

        //Se é o usuário que cadastrou o pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()) { // Se o id do user dentro de pet for diferente ao id do usuário que foi pego pelo token
            res.status(422).json({message: "Houve um problema em processar a sua solicitação, tente novamente!"})
            return
        }

        pet.available = false

        await Pet.findByIdAndUpdate(id, pet)
        res.status(200).json({
            message: "Parabéns! O cliclo de adoção foi finalizado com sucesso!"
        })

    }
}