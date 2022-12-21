interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
  id?: string;
  avatarURL?: string;
}

export { ICreateUserDTO };
