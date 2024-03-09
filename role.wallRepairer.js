let CreepRole = require('CreepRole');
const CreepsManager = require('CreepsManager');
const { strokeRepair } = require('./globals');

let RoleBuilder = require('role.builder');

class RoleWallRepairer extends CreepRole {
    constructor() {
        super('wallRepairer');
    }

    run(creep) {
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
        }
        if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
            creep.say('🧱🔧');
        }

        if (creep.memory.working) {
            // array dos muros
            let walls = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_WALL 
            });

            let alvo = undefined
            
            // procurando pelo muro com a menor porcentagem de hp a cada iteração
            let minPercentage = 1;
            for (let wall of walls) {
                let percentage = wall.hits / wall.hitsMax;
                if (percentage < minPercentage) {
                    minPercentage = percentage;
                    alvo = wall;
                }
            }
            if (alvo) {
                if(creep.repair(alvo) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(alvo, { visualizePathStyle: { stroke: strokeRepair }})
                };
            }  else {
                console.log(alvo)
                let builder = new RoleBuilder();
                builder.run(creep)
            }
            
        } else {
            CreepsManager.coletarEnergia(creep);
        }
    }
}

module.exports = RoleWallRepairer;
