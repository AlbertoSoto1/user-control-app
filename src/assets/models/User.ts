import { UserInterface } from "./interfaces/UserInterface";

export class User implements UserInterface {
  name = '';
  surname = '';
  mail = '';
  age = NaN;
  username = '';
  password_digest = '';
  profile = NaN;
}