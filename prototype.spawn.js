module.exports = function() {
    // spawner balanceado
    StructureSpawn.prototype.criarCreepCustom = 
    function(energy, roleName){
        let numberOfParts = Math.floor(energy / 200);
        
        let body = [];
        for (let i = 0; i < numberOfParts; i++) {
            body.push(WORK);
        };
        for (let i = 0; i < numberOfParts; i++) {
            body.push(CARRY);
        };
        for (let i = 0; i < numberOfParts; i++) {
            body.push(MOVE);
        };

        let novoNome = roleName + Game.time;

        return this.createCreep(body, novoNome, {role: roleName, state: false});
    };
};