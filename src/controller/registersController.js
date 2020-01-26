const express = require('express');
const validator = require('cpf-check');


const router = express.Router();

router.post('/', (req, res, next) => {

    const numberCpf = req.body.cpf;

    if (!validator.validate(numberCpf)) {
        res.status(400).send({
            type: 'InvalidCpfException',
            message: 'CPF is not valid..'
        });
    }
    else {
        res.status(200).send({
            message: 'Adicionando o CPF ' + numberCpf
        });
    }
});

router.get('/', (req, res, next) => {
    res.status(200).send({
        message: 'Tudo certo'
    });
});

router.get('/:cpf', (req, res, next) => {

    const numberCpf = req.params.cpf;

    if (!validator.validate(numberCpf)) {
        res.status(400).send({
            type: 'InvalidCpfException',
            message: 'CPF is not valid.'
        });
    }
    else {
        res.status(200).send({
            message: 'Monstrando o CPF ' + numberCpf
        });
    }
});

router.delete('/:cpf', (req, res, next) => {

    const numberCpf = req.params.cpf;

    if (!validator.validate(numberCpf)) {
        res.status(400).send({
            type: 'InvalidCpfException',
            message: 'CPF is not valid.'
        });
    }
    else {
        res.status(200).send({
            message: 'Removendo o CPF ' + numberCpf
        });
    }
});

module.exports = router;