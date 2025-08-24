const express = require('express');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const Database = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Inicializar base de datos
const db = new Database();

// Función para hashear contraseñas
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Rutas de Autenticación
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Validación
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                error: 'Usuario y contraseña son requeridos'
            });
        }
        
        // Validar nombre de usuario
        if (username.length < 3 || username.length > 20) {
            return res.status(400).json({
                success: false,
                error: 'El nombre de usuario debe tener entre 3 y 20 caracteres'
            });
        }
        
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9_]+$/.test(username)) {
            return res.status(400).json({
                success: false,
                error: 'El nombre de usuario solo puede contener letras, números y guiones bajos'
            });
        }
        
        // Validar contraseña
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                error: 'La contraseña debe tener al menos 6 caracteres'
            });
        }
        
        // Verificar si el usuario ya existe
        const existingUser = await db.getUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: 'El nombre de usuario ya está en uso'
            });
        }
        
        // Crear usuario
        const hashedPassword = hashPassword(password);
        const userId = await db.createUser(username, hashedPassword);
        
        res.json({
            success: true,
            message: 'Usuario creado exitosamente',
            userId: userId
        });
        
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Validación
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                error: 'Usuario y contraseña son requeridos'
            });
        }
        
        // Buscar usuario
        const user = await db.getUserByUsername(username);
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Usuario o contraseña incorrectos'
            });
        }
        
        // Verificar contraseña
        const hashedPassword = hashPassword(password);
        if (user.password !== hashedPassword) {
            return res.status(401).json({
                success: false,
                error: 'Usuario o contraseña incorrectos'
            });
        }
        
        // Login exitoso
        res.json({
            success: true,
            message: 'Login exitoso',
            user: {
                id: user.id,
                username: user.username,
                created_at: user.created_at
            }
        });
        
    } catch (error) {
        console.error('Error al hacer login:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
});

// Rutas API
app.get('/api/scores', async (req, res) => {
    try {
        const scores = await db.getTopScores(10);
        res.json({
            success: true,
            scores: scores
        });
    } catch (error) {
        console.error('Error al obtener puntuaciones:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
});

app.post('/api/scores', async (req, res) => {
    try {
        const { username, score, date, totalTime, correctAnswers, wildcardsUsed } = req.body;
        
        // Validación
        if (!username || typeof score !== 'number' || !date) {
            return res.status(400).json({
                success: false,
                error: 'Datos inválidos'
            });
        }
        
        // Validar nombre de usuario
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9_]{1,20}$/.test(username)) {
            return res.status(400).json({
                success: false,
                error: 'Nombre de usuario inválido'
            });
        }
        
        // Validar puntuación (debe ser positiva y razonable)
        if (score < 0 || score > 3000) { // Aumentado para incluir bonificaciones
            return res.status(400).json({
                success: false,
                error: 'Puntuación inválida'
            });
        }
        
        // Validar tiempo (debe ser razonable - máximo 1 hora)
        if (totalTime && (totalTime < 0 || totalTime > 3600000)) {
            return res.status(400).json({
                success: false,
                error: 'Tiempo de juego inválido'
            });
        }
        
        // Buscar el usuario para obtener su ID
        const user = await db.getUserByUsername(username);
        const userId = user ? user.id : null;
        
        const scoreId = await db.saveScoreWithUser(
            username.trim(), 
            score, 
            date, 
            userId,
            totalTime || 0,
            correctAnswers || 0,
            wildcardsUsed || 0
        );
        
        res.json({
            success: true,
            id: scoreId,
            message: 'Puntuación guardada exitosamente'
        });
        
    } catch (error) {
        console.error('Error al guardar puntuación:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
});

// Ruta para obtener estadísticas mejoradas
app.get('/api/stats', async (req, res) => {
    try {
        const stats = await db.getEnhancedGameStats();
        res.json({
            success: true,
            stats: stats
        });
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
});

// Ruta para obtener puntuaciones de un usuario específico
app.get('/api/scores/user/:username', async (req, res) => {
    try {
        const { username } = req.params;
        
        // Buscar usuario
        const user = await db.getUserByUsername(username);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Usuario no encontrado'
            });
        }
        
        const scores = await db.getScoresByUserId(user.id);
        res.json({
            success: true,
            scores: scores,
            user: {
                username: user.username,
                created_at: user.created_at
            }
        });
    } catch (error) {
        console.error('Error al obtener puntuaciones del usuario:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
});

// Servir la aplicación
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Ruta no encontrada'
    });
});

// Manejo de errores globales
app.use((error, req, res, next) => {
    console.error('Error no manejado:', error);
    res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📊 API disponible en http://localhost:${PORT}/api`);
    console.log(`🎮 Juego disponible en http://localhost:${PORT}`);
});

// Manejo de cierre graceful
process.on('SIGINT', () => {
    console.log('\n🛑 Cerrando servidor...');
    db.close();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Cerrando servidor...');
    db.close();
    process.exit(0);
})

app.get('/api/profile/:username', async (req, res) => {
    try {
        const { username } = req.params;
        
        // Buscar usuario
        const user = await db.getUserByUsername(username);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Usuario no encontrado'
            });
        }
        
        // Obtener estadísticas del usuario
        const stats = await db.getUserStats(user.id);
        const rank = await db.getUserRank(user.id);
        const recentGames = await db.getRecentGamesByUser(user.id);
        
        res.json({
            success: true,
            profile: {
                username: user.username,
                memberSince: user.created_at,
                stats: stats,
                rank: rank,
                recentGames: recentGames
            }
        });
    } catch (error) {
        console.error('Error al obtener perfil:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
});

// Ruta para obtener estadísticas de bienvenida del usuario
app.get('/api/user-welcome/:username', async (req, res) => {
    try {
        const { username } = req.params;
        
        const user = await db.getUserByUsername(username);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'Usuario no encontrado'
            });
        }
        
        const bestScoreQuery = await db.getUserStats(user.id);
        const totalGamesQuery = await db.getUserStats(user.id);
        
        res.json({
            success: true,
            welcomeData: {
                bestScore: bestScoreQuery.bestScore?.score || 0,
                totalGames: totalGamesQuery.totalGames?.count || 0
            }
        });
    } catch (error) {
        console.error('Error al obtener datos de bienvenida:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
});