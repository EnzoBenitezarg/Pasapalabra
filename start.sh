#!/bin/bash

echo "========================================"
echo "  PASAPALABRA - POLÍTICA ARGENTINA"
echo "========================================"
echo ""
echo "Iniciando servidor..."
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js no está instalado."
    echo "Por favor instala Node.js desde: https://nodejs.org/"
    echo ""
    exit 1
fi

# Verificar si las dependencias están instaladas
if [ ! -d "node_modules" ]; then
    echo "Instalando dependencias..."
    npm install
    echo ""
fi

# Iniciar el servidor
echo "Servidor iniciando en http://localhost:3000"
echo "Presiona Ctrl+C para detener el servidor"
echo ""
npm start