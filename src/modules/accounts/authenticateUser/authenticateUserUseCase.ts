import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor (
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password}: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error("Email or password incorrect!");
    }

    const token = sign({}, "e73d5c321980933060fec06b084f730d", {
      subject: user.id,
      expiresIn: "1d"
    });

    const authenticateInfo: IResponse = {
      user: {
        name: user.name,
        email: user.email
      },
      token
    }

    return authenticateInfo;
  }
}

export { AuthenticateUserUseCase }