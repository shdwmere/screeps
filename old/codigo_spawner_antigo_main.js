    /*
        // funcao spawn que pertencia ao modulo spawnHandler
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
    // funcao criar body parts
    criarBodyParts: function criarBodyParts(...args) {
        let bodyParts = [];
        for (let i = 0; i < args.length; i += 2) {
            let part = args[i];
            let count = args[i + 1];
            for (let j = 0; j < count; j++) {
                bodyParts.push(part);
            }
        }
        return bodyParts;
    },

    // usage no main.js
    let creepsHandler = require('creepsHandler');
    
    let bodyPartsHarvester = creepsHandler.criarBodyParts(WORK, 4, CARRY, 1, MOVE, 2); // 550
    let bodyPartsUpgrader = creepsHandler.criarBodyParts(WORK, 4, CARRY, 1, MOVE, 2); // 550
    let bodyPartsBuilder = creepsHandler.criarBodyParts(WORK, 4, CARRY, 1, MOVE, 2); // 550
    let bodyPartsRepairer = creepsHandler.criarBodyParts(WORK, 4, CARRY, 1, MOVE, 2); // 550
   
	// spawners automáticos
    if(creepsHandler.contarCreeps('harvester') < limiteHarvesters) {
	    creepsHandler.autoSpawnCreep('Spawn1','harvester', bodyPartsHarvester, limiteHarvesters);
	    console.log('\n[+] harvester na queue!');
    }
    else if (creepsHandler.contarCreeps('upgrader') < limiteUpgraders) {
        creepsHandler.autoSpawnCreep('Spawn1','upgrader', bodyPartsUpgrader, limiteUpgraders);
        console.log('\n[+] upgrader na queue!')
    } else if (creepsHandler.contarCreeps('repairer') < limiteRepairers) {
        creepsHandler.autoSpawnCreep('Spawn1','repairer', bodyPartsRepairer, limiteRepairers);
        console.log('\n[+] repairer na queue!')
    }
    else {
        creepsHandler.autoSpawnCreep('Spawn1','builder', bodyPartsBuilder, limiteBuilders);
        console.log('\n[+] builder na queue!')
    };
*/