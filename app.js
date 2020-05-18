new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameRunning: false,
        specialAttacks: 3,
        turns: []
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameRunning = true;
            this.turns = [];
        },
        attack() {
            let damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: `Player hits monster for ${damage} points of damage.`
            });

            if (this.checkWin()) return;

            this.monsterAttacks();            
        },
        specialAttack() {
            if (this.specialAttacks-- > 0) {
                let damage = this.calculateDamage(10, 30);
                this.monsterHealth -= damage;
                this.turns.unshift({
                    isPlayer: true,
                    text: `Player hits hard monster for ${damage} points of damage.`
                });
                if (this.checkWin()) return;
            } else {
                this.turns.unshift({
                    isPlayer: true,
                    text: `Player is out of special attacks.`
                });
            }
            this.monsterAttacks();
        },
        monsterAttacks() {
            let damage = this.calculateDamage(3, 10);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: `Monster hits player for ${damage} points of damage.`
            });
            this.checkWin();
        },
        heal() {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else this.playerHealth = 100;
            this.turns.unshift({
                isPlayer: true,
                text: `Player healed 10 points.`
            });

            this.monsterAttacks();
        },
        giveUp() {
            this.gameRunning = false;
        },
        calculateDamage(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New game?')) {
                    this.startGame();
                } else {
                    this.gameRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New game?')) {
                    this.startGame();
                } else {
                    this.gameRunning = false;
                }
                return true;
            }
            return false;
        }
    }
})