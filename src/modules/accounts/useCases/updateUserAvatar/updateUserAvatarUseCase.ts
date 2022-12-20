import { injectable, inject } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { deleteFile } from "../../../../utils/file";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor (
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (user.avatarURL) {
      await deleteFile(`./tmp/avatar/${user.avatarURL}`);
    }
    user.avatarURL = avatar_file;

    await this.userRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase }