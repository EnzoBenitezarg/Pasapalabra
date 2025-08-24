const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
    constructor() {
        this.dbPath = path.join(__dirname, 'game_scores.db');
        this.db = null;
        this.init();
    }
    
    init() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.dbPath, (err) => {
                if (err) {
                    console.error('Error al conectar con la base de datos:', err);
                    reject(err);
                } else {
                    console.log('✅ Conectado a la base de datos SQLite');
                    this.createTables().then(resolve).catch(reject);
                }
            });
        });
    }
    
    createTables() {
        return new Promise((resolve, reject) => {
            const createUsersTable = `
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `;
            
            const createScoresTable = `
                CREATE TABLE IF NOT EXISTS scores (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    score INTEGER NOT NULL,
                    date TEXT NOT NULL,
                    user_id INTEGER,
                    total_time INTEGER DEFAULT 0,
                    correct_answers INTEGER DEFAULT 0,
                    wildcards_used INTEGER DEFAULT 0,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users (id)
                )
            `;
            
            const createIndexes = `
                CREATE INDEX IF NOT EXISTS idx_username ON users(username);
                CREATE INDEX IF NOT EXISTS idx_score_desc ON scores(score DESC);
                CREATE INDEX IF NOT EXISTS idx_date ON scores(date);
                CREATE INDEX IF NOT EXISTS idx_user_id ON scores(user_id);
            `;
            
            this.db.run(createUsersTable, (err) => {
                if (err) {
                    console.error('Error al crear tabla users:', err);
                    reject(err);
                } else {
                    this.db.run(createScoresTable, (err) => {
                        if (err) {
                            console.error('Error al crear tabla scores:', err);
                            reject(err);
                        } else {
                            this.db.run(createIndexes, (err) => {
                                if (err) {
                                    console.error('Error al crear índices:', err);
                                    reject(err);
                                } else {
                                    console.log('✅ Tablas e índices creados correctamente');
                                    resolve();
                                }
                            });
                        }
                    });
                }
            });
        });
    }
    
    // Funciones de Usuarios
    createUser(username, hashedPassword) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO users (username, password)
                VALUES (?, ?)
            `;
            
            this.db.run(query, [username, hashedPassword], function(err) {
                if (err) {
                    console.error('Error al crear usuario:', err);
                    reject(err);
                } else {
                    console.log(`✅ Usuario creado: ${username}`);
                    resolve(this.lastID);
                }
            });
        });
    }
    
    getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT id, username, password, created_at
                FROM users
                WHERE username = ?
            `;
            
            this.db.get(query, [username], (err, row) => {
                if (err) {
                    console.error('Error al buscar usuario:', err);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }
    
    getUserById(userId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT id, username, created_at
                FROM users
                WHERE id = ?
            `;
            
            this.db.get(query, [userId], (err, row) => {
                if (err) {
                    console.error('Error al buscar usuario por ID:', err);
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }
    
    saveScore(name, score, date) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO scores (name, score, date)
                VALUES (?, ?, ?)
            `;
            
            this.db.run(query, [name, score, date], function(err) {
                if (err) {
                    console.error('Error al guardar puntuación:', err);
                    reject(err);
                } else {
                    console.log(`✅ Puntuación guardada: ${name} - ${score} puntos`);
                    resolve(this.lastID);
                }
            });
        });
    }
    
    // Función mejorada para guardar puntuación con usuario y estadísticas
    saveScoreWithUser(username, score, date, userId = null, totalTime = 0, correctAnswers = 0, wildcardsUsed = 0) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO scores (name, score, date, user_id, total_time, correct_answers, wildcards_used)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            
            this.db.run(query, [username, score, date, userId, totalTime, correctAnswers, wildcardsUsed], function(err) {
                if (err) {
                    console.error('Error al guardar puntuación:', err);
                    reject(err);
                } else {
                    console.log(`✅ Puntuación guardada: ${username} - ${score} puntos (${Math.floor(totalTime/1000)}s)`);
                    resolve(this.lastID);
                }
            });
        });
    }
    
    getTopScores(limit = 10) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT name, score, date, total_time as totalTime, correct_answers, wildcards_used, created_at
                FROM scores
                ORDER BY score DESC, total_time ASC, created_at ASC
                LIMIT ?
            `;
            
            this.db.all(query, [limit], (err, rows) => {
                if (err) {
                    console.error('Error al obtener puntuaciones:', err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    
    getScoresByPlayer(playerName) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT name, score, date, created_at
                FROM scores
                WHERE name = ?
                ORDER BY score DESC, created_at DESC
            `;
            
            this.db.all(query, [playerName], (err, rows) => {
                if (err) {
                    console.error('Error al obtener puntuaciones del jugador:', err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    
    // Obtener puntuaciones de un usuario específico
    getScoresByUserId(userId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT s.id, s.name, s.score, s.date, s.created_at, u.username
                FROM scores s
                LEFT JOIN users u ON s.user_id = u.id
                WHERE s.user_id = ?
                ORDER BY s.score DESC, s.created_at DESC
            `;
            
            this.db.all(query, [userId], (err, rows) => {
                if (err) {
                    console.error('Error al obtener puntuaciones del usuario:', err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    
    getGameStats() {
        return new Promise((resolve, reject) => {
            const queries = {
                totalGames: 'SELECT COUNT(*) as count FROM scores',
                averageScore: 'SELECT AVG(score) as average FROM scores',
                highestScore: 'SELECT MAX(score) as highest FROM scores',
                lowestScore: 'SELECT MIN(score) as lowest FROM scores',
                totalPlayers: 'SELECT COUNT(DISTINCT name) as count FROM scores'
            };
            
            const stats = {};
            const promises = Object.keys(queries).map(key => {
                return new Promise((resolve, reject) => {
                    this.db.get(queries[key], (err, row) => {
                        if (err) {
                            reject(err);
                        } else {
                            stats[key] = row;
                            resolve();
                        }
                    });
                });
            });
            
            Promise.all(promises)
                .then(() => resolve(stats))
                .catch(reject);
        });
    }
    
    // Obtener estadísticas mejoradas incluyendo usuarios
    getEnhancedGameStats() {
        return new Promise((resolve, reject) => {
            const queries = {
                totalGames: 'SELECT COUNT(*) as count FROM scores',
                totalUsers: 'SELECT COUNT(*) as count FROM users',
                averageScore: 'SELECT AVG(score) as average FROM scores',
                highestScore: 'SELECT MAX(score) as highest FROM scores',
                lowestScore: 'SELECT MIN(score) as lowest FROM scores',
                totalPlayers: 'SELECT COUNT(DISTINCT name) as count FROM scores',
                registeredPlayers: 'SELECT COUNT(DISTINCT user_id) as count FROM scores WHERE user_id IS NOT NULL'
            };
            
            const stats = {};
            const promises = Object.keys(queries).map(key => {
                return new Promise((resolve, reject) => {
                    this.db.get(queries[key], (err, row) => {
                        if (err) {
                            reject(err);
                        } else {
                            stats[key] = row;
                            resolve();
                        }
                    });
                });
            });
            
            Promise.all(promises)
                .then(() => resolve(stats))
                .catch(reject);
        });
    }
    
    deleteOldScores(daysOld = 30) {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM scores
                WHERE created_at < datetime('now', '-${daysOld} days')
            `;
            
            this.db.run(query, function(err) {
                if (err) {
                    console.error('Error al eliminar puntuaciones antiguas:', err);
                    reject(err);
                } else {
                    console.log(`✅ Eliminadas ${this.changes} puntuaciones antiguas`);
                    resolve(this.changes);
                }
            });
        });
    }
    
    close() {
        if (this.db) {
            this.db.close((err) => {
                if (err) {
                    console.error('Error al cerrar la base de datos:', err);
                } else {
                    console.log('✅ Conexión a la base de datos cerrada');
                }
            });
        }
    }
}

module.exports = Database; 
   
    // Obtener estadísticas de un usuario específico
    getUserStats(userId) {
        return new Promise((resolve, reject) => {
            const queries = {
                totalGames: `SELECT COUNT(*) as count FROM scores WHERE user_id = ?`,
                bestScore: `SELECT MAX(score) as score FROM scores WHERE user_id = ?`,
                averageScore: `SELECT AVG(score) as average FROM scores WHERE user_id = ?`,
                totalTime: `SELECT SUM(total_time) as total FROM scores WHERE user_id = ?`,
                averageTime: `SELECT AVG(total_time) as average FROM scores WHERE user_id = ?`,
                correctAnswers: `SELECT SUM(correct_answers) as total FROM scores WHERE user_id = ?`,
                wildcardsUsed: `SELECT SUM(wildcards_used) as total FROM scores WHERE user_id = ?`
            };
            
            const stats = {};
            const promises = Object.keys(queries).map(key => {
                return new Promise((resolve, reject) => {
                    this.db.get(queries[key], [userId], (err, row) => {
                        if (err) {
                            reject(err);
                        } else {
                            stats[key] = row;
                            resolve();
                        }
                    });
                });
            });
            
            Promise.all(promises)
                .then(() => resolve(stats))
                .catch(reject);
        });
    }
    
    // Obtener ranking de un usuario específico
    getUserRank(userId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT COUNT(*) + 1 as rank
                FROM (
                    SELECT user_id, MAX(score) as max_score
                    FROM scores
                    WHERE user_id IS NOT NULL
                    GROUP BY user_id
                ) ranked
                WHERE max_score > (
                    SELECT MAX(score)
                    FROM scores
                    WHERE user_id = ?
                )
            `;
            
            this.db.get(query, [userId], (err, row) => {
                if (err) {
                    console.error('Error al obtener ranking del usuario:', err);
                    reject(err);
                } else {
                    resolve(row ? row.rank : null);
                }
            });
        });
    }
    
    // Obtener partidas recientes de un usuario
    getRecentGamesByUser(userId, limit = 5) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT score, date, total_time, correct_answers, wildcards_used, created_at
                FROM scores
                WHERE user_id = ?
                ORDER BY created_at DESC
                LIMIT ?
            `;
            
            this.db.all(query, [userId, limit], (err, rows) => {
                if (err) {
                    console.error('Error al obtener partidas recientes:', err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }