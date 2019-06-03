new Vue({
    el:"#app",
    data:{
        playerHealth:100,
        monsterHealth:100,
        gameIsRunning:false,
        turns:[]
    },
    methods:{
        startGame:function(){
            this.gameIsRunning=true;
            this.playerHealth=100;
            this.monsterHealth=100;
            this.turns=[];
        },
        attack:function(){
            var damage=this.calculateDamage(10,3);
            this.monsterHealth-=damage;
            this.turns.unshift({
                isPlayer:true,
                text:'player hits the monster by'+damage
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttack();
        },
        specialAttack:function(){
            var damage=this.calculateDamage(20,10);
            this.monsterHealth-=damage;
            this.turns.unshift({
                isPlayer:true,
                text:'player hits the monster hard by'+damage
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttack();
        },
        heal:function(){
            if(this.playerHealth<=90){
                this.playerHealth+=10;
                this.turns.unshift({
                    isPlayer:true,
                    text:'player heals by 10'
                });
            }
            else{
                var healed=100-this.playerHealth;
                this.playerHealth=100;
                this.turns.unshift({
                    isPlayer:true,
                    text:'player heals by'+healed
                });
            }
            this.monsterAttack();
        },
        giveUp:function(){
            this.gameIsRunning=false;
        },
        monsterAttack:function(){
            var damage=this.calculateDamage(12,5);
            this.playerHealth-=damage;
            this.turns.unshift({
                isPlayer:false,
                text:'monster hits the monster by'+damage
            });
            this.checkWin();
        },
        calculateDamage:function(max,min){
            return Math.max(Math.floor(Math.random()*max) + 1 ,min);
        },
        checkWin:function(){
            if(this.monsterHealth<=0){
                if(confirm("you won , Start Again?")){
                    this.startGame();
                }
                else{
                    this.gameIsRunning=false;
                }
                return true;
            }
            else if(this.playerHealth<=0){
                if(confirm("you lost , Start Again?")){
                    this.startGame();
                }
                else{
                    this.gameIsRunning=false;
                }
                return true;
            }
            else return false;
        }
    }
});