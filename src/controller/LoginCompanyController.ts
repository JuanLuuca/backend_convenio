import UsersConvenioModel from "../model/LoginCompanyConvenio/LoginCompanyConvenio";
import { Request, Response } from "express";

export const ControllerLoginCompany = {
    async getLoginCompany(req: Request, res: Response) {

        const userLogin = {
            cpf_cnpj: req.body.cpf_cnpj,
            senha: req.body.senha
        }
    
        try {
            const response = await UsersConvenioModel.findOne({ where: { cpf_cnpj: req.body.cpf_cnpj } });
            
            if (response) {
                console.log('------------ACHOU O USUARIO E DEPOIS VAI FAZER A VERIFICAÇÃO DA SENHA--------------');

                if(response.dataValues.senha == null) {
                    console.log('---------ACHOU UM USUARIO QUE NÃO TEM SENHA E VAI FAZER O UPDATE INSERINDO A NOVA SENHA');
                    const updateResponse = await UsersConvenioModel.update({ senha: req.body.senha }, { where: { cpf_cnpj: req.body.cpf_cnpj }});
                    return res.status(200).json({ aviso: 'achou um que não tinha senha', updateResponse });
                }

                if(response.dataValues.senha != null) {
                    console.log('---------ACHOU UM USUARIO QUE TEM SENHA E APENAS VAI FAZER O LOGIN PADRÃO');
                    const loginUser = await UsersConvenioModel.findOne({ where: userLogin });
                    if(loginUser == null) {
                        return res.status(400).json({ aviso: 'Usuário não encontrado' });
                    } else {
                        return res.status(200).json({ aviso: 'achou um que tinha senha', loginUser });
                    }
                }
            } else {
                return res.status(404).json({ error: "Enpoint deu erro na hora da requisição" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
    
}