## Un juego web tipo Pasapalabra pero de política argentina.

## ¿Qué es esto?

Es básicamente el juego de Pasapalabra pero con preguntas sobre política argentina. Tenés que ir pasando por todas las letras del abecedario y respondiendo preguntas. Si no sabés una respuesta podés usar comodines que te dan pistas.

## Características

- Ruleta que gira de verdad 
- 26 preguntas sobre política argentina (una por cada letra)
- Sistema de usuarios para guardar tu puntuación
- Ranking para ver quién es el mejor
- 3 comodines por partida que te ayudan

## Cómo empezar

Necesitás tener Node.js instalado en tu PC. Si no lo tenés, bajalo de [acá](https://nodejs.org/).

### Opción fácil:
- **Windows:** Hacé doble click en `start.bat`
- **Mac/Linux:** Abrí la terminal y escribí `./start.sh`

### Opción manual:
```
npm install
npm start
```

Después abrí tu navegador y andá a `http://localhost:3000`

## Cómo jugar

1. Registrate o logueate
2. Hacé click en "GIRAR" para girar la ruleta
3. Te va a aparecer una pregunta
4. Escribí tu respuesta
5. Si no sabés, usá un comodín (te quedan 3)
6. Andá completando todas las letras

Cada respuesta correcta son 100 puntos, pero si usás comodines te descuentan 20 puntos por cada uno.

## Lo que usé para hacerlo

- HTML, CSS y JavaScript para el frontend
- Node.js y Express para el backend
- SQLite para guardar los usuarios y puntajes
- Mucha paciencia para hacer que la ruleta gire bien

## Archivos importantes

```
📁 public/          # Todo lo que ve el usuario
📁 server/          # El servidor y la base de datos
📄 start.bat        # Para iniciar en Windows
📄 start.sh         # Para iniciar en Mac/Linux
```

## Si algo no funciona

- **"npm no se reconoce":** Tenés que instalar Node.js
- **"Puerto 3000 en uso":** Alguien más está usando ese puerto, reiniciá la compu o cambiá de puerto
- **La ruleta no gira:** Probablemente tenés JavaScript deshabilitado


---

Hecho por un pibe que se aburría en cuarentena y quería aprender política 🇦🇷
