const fs = require('fs/promises')
const express = require('express');
const expressFileUpload = require('express-fileupload');

class Server {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.middlewares();
        this.routes();
    }

middlewares(){
    this.app.use(express.static('public'))
    this.app.use(express.urlencoded({ extended:true }));
    this.app.use(expressFileUpload({
        limits: { fileSize: 5000000 },
        abortOnLimit: true,
        responseOnLimit: 'la foto es muy grande'
    }));
}

routes(){
this.app.get('/', (req, res) => {
    res.sendFile(__dirname.slice(0, -7) + '/public/formulario.html');
});

this.app.get('/collage', (req, res) => {
    res.sendFile(__dirname.slice(0, -7) + '/public/collage.html');
});

this.app.get('/deleteimg/:imagen', async (req, res) => {
    const { imagen } = req.params;
    await fs.unlink(`${__dirname.slice(0, -7)}/public/imgs/${imagen}`);
    res.redirect('/collage');
});


this.app.post('/imagen', (req, res) => {
    const { target_file } = req.files;
    const { posicion } = req.body;                /* siempre sera name */
    target_file.mv(`${__dirname.slice(0, -7)}/public/imgs/imagen-${posicion}.jpg`, (err) => {
        console.log(err);
        res.redirect('/collage')
    });
    });

/*     this.app.get('/deleteFile', (req, res) => {
        req.query.name;
    }); */
}

listen(){
    this.app.listen(this.port, () => {
        console.log(`escuchando en el puerto ${this.port} y funciona ✔`);
        
    })
}

}


module.exports = Server;