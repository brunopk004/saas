#!/bin/bash

# Script para iniciar o FitTracker Pro em modo desenvolvimento
echo "🏋️‍♀️ Iniciando FitTracker Pro - SaaS para Atletas Amadores"
echo "=================================================="

# Verificar se as dependências foram instaladas
if [ ! -d "api/node_modules" ]; then
    echo "📦 Instalando dependências da API..."
    cd api && yarn install && cd ..
fi

if [ ! -d "app/node_modules" ]; then
    echo "📦 Instalando dependências do App..."
    cd app && yarn install && cd ..
fi

echo ""
echo "🚀 Iniciando serviços..."
echo ""

# Iniciar API em background
echo "🔧 Iniciando API na porta 8000..."
cd api && yarn dev &
API_PID=$!

# Aguardar um pouco para a API inicializar
sleep 3

# Iniciar App
echo "🌐 Iniciando App na porta 3000..."
cd ../app && yarn dev &
APP_PID=$!

echo ""
echo "✅ FitTracker Pro iniciado com sucesso!"
echo ""
echo "📱 App Frontend: http://localhost:3000"
echo "🔧 API Backend:  http://localhost:8000"
echo ""
echo "Para parar os serviços, pressione Ctrl+C"
echo ""

# Aguardar por Ctrl+C
trap 'echo ""; echo "🛑 Parando serviços..."; kill $API_PID $APP_PID; exit 0' INT

# Manter o script rodando
wait