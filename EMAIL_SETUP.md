# CRAI Landing Page — Email Setup Guide

## 🎯 Objetivo

Enviar notificação de novo lead para **agentia.startup@gmail.com** sempre que alguém preenche o formulário "Agendar Demonstração".

## ✅ Status Atual

- ✅ Sistema de email integrado com **Resend**
- ✅ Email template preparado com HTML profissional
- ✅ Validação de API key implementada
- ✅ Fallback se email falhar (não bloqueia o lead)
- ✅ Logs detalhados no console

## 🚀 Como Ativar

### Passo 1: Criar Conta no Resend

1. Acesse: https://resend.com
2. Clique em "Sign Up"
3. Complete o cadastro com email e senha
4. Confirme seu email

### Passo 2: Obter API Key

1. No dashboard do Resend, vá para **API Keys**
2. Clique em **Create API Key**
3. Dê um nome: `CRAI Landing Page`
4. Copie a chave (começa com `re_`)

### Passo 3: Configurar Variável de Ambiente

#### Desenvolvimento Local:
```bash
# Crie ou edite .env.local
echo 'RESEND_API_KEY=re_sua_chave_aqui' >> .env.local
```

#### Produção (Vercel):
1. Vá para https://vercel.com
2. Abra seu projeto CRAI Landing
3. Vá para **Settings** → **Environment Variables**
4. Adicione:
   - Nome: `RESEND_API_KEY`
   - Valor: `re_sua_chave_aqui`
5. Clique em **Add**
6. Redeploy o projeto

### Passo 4: Verificar Domínio (Resend)

Para evitar a tag "[via Resend]" no email:

1. No Resend Dashboard, vá para **Domains**
2. Adicione seu domínio (ex: `crai.ai`)
3. Verifique os registros DNS no seu provider
4. Resend fornecerá os valores para adicionar

**Nota:** Por enquanto, os emails virão com "via Resend" - isso é normal para contas novas.

### Passo 5: Testar Localmente

```bash
# 1. Restart dev server
npm run dev

# 2. Preencha e envie o formulário
# http://localhost:3000

# 3. Verifique o console
# Deve aparecer: "Email sent successfully: { id: '...' }"

# 4. Verifique seu email agentia.startup@gmail.com
# Deve receber o email com dados do lead
```

## 📧 O Que o Email Contém

Quando alguém preenche o formulário, um email é enviado com:

- ✅ **Nome Completo** do lead
- ✅ **Email Corporativo** (com link mailto)
- ✅ **Empresa**
- ✅ **Faixa de MRR** (ex: R$ 100k - R$ 500k)
- ✅ **Mensagem** (se fornecida)
- ✅ **Data/Hora** de submissão
- ✅ **Design profissional** com cores CRAI

## 🔍 Troubleshooting

### Email não está chegando

1. **Verificar chave de API:**
   ```bash
   # Veja se RESEND_API_KEY está em .env.local
   cat .env.local
   ```

2. **Verificar logs:**
   ```bash
   # Console deve mostrar:
   # "Email sent successfully: { id: '...' }"
   # OU
   # "RESEND_API_KEY not configured. Email notification skipped."
   ```

3. **Testar API direto:**
   ```bash
   curl -X POST https://api.resend.com/emails \
     -H "Authorization: Bearer re_sua_chave" \
     -H "Content-Type: application/json" \
     -d '{
       "from": "CRAI <onboarding@resend.dev>",
       "to": "agentia.startup@gmail.com",
       "subject": "Teste",
       "html": "<p>Teste</p>"
     }'
   ```

### Erro: "Missing API key"

- Confirme que `RESEND_API_KEY` está em `.env.local`
- Verifique se a chave começa com `re_`
- Reinicie o servidor após adicionar a variável

### Email saindo de "onboarding@resend.dev"

Isso é normal até configurar um domínio customizado no Resend.

Para usar domínio customizado:
1. Adicione domínio no Resend Dashboard
2. Verif registros DNS
3. Mude `from` em `app/lib/email.ts` para seu domínio

## 📝 Modificar Template de Email

Para personalizar o email:

1. Abra `app/lib/email.ts`
2. Edite a seção `html:` da função `resend.emails.send()`
3. Reinicie o servidor

**Exemplo:** Adicionar logo da CRAI:
```html
<img src="https://seu-domain.com/logo_crai.png" width="200" alt="CRAI" />
```

## 🔐 Segurança

- ✅ API key protegida em variáveis de ambiente
- ✅ Nunca exposta no código cliente
- ✅ Nunca logada em console (apenas `[REDACTED]`)
- ✅ Falha de email não expõe dados confidenciais

## 📊 Monitorando Emails

### No Dashboard do Resend:

1. Acesse https://resend.com
2. Vá para **Emails**
3. Veja histórico de emails enviados
4. Status: `Sent`, `Delivered`, `Failed`
5. Clique para ver detalhes

### Métricas:

- **Delivered:** Email chegou no servidor
- **Opened:** Recipient abriu o email
- **Clicked:** Recipient clicou em link
- **Bounced:** Email não foi entregue

## 🚀 Próximas Integrações

### Slack Notification
Receber notificação no Slack quando novo lead chega:
```bash
npm install slack-sdk
```

### Database
Armazenar histórico de leads:
```bash
npm install @supabase/supabase-js
```

### Email to CRM
Sincronizar leads com HubSpot automaticamente:
- Ver `app/api/leads/route.ts` linhas 46-58 (comentadas)

## 📞 Suporte

- **Resend Docs:** https://resend.com/docs
- **Resend Support:** https://resend.com/support
- **CRAI Email Code:** `app/lib/email.ts`

---

## Resumo Rápido

```bash
# 1. Criar conta em https://resend.com
# 2. Copiar API key
# 3. Adicionar a .env.local:
RESEND_API_KEY=re_sua_chave

# 4. Restart servidor
npm run dev

# 5. Testar formulário
# http://localhost:3000

# Pronto! Emails chegando em agentia.startup@gmail.com ✅
```
