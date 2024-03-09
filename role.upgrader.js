let CreepRole = require('CreepRole');
const CreepsManager = require('CreepsManager');
const { strokeUpgrade } = require('./globals');


class RoleUpgrader extends CreepRole {
    constructor() {
        super('upgrader');
    }

    run(creep) {
        
        if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
            creep.say('🔄');
        }

        // se o creep estiver full capacity e nao estiver construindo, manda ele construir 
        if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
            creep.say('⬆️');
        };
        
        if (creep.memory.working) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: strokeUpgrade } });
            }
        } else {
            // coletar energia
            CreepsManager.coletarEnergia(creep);
        };
    };
}

module.exports = RoleUpgrader;