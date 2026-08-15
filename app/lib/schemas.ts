import { z } from "zod";

export const leadSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome não pode exceder 100 caracteres"),
  email: z
    .string()
    .email("Email inválido")
    .max(120, "Email não pode exceder 120 caracteres"),
  company: z
    .string()
    .min(2, "Empresa deve ter pelo menos 2 caracteres")
    .max(120, "Empresa não pode exceder 120 caracteres"),
  mrr: z
    .string()
    .min(1, "MRR é obrigatório")
    .max(100, "MRR não pode exceder 100 caracteres"),
  message: z
    .string()
    .max(500, "Mensagem não pode exceder 500 caracteres")
    .optional()
    .default(""),
});

export type Lead = z.infer<typeof leadSchema>;
