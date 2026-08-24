# KKBox Churn Prediction - ML Data Pipeline

## 📊 Visão Geral

Pipeline de dados para previsão de churn de usuários no KKBox. Arquitetura modular para processamento, feature engineering e treinamento de modelos de IA.

## 🗂️ Estrutura do Projeto

```
kkbox-ml-pipeline/
├── 1_raw_data/           # Dados brutos (7z comprimidos)
├── 2_extracted_data/     # Dados extraídos (CSV)
├── 3_processed_data/     # Dados limpos e normalizados
├── 4_features/           # Features engineered para ML
├── 5_models/             # Modelos treinados
├── 6_predictions/        # Predictions e resultados
├── scripts/              # Python scripts para pipeline
├── notebooks/            # Jupyter notebooks para análise
├── config/               # Configurações (paths, params)
├── docs/                 # Documentação
└── README.md
```

## 📈 Pipeline de Dados

### Etapa 1: Extração (1_raw_data → 2_extracted_data)
- Descompactar arquivos `.7z`
- Validar integridade dos dados
- Criar metadados dos arquivos

**Arquivos esperados:**
- `members_v3.csv` - Dados dos membros (id, idade, gênero, etc)
- `train.csv` - Labels de churn (msno, churn)
- `transactions.csv` - Transações (msno, data, valor, etc)
- `user_logs.csv` - Logs de uso (msno, data, ações)

### Etapa 2: Processamento (2_extracted_data → 3_processed_data)
- Limpeza de valores nulos
- Remoção de duplicatas
- Normalização de datas e valores numéricos
- Validação de ranges

### Etapa 3: Feature Engineering (3_processed_data → 4_features)
- Agregações por usuário:
  - Total gasto, frequência de transações
  - Dias ativos, padrões de uso
  - Tendências (últimos 30, 90 dias)
- Features temporais
- Features comportamentais
- Encoding de variáveis categóricas

### Etapa 4: Treinamento (4_features → 5_models)
- Split train/validation/test
- Balanceamento de classes (churn desbalanceado)
- Hyperparameter tuning
- Cross-validation

### Etapa 5: Predição (5_models → 6_predictions)
- Inference em dados novos
- Calibração de probabilidades
- Exportação de resultados

## 🛠️ Tecnologias

- **Python 3.9+**
- **Pandas** - Manipulação de dados
- **Scikit-learn** - ML básico
- **XGBoost/LightGBM** - Modelos principais
- **Plotly** - Visualizações
- **SQLite** - Cache de dados processados

## 📝 Como Usar

### 1. Extrair dados brutos
```bash
python scripts/01_extract.py
```

### 2. Processar dados
```bash
python scripts/02_process.py
```

### 3. Feature engineering
```bash
python scripts/03_features.py
```

### 4. Treinar modelos
```bash
python scripts/04_train.py
```

### 5. Fazer predições
```bash
python scripts/05_predict.py
```

## 📊 Variáveis Chave

### Target
- **churn**: 0 (não cancelou) ou 1 (cancelou) [label: 30 dias após última transação]

### Features Principais
- Dados demográficos (idade, gênero, país)
- Histórico de pagamento (total, frequência, recência)
- Padrões de uso (dias ativos, horas de uso)
- Tendências (crescimento/decaimento)

## ⚡ Performance

- **Volume esperado:** ~900k registros de usuários
- **Features engineered:** ~50-100 features
- **Tempo de processamento:** ~10-30 min (dep. hardware)
- **Modelo:** ~5-15 min treino (XGBoost)

## 📌 Próximos Passos

1. [ ] Extrair e explorar dados brutos
2. [ ] Criar pipeline de limpeza
3. [ ] Enginear features
4. [ ] Treinar baseline model
5. [ ] Otimizar hyperparameters
6. [ ] Validar em produção

---

**Última atualização:** 2026-08-24
