// Configuración del juego
const GAME_CONFIG = {
    totalQuestions: 26,
    maxWildcards: 3,
    baseScore: 100,
    wildcardPenalty: 20,
    speedBonus: 10,
    streakBonus: 5,
    speedThreshold: 10000, // 10 segundos
    apiUrl: 'http://localhost:3000/api'
};

// Tipos de pistas para comodines
const HINT_TYPES = {
    FIRST_LETTER: 'first_letter',
    CATEGORY: 'category', 
    LENGTH: 'length',
    REVEAL_LETTER: 'reveal_letter'
};

// Letras del alfabeto inglés (A-Z)
const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Preguntas del juego organizadas por letra con categorías
const QUESTIONS = {
    A: { question: "Organismo que controla la administración pública y combate la corrupción", answer: "ANTICORRUPCION", category: "institución", hint: "Oficina que investiga irregularidades" },
    B: { question: "Cámara baja del Congreso Nacional argentino", answer: "DIPUTADOS", category: "poder legislativo", hint: "Se renueva cada dos años" },
    C: { question: "Documento fundamental que establece la organización del Estado argentino", answer: "CONSTITUCION", category: "documento legal", hint: "Ley suprema de 1853" },
    D: { question: "Sistema político donde el poder emana del pueblo", answer: "DEMOCRACIA", category: "sistema político", hint: "Gobierno del pueblo, por el pueblo y para el pueblo" },
    E: { question: "Proceso mediante el cual los ciudadanos eligen a sus representantes", answer: "ELECCIONES", category: "proceso democrático", hint: "Se realizan cada cierto período de tiempo" },
    F: { question: "Sistema de organización territorial donde coexisten gobierno nacional y provinciales", answer: "FEDERALISMO", category: "sistema territorial", hint: "Opuesto al unitarismo" },
    G: { question: "Conjunto de personas que ejercen el poder ejecutivo", answer: "GOBIERNO", category: "poder del estado", hint: "Administra el Estado" },
    H: { question: "Poder del Estado encargado de hacer cumplir las leyes", answer: "EJECUTIVO", category: "poder del estado", hint: "Lo encabeza el Presidente" },
    I: { question: "Principio que garantiza que todos los ciudadanos son tratados por igual ante la ley", answer: "IGUALDAD", category: "principio democrático", hint: "Valor fundamental de la democracia" },
    J: { question: "Poder del Estado encargado de administrar justicia", answer: "JUDICIAL", category: "poder del estado", hint: "Lo integran los tribunales y jueces" },
    K: { question: "Ideología política que defiende la intervención mínima del Estado", answer: "LIBERALISMO", category: "ideología política", hint: "Promueve las libertades individuales" },
    L: { question: "Poder del Estado encargado de crear las leyes", answer: "LEGISLATIVO", category: "poder del estado", hint: "Lo conforman diputados y senadores" },
    M: { question: "Forma de participación ciudadana directa en decisiones políticas", answer: "REFERENDUM", category: "mecanismo democrático", hint: "Consulta popular sobre temas específicos" },
    N: { question: "Conjunto de reglas y principios que rigen la vida en sociedad", answer: "NORMAS", category: "marco legal", hint: "Pueden ser leyes, decretos o reglamentos" },
    O: { question: "Institución encargada de defender los derechos de los ciudadanos ante el Estado", answer: "OMBUDSMAN", category: "institución", hint: "También llamado Defensor del Pueblo" },
    P: { question: "Agrupación política que busca acceder al poder mediante elecciones", answer: "PARTIDO", category: "organización política", hint: "Organización política con ideología común" },
    Q: { question: "Número mínimo de legisladores necesarios para sesionar", answer: "QUORUM", category: "procedimiento legislativo", hint: "Mayoría necesaria para tomar decisiones" },
    R: { question: "Forma de gobierno donde el jefe de Estado no es hereditario", answer: "REPUBLICA", category: "forma de gobierno", hint: "Opuesta a la monarquía" },
    S: { question: "Cámara alta del Congreso Nacional argentino", answer: "SENADO", category: "poder legislativo", hint: "Representa a las provincias" },
    T: { question: "Impuesto que pagan los ciudadanos para financiar el Estado", answer: "TRIBUTO", category: "sistema fiscal", hint: "Contribución obligatoria" },
    U: { question: "Principio de organización territorial opuesto al federalismo", answer: "UNITARISMO", category: "sistema territorial", hint: "Concentración del poder en el gobierno central" },
    V: { question: "Expresión de la voluntad popular en las elecciones", answer: "VOTO", category: "derecho político", hint: "Derecho y deber cívico" },
    W: { question: "Sitio web oficial donde se publican las leyes y decretos", answer: "WEB", category: "medio oficial", hint: "Portal digital del gobierno" },
    X: { question: "Sentimiento de rechazo hacia los extranjeros", answer: "XENOFOBIA", category: "fenómeno social", hint: "Discriminación por origen nacional" },
    Y: { question: "Movimiento político fundado por Hipólito Yrigoyen", answer: "YRIGOYENISMO", category: "movimiento político", hint: "Corriente del radicalismo argentino" },
    Z: { question: "Área territorial bajo jurisdicción de una autoridad", answer: "ZONA", category: "división territorial", hint: "División administrativa del territorio" }
};

// Configuración de la ruleta
const ROULETTE_CONFIG = {
    radius: 180,
    centerX: 200,
    centerY: 200,
    segmentCount: ALPHABET.length,
    colors: [
        '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4',
        '#f97316', '#84cc16', '#ec4899', '#6366f1', '#14b8a6', '#eab308',
        '#a855f7', '#0ea5e9', '#f97316', '#22c55e', '#e11d48', '#7c3aed',
        '#059669', '#dc2626', '#2563eb', '#9333ea', '#0d9488', '#ea580c',
        '#7c2d12', '#1e40af'
    ]
};

// Estado del juego
let gameState = {
    currentScreen: 'start',
    currentQuestion: 0,
    score: 0,
    wildcardsUsed: 0,
    currentLetter: 'A',
    usedWildcards: [],
    answers: [],
    isSpinning: false,
    user: null,
    isAuthenticated: false,
    questionStartTime: null,
    currentStreak: 0,
    gameStartTime: null,
    settings: {
        soundEffects: true,
        showTimer: true,
        autoSave: true
    }
};

// Elementos del DOM
const elements = {
    screens: {
        start: document.getElementById('startScreen'),
        auth: document.getElementById('authScreen'),
        game: document.getElementById('gameScreen'),
        profile: document.getElementById('profileScreen'),
        instructions: document.getElementById('instructionsScreen'),
        settings: document.getElementById('settingsScreen'),
        ranking: document.getElementById('rankingScreen'),
        end: document.getElementById('endScreen')
    },
    buttons: {
        start: document.getElementById('startBtn'),
        ranking: document.getElementById('rankingBtn'),
        profile: document.getElementById('profileBtn'),
        instructions: document.getElementById('instructionsBtn'),
        settings: document.getElementById('settingsBtn'),
        logoutMain: document.getElementById('logoutMainBtn'),
        submit: document.getElementById('submitBtn'),
        playAgain: document.getElementById('playAgainBtn'),
        viewRanking: document.getElementById('viewRankingBtn'),
        backToMenu: document.getElementById('backToMenuBtn'),
        saveScore: document.getElementById('saveScoreBtn'),
        wildcard1: document.getElementById('wildcard1'),
        wildcard2: document.getElementById('wildcard2'),
        wildcard3: document.getElementById('wildcard3'),
        login: document.getElementById('loginBtn'),
        register: document.getElementById('registerBtn'),
        showRegister: document.getElementById('showRegisterBtn'),
        showLogin: document.getElementById('showLoginBtn'),
        backToStart: document.getElementById('backToStartBtn'),
        backToMenuFromGame: document.getElementById('backToMenuFromGame'),
        backToMenuFromProfile: document.getElementById('backToMenuFromProfile'),
        backToMenuFromInstructions: document.getElementById('backToMenuFromInstructions'),
        backToMenuFromSettings: document.getElementById('backToMenuFromSettings')
    },
    auth: {
        title: document.getElementById('authTitle'),
        loginForm: document.getElementById('loginForm'),
        registerForm: document.getElementById('registerForm'),
        loginUsername: document.getElementById('loginUsername'),
        loginPassword: document.getElementById('loginPassword'),
        registerUsername: document.getElementById('registerUsername'),
        registerPassword: document.getElementById('registerPassword'),
        confirmPassword: document.getElementById('confirmPassword')
    },
    game: {
        roulette: document.getElementById('roulette'),
        questionText: document.getElementById('questionText'),
        answerInput: document.getElementById('answerInput'),
        currentScore: document.getElementById('currentScore'),
        questionNumber: document.getElementById('questionNumber'),
        streakCounter: document.getElementById('streakCounter'),
        currentStreak: document.getElementById('currentStreak'),
        timerDisplay: document.getElementById('timerDisplay'),
        wordPattern: document.getElementById('wordPattern'),
        patternDisplay: document.getElementById('patternDisplay'),
        hintDisplay: document.getElementById('hintDisplay'),
        hintText: document.getElementById('hintText')
    },
    end: {
        finalScore: document.getElementById('finalScore'),
        playerName: document.getElementById('playerName')
    },
    ranking: {
        table: document.getElementById('rankingTable')
    },
    modal: {
        feedback: document.getElementById('feedbackModal'),
        content: document.getElementById('feedbackContent')
    },
    ui: {
        userWelcome: document.getElementById('userWelcome'),
        welcomeUsername: document.getElementById('welcomeUsername'),
        logoutSection: document.getElementById('logoutSection'),
        selectedLetter: document.getElementById('selectedLetter')
    }
};

// Inicialización del juego
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    setupEventListeners();
    createRoulette();
    checkAuthStatus();
});

function initializeGame() {
    showScreen('start');
    resetGameState();
}

function checkAuthStatus() {
    // Verificar si hay una sesión guardada (simulado)
    const savedUser = localStorage.getItem('gameUser');
    if (savedUser) {
        try {
            gameState.user = JSON.parse(savedUser);
            gameState.isAuthenticated = true;
            updateStartScreenForLoggedUser();
        } catch (e) {
            localStorage.removeItem('gameUser');
        }
    }
}

function updateStartScreenForLoggedUser() {
    if (gameState.isAuthenticated && gameState.user) {
        // Mostrar información de bienvenida
        if (elements.ui.userWelcome) {
            elements.ui.userWelcome.style.display = 'block';
        }
        if (elements.ui.welcomeUsername) {
            elements.ui.welcomeUsername.textContent = gameState.user.username;
        }
        
        // Mostrar botones para usuarios logueados
        if (elements.buttons.ranking) elements.buttons.ranking.style.display = 'inline-flex';
        if (elements.buttons.profile) elements.buttons.profile.style.display = 'inline-flex';
        if (elements.buttons.settings) elements.buttons.settings.style.display = 'inline-flex';
        if (elements.buttons.logoutMain) elements.buttons.logoutMain.style.display = 'inline-flex';
    } else {
        // Ocultar elementos para usuarios no logueados
        if (elements.ui.userWelcome) elements.ui.userWelcome.style.display = 'none';
        if (elements.buttons.ranking) elements.buttons.ranking.style.display = 'none';
        if (elements.buttons.profile) elements.buttons.profile.style.display = 'none';
        if (elements.buttons.settings) elements.buttons.settings.style.display = 'none';
        if (elements.buttons.logoutMain) elements.buttons.logoutMain.style.display = 'none';
    }
}

// Crear la ruleta SVG dinámicamente
function createRoulette() {
    const wheel = document.getElementById('rouletteWheel');
    if (!wheel) return;
    
    const segmentAngle = 360 / ROULETTE_CONFIG.segmentCount;
    
    ALPHABET.forEach((letter, index) => {
        const startAngle = index * segmentAngle;
        const endAngle = (index + 1) * segmentAngle;
        
        const segment = createSegment(
            ROULETTE_CONFIG.centerX,
            ROULETTE_CONFIG.centerY,
            ROULETTE_CONFIG.radius,
            startAngle,
            endAngle,
            ROULETTE_CONFIG.colors[index % ROULETTE_CONFIG.colors.length],
            letter,
            index
        );
        
        wheel.appendChild(segment);
    });
}

function createSegment(centerX, centerY, radius, startAngle, endAngle, color, letter, index) {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (endAngle - 90) * Math.PI / 180;
    
    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);
    
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
    const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
    ].join(' ');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', color);
    path.setAttribute('class', `segment segment-${index}`);
    path.setAttribute('data-letter', letter);
    path.setAttribute('data-index', index);
    
    const textAngle = (startAngle + endAngle) / 2;
    const textRad = (textAngle - 90) * Math.PI / 180;
    const textRadius = radius * 0.75;
    const textX = centerX + textRadius * Math.cos(textRad);
    const textY = centerY + textRadius * Math.sin(textRad);
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', textX);
    text.setAttribute('y', textY);
    text.setAttribute('class', 'segment-text');
    text.setAttribute('transform', `rotate(${textAngle}, ${textX}, ${textY})`);
    text.textContent = letter;
    
    group.appendChild(path);
    group.appendChild(text);
    
    return group;
}

function setupEventListeners() {
    // Botones de navegación principal
    if (elements.buttons.start) elements.buttons.start.addEventListener('click', checkAuthAndStart);
    if (elements.buttons.ranking) elements.buttons.ranking.addEventListener('click', showRanking);
    if (elements.buttons.profile) elements.buttons.profile.addEventListener('click', () => showScreen('profile'));
    if (elements.buttons.instructions) elements.buttons.instructions.addEventListener('click', () => showScreen('instructions'));
    if (elements.buttons.settings) elements.buttons.settings.addEventListener('click', () => showScreen('settings'));
    if (elements.buttons.logoutMain) elements.buttons.logoutMain.addEventListener('click', logoutUser);
    
    // Botones de regreso al menú
    if (elements.buttons.backToMenuFromGame) elements.buttons.backToMenuFromGame.addEventListener('click', () => showScreen('start'));
    if (elements.buttons.backToMenuFromProfile) elements.buttons.backToMenuFromProfile.addEventListener('click', () => showScreen('start'));
    if (elements.buttons.backToMenuFromInstructions) elements.buttons.backToMenuFromInstructions.addEventListener('click', () => showScreen('start'));
    if (elements.buttons.backToMenuFromSettings) elements.buttons.backToMenuFromSettings.addEventListener('click', () => showScreen('start'));
    if (elements.buttons.backToMenu) elements.buttons.backToMenu.addEventListener('click', () => showScreen('start'));
    
    // Botones de autenticación
    if (elements.buttons.login) elements.buttons.login.addEventListener('click', loginUser);
    if (elements.buttons.register) elements.buttons.register.addEventListener('click', registerUser);
    if (elements.buttons.showRegister) elements.buttons.showRegister.addEventListener('click', showRegisterForm);
    if (elements.buttons.showLogin) elements.buttons.showLogin.addEventListener('click', showLoginForm);
    if (elements.buttons.backToStart) elements.buttons.backToStart.addEventListener('click', () => showScreen('start'));
    
    // Botones de juego
    const spinBtn = document.getElementById('spinBtn');
    if (spinBtn) spinBtn.addEventListener('click', spinRoulette);
    if (elements.buttons.submit) elements.buttons.submit.addEventListener('click', submitAnswer);
    if (elements.buttons.saveScore) elements.buttons.saveScore.addEventListener('click', saveScore);
    
    // Comodines
    if (elements.buttons.wildcard1) elements.buttons.wildcard1.addEventListener('click', () => useWildcard(1));
    if (elements.buttons.wildcard2) elements.buttons.wildcard2.addEventListener('click', () => useWildcard(2));
    if (elements.buttons.wildcard3) elements.buttons.wildcard3.addEventListener('click', () => useWildcard(3));
    
    // Botones de pantalla final
    if (elements.buttons.playAgain) elements.buttons.playAgain.addEventListener('click', startGame);
    if (elements.buttons.viewRanking) elements.buttons.viewRanking.addEventListener('click', showRanking);
    
    // Input de respuesta
    if (elements.game.answerInput) {
        elements.game.answerInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !elements.buttons.submit.disabled) {
                submitAnswer();
            }
        });
    }
    
    // Inputs de autenticación
    if (elements.auth.loginPassword) {
        elements.auth.loginPassword.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') loginUser();
        });
    }
    
    if (elements.auth.confirmPassword) {
        elements.auth.confirmPassword.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') registerUser();
        });
    }
    
    // Modal
    if (elements.modal.feedback) {
        elements.modal.feedback.addEventListener('click', function(e) {
            if (e.target === this) hideModal();
        });
    }
}

function showScreen(screenName) {
    Object.values(elements.screens).forEach(screen => {
        if (screen) screen.classList.remove('active');
    });
    
    if (elements.screens[screenName]) {
        elements.screens[screenName].classList.add('active');
        gameState.currentScreen = screenName;
    }
}

function resetGameState() {
    const wasAuthenticated = gameState.isAuthenticated;
    const currentUser = gameState.user;
    const currentSettings = gameState.settings;
    
    gameState = {
        currentScreen: 'start',
        currentQuestion: 0,
        score: 0,
        wildcardsUsed: 0,
        currentLetter: 'A',
        usedWildcards: [],
        answers: [],
        isSpinning: false,
        user: currentUser,
        isAuthenticated: wasAuthenticated,
        questionStartTime: null,
        currentStreak: 0,
        gameStartTime: null,
        settings: currentSettings
    };
    
    updateUI();
}

function startGame() {
    if (!gameState.isAuthenticated) {
        showFeedback('Debes iniciar sesión para jugar', 'warning');
        return;
    }
    
    resetGameState();
    gameState.gameStartTime = Date.now();
    showScreen('game');
    
    // Resetear UI del juego
    if (elements.game.questionText) elements.game.questionText.textContent = 'Presiona "GIRAR" para comenzar';
    if (elements.game.answerInput) {
        elements.game.answerInput.value = '';
        elements.game.answerInput.disabled = true;
    }
    if (elements.buttons.submit) elements.buttons.submit.disabled = true;
    
    // Ocultar elementos iniciales
    if (elements.game.wordPattern) elements.game.wordPattern.style.display = 'none';
    if (elements.game.hintDisplay) elements.game.hintDisplay.style.display = 'none';
    if (elements.game.streakCounter) elements.game.streakCounter.style.display = 'none';
    
    // Resetear comodines
    [elements.buttons.wildcard1, elements.buttons.wildcard2, elements.buttons.wildcard3].forEach(btn => {
        if (btn) {
            btn.classList.add('active');
            btn.disabled = false;
        }
    });
    
    updateUI();
}

// Funciones de Autenticación
function checkAuthAndStart() {
    if (gameState.isAuthenticated) {
        startGame();
    } else {
        showScreen('auth');
        showLoginForm();
    }
}

function showLoginForm() {
    if (elements.auth.title) elements.auth.title.textContent = '🔐 Iniciar Sesión';
    if (elements.auth.loginForm) elements.auth.loginForm.style.display = 'block';
    if (elements.auth.registerForm) elements.auth.registerForm.style.display = 'none';
    clearAuthInputs();
}

function showRegisterForm() {
    if (elements.auth.title) elements.auth.title.textContent = '📝 Crear Cuenta';
    if (elements.auth.loginForm) elements.auth.loginForm.style.display = 'none';
    if (elements.auth.registerForm) elements.auth.registerForm.style.display = 'block';
    clearAuthInputs();
}

function clearAuthInputs() {
    if (elements.auth.loginUsername) elements.auth.loginUsername.value = '';
    if (elements.auth.loginPassword) elements.auth.loginPassword.value = '';
    if (elements.auth.registerUsername) elements.auth.registerUsername.value = '';
    if (elements.auth.registerPassword) elements.auth.registerPassword.value = '';
    if (elements.auth.confirmPassword) elements.auth.confirmPassword.value = '';
}

async function loginUser() {
    const username = elements.auth.loginUsername?.value?.trim();
    const password = elements.auth.loginPassword?.value;
    
    if (!username || !password) {
        showFeedback('Por favor, completa todos los campos', 'warning');
        return;
    }
    
    if (username.length < 3 || username.length > 20) {
        showFeedback('El nombre de usuario debe tener entre 3 y 20 caracteres', 'warning');
        return;
    }
    
    try {
        const response = await fetch(`${GAME_CONFIG.apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            gameState.user = data.user;
            gameState.isAuthenticated = true;
            localStorage.setItem('gameUser', JSON.stringify(data.user));
            showFeedback(`¡Bienvenido, ${data.user.username}!`, 'correct');
            updateStartScreenForLoggedUser();
            setTimeout(() => {
                startGame();
            }, 1500);
        } else {
            showFeedback(data.error || 'Error al iniciar sesión', 'incorrect');
        }
    } catch (error) {
        console.error('Error:', error);
        showFeedback('Error de conexión', 'incorrect');
    }
}

async function registerUser() {
    const username = elements.auth.registerUsername?.value?.trim();
    const password = elements.auth.registerPassword?.value;
    const confirmPassword = elements.auth.confirmPassword?.value;
    
    if (!username || !password || !confirmPassword) {
        showFeedback('Por favor, completa todos los campos', 'warning');
        return;
    }
    
    if (username.length < 3 || username.length > 20) {
        showFeedback('El nombre de usuario debe tener entre 3 y 20 caracteres', 'warning');
        return;
    }
    
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9_]+$/.test(username)) {
        showFeedback('El nombre de usuario solo puede contener letras, números y guiones bajos', 'warning');
        return;
    }
    
    if (password.length < 6) {
        showFeedback('La contraseña debe tener al menos 6 caracteres', 'warning');
        return;
    }
    
    if (password !== confirmPassword) {
        showFeedback('Las contraseñas no coinciden', 'warning');
        return;
    }
    
    try {
        const response = await fetch(`${GAME_CONFIG.apiUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showFeedback('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión', 'correct');
            setTimeout(() => {
                showLoginForm();
                if (elements.auth.loginUsername) {
                    elements.auth.loginUsername.value = username;
                }
            }, 1500);
        } else {
            showFeedback(data.error || 'Error al crear la cuenta', 'incorrect');
        }
    } catch (error) {
        console.error('Error:', error);
        showFeedback('Error de conexión', 'incorrect');
    }
}

function logoutUser() {
    gameState.user = null;
    gameState.isAuthenticated = false;
    localStorage.removeItem('gameUser');
    
    updateStartScreenForLoggedUser();
    showFeedback('Sesión cerrada', 'info');
    setTimeout(() => {
        showScreen('start');
    }, 1000);
}

function spinRoulette() {
    if (gameState.isSpinning) return;
    
    gameState.isSpinning = true;
    const spinButton = document.getElementById('spinBtn');
    const rouletteSvg = document.querySelector('.roulette-svg');
    const selectedLetterDisplay = elements.ui.selectedLetter;
    
    if (spinButton) {
        spinButton.disabled = true;
        spinButton.classList.add('spinning');
    }
    if (elements.game.roulette) elements.game.roulette.classList.add('spinning');
    
    clearPreviousSelection();
    if (selectedLetterDisplay) selectedLetterDisplay.textContent = '...';
    
    const randomIndex = Math.floor(Math.random() * ALPHABET.length);
    const selectedLetter = ALPHABET[randomIndex];
    
    const segmentAngle = 360 / ALPHABET.length;
    const baseRotations = 5 + Math.random() * 3;
    const targetAngle = randomIndex * segmentAngle;
    const adjustedAngle = targetAngle + (segmentAngle / 2);
    const finalRotation = (baseRotations * 360) + (360 - adjustedAngle);
    
    if (rouletteSvg) {
        rouletteSvg.style.transform = `rotate(${finalRotation}deg)`;
    }
    
    setTimeout(() => {
        gameState.isSpinning = false;
        if (spinButton) {
            spinButton.disabled = false;
            spinButton.classList.remove('spinning');
        }
        if (elements.game.roulette) elements.game.roulette.classList.remove('spinning');
        
        highlightSelectedSegment(randomIndex);
        gameState.currentLetter = selectedLetter;
        gameState.questionStartTime = Date.now();
        updateSelectedLetterDisplay(selectedLetter);
        
        if (gameState.currentScreen === 'game') {
            showQuestion(selectedLetter);
        }
    }, 4000);
}

function clearPreviousSelection() {
    document.querySelectorAll('.segment').forEach(segment => {
        segment.classList.remove('selected');
    });
}

function highlightSelectedSegment(index) {
    const selectedSegment = document.querySelector(`.segment-${index}`);
    if (selectedSegment) {
        selectedSegment.classList.add('selected');
        setTimeout(() => {
            selectedSegment.style.animation = 'segmentPulse 0.6s ease-out';
        }, 100);
        setTimeout(() => {
            selectedSegment.style.animation = '';
        }, 700);
    }
}

function updateSelectedLetterDisplay(letter) {
    const display = elements.ui.selectedLetter;
    if (display) {
        display.textContent = letter;
        display.classList.add('animate');
        setTimeout(() => {
            display.classList.remove('animate');
        }, 600);
    }
}

function showQuestion(letter) {
    if (QUESTIONS[letter]) {
        const questionData = QUESTIONS[letter];
        if (elements.game.questionText) {
            elements.game.questionText.textContent = `${letter}: ${questionData.question}`;
        }
        
        // Mostrar patrón de palabra con guiones bajos
        showWordPattern(questionData.answer);
        
        // Habilitar input y botón de respuesta
        if (elements.game.answerInput) {
            elements.game.answerInput.disabled = false;
            elements.game.answerInput.focus();
        }
        if (elements.buttons.submit) elements.buttons.submit.disabled = false;
    }
}

function showWordPattern(answer) {
    if (elements.game.wordPattern && elements.game.patternDisplay) {
        const pattern = answer.split('').map(() => '_').join(' ');
        elements.game.patternDisplay.textContent = pattern;
        elements.game.wordPattern.style.display = 'block';
    }
}

function updateWordPattern(answer, revealedLetters) {
    if (elements.game.patternDisplay) {
        const pattern = answer.split('').map((letter, index) => {
            return revealedLetters[index] || '_';
        }).join(' ');
        elements.game.patternDisplay.textContent = pattern;
    }
}

function useWildcard(wildcardNumber) {
    if (gameState.wildcardsUsed >= GAME_CONFIG.maxWildcards) return;
    if (gameState.usedWildcards.includes(wildcardNumber)) return;
    if (!gameState.currentLetter || gameState.isSpinning) return;
    
    const questionData = QUESTIONS[gameState.currentLetter];
    if (!questionData) return;
    
    const correctAnswer = questionData.answer;
    const hintTypes = [HINT_TYPES.FIRST_LETTER, HINT_TYPES.CATEGORY, HINT_TYPES.LENGTH, HINT_TYPES.REVEAL_LETTER];
    const randomHintType = hintTypes[Math.floor(Math.random() * hintTypes.length)];
    
    let hintMessage = '';
    
    switch (randomHintType) {
        case HINT_TYPES.FIRST_LETTER:
            hintMessage = `Empieza con la letra "${correctAnswer[0]}"`;
            break;
        case HINT_TYPES.CATEGORY:
            hintMessage = `Es un tipo de ${questionData.category}`;
            break;
        case HINT_TYPES.LENGTH:
            hintMessage = `Tiene ${correctAnswer.length} letras`;
            break;
        case HINT_TYPES.REVEAL_LETTER:
            const currentInput = elements.game.answerInput?.value?.toUpperCase() || '';
            const availablePositions = [];
            for (let i = 0; i < correctAnswer.length; i++) {
                if (i >= currentInput.length || currentInput[i] !== correctAnswer[i]) {
                    availablePositions.push(i);
                }
            }
            
            if (availablePositions.length > 0) {
                const randomPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];
                const newAnswer = currentInput.padEnd(correctAnswer.length, '_').split('');
                newAnswer[randomPosition] = correctAnswer[randomPosition];
                
                if (elements.game.answerInput) {
                    elements.game.answerInput.value = newAnswer.join('').replace(/_/g, '');
                }
                hintMessage = `Letra "${correctAnswer[randomPosition]}" revelada en posición ${randomPosition + 1}`;
            } else {
                hintMessage = `La palabra es: ${correctAnswer}`;
            }
            break;
    }
    
    // Mostrar pista
    showHint(hintMessage);
    
    // Marcar comodín como usado
    gameState.usedWildcards.push(wildcardNumber);
    gameState.wildcardsUsed++;
    
    const wildcardBtn = document.getElementById(`wildcard${wildcardNumber}`);
    if (wildcardBtn) {
        wildcardBtn.classList.remove('active');
        wildcardBtn.disabled = true;
    }
}

function showHint(message) {
    if (elements.game.hintDisplay && elements.game.hintText) {
        elements.game.hintText.textContent = message;
        elements.game.hintDisplay.style.display = 'flex';
    }
}

function submitAnswer() {
    const userAnswer = elements.game.answerInput?.value?.trim()?.toUpperCase();
    const correctAnswer = QUESTIONS[gameState.currentLetter]?.answer;
    
    if (!userAnswer) {
        showFeedback('Por favor, ingresa una respuesta', 'warning');
        return;
    }
    
    if (!correctAnswer) {
        showFeedback('Error: No se encontró la pregunta', 'incorrect');
        return;
    }
    
    const isCorrect = userAnswer === correctAnswer;
    const responseTime = Date.now() - gameState.questionStartTime;
    let points = 0;
    
    if (isCorrect) {
        points = GAME_CONFIG.baseScore;
        
        // Bonus por velocidad
        if (responseTime < GAME_CONFIG.speedThreshold) {
            points += GAME_CONFIG.speedBonus;
        }
        
        // Bonus por racha
        gameState.currentStreak++;
        if (gameState.currentStreak > 1) {
            points += (gameState.currentStreak - 1) * GAME_CONFIG.streakBonus;
        }
        
        // Penalización por comodines
        points -= (gameState.wildcardsUsed * GAME_CONFIG.wildcardPenalty);
        
        // Asegurar que los puntos no sean negativos
        points = Math.max(0, points);
        
        gameState.score += points;
        
        // Mostrar contador de racha
        if (gameState.currentStreak > 1 && elements.game.streakCounter) {
            elements.game.streakCounter.style.display = 'inline-block';
            if (elements.game.currentStreak) {
                elements.game.currentStreak.textContent = gameState.currentStreak;
            }
        }
        
        showFeedback(`¡Correcto! +${points} puntos`, 'correct');
    } else {
        gameState.currentStreak = 0;
        if (elements.game.streakCounter) {
            elements.game.streakCounter.style.display = 'none';
        }
        showFeedback(`Incorrecto. La respuesta era: ${correctAnswer}`, 'incorrect');
    }
    
    // Guardar respuesta
    gameState.answers.push({
        letter: gameState.currentLetter,
        question: QUESTIONS[gameState.currentLetter].question,
        userAnswer: userAnswer,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect,
        points: points,
        wildcardsUsed: gameState.wildcardsUsed,
        responseTime: responseTime
    });
    
    // Avanzar a la siguiente pregunta
    gameState.currentQuestion++;
    gameState.wildcardsUsed = 0;
    gameState.usedWildcards = [];
    
    updateUI();
    
    setTimeout(() => {
        if (gameState.currentQuestion >= GAME_CONFIG.totalQuestions) {
            endGame();
        } else {
            nextQuestion();
        }
    }, 2000);
}

function nextQuestion() {
    // Resetear para la siguiente pregunta
    if (elements.game.answerInput) {
        elements.game.answerInput.value = '';
        elements.game.answerInput.disabled = true;
    }
    if (elements.buttons.submit) elements.buttons.submit.disabled = true;
    if (elements.game.questionText) {
        elements.game.questionText.textContent = 'Presiona "GIRAR" para la siguiente pregunta';
    }
    
    // Ocultar elementos de la pregunta anterior
    if (elements.game.wordPattern) elements.game.wordPattern.style.display = 'none';
    if (elements.game.hintDisplay) elements.game.hintDisplay.style.display = 'none';
    
    // Resetear comodines para la nueva pregunta
    [elements.buttons.wildcard1, elements.buttons.wildcard2, elements.buttons.wildcard3].forEach((btn, index) => {
        if (btn && gameState.wildcardsUsed <= index) {
            btn.classList.add('active');
            btn.disabled = false;
        }
    });
}

function endGame() {
    const totalTime = Date.now() - gameState.gameStartTime;
    const minutes = Math.floor(totalTime / 60000);
    const seconds = Math.floor((totalTime % 60000) / 1000);
    
    if (elements.end.finalScore) {
        elements.end.finalScore.textContent = gameState.score;
    }
    
    // Guardar automáticamente si el usuario está logueado
    if (gameState.isAuthenticated && gameState.settings.autoSave) {
        saveScoreAutomatically(totalTime);
    }
    
    showScreen('end');
}

async function saveScoreAutomatically(totalTime) {
    if (!gameState.isAuthenticated) return;
    
    const scoreData = {
        username: gameState.user.username,
        score: gameState.score,
        date: new Date().toISOString(),
        totalTime: totalTime,
        correctAnswers: gameState.answers.filter(a => a.isCorrect).length,
        wildcardsUsed: gameState.answers.reduce((sum, a) => sum + a.wildcardsUsed, 0)
    };
    
    try {
        const response = await fetch(`${GAME_CONFIG.apiUrl}/scores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(scoreData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showFeedback('¡Puntuación guardada automáticamente!', 'correct');
        }
    } catch (error) {
        console.error('Error al guardar puntuación automáticamente:', error);
    }
}

async function saveScore() {
    if (!gameState.isAuthenticated) {
        showFeedback('Debes iniciar sesión para guardar tu puntuación', 'warning');
        return;
    }
    
    const totalTime = Date.now() - gameState.gameStartTime;
    const scoreData = {
        username: gameState.user.username,
        score: gameState.score,
        date: new Date().toISOString(),
        totalTime: totalTime
    };
    
    try {
        const response = await fetch(`${GAME_CONFIG.apiUrl}/scores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(scoreData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showFeedback('¡Puntuación guardada exitosamente!', 'correct');
            if (elements.buttons.saveScore) elements.buttons.saveScore.disabled = true;
        } else {
            showFeedback('Error al guardar la puntuación', 'incorrect');
        }
    } catch (error) {
        console.error('Error:', error);
        showFeedback('Error de conexión', 'incorrect');
    }
}

async function showRanking() {
    if (!gameState.isAuthenticated) {
        showFeedback('Debes iniciar sesión para ver el ranking', 'warning');
        return;
    }
    
    showScreen('ranking');
    if (elements.ranking.table) {
        elements.ranking.table.innerHTML = '<div class="loading">Cargando ranking...</div>';
    }
    
    try {
        const response = await fetch(`${GAME_CONFIG.apiUrl}/scores`);
        const data = await response.json();
        
        if (data.success && data.scores.length > 0) {
            displayRanking(data.scores);
        } else {
            if (elements.ranking.table) {
                elements.ranking.table.innerHTML = '<div class="loading">No hay puntuaciones registradas</div>';
            }
        }
    } catch (error) {
        console.error('Error:', error);
        if (elements.ranking.table) {
            elements.ranking.table.innerHTML = '<div class="loading">Error al cargar el ranking</div>';
        }
    }
}

function displayRanking(scores) {
    if (!elements.ranking.table) return;
    
    let html = `
        <div class="ranking-header">
            <div>Pos.</div>
            <div>Jugador</div>
            <div>Puntos</div>
            <div>Fecha</div>
            <div>Tiempo</div>
        </div>
    `;
    
    scores.forEach((score, index) => {
        const position = index + 1;
        let positionClass = '';
        let rowClass = 'ranking-row';
        
        if (position === 1) positionClass = 'gold';
        else if (position === 2) positionClass = 'silver';
        else if (position === 3) positionClass = 'bronze';
        
        if (gameState.isAuthenticated && score.name === gameState.user.username) {
            rowClass += ' current-user-row';
        }
        
        const date = new Date(score.date).toLocaleDateString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        });
        
        const time = score.totalTime ? formatTime(score.totalTime) : '--:--';
        
        html += `
            <div class="${rowClass}">
                <div class="rank-position ${positionClass}">${position}</div>
                <div class="player-name">${score.name}</div>
                <div class="player-score">${score.score}</div>
                <div class="player-date">${date}</div>
                <div class="player-time">${time}</div>
            </div>
        `;
    });
    
    elements.ranking.table.innerHTML = html;
}

function formatTime(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function showFeedback(message, type) {
    if (elements.modal.content) {
        elements.modal.content.innerHTML = `
            <div class="feedback-${type}">
                <h3>${message}</h3>
            </div>
        `;
    }
    
    if (elements.modal.feedback) {
        elements.modal.feedback.classList.add('active');
        
        setTimeout(() => {
            hideModal();
        }, 2000);
    }
}

function hideModal() {
    if (elements.modal.feedback) {
        elements.modal.feedback.classList.remove('active');
    }
}

function updateUI() {
    if (elements.game.currentScore) {
        elements.game.currentScore.textContent = gameState.score;
    }
    if (elements.game.questionNumber) {
        elements.game.questionNumber.textContent = gameState.currentQuestion + 1;
    }
}