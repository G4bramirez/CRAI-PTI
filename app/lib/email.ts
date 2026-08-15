import { Resend } from "resend";
import type { Lead } from "./schemas";

export async function sendLeadNotificationEmail(lead: Lead) {
  // Verificar se a API key está configurada
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured. Email notification skipped.");
    return { success: false, message: "Email service not configured" };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "CRAI <onboarding@resend.dev>",
      to: "agentia.startup@gmail.com",
      subject: `Novo Lead: ${lead.name} - ${lead.company}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
              .header { background-color: #EF9311; color: white; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
              .field { margin-bottom: 15px; padding: 10px; background-color: #f5f5f5; border-radius: 4px; }
              .label { font-weight: bold; color: #1A120A; margin-bottom: 5px; }
              .value { color: #555; }
              .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 12px; color: #999; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>🎯 Novo Lead - CRAI Retention OS</h2>
              </div>

              <div class="field">
                <div class="label">Nome Completo</div>
                <div class="value">${lead.name}</div>
              </div>

              <div class="field">
                <div class="label">Email Corporativo</div>
                <div class="value">
                  <a href="mailto:${lead.email}" style="color: #EF9311; text-decoration: none;">
                    ${lead.email}
                  </a>
                </div>
              </div>

              <div class="field">
                <div class="label">Empresa</div>
                <div class="value">${lead.company}</div>
              </div>

              <div class="field">
                <div class="label">Faixa de MRR</div>
                <div class="value">R$ ${lead.mrr.replace("-", " - R$ ")}</div>
              </div>

              ${
                lead.message
                  ? `
              <div class="field">
                <div class="label">Mensagem</div>
                <div class="value">${lead.message}</div>
              </div>
              `
                  : ""
              }

              <div class="field">
                <div class="label">Data de Submissão</div>
                <div class="value">${new Date().toLocaleString("pt-BR")}</div>
              </div>

              <div class="footer">
                <p>Este é um email automático enviado pelo sistema de leads da CRAI.</p>
                <p>
                  <strong>Próximos passos:</strong>
                  <ul>
                    <li>Revisar os dados do lead</li>
                    <li>Agendar demonstração personalizada</li>
                    <li>Enviar proposta customizada</li>
                  </ul>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Email error:", error);
      throw error;
    }

    console.log("Email sent successfully:", data);
    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error("Failed to send lead notification email:", error);
    throw error;
  }
}
