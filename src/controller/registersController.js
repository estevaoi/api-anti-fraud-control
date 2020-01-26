const express = require('express');
const validatorCpf = require('cpf-check');
var dateFormat = require('dateformat');
const mysql = require('../mysql').pool;

const router = express.Router();
const createdAt = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

router.post('/', (req, res, next) => {

    const numberCpf = req.body.cpf.toString().replace(/[^0-9]/g, '');

    if (!validatorCpf.validate(numberCpf)) {
        return res.status(400).send({
            type: 'InvalidCpfException',
            message: 'CPF is not valid..'
        });
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }); }

        conn.query(
            'SELECT * FROM listrestrictedcpf WHERE numberCpf = ?',
            [numberCpf],
            (error, result, field) => {

                if (error) { return res.status(500).send({ error: error }); }

                if (result.length >= 1) {
                    return res.status(400).send({
                        type: 'ExistsCpfException',
                        message: 'CPF number already registered'
                    })
                }

                conn.query(
                    'INSERT INTO listrestrictedcpf (numberCpf, createdAt) VALUES (?, ?);',
                    [numberCpf, createdAt],
                    (error, result, field) => {
                        conn.release();

                        if (error) { return res.status(500).send({ error: error }) }

                        const response = {
                            message: 'CPF Registered Successful',
                            record: {
                                id: result.insertId,
                                numberCpf: numberCpf,
                                createdAt: createdAt,
                                request: {
                                    method: 'GET',
                                    desciption: 'View registration',
                                    url: 'http://localhost:7070/cpf/' + numberCpf
                                }
                            }
                        }
                        return res.status(201).send(response);
                    }
                );
            }
        );
    });
});

router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT id, numberCpf, createdAt FROM listrestrictedcpf;',
            [],
            (error, result, fields) => {

                if (error) { return res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(200).send('[]');
                }

                const response = {
                    registrations: result.map(register => {
                        return {
                            id: register.id,
                            numberCpf: register.numberCpf,
                            createdAt: register.createdAt
                        }
                    })

                }
                return res.status(200).send(response);
            }
        )
    });
});

router.get('/:cpf', (req, res, next) => {

    const numberCpf = req.params.cpf.toString().replace(/[^0-9]/g, '');

    if (!validatorCpf.validate(numberCpf)) {
        return res.status(400).send({
            type: 'InvalidCpfException',
            message: 'CPF is not valid.'
        });
    }

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT id, numberCpf, createdAt FROM listrestrictedcpf WHERE numberCpf = ?;',
            [numberCpf],
            (error, result, fields) => {

                if (error) { return res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(400).send({
                        type: 'NotFoundCpfException',
                        message: 'CPF is not found.'
                    })
                }

                const response = {
                    records: {
                        id: result[0].id,
                        numberCpf: result[0].numberCpf,
                        createdAt: result[0].createdAt,
                        request: {
                            method: 'POST',
                            description: 'Add a new CPF',
                            url: 'http://localhost:7070/cpf/'
                        }
                    }
                }
                return res.status(200).send(response);
            }
        )
    });
});

router.delete('/:cpf', (req, res, next) => {

    const numberCpf = req.params.cpf.toString().replace(/[^0-9]/g, '');;

    if (!validatorCpf.validate(numberCpf)) {
        return res.status(400).send({
            type: 'InvalidCpfException',
            message: 'CPF is not valid.'
        });
    }

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM listrestrictedcpf WHERE numberCpf = ?',
            [numberCpf],
            (error, result, field) => {

                if (error) { return res.status(500).send({ error: error }); }

                if (result.length == 0) {
                    return res.status(400).send({
                        type: 'ExistsCpfException',
                        message: 'CPF number already registered'
                    })
                }

                conn.query(
                    `DELETE FROM listrestrictedcpf WHERE numberCpf = ?`,
                    [numberCpf],
                    (error, result, field) => {
                        conn.release();

                        if (error) { return res.status(500).send({ error: error }) }

                        const response = {
                            message: 'CPF ' + numberCpf + ' successfully removed',
                            request: {
                                method: 'POST',
                                description: 'Add a new CPF',
                                url: 'http://localhost:7070/cpf/',
                                body: {
                                    cpf: 'Number'
                                }
                            }
                        }
                        return res.status(202).send(response);
                    }
                )
            }
        );
    });
});

module.exports = router;