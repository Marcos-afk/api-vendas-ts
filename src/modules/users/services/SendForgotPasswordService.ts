import EmailConfig from '@config/email';
import ErrorApp from '@shared/errors/ErrorApp';
import { inject, injectable } from 'tsyringe';
import { ISendForgotPasswordEmail } from '../domain/models/ISendForgotPasswordEmail';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository';

@injectable()
export default class SendForgotPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}
  public async execute({ email }: ISendForgotPasswordEmail): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new ErrorApp('Email inválido!');
    }

    const token = await this.userTokensRepository.generate(user.id);
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
