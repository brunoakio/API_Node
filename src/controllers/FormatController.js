const Format = require('../models/format');

module.exports = {
    async format(req, res){
        try {
            const { numero, tipo } = req.body;
    
            const numeroFormatado = Format(numero, tipo);
    
            if (numeroFormatado) {
                res.json({ numeroFormatado });
            } else {
                res.status(400).json({ erro: 'Formato inválido ou tipo não suportado.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro interno do servidor.' });
        }
    }
}