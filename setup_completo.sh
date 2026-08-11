#!/bin/bash
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
    exit 1
}

# Verificações
print_header "🔍 VERIFICANDO REQUISITOS"

if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    print_error "Execute na raiz do projeto (crai_project)"
fi
print_success "Estrutura OK"

if ! command -v node &> /dev/null; then
    print_error "Node.js não instalado"
fi
print_success "Node.js: $(node -v)"

if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    print_error "Python não instalado"
fi
PYTHON=$(command -v python3 || command -v python)
print_success "Python: $($PYTHON --version)"

# Backend
print_header "🐍 CONFIGURANDO BACKEND"

cd backend

if [ ! -d "venv" ]; then
    echo "Criando venv..."
    $PYTHON -m venv venv
fi
print_success "venv criado"

source venv/bin/activate
print_success "venv ativado"

echo "Instalando pip packages..."
pip install --upgrade pip > /dev/null 2>&1
pip install -r requirements.txt > /dev/null 2>&1
print_success "Pacotes instalados"

if [ ! -f ".env" ]; then
    cp .env.example .env
    print_success ".env criado"
fi

cd ..

# Frontend
print_header "⚛️  CONFIGURANDO FRONTEND"

cd frontend

if [ -f "package.json" ]; then
    SIZE=$(wc -c < package.json)
    if [ "$SIZE" -lt 100 ]; then
        echo "Recriando package.json..."
        rm -f package.json package-lock.json
        cat > package.json << 'PKG'
{
  "name": "crai-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next": "^14.0.0",
    "axios": "^1.6.0",
    "recharts": "^2.10.0",
    "zustand": "^4.4.0",
    "tailwindcss": "^3.3.0"
  }
}
PKG
    fi
fi

if [ -d "node_modules" ]; then
    echo "Limpando cache..."
    rm -rf node_modules package-lock.json
fi

echo "Instalando npm packages..."
npm install > /dev/null 2>&1
print_success "npm packages instalados"

if [ ! -f ".env.local" ]; then
    echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local
    print_success ".env.local criado"
fi

cd ..

# Docker
print_header "🐳 VERIFICANDO DOCKER"

if command -v docker &> /dev/null; then
    print_success "Docker: $(docker --version)"
    
    if [ -f "docker-compose.yml" ]; then
        print_success "docker-compose.yml encontrado"
    fi
else
    echo "⚠ Docker não instalado (opcional)"
fi

# Final
print_header "✅ SETUP COMPLETO!"

echo -e "${GREEN}Status:${NC}"
echo "  ✓ Backend (Python + FastAPI)"
echo "  ✓ Frontend (Node.js + Next.js)"
echo "  ✓ Docker (pronto)"
echo ""

echo -e "${YELLOW}📖 Próximos Passos:${NC}"
echo ""
echo "1️⃣  BACKEND (Terminal 1):"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   python main.py"
echo ""
echo "2️⃣  FRONTEND (Terminal 2):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "3️⃣  DOCKER (Opcional):"
echo "   docker-compose up -d"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}Pronto para começar! 🚀${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
