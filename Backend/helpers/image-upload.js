const multer = require("multer")
const path = require("path")

// Destino onde fica as imagens
const imageStorage = multer.diskStorage({
    destination: function(req, file, cb){

        let folder = ""

        if(req.baseUrl.includes("users")){ //Se a url tiver user
            folder = "users" // O nome da pasta vai ser users


        } else if (req.baseUrl.includes("pets")){ // Se não vai ser pets
            folder = "pet"
        }

        cb(null, `public/images/${folder}`) //O caminho da image

    },
    filename: function (req, file, cb){ //Salvando a imagem com a data atual
        cb(null, Date.now() + path.extname(file.originalname)) 
    }
}) // 2656594532564.jpg

const imageUpload = multer({ 
    storage: imageStorage, 
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)) { //Verificando se a image é png ou jpg
            return cb(new Error("Por favor, envie apenas jpg ou png!"))
        }
        cb(undefined, true)
    }
})

module.exports = { imageUpload }