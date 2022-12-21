import { Router } from "express";
import { ensureAuthentication } from "middlewares/ensureAuthentication";
import multer from "multer";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/updateUserAvatarController";

import uploadConfig from "../config/upload";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthentication,
  uploadAvatar.single("avatarURL"),
  updateUserAvatarController.handle
);

export { usersRoutes };
