/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ITransactionTest {
  id: number | null;
  value: number;
  payer: number;
  payee: number;
  response: any | null;
  message: string | null;
}
