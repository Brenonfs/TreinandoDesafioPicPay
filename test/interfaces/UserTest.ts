/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUserTest {
  id: number | null;
  name: string;
  email: string;
  cpf: string;
  password: string;
  balance: number;
  userType: string;
  response: any | null;
  token: string | null;
}
