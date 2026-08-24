# 🔗 Integração do Banco de Dados com IA - Guia Prático

## 📋 Visão Geral

Este documento explica como integrar as predições de churn geradas pelo pipeline ML com sua IA (CRAI Retention OS) para tomar decisões inteligentes de retenção.

---

## 🎯 Fluxo de Integração

```
Banco de Dados (Users)
        ↓
[Pipeline ML]
        ↓
Predições (Churn Probability)
        ↓
[API Backend]
        ↓
[IA - CRAI]
        ↓
Ações de Retenção (Email, Desconto, etc)
        ↓
Banco de Dados (Atualizado)
```

---

## 1️⃣ Preparar as Predições

### Arquivo de Saída
```
6_predictions/predictions_xgboost.csv

Colunas:
- msno           → ID do usuário
- churn_probability → Score 0-1
- churn_prediction  → 0 (fica) / 1 (sai)
- risk_level       → low / medium / high
```

### Carregar em Python
```python
import pandas as pd

# Ler predições
predictions = pd.read_csv('6_predictions/predictions_xgboost.csv')

# Filtrar usuários de alto risco
high_risk = predictions[predictions['risk_level'] == 'high']
medium_risk = predictions[predictions['risk_level'] == 'medium']

print(f"Alto risco: {len(high_risk)} usuários")
print(f"Médio risco: {len(medium_risk)} usuários")
```

---

## 2️⃣ Integrar com Banco de Dados

### SQL - Adicionar Predições à Tabela de Usuários

```sql
-- Adicionar coluna de churn_probability se não existir
ALTER TABLE users 
ADD COLUMN churn_probability FLOAT DEFAULT 0,
ADD COLUMN churn_prediction INT DEFAULT 0,
ADD COLUMN risk_level VARCHAR(20) DEFAULT 'low';

-- Atualizar com predições do ML
UPDATE users u
JOIN predictions p ON u.id = p.msno
SET u.churn_probability = p.churn_probability,
    u.churn_prediction = p.churn_prediction,
    u.risk_level = p.risk_level;

-- Ver usuários de alto risco
SELECT id, email, churn_probability 
FROM users 
WHERE risk_level = 'high'
ORDER BY churn_probability DESC
LIMIT 100;
```

### Python - Usando SQLAlchemy

```python
from sqlalchemy import create_engine
import pandas as pd

# Conectar ao banco
engine = create_engine('mysql+pymysql://user:password@localhost/crai_db')

# Ler predições
predictions = pd.read_csv('6_predictions/predictions_xgboost.csv')

# Renomear coluna se necessário (msno → user_id)
predictions.rename(columns={'msno': 'user_id'}, inplace=True)

# Salvar no banco
predictions.to_sql('churn_predictions', con=engine, if_exists='replace', index=False)

# Verificar
result = pd.read_sql('SELECT * FROM churn_predictions LIMIT 5', con=engine)
print(result)
```

---

## 3️⃣ Criar API para Acessar Predições

### FastAPI - Endpoint de Churn Score

```python
from fastapi import FastAPI
from sqlalchemy import create_engine
import pandas as pd

app = FastAPI()

# Conectar ao banco
engine = create_engine('mysql+pymysql://user:password@localhost/crai_db')

@app.get("/api/user/{user_id}/churn-risk")
async def get_churn_risk(user_id: int):
    """Retorna score de churn para um usuário"""
    query = f"SELECT * FROM churn_predictions WHERE user_id = {user_id}"
    result = pd.read_sql(query, con=engine)
    
    if result.empty:
        return {"error": "Usuário não encontrado"}
    
    row = result.iloc[0]
    return {
        "user_id": user_id,
        "churn_probability": float(row['churn_probability']),
        "risk_level": row['risk_level'],
        "recommendation": get_recommendation(row['risk_level'])
    }

@app.get("/api/users/high-risk")
async def get_high_risk_users(limit: int = 100):
    """Retorna usuários de alto risco para retenção"""
    query = f"""
    SELECT user_id, email, churn_probability 
    FROM churn_predictions 
    WHERE risk_level = 'high'
    ORDER BY churn_probability DESC
    LIMIT {limit}
    """
    result = pd.read_sql(query, con=engine)
    return result.to_dict('records')

def get_recommendation(risk_level: str) -> str:
    """Retorna ação recomendada baseada no risco"""
    recommendations = {
        'low': 'Manter comunicação regular',
        'medium': 'Oferecer upgrade ou desconto',
        'high': 'Contato direto + oferta especial'
    }
    return recommendations.get(risk_level, 'Monitorar')

# Rodar: uvicorn app:app --reload
```

---

## 4️⃣ Conectar com a IA (CRAI)

### Backend Node.js/Express - Integração

```javascript
// routes/retention.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// URL da API Python
const ML_API = 'http://localhost:8000/api';

// Endpoint para análise de usuário
router.get('/user/:userId/retention-strategy', async (req, res) => {
  try {
    // 1. Obter score de churn da IA
    const churnResponse = await axios.get(
      `${ML_API}/user/${req.params.userId}/churn-risk`
    );
    
    const { churn_probability, risk_level, recommendation } = churnResponse.data;
    
    // 2. Chamar CRAI para gerar estratégia personalizada
    const strategy = generateRetentionStrategy({
      userId: req.params.userId,
      churnScore: churn_probability,
      riskLevel: risk_level,
      recommendation: recommendation
    });
    
    // 3. Retornar para frontend
    res.json({
      churnPrediction: churn_probability,
      riskLevel: risk_level,
      retentionStrategy: strategy,
      suggestedActions: [
        `Email de retenção (probabilidade: ${(churn_probability * 100).toFixed(1)}%)`,
        `Oferta de desconto: ${getOfferAmount(churn_probability)}%`,
        `Prioridade de suporte: ${getPriorityLevel(risk_level)}`
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function generateRetentionStrategy(data) {
  if (data.riskLevel === 'high') {
    return {
      strategy: 'INTERVENÇÃO IMEDIATA',
      actions: [
        '1. Oferta exclusiva (30-50% desconto)',
        '2. Contato direto via email/SMS',
        '3. Oferecer trial de features premium',
        '4. Atribuir gestor de conta dedicado'
      ]
    };
  } else if (data.riskLevel === 'medium') {
    return {
      strategy: 'RETENÇÃO PROATIVA',
      actions: [
        '1. Email com benefícios destacados',
        '2. Oferta de upgrade com desconto',
        '3. Convidá-lo para webinar/evento'
      ]
    };
  } else {
    return {
      strategy: 'MANUTENÇÃO',
      actions: [
        '1. Newsletter regular',
        '2. Oferecer features novas',
        '3. Manter comunicação consistente'
      ]
    };
  }
}

module.exports = router;
```

---

## 5️⃣ Atualizar Predições Periodicamente

### Cron Job - Retraining Semanal

```python
# schedule_retraining.py
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
import subprocess
import os

scheduler = BackgroundScheduler()

@scheduler.scheduled_job('cron', day_of_week='sunday', hour=2)
def retrain_model():
    """Retraina modelo toda semana"""
    print(f"[{datetime.now()}] Iniciando retraining...")
    
    os.chdir('/path/to/kkbox-ml-pipeline')
    
    # Rodar pipeline completo
    subprocess.run(['python', 'scripts/02_process.py'], check=True)
    subprocess.run(['python', 'scripts/03_features.py'], check=True)
    subprocess.run(['python', 'scripts/04_train.py'], check=True)
    subprocess.run(['python', 'scripts/05_predict.py'], check=True)
    
    # Copiar predições para banco
    update_database_predictions()
    
    print(f"[{datetime.now()}] Retraining concluído!")

def update_database_predictions():
    """Atualiza banco com novas predições"""
    predictions = pd.read_csv('6_predictions/predictions_xgboost.csv')
    engine = create_engine('mysql+pymysql://user:pass@localhost/crai_db')
    predictions.to_sql('churn_predictions', con=engine, if_exists='replace', index=False)
    print("Banco atualizado com novas predições")

# Iniciar scheduler
scheduler.start()
print("Scheduler iniciado. Retraining agendado para domingos às 2:00 AM")
```

---

## 6️⃣ Dashboard - Visualizar Insights

### React Component

```jsx
// components/ChurnDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function ChurnDashboard() {
  const [stats, setStats] = useState(null);
  const [highRiskUsers, setHighRiskUsers] = useState([]);

  useEffect(() => {
    // Carregar estatísticas
    axios.get('/api/churn/stats').then(res => setStats(res.data));
    
    // Carregar usuários de alto risco
    axios.get('/api/users/high-risk?limit=50').then(res => setHighRiskUsers(res.data));
  }, []);

  if (!stats) return <div>Carregando...</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard de Churn</h1>
      
      {/* Estatísticas Gerais */}
      <div className="stats">
        <div className="card">
          <h3>Risco Alto</h3>
          <p>{stats.high_risk_count} usuários</p>
          <small>{((stats.high_risk_count / stats.total) * 100).toFixed(1)}%</small>
        </div>
        <div className="card warning">
          <h3>Risco Médio</h3>
          <p>{stats.medium_risk_count} usuários</p>
        </div>
        <div className="card success">
          <h3>Risco Baixo</h3>
          <p>{stats.low_risk_count} usuários</p>
        </div>
      </div>

      {/* Tabela de Usuários em Risco */}
      <div className="high-risk-table">
        <h2>Usuários de Alto Risco</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Probabilidade Churn</th>
              <th>Ação Recomendada</th>
            </tr>
          </thead>
          <tbody>
            {highRiskUsers.map(user => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.email}</td>
                <td>{(user.churn_probability * 100).toFixed(1)}%</td>
                <td>
                  <button onClick={() => offerDiscount(user.user_id)}>
                    Oferecer Desconto
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

---

## 🔐 Boas Práticas

✅ **Segurança:**
- Use variáveis de ambiente para credenciais
- Valide todos os inputs
- Use HTTPS em produção
- Implemente rate limiting na API

✅ **Performance:**
- Cache resultados por 1 hora
- Use índices no banco para risk_level, churn_probability
- Paginação para grandes datasets

✅ **Monitoramento:**
- Log de todas as predições
- Alerta se score > 0.8
- Dashboard com KPIs
- Matriz de confusão mensal

---

## 📊 Exemplo de Integração Completa

### Fluxo Final:

1. **Novo usuário chega** → Registra no banco
2. **Pipeline ML roda** (semanal) → Gera predições
3. **API expõe score** → Endpoint `/churn-risk/{id}`
4. **Backend chama API** → Obtém score
5. **CRAI analisa** → Decide estratégia
6. **Frontend mostra** → Dashboard para time de retenção
7. **Ações executadas** → Email, desconto, etc
8. **Banco atualizado** → Registra resultado
9. **Próximo ciclo** → Mede efetividade

---

## 🚀 Deploy em Produção

```bash
# 1. Instalar dependências
pip install -r requirements.txt

# 2. Rodar API (com Gunicorn)
gunicorn -w 4 -b 0.0.0.0:8000 app:app

# 3. Configurar Cron para retraining
crontab -e
# Adicione: 0 2 * * 0 /usr/bin/python3 /path/to/schedule_retraining.py

# 4. Monitorar logs
tail -f /var/log/ml-api.log
```

---

## 📞 Suporte

- **Dúvidas sobre ML:** Ver `docs/ARCHITECTURE.md`
- **Erro na API:** Verificar logs em `/api/logs`
- **Atualizar modelo:** Rodar `scripts/04_train.py`

---

**Pronto para integrar sua IA com ML! 🚀**
