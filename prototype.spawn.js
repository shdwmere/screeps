// prototype.spawn.js
module.exports = function() {
    // spawner balanceado
    StructureSpawn.prototype.criarCreepBalanceado = 
    function(energy, roleName, home){
        let numeroDePartes = Math.floor(energy / 200);
        let body = [];

            // padrão balanceado
            for (let i = 0; i < numeroDePartes; i++) {
                body.push(WORK);
            };
            for (let i = 0; i < numeroDePartes; i++) {
                body.push(CARRY);
            };
            for (let i = 0; i < numeroDePartes; i++) {
                body.push(MOVE);
            };


        let novoNome = roleName + Game.time;

        return this.createCreep(body, novoNome, {role: roleName, working: false, home: home});
    };

    StructureSpawn.prototype.criarHarvesterLongaDistancia = function(energy, numeroWorkParts, home, target, sourceIndex) {
        let body = [];
        
        for (let i = 0; i < numeroWorkParts; i++) {
            body.push(WORK);
        }
    
        // 150: somatório do custo das 3 body parts
        energy -= 150 * numeroWorkParts;
    
        // energy / 100: colocamos 100 porque o preço de carry + move = 100
        let numeroDePartes = Math.floor(energy / 100);
        for (let i = 0; i < numeroDePartes; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < numeroDePartes; i++) {
            body.push(MOVE);
        }
    
        let harvesterLD = 'longDistanceHarvester' + Game.time;
    
        return this.createCreep(body, harvesterLD, { 
            role: 'longDistanceHarvester', 
            home: home, 
            target: target , 
            sourceIndex: sourceIndex,
            working: false
        });
    };
    

    
    StructureSpawn.prototype.criarKiller
     = function(energy, roleName) {
        let numeroDePartes = Math.floor(energy / 140);
        let body = [];

        for (let i = 0; i < numeroDePartes; i++) {
            body.push(ATTACK);
        };
        for (let i = 0; i < numeroDePartes; i++) {
            body.push(TOUGH);
        };
        for (let i = 0; i < numeroDePartes; i++) {
            body.push(MOVE);
        };

        let novoKiller = roleName + Game.time;

        return this.createCreep(body, novoKiller, {role: roleName});
    };
    
    StructureSpawn.prototype.criarHealer
     = function(energy, roleName) {
        let numeroDePartes = Math.floor(energy / 300);
        let body = [];

        for (let i = 0; i < numeroDePartes; i++) {
            body.push(HEAL);
        };
        for (let i = 0; i < numeroDePartes; i++) {
            body.push(MOVE);
        };

        let novoHealer = roleName + Game.time;

        return this.createCreep(body, novoKiller, {role: roleName});

    };
};