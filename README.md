# 🎯 Pasapalabra Política Argentina

<div align="center">

![Pasapalabra Logo](https://img.shields.io/badge/Pasapalabra-Política%20Argentina-blue?style=for-the-badge&logo=gamepad)

**Juego educativo interactivo con ruleta profesional, sistema de autenticación y ranking online**

[![Node.js](https://img.shields.io/badge/Node.js-14+-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-blue?style=flat-square&logo=express)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3+-orange?style=flat-square&logo=sqlite)](https://sqlite.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[🚀 Inicio Rápido](#-inicio-rápido) • [🎮 Características](#-características) • [📖 Documentación](#-documentación) • [🤝 Contribuir](#-contribuir)

</div>

---

## 📋 Descripción

**Pasapalabra Política Argentina** es un juego educativo web que combina diversión y aprendizaje sobre conceptos fundamentales de la política argentina. Inspirado en el famoso programa de televisión, cuenta con una **ruleta interactiva completamente funcional**, sistema de usuarios seguro y ranking competitivo online.

### 🎯 **Objetivo Educativo**
Enseñar de manera interactiva y entretenida los conceptos básicos de la política argentina, desde la Constitución hasta el sistema federal, pasando por los poderes del Estado y los derechos ciudadanos.

---

## ✨ Características

### 🎮 **Ruleta Profesional**
- **26 segmentos** perfectamente distribuidos (A-Z)
- **Animación realista** con física de desaceleración
- **Diseño SVG escalable** y responsive
- **Efectos visuales** profesionales
- **Sonidos sintéticos** opcionales

### 🔐 **Sistema de Usuarios**
- **Registro seguro** con validación
- **Autenticación** con hash SHA-256
- **Sesiones persistentes**
- **Validación robusta** de datos

### 🏆 **Ranking Competitivo**
- **Top 10** mejores puntuaciones
- **Destacados especiales** para el podio
- **Fechas** de las partidas
- **Usuario actual** resaltado

### 🎯 **Mecánica de Juego**
- **26 preguntas** sobre política argentina
- **Sistema de comodines** (3 por partida)
- **Puntuación dinámica** (100 - 20 por comodín)
- **Feedback inmediato** visual y textual

### 🎨 **Diseño Moderno**
- **Responsive design** mobile-first
- **Efectos glass** y blur
- **Animaciones suaves** CSS3
- **Paleta profesional** de colores
- **Tipografía optimizada**

---

## 🚀 Inicio Rápido

### **Método 1: Automático**
```bash
# Windows
start.bat

# Linux/Mac
chmod +x start.sh && ./start.sh
```

### **Método 2: Manual**
```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor
npm start

# 3. Abrir navegador
# http://localhost:3000
```

### **Requisitos**
- **Node.js** 14+ ([Descargar](https://nodejs.org/))
- **npm** 6+ (incluido con Node.js)

---

## 🎮 Cómo Jugar

### **1. 🔐 Autenticación**
- **Registrarse:** Usuario (3-20 chars) + Contraseña (6+ chars)
- **Iniciar sesión:** Con credenciales existentes

### **2. 🎯 Mecánica**
1. **Girar ruleta** → Presionar botón central "GIRAR"
2. **Leer pregunta** → Aparece automáticamente
3. **Escribir respuesta** → En el campo de texto
4. **Usar comodines** → Máximo 3 (revelan letras)
5. **Enviar** → Botón "Responder" o tecla Enter

### **3. 📊 Puntuación**
- **Base:** 100 puntos por respuesta correcta
- **Penalización:** -20 puntos por comodín usado
- **Ejemplo:** Correcta con 2 comodines = 60 puntos

### **4. 🏁 Final**
- Completar 26 preguntas (A-Z)
- Ver puntuación total
- Guardar en ranking
- Competir por el top 10

---

## 🛠️ Tecnologías

<div align="center">

| Frontend | Backend | Base de Datos | Herramientas |
|----------|---------|---------------|--------------|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) | ![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white) | ![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white) |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) | ![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white) | ![Crypto](https://img.shields.io/badge/Crypto-SHA256-orange?style=flat-square) | ![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white) |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | ![CORS](https://img.shields.io/badge/CORS-Enabled-green?style=flat-square) | | |
| ![SVG](https://img.shields.io/badge/SVG-Graphics-blue?style=flat-square) | | | |

</div>

---

## 📁 Estructura del Proyecto

```
📦 pasapalabra-politica-argentina/
├── 📁 public/                    # 🎨 Frontend
│   ├── 📄 index.html             # Página principal
│   ├── 📁 js/
│   │   └── 📄 game.js            # Lógica del juego
│   └── 📁 styles/
│       └── 📄 main.css           # Estilos profesionales
├── 📁 server/                    # ⚙️ Backend
│   ├── 📄 index.js               # Servidor Express
│   ├── 📄 database.js            # Manejo SQLite
│   └── 📄 game_scores.db         # BD (auto-generada)
├── 📄 package.json               # Dependencias
├── 📄 start.bat                  # Inicio Windows
├── 📄 start.sh                   # Inicio Unix
├── 📄 README.md                  # Este archivo
└── 📄 INSTRUCCIONES.md           # Guía detallada
```

---

## 🌐 API Endpoints

### **🔐 Autenticación**
```http
POST /api/auth/register    # Crear cuenta
POST /api/auth/login       # Iniciar sesión
```

### **🏆 Puntuaciones**
```http
GET  /api/scores                    # Top 10 ranking
POST /api/scores                    # Guardar puntuación
GET  /api/scores/user/:username     # Puntuaciones de usuario
```

### **📊 Estadísticas**
```http
GET  /api/stats            # Estadísticas generales
```

---

## 📖 Documentación

### **🎯 Preguntas Incluidas**
El juego cubre 26 conceptos fundamentales:

| Letra | Concepto | Respuesta |
|-------|----------|-----------|
| **A** | Organismo anticorrupción | ANTICORRUPCION |
| **B** | Cámara baja del Congreso | DIPUTADOS |
| **C** | Ley suprema del país | CONSTITUCION |
| **D** | Gobierno del pueblo | DEMOCRACIA |
| **E** | Proceso de votación | ELECCIONES |
| **F** | Sistema territorial argentino | FEDERALISMO |
| **G** | Administración del Estado | GOBIERNO |
| **H** | Poder que ejecuta leyes | EJECUTIVO |
| **I** | Principio de equidad | IGUALDAD |
| **J** | Poder que imparte justicia | JUDICIAL |
| ... | ... | ... |

### **🔒 Seguridad**
- **Contraseñas:** Hash SHA-256
- **Validación:** Frontend + Backend
- **Sanitización:** Prevención XSS
- **Rate Limiting:** Preparado para implementar

### **📱 Responsive**
- **Desktop:** > 768px (experiencia completa)
- **Tablet:** 768px (adaptativo)
- **Mobile:** < 480px (optimizado táctil)

---

## 🚀 Despliegue

### **Desarrollo**
```bash
npm run dev    # Con auto-reload
```

### **Producción**
```bash
npm start      # Servidor optimizado
```

### **Variables de Entorno**
```bash
PORT=3000              # Puerto del servidor
NODE_ENV=production    # Modo producción
```

---

## 🤝 Contribuir

### **Cómo Contribuir**
1. **Fork** del repositorio
2. **Crear rama:** `git checkout -b feature/nueva-funcionalidad`
3. **Commit:** `git commit -m 'Agregar funcionalidad X'`
4. **Push:** `git push origin feature/nueva-funcionalidad`
5. **Pull Request:** Describir cambios

### **Áreas de Mejora**
- [ ] 🎵 Sistema de sonidos
- [ ] 🌍 Más categorías temáticas
- [ ] 👥 Modo multijugador
- [ ] 📊 Estadísticas avanzadas
- [ ] 🎨 Temas personalizables
- [ ] 📱 App móvil nativa
- [ ] 🔄 Modo offline

---

## 📞 Soporte

### **Problemas Comunes**

<details>
<summary><strong>❌ "npm no se reconoce"</strong></summary>

**Solución:** Instalar Node.js desde [nodejs.org](https://nodejs.org/)
</details>

<details>
<summary><strong>❌ "Puerto 3000 en uso"</strong></summary>

**Solución:** Cambiar puerto con `PORT=3001 npm start`
</details>

<details>
<summary><strong>❌ "Base de datos no se crea"</strong></summary>

**Solución:** Verificar permisos de escritura en `/server/`
</details>

<details>
<summary><strong>❌ "Ruleta no gira"</strong></summary>

**Solución:** 
- Verificar JavaScript habilitado
- Revisar consola del navegador
- Actualizar navegador
</details>

### **Logs del Servidor**
```bash
✅ Conectado a la base de datos SQLite
✅ Tablas e índices creados correctamente  
🚀 Servidor ejecutándose en http://localhost:3000
📊 API disponible en http://localhost:3000/api
🎮 Juego disponible en http://localhost:3000
```

---

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Ver [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

- 📺 Inspirado en el programa "Pasapalabra"
- 🇦🇷 Contenido educativo sobre política argentina
- 👥 Comunidad de desarrolladores JavaScript
- 🎨 Diseño inspirado en interfaces modernas

---

<div align="center">

**¡Desarrollado con ❤️ para la educación cívica argentina!**

[⬆️ Volver arriba](#-pasapalabra-política-argentina)

</div>