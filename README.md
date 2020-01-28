# Anti-fraud Control
## API REST para Controle de Antifraude por CPF

Este é um desafio técnico backend com o intuito de testar as habilidades do desenvolvedor.
Neste programa foi usado o *Node.js* como linguagem de programação e a *Framework Express* para as requisições HTTP. Como banco de dados escolhemos o *MySQL* na versão 5.6.
O programa está disponível como serviço usando o *REST* para o padrão de comunicação.

## Requisitos:
> Ambiente deve ser preferencialmente Linux, mas o Windows não deixa de ser compatível.
- Docker: 19.03 ou superior
- Docker-compose: 1.25 ou superior
- Portas 7070 e 3306 liberadas

## Instruções para a instalação:
1. Clonar o repositório GIT:
```
https://github.com/estevaoi/api-anti-fraud-control.git
```
2. Acessar o subdiretório "src" e executar o comando Docker:
```
cd src

docker-compose up –build -d
```

## Endereços URL:
- Endereço para recurso: http://localhost:7070/cpf [GET, PUT e DELETE]
- Documentação *Swagger*: http://localhost:7070/api-docs/

## Testes:
Foi utilizado [*Postman*](https://www.getpostman.com/) para realizar os testes dos recursos da API. Você também pode realizar os testes importando a Collection que encontra-se no diretório "*.postman_collection*".

## Autor:
- Estêvão Silva
- [LinkeDin](https://www.linkedin.com/in/estevaosilva/)
