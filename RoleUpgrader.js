let CreepRole = require('CreepRole');

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
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#13d14c' } });
            }
        } else {
            let sources = creep.room.find(FIND_SOURCES);
            let sourceMaisProxima = creep.pos.findClosestByPath(sources);

            if (sourceMaisProxima) {
                if (creep.harvest(sourceMaisProxima) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceMaisProxima, { visualizePathStyle: { stroke: '#e0c61d' } });
                }
            }
        }
    };
}

module.exports = RoleUpgrader;