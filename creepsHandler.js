const { strokeHarvest } = require('./globals');

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
    
    coletarEnergia: function(creep) {
        // verificar se existem recursos de energia no chão próximos
        let recursosNoChao = creep.room.find(FIND_DROPPED_RESOURCES, {
            filter: (resource) => resource.resourceType === RESOURCE_ENERGY
        });
        let recursoMaisProximo = creep.pos.findClosestByPath(recursosNoChao);

        // se existem recursos no chão e estão mais próximos, tentar pegá-los
        if (recursoMaisProximo) {
            if (creep.pickup(recursoMaisProximo) == ERR_NOT_IN_RANGE) {
                creep.moveTo(recursoMaisProximo, { visualizePathStyle: { stroke: strokeHarvest } });
                return; // Encerrar a função aqui para evitar que tente minerar na mesma rodada
            }
        } else {
            // Se não, seguir a lógica de mineração normal
            let sources = creep.room.find(FIND_SOURCES);
            let sourceMaisProxima = creep.pos.findClosestByPath(sources);

            let creepsNaSource = creep.room.find(FIND_MY_CREEPS, {
                filter: (c) => c !== creep && c.pos.isNearTo(sourceMaisProxima)
            });
            
            // verificar se a source mais próxima está ocupada por muitos creeps
            if (creepsNaSource.length >= 3) {
                sources = sources.filter(source => source.id !== sourceMaisProxima.id);
                sourceMaisProxima = creep.pos.findClosestByPath(sources); // Encontre a próxima source mais próxima
            }

            if (sourceMaisProxima) {
                if (creep.harvest(sourceMaisProxima) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceMaisProxima, { visualizePathStyle: { stroke: strokeHarvest } });
                }
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