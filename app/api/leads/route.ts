import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/app/lib/schemas";
import { sendLeadNotificationEmail } from "@/app/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar dados com Zod
    const validatedData = leadSchema.parse(body);

    // Estrutura para integração com HubSpot CRM
    // TODO: Implementar integração real com HubSpot
    const hubspotPayload = {
      properties: {
        firstname: validatedData.name.split(" ")[0],
        lastname: validatedData.name.split(" ").slice(1).join(" ") || "",
        email: validatedData.email,
        company: validatedData.company,
        lifecyclestage: "lead",
        hs_lead_status: "NEW",
        custom_mrr_range: validatedData.mrr,
        notes: validatedData.message,
        hs_pipeline: "crai_recovery",
      },
    };

    console.log("New lead received:", {
      timestamp: new Date().toISOString(),
      data: validatedData,
      hubspotPayload,
    });

    // Enviar email para CRAI
    try {
      await sendLeadNotificationEmail(validatedData);
      console.log("Lead notification email sent successfully");
    } catch (emailError) {
      console.error("Failed to send notification email:", emailError);
      // Continuar mesmo se o email falhar - não bloquear a resposta do lead
    }

    // Integração com HubSpot (comentada até ter a API key)
    // const hubspotResponse = await fetch(
    //   "https://api.hubapi.com/crm/v3/objects/contacts",
    //   {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(hubspotPayload),
    //   }
    // );
    //
    // if (!hubspotResponse.ok) {
    //   const error = await hubspotResponse.text();
    //   console.error("HubSpot API error:", error);
    //   throw new Error("Falha ao salvar lead no CRM");
    // }
    //
    // const hubspotData = await hubspotResponse.json();

    // Resposta bem-sucedida
    return NextResponse.json(
      {
        success: true,
        message: "Lead recebido com sucesso. Entraremos em contato em breve!",
        leadId: `lead_${Date.now()}`, // Substituir por ID real do HubSpot
        data: validatedData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lead submission error:", error);

    // Erro de validação Zod
    if (error instanceof Error && error.message.includes("validation")) {
      return NextResponse.json(
        {
          success: false,
          message: "Dados inválidos",
          error: error.message,
        },
        { status: 400 }
      );
    }

    // Erro genérico
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao processar sua solicitação. Tente novamente.",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}

// Verificar saúde da API
export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "/api/leads",
    methods: ["POST"],
  });
}
