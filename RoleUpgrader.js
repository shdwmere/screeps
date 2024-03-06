let CreepRole = require('CreepRole');
const { strokeUpgrade } = require('./globals');
const creepsHandler = require('./creepsHandler');


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
            // coletar energia
            creepsHandler.coletarEnergia(creep);
        };
    };
}

module.exports = RoleUpgrader;