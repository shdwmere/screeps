module.exports = {
    autoSpawnCreep: function(spawnName, role, bodyParts, limite) {
        let creepsEncarregados = _.filter(Game.creeps, (creep) => creep.memory.role == role);
        if (creepsEncarregados.length < limite) {

            let novoNome = role + Game.time;
            let spawn = Game.spawns[spawnName];

            if(spawn) {
                let resultado = spawn.spawnCreep(bodyParts, novoNome, { memory: { role: role } });
                if(resultado === OK) {
                    console.log(`spawnando novo ${role}: ${novoNome}`);
                }
            } else {
                console.log(`spawn não encontrado: ${spawnName}`);
            }
        }
    },
    limparCreepsMortos: function() {
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('[-] Limpando creep não-existente da memória:', name)
            }
        }
    },
    // contando os creeps pertencentes a role
    contarCreeps: function(role) {
        // Filtra todos os creeps do jogo pelo papel específico
        let creepsPorRole = _.filter(Game.creeps, (creep) => creep.memory.role == role);
    
        return creepsPorRole.length;
    },
    // pro terminal
    logContagemCreeps: function(role) {
        let contagem = this.contarCreeps(role);
        
        if(contagem > 0) {
            console.log(`creeps ${role}s: ${contagem}`);
        } else {
            console.log(`nenhum creep trabalhando como ${role}.`);
        }
    
        return contagem;
    }
};