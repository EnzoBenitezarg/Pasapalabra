# �  Pasapalabra Política Argentina

## � IDescripción del Proyecto

Juego educativo web interactivo basado en el famoso programa "Pasapalabra", adaptado específicamente para enseñar conceptos de política argentina. El juego cuenta con una **ruleta profesional completamente funcional**, sistema de autenticación seguro, ranking online y diseño responsive moderno.

## ✨ Características Principales

### 🎮 **Ruleta Interactiva Profesional**
- **26 segmentos** perfectamente distribuidos (A-Z)
- **Animación realista** con 5-8 vueltas completas
- **Desaceleración gradual** con easing profesional
- **Resaltado visual** del segmento seleccionado
- **Botón central** con efectos hover y animaciones
- **Completamente responsive** para móviles y desktop

### 🔐 **Sistema de Autenticación Completo**
- **Registro de usuarios** con validación
- **Inicio de sesión** seguro con hash SHA-256
- **Validación de datos** en frontend y backend
- **Sesiones persistentes** durante el juego
- **Logout** con limpieza de datos

### 🏆 **Ranking Online Avanzado**
- **Top 10** mejores puntuaciones
- **Destacado especial** para top 3 (oro, plata, bronce)
- **Usuario actual** resaltado en el ranking
- **Fechas** de las puntuaciones
- **Animaciones** de carga escalonadas

### 🎯 **Sistema de Juego Completo**
- **26 preguntas** sobre política argentina
- **3 comodines** por partida que revelan letras
- **Sistema de puntuación** dinámico (100 puntos base - 20 por comodín)
- **Validación** de respuestas en tiempo real
- **Feedback visual** para respuestas correctas/incorrectas

### 🎨 **Diseño Moderno y Profesional**
- **Sistema de diseño** cohesivo con variables CSS
- **Efectos glass** y backdrop blur
- **Gradientes** y animaciones suaves
- **Paleta de colores** profesional
- **Tipografía** clara y legible

## 🚀 Instalación y Uso

### **Requisitos Previos**
- **Node.js** (versión 14 o superior)
- **npm** (incluido con Node.js)

### **Instalación Rápida**

1. **Ejecutar el archivo de inicio:**
   ```bash
   # En Windows
   start.bat
   
   # En Linux/Mac
   chmod +x start.sh && ./start.sh
   ```

2. **O manualmente:**
   ```bash
   # Instalar dependencias
   npm install
   
   # Iniciar servidor
   npm start
   ```

3. **Abrir en navegador:**
   ```
   http://localhost:3000
   ```

## 📁 Estructura del Proyecto

```
pasapalabra-politica-argentina/
├── 📁 public/                 # Frontend
│   ├── 📄 index.html         # Página principal
│   ├── 📁 styles/
│   │   └── 📄 main.css       # Estilos profesionales
│   └── 📁 js/
│       └── 📄 game.js        # Lógica del juego
├── 📁 server/                # Backend
│   ├── 📄 index.js          # Servidor Express
│   ├── 📄 database.js       # Manejo de SQLite
│   └── 📄 game_scores.db    # Base de datos (auto-generada)
├── 📄 package.json          # Dependencias
├── 📄 start.bat            # Inicio rápido Windows
└── 📄 README.md            # Documentación
```

## 🎮 Cómo Jugar

### **1. Registro/Login**
- Crea una cuenta nueva o inicia sesión
- Usuario: 3-20 caracteres (letras, números, _)
- Contraseña: mínimo 6 caracteres

### **2. Mecánica del Juego**
1. **Girar la ruleta** - Presiona el botón central "GIRAR"
2. **Leer la pregunta** - Aparece automáticamente
3. **Escribir respuesta** - En el campo de texto
4. **Usar comodines** - Máximo 3 por partida (revelan letras)
5. **Enviar respuesta** - Presiona "Responder" o Enter

### **3. Sistema de Puntuación**
- **Respuesta correcta:** 100 puntos base
- **Penalización por comodín:** -20 puntos cada uno
- **Ejemplo:** Respuesta correcta con 2 comodines = 60 puntos

### **4. Final del Juego**
- Completa las 26 preguntas (A-Z)
- Ve tu puntuación final
- Guarda tu resultado en el ranking
- Compite por el top 10

## 🔧 Tecnologías Utilizadas

### **Frontend**
- **HTML5** - Estructura semántica
- **CSS3** - Diseño moderno con variables y grid
- **JavaScript ES6+** - Lógica del juego y DOM
- **SVG** - Ruleta vectorial escalable

### **Backend**
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web minimalista
- **SQLite3** - Base de datos ligera
- **Crypto** - Hash de contraseñas SHA-256

### **Características Técnicas**
- **Responsive Design** - Mobile-first approach
- **Progressive Enhancement** - Funciona sin JavaScript básico
- **Accessibility** - Navegación por teclado
- **Performance** - Optimizado para carga rápida

## 🌐 API Endpoints

### **Autenticación**
```http
POST /api/auth/register
POST /api/auth/login
```

### **Puntuaciones**
```http
GET  /api/scores           # Top 10 ranking
POST /api/scores           # Guardar puntuación
GET  /api/scores/user/:username  # Puntuaciones de usuario
```

### **Estadísticas**
```http
GET  /api/stats            # Estadísticas del juego
```

## 📊 Base de Datos

### **Tabla: users**
- `id` - Identificador único
- `username` - Nombre de usuario (único)
- `password` - Hash SHA-256
- `created_at` - Fecha de registro

### **Tabla: scores**
- `id` - Identificador único
- `name` - Nombre del jugador
- `score` - Puntuación obtenida
- `date` - Fecha del juego
- `user_id` - Referencia al usuario (opcional)
- `created_at` - Timestamp de creación

## 🎯 Preguntas del Juego

El juego incluye 26 preguntas sobre conceptos fundamentales de política argentina:

- **A** - Anticorrupción
- **B** - Diputados (Cámara baja)
- **C** - Constitución
- **D** - Democracia
- **E** - Elecciones
- **F** - Federalismo
- **G** - Gobierno
- **H** - Ejecutivo (Poder)
- **I** - Igualdad
- **J** - Judicial (Poder)
- **K** - Liberalismo
- **L** - Legislativo (Poder)
- **M** - Referéndum
- **N** - Normas
- **O** - Ombudsman
- **P** - Partido (político)
- **Q** - Quórum
- **R** - República
- **S** - Senado
- **T** - Tributo
- **U** - Unitarismo
- **V** - Voto
- **W** - Web (oficial)
- **X** - Xenofobia
- **Y** - Yrigoyenismo
- **Z** - Zona (territorial)

## 🔒 Seguridad

### **Validaciones Implementadas**
- **Sanitización** de entradas de usuario
- **Hash SHA-256** para contraseñas
- **Validación** de puntuaciones (0-2600 puntos máximo)
- **Prevención XSS** con escape de caracteres
- **Rate limiting** preparado para implementar

### **Buenas Prácticas**
- Contraseñas nunca almacenadas en texto plano
- Validación tanto en frontend como backend
- Manejo seguro de errores sin exposición de datos
- Conexiones de base de datos con prepared statements

## 📱 Responsive Design

### **Breakpoints**
- **Desktop:** > 768px - Experiencia completa
- **Tablet:** 768px - Diseño adaptativo
- **Mobile:** < 480px - Interfaz vertical optimizada

### **Adaptaciones Móviles**
- Ruleta escalable automáticamente
- Botones táctiles optimizados
- Texto legible en pantallas pequeñas
- Navegación simplificada

## 🎨 Personalización

### **Variables CSS Disponibles**
```css
:root {
  --primary-500: #0ea5e9;    /* Color principal */
  --accent-500: #d946ef;     /* Color de acento */
  --success-500: #22c55e;    /* Color de éxito */
  --error-500: #ef4444;      /* Color de error */
  /* ... más variables disponibles */
}
```

### **Modificar Preguntas**
Edita el objeto `QUESTIONS` en `/public/js/game.js`:
```javascript
const QUESTIONS = {
    A: { 
        question: "Tu pregunta aquí", 
        answer: "RESPUESTA", 
        hint: "Pista opcional" 
    },
    // ...
};
```

## 🚀 Despliegue

### **Desarrollo Local**
```bash
npm run dev    # Con nodemon para auto-reload
```

### **Producción**
```bash
npm start      # Servidor de producción
```

### **Variables de Entorno**
```bash
PORT=3000      # Puerto del servidor (opcional)
NODE_ENV=production  # Modo de producción
```

## 🤝 Contribuciones

### **Cómo Contribuir**
1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### **Áreas de Mejora**
- [ ] Más preguntas y categorías
- [ ] Sistema de niveles de dificultad
- [ ] Modo multijugador
- [ ] Estadísticas avanzadas
- [ ] Temas personalizables
- [ ] Sonidos y música
- [ ] Modo offline

## 📞 Soporte

### **Problemas Comunes**

**Error: "npm no se reconoce"**
- Instalar Node.js desde https://nodejs.org/

**Error: "Puerto 3000 en uso"**
- Cambiar puerto: `PORT=3001 npm start`

**Base de datos no se crea**
- Verificar permisos de escritura en carpeta `/server/`

**Ruleta no gira**
- Verificar que JavaScript esté habilitado
- Revisar consola del navegador para errores

### **Logs del Servidor**
El servidor muestra información útil en la consola:
```
✅ Conectado a la base de datos SQLite
✅ Tablas e índices creados correctamente
🚀 Servidor ejecutándose en http://localhost:3000
```

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Ver archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- Inspirado en el programa de televisión "Pasapalabra"
- Contenido educativo sobre política argentina
- Comunidad de desarrolladores JavaScript
- Diseño inspirado en interfaces modernas

---

**¡Disfruta aprendiendo sobre política argentina de manera divertida e interactiva!** 🇦🇷✨