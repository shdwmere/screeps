let CreepRole = require('CreepRole');
const { strokeHarvest, strokeUpgrade } = require('./globals');

class RoleUpgrader extends CreepRole {
    constructor() {
        super('upgrader');
    }

    run(creep) {
        
        if(creep.memory.aprimorandoControlador && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.aprimorandoControlador = false;
            creep.say('🔄');
        }

        // se o creep estiver full capacity e nao estiver construindo, manda ele construir 
        if (!creep.memory.aprimorandoControlador && creep.store.getFreeCapacity() == 0) {
            creep.memory.aprimorandoControlador = true;
            creep.say('⬆️');
        };
        
        if (creep.memory.aprimorandoControlador) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: strokeUpgrade } });
            }
        } else {
            let sources = creep.room.find(FIND_SOURCES);
            let sourceMaisProxima = creep.pos.findClosestByPath(sources);

            // Verificar se a source mais próxima está ocupada por muitos creeps
            let creepsNaSource = creep.room.find(FIND_MY_CREEPS, {
                filter: creep => creep && creep.pos.isNearTo(sourceMaisProxima)
            });

            if (creepsNaSource.length >= 3) {
                // Enviar para outra source se a atual estiver cheia de creeps upgraders
                sources = sources.filter(source => source.id !== sourceMaisProxima.id);
            }

            if (sourceMaisProxima) {
                if (creep.harvest(sourceMaisProxima) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceMaisProxima, { visualizePathStyle: { stroke: strokeHarvest } });
                }
            }
        }
    };
}

module.exports = RoleUpgrader;