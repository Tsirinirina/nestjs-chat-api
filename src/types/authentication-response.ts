import { UserLoginDto } from 'src/user/dto/user.login.response.dto';

export interface AuthenticationResponse {
  token: string;
  user: UserLoginDto;
}
