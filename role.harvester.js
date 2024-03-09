let CreepRole = require('CreepRole');
const CreepsManager = require('CreepsManager');
const { strokeDeliveryToStructure } = require('./globals');

let RoleUpgrader = require('role.upgrader');


class RoleHarvester extends CreepRole {
    constructor() {
        super('harvester');
    }

    run(creep) {

        if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
            creep.say('🔄');
        }

        // se o creep estiver full capacity e nao estiver construindo, manda ele construir 
        if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
            creep.say('⚡');
        };

        if(creep.memory.working) {
            // filtra as estruturas selecionadas
            let estruturas = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType ==  STRUCTURE_TOWER ||
                        structure.structureType ==  !STRUCTURE_CONTAINER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            
            // a mais proxima do creep
            let estruturasProximas = creep.pos.findClosestByPath(estruturas) 

            if (estruturasProximas) {
                if (creep.transfer(estruturasProximas, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(estruturasProximas, { visualizePathStyle: { stroke: strokeDeliveryToStructure } });
                }
            } else {
                // se não houver sites de construção, mudar para upgrade no RCL
                let upgrader = new RoleUpgrader();
                upgrader.run(creep);
            }

        } else {
            CreepsManager.coletarEnergia(creep)
            // || CreepsManager.sacarEnergiaContainer(creep);
        }

    }

}

module.exports = RoleHarvester;
