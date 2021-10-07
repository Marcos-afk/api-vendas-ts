import EmailConfig from '@config/email';
import ErrorApp from '@shared/errors/ErrorApp';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '../infra/typeorm/repositories/UserTokenRepository';

interface IRequest {
  email: string;
}

export default class SendForgotPasswordService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokenRepository = getCustomRepository(UserTokensRepository);
    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new ErrorApp('Email inválido!');
    }

    const token = await usersTokenRepository.generate(user.id);
    const EmailService = new EmailConfig();
    EmailService.to = email;
    EmailService.subject = 'Alteração de senha';
    EmailService.html = `<div>
        <p> Olá ${user.name}, segue abaixo as informções de como alterar sua senha.</p>
        <p> Solicitação de mudança de senha recebida : ${token?.token}.</p>
        <p> Clique no link para continuar <a href=${process.env.URL_NEW_PASSWORD}/${token?.token}>Clique aqui</a></p>
        <p> Obs : O token acima irá expirar em duas horas com base no horário em que o mesmo foi entregue.</p>
        </div>`;
    EmailService.sendEmail();
  }
}
