import { z } from 'zod';
const validUserTypes = ['common', 'merchant'];

export const userCreateSchema = z.object({
  name: z
    .string({
      required_error: 'O  campo "name" está vazio',
      invalid_type_error: 'O  campo "name" tem caracteres inválidos',
    })
    .min(3, { message: 'O campo "name" está muito pequeno' }),
  email: z
    .string({
      required_error: 'O  campo "email" está vazio',
      invalid_type_error: 'O  campo "email" tem caracteres inválidos',
    })
    .email()
    .min(10, { message: 'O campo "email" está muito pequeno' }),
  cpf: z
    .string({
      required_error: 'O campo "cpf" está vazio',
      invalid_type_error: 'O campo "cpf" tem caracteres inválidos',
    })
    .refine((value) => value.length === 11, {
      message: 'O campo "cpf" deve ter exatamente 11 caracteres',
    }),
  password: z
    .string({
      required_error: 'O  campo "password" está vazio',
      invalid_type_error: 'O  campo "password" tem caracteres inválidos',
    })
    .min(3, { message: 'O campo "password" está muito pequeno' }),
  balance: z.number({
    required_error: 'O  campo "balance" está vazio',
    invalid_type_error: 'O  campo "balance" tem caracteres inválidos',
  }),
  userType: z
    .string({
      required_error: 'O campo "userType" está vazio',
      invalid_type_error: 'O campo "userType" tem caracteres inválidos',
    })
    .refine((value) => validUserTypes.includes(value.toLowerCase()), {
      message: 'O campo "userType" deve ser: common ou merchant',
    }),
});
