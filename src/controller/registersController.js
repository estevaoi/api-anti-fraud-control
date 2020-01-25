const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    res.status(400).send({
        type: 'InvalidCpfException',
        message: 'CPF is not valid.'
    });
});

router.get('/', (req, res, next) => {
    res.status(200).send({
        message: 'Tudo certo'
    });
});

router.get('/:cpf', (req, res, next) => {
    const numberCpf = req.params.cpf;

    if (numberCpf == 000) {

    }

    res.status(200).send({
        message: 'Monstrando um CPF'
    });
});

router.delete('/:cpf', (req, res, next) => {
    res.status(401).send({
        type: 'InvalidCpfException',
        message: 'CPF is not valid.'
    });
});

module.exports = router;