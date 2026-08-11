# 💻 EXEMPLOS DE CÓDIGO - CRAI

## 1️⃣ AI SERVICE - Claude
\\\python
from anthropic import Anthropic

client = Anthropic()

async def analyze_payment(payment_id: str, customer_data: dict):
    prompt = f"Analise: {customer_data} e retorne JSON"
    
    response = client.messages.create(
        model="claude-opus",
        max_tokens=500,
        messages=[{"role": "user", "content": prompt}]
    )
    return response.content[0].text
\\\

## 2️⃣ STRIPE WEBHOOK
\\\python
@router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    
    event = stripe.Webhook.construct_event(
        payload, sig_header, WEBHOOK_SECRET
    )
    
    if event["type"] == "charge.failed":
        print(f"Pagamento falhado!")
    
    return {"status": "received"}
\\\

## 3️⃣ TWILIO WHATSAPP
\\\python
from twilio.rest import Client

client = Client(SID, TOKEN)

def send_whatsapp(phone: str, message: str):
    msg = client.messages.create(
        from_="whatsapp:+5511999999999",
        body=message,
        to=f"whatsapp:{phone}"
    )
    return {"status": "sent"}
\\\

## 4️⃣ DASHBOARD REACT
\\\javascript
'use client'

import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null)

  useEffect(() => {
    fetch('/api/dashboard/metrics')
      .then(r => r.json())
      .then(setMetrics)
  }, [])

  return (
    <div className="p-8">
      <h1>Dashboard CRAI</h1>
      <p>Recuperado: R\$ {metrics?.total_recovered}</p>
    </div>
  )
}
\\\

## 5️⃣ AUTH JWT
\\\python
@router.post("/login")
async def login(email: str, password: str):
    expire = datetime.utcnow() + timedelta(minutes=30)
    token = jwt.encode(
        {"sub": email, "exp": expire},
        SECRET_KEY,
        algorithm="HS256"
    )
    return {"access_token": token}
\\\

## 6️⃣ .ENV
DATABASE_URL=sqlite:///./crai.db
SECRET_KEY=seu-secret-aqui
STRIPE_API_KEY=sk_test_...
OPENAI_API_KEY=sk-...
TWILIO_ACCOUNT_SID=AC...
