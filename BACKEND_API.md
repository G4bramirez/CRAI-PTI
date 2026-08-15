# CRAI Landing Page — Backend API Documentation

## Overview

The CRAI Landing Page includes a backend API for capturing and processing leads from the "Agendar Demonstração" (Book a Demo) form. This document describes the API structure, validation, and integration points.

## Lead Submission Endpoint

### POST `/api/leads`

**Purpose:** Capture lead information from the demo form and process it for CRM integration.

### Request

**Content-Type:** `application/json`

**Body Schema:**

```json
{
  "name": "string (3-100 chars, required)",
  "email": "string (valid email, max 120 chars, required)",
  "company": "string (2-120 chars, required)",
  "mrr": "enum: '500k-1m' | '1m-2m' | '2m-5m' | '5m+' (default: '500k-1m')",
  "message": "string (max 500 chars, optional)"
}
```

### Response

**Success (201 Created):**

```json
{
  "success": true,
  "message": "Lead recebido com sucesso. Entraremos em contato em breve!",
  "leadId": "lead_1234567890",
  "data": {
    "name": "João Silva",
    "email": "joao@empresa.com",
    "company": "Empresa XYZ",
    "mrr": "2m-5m",
    "message": "Muito interessado em conhecer a solução"
  }
}
```

**Validation Error (400 Bad Request):**

```json
{
  "success": false,
  "message": "Dados inválidos",
  "error": "String field must contain at least 3 character(s)"
}
```

**Server Error (500 Internal Server Error):**

```json
{
  "success": false,
  "message": "Erro ao processar sua solicitação. Tente novamente.",
  "error": "Error details"
}
```

## Validation Rules

Validation is performed using **Zod** (`app/lib/schemas.ts`):

| Field   | Type   | Min/Max | Required | Rules                              |
|---------|--------|---------|----------|-------------------------------------|
| name    | string | 3-100   | Yes      | Must be a valid name               |
| email   | string | -/120   | Yes      | Must be a valid email address      |
| company | string | 2-120   | Yes      | Must be a company name             |
| mrr     | enum   | -       | No       | Must be one of the 4 options       |
| message | string | -/500   | No       | Optional follow-up message         |

## HubSpot CRM Integration

The API is structured to integrate with **HubSpot CRM** using the following pipeline:

### Integration Structure

When a lead is captured, it's transformed into a HubSpot-compatible payload:

```json
{
  "properties": {
    "firstname": "João",
    "lastname": "Silva",
    "email": "joao@empresa.com",
    "company": "Empresa XYZ",
    "lifecyclestage": "lead",
    "hs_lead_status": "NEW",
    "custom_mrr_range": "2m-5m",
    "notes": "Optional message from the user",
    "hs_pipeline": "crai_recovery"
  }
}
```

### Enabling HubSpot Integration

To activate HubSpot integration:

1. **Create a `.env.local` file** with your HubSpot API key:
   ```bash
   HUBSPOT_API_KEY=your_api_key_here
   ```

2. **Uncomment the HubSpot integration code** in `app/api/leads/route.ts` (lines 26-42)

3. **Test the integration** by submitting a form and verifying the lead appears in HubSpot

### HubSpot Pipelines

The CRAI system uses two pipelines in HubSpot:

- **`crai_recovery`** — For the "Recuperação" (Recovery) plan
- **`crai_retention`** — For the "Retenção + Insights" (Retention + Insights) plan

Currently, all leads are routed to `crai_recovery`. This can be modified in the `hubspotPayload` object based on the form data.

### API Endpoint Reference

- **HubSpot Contacts API:** `https://api.hubapi.com/crm/v3/objects/contacts`
- **Authentication:** Bearer token in `Authorization` header
- **Docs:** https://developers.hubspot.com/docs/api/crm/contacts

## Client-Side Integration

The form submission is handled by the `DemoModal` component (`app/components/DemoModal.tsx`):

1. User fills out the form and clicks "Agendar Demonstração"
2. Form data is validated on the client
3. POST request is sent to `/api/leads`
4. Response is displayed to the user (success or error message)
5. Modal closes automatically on success

### Client-Side Features

- **Real-time validation** — Immediate feedback on form errors
- **Loading state** — Spinner shown while request is processing
- **Error handling** — User-friendly error messages
- **Success message** — Confirmation before closing the modal
- **Keyboard support** — Close modal with Escape key
- **Click-outside** — Close modal by clicking the backdrop

## Error Handling

The API implements comprehensive error handling:

1. **Validation Errors (400)** — Missing or invalid form data
2. **HubSpot Errors (500)** — Failures during CRM integration
3. **Server Errors (500)** — Unexpected server-side issues

All errors are logged to the console for debugging purposes.

## Testing the API

### Using cURL

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "company": "Empresa Test",
    "mrr": "2m-5m",
    "message": "Teste de demonstração"
  }'
```

### Using the Web Form

1. Start the dev server: `npm run dev`
2. Navigate to http://localhost:3000
3. Click "Agendar Demonstração" in the header or hero section
4. Fill out the form and submit

### API Health Check

```bash
curl http://localhost:3000/api/leads
```

**Response:**
```json
{
  "status": "ok",
  "endpoint": "/api/leads",
  "methods": ["POST"]
}
```

## Database Considerations

Currently, leads are logged to the console and (optionally) sent to HubSpot. For production use, consider:

1. **PostgreSQL/MongoDB** — Persistent storage for lead records
2. **Audit trail** — Track all lead submissions and status changes
3. **Email notifications** — Alert the sales team when a new lead arrives
4. **Lead scoring** — Rank leads based on MRR and engagement signals

## Security Best Practices

- ✅ Input validation via Zod
- ✅ HTTPS-only in production (enforced by Vercel)
- ✅ API rate limiting (recommended: use Vercel's built-in limits)
- ✅ No sensitive data exposed in error messages
- ✅ CORS headers can be added if needed for cross-origin requests

## Future Enhancements

- [ ] Add rate limiting to prevent spam
- [ ] Implement email verification
- [ ] Add lead scoring based on firmographic data
- [ ] Send confirmation emails to users
- [ ] Add SMS notifications for high-value leads
- [ ] Integrate with Slack for real-time notifications
- [ ] Create lead segmentation based on MRR range
- [ ] Add A/B testing for form variations

## Support

For questions about the backend API, refer to:
- **Zod Docs:** https://zod.dev
- **Next.js API Routes:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **HubSpot API Docs:** https://developers.hubspot.com/docs/api/crm/contacts
