let CreepRole = require('CreepRole');
const CreepsManager = require('CreepsManager');
const { strokeRepair } = require('./globals');

let RoleBuilder = require('role.builder');

class RoleWallRepairer extends CreepRole {
    constructor() {
        super('wallRepairer');
    }

    run(creep) {
        if (creep.memory.reparandoMuro && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.reparandoMuro = false;
        }
        if (!creep.memory.reparandoMuro && creep.store.getFreeCapacity() == 0) {
            creep.memory.reparandoMuro = true;
            creep.say('🧱🔧');
        }

        if (creep.memory.reparandoMuro) {
            // array dos muros
            let walls = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_WALL 
            });

            let target = undefined
            
            // procurando pelo muro mais próximo com o menor hp, aumentando a porcentagem do hp a cada iteração
            for ( let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001 ) {
                target = creep.pos.findClosestByPath(walls, {
                    filter: (w) => w.hits / w.hitsMax < percentage
                });

                if ( target != undefined ) {
                    break;
                }
            };

            // se encontrar algum target, então repare
            if ( target != undefined ) {
              if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: strokeRepair } });
              };  
            } else {
                let builder = new RoleBuilder();
                builder.run(creep);
            }

        } else {
            CreepsManager.coletarEnergia(creep);
        }
    }
}

module.exports = RoleWallRepairer;
