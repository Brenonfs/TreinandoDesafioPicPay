import { z } from 'zod';

export const transactionCreateSchema = z.object({
  payer: z.number({
    required_error: 'O  campo "payer" está vazio',
    invalid_type_error: 'O  campo "payer" tem caracteres inválidos',
  }),
  payee: z.number({
    required_error: 'O  campo "payee" está vazio',
    invalid_type_error: 'O  campo "payee" tem caracteres inválidos',
  }),
  value: z.number({
    required_error: 'O  campo "value" está vazio',
    invalid_type_error: 'O  campo "value" tem caracteres inválidos',
  }),
});
