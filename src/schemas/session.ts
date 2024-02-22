import { z } from 'zod';

export const sessionUserSchema = z.object({
  email: z
    .string({
      required_error: 'O  campo "email" está vazio',
      invalid_type_error: 'O  campo "email" tem caracteres inválidos',
    })
    .email({ message: 'O campo "email" deve ser um endereço de e-mail válido' }),
  password: z
    .string({
      required_error: 'O  campo "password" está vazio',
      invalid_type_error: 'O  campo "password" tem caracteres inválidos',
    })
    .min(3, { message: 'O campo "password" está muito pequeno' }),
});
