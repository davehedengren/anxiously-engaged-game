// Anxiously Engaged Game - Main Script
class AnxiouslyEngagedGame {
    constructor() {
        this.gameState = 'home'; // home, walking, working, dialogue, gameEnd
        this.currentDay = 1;
        this.score = 0;
        this.workPoints = 0;
        this.helpPoints = 0;
        this.dailyScore = 0; // Points earned today
        this.gameTime = 120; // 2 minutes in seconds
        this.workTime = 10; // 10 seconds work timer
        this.gameRunning = false;
        this.gameStartTime = null;
        this.workStartTime = null;
        
        // NPC encounters
        this.encounters = [
            {
                id: 'elderly_groceries',
                name: 'Elderly Person with Groceries',
                dialogue: 'I\'m having trouble carrying these heavy grocery bags to my car. Could you help me?',
                helpPoints: 1000
            },
            {
                id: 'child_bike',
                name: 'Child with Broken Bicycle',
                dialogue: 'My bike chain came off and I can\'t fix it. Can you help me get it back on?',
                helpPoints: 1000
            },
            {
                id: 'person_bags',
                name: 'Person with Heavy Bags',
                dialogue: 'I\'m moving and these boxes are so heavy. Would you mind helping me carry them?',
                helpPoints: 1000
            },
            {
                id: 'lost_tourist',
                name: 'Lost Tourist',
                dialogue: 'I\'m completely lost! Do you know how to get to the city center from here?',
                helpPoints: 1000
            },
            {
                id: 'flat_tire',
                name: 'Person with Flat Tire',
                dialogue: 'My tire is flat and I don\'t know how to change it. Could you help me?',
                helpPoints: 1000
            },
            {
                id: 'dropped_papers',
                name: 'Person with Dropped Papers',
                dialogue: 'I dropped all my important documents! Could you help me gather them up?',
                helpPoints: 1000
            },
            {
                id: 'door_struggle',
                name: 'Person Struggling with Door',
                dialogue: 'This door is so heavy and my hands are full. Could you hold it open for me?',
                helpPoints: 1000
            },
            {
                id: 'dropped_wallet',
                name: 'Person Who Dropped Wallet',
                dialogue: 'Excuse me, I lost my wallet. Could you help me find it?',
                helpPoints: 1000
            }
        ];
        
        this.usedEncounters = [];
        this.currentEncounter = null;
        
        // DOM elements
        this.elements = {};
        
        this.init();
    }
    
    init() {
        // Get DOM elements
        this.elements = {
            scoreDisplay: document.getElementById('score-display'),
            dayDisplay: document.getElementById('day-display'),
            timerDisplay: document.getElementById('timer-display'),
            workTimerDisplay: document.getElementById('work-timer-display'),
            
            homeScene: document.getElementById('home-scene'),
            streetScene: document.getElementById('street-scene'),
            officeScene: document.getElementById('office-scene'),
            
            movementControls: document.getElementById('movement-controls'),
            workControls: document.getElementById('work-controls'),
            transitionControls: document.getElementById('transition-controls'),
            
            leftBtn: document.getElementById('left-btn'),
            rightBtn: document.getElementById('right-btn'),
            workBtn: document.getElementById('work-btn'),
            startDayBtn: document.getElementById('start-day-btn'),
            
            dialogueOverlay: document.getElementById('dialogue-overlay'),
            dialogueText: document.getElementById('dialogue-text'),
            helpBtn: document.getElementById('help-btn'),
            ignoreBtn: document.getElementById('ignore-btn'),
            
            gameEndOverlay: document.getElementById('game-end-overlay'),
            finalScore: document.getElementById('final-score'),
            workPointsDisplay: document.getElementById('work-points'),
            helpPointsDisplay: document.getElementById('help-points'),
            daysCompleted: document.getElementById('days-completed'),
            lessonText: document.getElementById('lesson-text'),
            restartBtn: document.getElementById('restart-btn'),
            
            anxiouslyEngagedOverlay: document.getElementById('anxiously-engaged-overlay'),
            continueWorkBtn: document.getElementById('continue-work-btn'),
            
            endOfDayOverlay: document.getElementById('end-of-day-overlay'),
            dailyPoints: document.getElementById('daily-points'),
            eveningMessage: document.getElementById('evening-message'),
            nextDayBtn: document.getElementById('next-day-btn'),
            
            currentNpc: document.getElementById('current-npc')
        };
        
        this.setupEventListeners();
        this.updateUI();
        
        console.log('Game initialized successfully!');
    }
    
    setupEventListeners() {
        // Control buttons
        this.elements.startDayBtn.addEventListener('click', () => this.startWalking());
        this.elements.leftBtn.addEventListener('click', () => this.moveCharacter('left'));
        this.elements.rightBtn.addEventListener('click', () => this.moveCharacter('right'));
        this.elements.workBtn.addEventListener('click', () => this.doWork());
        
        // Dialogue buttons
        this.elements.helpBtn.addEventListener('click', () => this.chooseHelp());
        this.elements.ignoreBtn.addEventListener('click', () => this.chooseIgnore());
        
        // Game end
        this.elements.restartBtn.addEventListener('click', () => this.restartGame());
        
        // Anxiously engaged screen
        this.elements.continueWorkBtn.addEventListener('click', () => this.continueToWork());
        
        // End of day screen
        this.elements.nextDayBtn.addEventListener('click', () => this.startNextDay());
        
        // NPC click
        this.elements.currentNpc.addEventListener('click', () => this.showDialogue());
    }
    
    startGame() {
        this.gameRunning = true;
        this.gameStartTime = Date.now();
        this.gameLoop();
        console.log('Game started!');
    }
    
    gameLoop() {
        if (!this.gameRunning) return;
        
        // Update timers
        this.updateTimers();
        this.updateUI();
        
        // Check if game time is up
        if (this.gameTime <= 0) {
            this.endGame();
            return;
        }
        
        // Continue game loop
        requestAnimationFrame(() => this.gameLoop());
    }
    
    updateTimers() {
        if (this.gameStartTime) {
            const elapsed = (Date.now() - this.gameStartTime) / 1000;
            this.gameTime = Math.max(0, 120 - elapsed);
        }
        
        if (this.workStartTime && this.gameState === 'working') {
            const workElapsed = (Date.now() - this.workStartTime) / 1000;
            this.workTime = Math.max(0, 10 - workElapsed);
            
            if (this.workTime <= 0) {
                this.endWorkDay();
            }
        }
    }
    
    updateUI() {
        // Update displays
        this.elements.scoreDisplay.textContent = this.score;
        this.elements.dayDisplay.textContent = this.currentDay;
        
        // Format timer display
        const minutes = Math.floor(this.gameTime / 60);
        const seconds = Math.floor(this.gameTime % 60);
        this.elements.timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Update work timer
        this.elements.workTimerDisplay.textContent = Math.ceil(this.workTime);
    }
    
    // State Management
    changeState(newState) {
        console.log(`Changing state from ${this.gameState} to ${newState}`);
        this.gameState = newState;
        
        // Hide all scenes and controls
        this.hideAllScenes();
        this.hideAllControls();
        
        // Show appropriate scene and controls
        switch (newState) {
            case 'home':
                this.elements.homeScene.style.display = 'block';
                this.elements.transitionControls.style.display = 'flex';
                // No character sprite needed - alarm background is complete
                break;
            case 'walking':
                this.elements.streetScene.style.display = 'block';
                this.elements.movementControls.style.display = 'flex';
                this.updateCharacterSprite('walking-right');
                this.showRandomEncounter();
                break;
            case 'working':
                this.elements.officeScene.style.display = 'block';
                this.elements.workControls.style.display = 'flex';
                // No character sprite needed - office background has built-in characters
                this.startWorkTimer();
                break;
            case 'dialogue':
                // Dialogue overlay handles its own display
                break;
            case 'gameEnd':
                this.showGameEndScreen();
                break;
        }
    }
    
    hideAllScenes() {
        this.elements.homeScene.style.display = 'none';
        this.elements.streetScene.style.display = 'none';
        this.elements.officeScene.style.display = 'none';
    }
    
    hideAllControls() {
        this.elements.movementControls.style.display = 'none';
        this.elements.workControls.style.display = 'none';
        this.elements.transitionControls.style.display = 'none';
    }
    
    // Game Actions
    startWalking() {
        if (!this.gameRunning) {
            this.startGame();
        }
        this.changeState('walking');
    }
    
    moveCharacter(direction) {
        console.log(`Moving ${direction}`);
        
        // Update character sprite based on movement direction
        if (direction === 'left') {
            this.updateCharacterSprite('walking-left');
        } else if (direction === 'right') {
            this.updateCharacterSprite('walking-right');
        }
        
        // For now, simulate reaching office after more walking time
        setTimeout(() => {
            if (this.gameState === 'walking') {
                this.reachOffice();
            }
        }, 8000); // 8 seconds to walk to work - more time to help NPCs!
    }
    
    // Character sprite management
    updateCharacterSprite(spriteClass) {
        const characters = document.querySelectorAll('.character');
        characters.forEach(character => {
            // Remove all sprite classes
            character.classList.remove('idle', 'walking-left', 'walking-right');
            // Add the new sprite class
            character.classList.add(spriteClass);
        });
    }
    
    reachOffice() {
        this.hideEncounter();
        this.changeState('working');
    }
    
    startWorkTimer() {
        this.workStartTime = Date.now();
        this.workTime = 10;
    }
    
    doWork() {
        this.workPoints += 1;
        this.score += 1;
        this.dailyScore += 1;
        console.log('Working... +1 point');
    }
    
    endWorkDay() {
        this.workStartTime = null;
        
        if (this.gameTime > 0) {
            // Show end of day screen
            this.showEndOfDayScreen();
        } else {
            this.endGame();
        }
    }
    
    // NPC Encounters
    showRandomEncounter() {
        if (this.usedEncounters.length >= this.encounters.length) {
            // All encounters used, pick randomly from all
            this.usedEncounters = [];
        }
        
        const availableEncounters = this.encounters.filter(e => 
            !this.usedEncounters.includes(e.id)
        );
        
        if (availableEncounters.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableEncounters.length);
            this.currentEncounter = availableEncounters[randomIndex];
            this.usedEncounters.push(this.currentEncounter.id);
            
            // Clear previous NPC classes and add current encounter class
            this.elements.currentNpc.className = 'npc';
            this.elements.currentNpc.classList.add(this.currentEncounter.id);
            this.elements.currentNpc.style.display = 'block';
            
            console.log(`Showing encounter: ${this.currentEncounter.name}`);
        }
    }
    
    hideEncounter() {
        this.elements.currentNpc.style.display = 'none';
        this.currentEncounter = null;
    }
    
    showDialogue() {
        if (this.currentEncounter && this.gameState === 'walking') {
            this.elements.dialogueText.textContent = this.currentEncounter.dialogue;
            this.elements.dialogueOverlay.style.display = 'flex';
            this.changeState('dialogue');
        }
    }
    
    chooseHelp() {
        if (this.currentEncounter) {
            this.helpPoints += this.currentEncounter.helpPoints;
            this.score += this.currentEncounter.helpPoints;
            this.dailyScore += this.currentEncounter.helpPoints;
            console.log(`Helped! +${this.currentEncounter.helpPoints} points`);
        }
        this.showAnxiouslyEngagedScreen();
    }
    
    chooseIgnore() {
        console.log('Ignored the person in need');
        this.closeDialogue();
    }
    
    closeDialogue() {
        this.elements.dialogueOverlay.style.display = 'none';
        this.changeState('walking');
        
        // Continue to office after dialogue
        setTimeout(() => {
            if (this.gameState === 'walking') {
                this.reachOffice();
            }
        }, 1000);
    }
    
    showAnxiouslyEngagedScreen() {
        this.elements.dialogueOverlay.style.display = 'none';
        this.elements.anxiouslyEngagedOverlay.style.display = 'flex';
    }
    
    continueToWork() {
        this.elements.anxiouslyEngagedOverlay.style.display = 'none';
        
        // Go directly to office after celebrating - no more walking/encounters
        this.reachOffice();
    }
    
    showEndOfDayScreen() {
        // Update daily points display
        this.elements.dailyPoints.textContent = this.dailyScore;
        
        // Set evening message based on current day
        const eveningMessages = {
            1: "Let's get a good night's sleep and start again tomorrow.",
            2: "Let's stay up all night talking to friends.",
            3: "Let's party like it's 1999 until dawn.",
            4: "Let's binge Netflix until morning."
        };
        
        const message = eveningMessages[this.currentDay] || eveningMessages[1];
        this.elements.eveningMessage.textContent = message;
        
        // Show the end of day overlay
        this.elements.endOfDayOverlay.style.display = 'flex';
    }
    
    startNextDay() {
        this.elements.endOfDayOverlay.style.display = 'none';
        this.currentDay++;
        this.dailyScore = 0; // Reset daily score for new day
        
        // Start new day
        this.changeState('home');
    }
    
    // Game End
    endGame() {
        this.gameRunning = false;
        this.changeState('gameEnd');
    }
    
    showGameEndScreen() {
        this.elements.finalScore.textContent = this.score;
        this.elements.workPointsDisplay.textContent = this.workPoints;
        this.elements.helpPointsDisplay.textContent = this.helpPoints;
        this.elements.daysCompleted.textContent = this.currentDay - 1;
        
        // Update lesson message based on performance
        let lessonMessage = "Helping others is more rewarding than just focusing on work!";
        if (this.helpPoints > this.workPoints * 2) {
            lessonMessage = "Excellent! You discovered that serving others brings the greatest rewards!";
        } else if (this.helpPoints > this.workPoints) {
            lessonMessage = "Good job! You found that helping others is more rewarding than just working.";
        } else if (this.helpPoints === 0) {
            lessonMessage = "You focused only on work, but missed opportunities to serve others and earn more points!";
        }
        
        this.elements.lessonText.textContent = lessonMessage;
        this.elements.gameEndOverlay.style.display = 'flex';
    }
    
    restartGame() {
        // Reset all game state
        this.gameState = 'home';
        this.currentDay = 1;
        this.score = 0;
        this.workPoints = 0;
        this.helpPoints = 0;
        this.dailyScore = 0;
        this.gameTime = 120;
        this.workTime = 10;
        this.gameRunning = false;
        this.gameStartTime = null;
        this.workStartTime = null;
        this.usedEncounters = [];
        this.currentEncounter = null;
        
        // Hide overlays
        this.elements.dialogueOverlay.style.display = 'none';
        this.elements.anxiouslyEngagedOverlay.style.display = 'none';
        this.elements.endOfDayOverlay.style.display = 'none';
        this.elements.gameEndOverlay.style.display = 'none';
        
        // Reset to home state
        this.changeState('home');
        this.updateUI();
        
        console.log('Game restarted!');
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing game...');
    window.game = new AnxiouslyEngagedGame();
}); 