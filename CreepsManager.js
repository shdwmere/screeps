const { strokeHarvest } = require('./globals');

module.exports = {
    
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
                return; // encerrar a função aqui pra evitar que tente minerar na mesma rodada
            }
        } else {
            // se não, seguir a lógica de mineração normal
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
};