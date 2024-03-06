let CreepRole = require('CreepRole');
const CreepsManager = require('CreepsManager');
const { strokeRepair } = require('./globals');

let RoleBuilder = require('role.builder');

class RoleRepairer extends CreepRole {
    constructor() {
        super('repairer');
    }

    run(creep) {
        if (creep.memory.reparando && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.reparando = false;
        }
        if (!creep.memory.reparando && creep.store.getFreeCapacity() == 0) {
            creep.memory.reparando = true;
            creep.say('❤️🔧');
        }

        if (creep.memory.reparando) {

            let estrutura = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
            });
            
            if (estrutura != undefined) {
                if (creep.repair(estrutura) != 0) {
                    if (creep.repair(estrutura) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(estrutura, { visualizePathStyle: { stroke: strokeRepair } });
                    }
                }
            } else {
                let builder = new RoleBuilder();
                builder.run(creep);
            }
        } else {
            CreepsManager.coletarEnergia(creep);
        }
    }
}

module.exports = RoleRepairer;
