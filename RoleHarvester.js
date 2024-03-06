let CreepRole = require('CreepRole');
const { strokeDeliveryToStructure } = require('./globals');
let RoleUpgrader = require('RoleUpgrader');
const creepsHandler = require('./creepsHandler');


class RoleHarvester extends CreepRole {
    constructor() {
        super('harvester');
    }

    run(creep) {

        if(creep.memory.entregandoEnergia && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.entregandoEnergia = false;
            creep.say('🔄');
        }

        // se o creep estiver full capacity e nao estiver construindo, manda ele construir 
        if (!creep.memory.entregandoEnergia && creep.store.getFreeCapacity() == 0) {
            creep.memory.entregandoEnergia = true;
            creep.say('⚡');
        };

        if(creep.memory.entregandoEnergia) {
            let estruturas = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_CONTAINER ||
                                                structure.structureType ==  STRUCTURE_TOWER ||
                        structure.structureType == STRUCTURE_EXTENSION ) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            
            if (estruturas.length > 0) {
                if (creep.transfer(estruturas[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(estruturas[0], { visualizePathStyle: { stroke: strokeDeliveryToStructure } });
                }
            } else {
                // se não houver sites de construção, mudar para upgrade no RCL
                let upgrader = new RoleUpgrader();
                upgrader.run(creep);
            }

        } else {
            creepsHandler.coletarEnergia(creep);
        }

    }

}

module.exports = RoleHarvester;
