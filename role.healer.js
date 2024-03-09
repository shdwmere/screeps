// role.healer.js
let CreepRole = require('CreepRole');
const CreepsManager = require('CreepsManager'); // Supondo que este módulo tenha a função adequada para coletar energia
const { strokeHeal } = require('./globals');


class RoleHealer extends CreepRole {
    constructor() {
        super('healer');
    }

    run(creep) {

        if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
            creep.say('!');
        };

        // se o creep estiver full capacity e nao estiver curando ngm, manda ele curar 
        if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
            creep.say('🚑');
        };

        if (creep.memory.working) {
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
                //console.log(creep.name + ' tem energia para curar.');
                let aliadoFerido = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: (c) => c.hits < c.hitsMax
                });
                // console.log(aliadoFerido)

                if(aliadoFerido && creep.heal(aliadoFerido == ERR_NOT_IN_RANGE)) {
                    creep.moveTo(aliadoFerido, { visualizePathStyle: { stroke: strokeHeal } });

                    if(creep.pos.isNearTo(aliadoFerido)) {
                        creep.heal(aliadoFerido);
                    }
                    else {
                        creep.rangedHeal(aliadoFerido);
                    };
                }
                // remover este else pois os creeps nao sao supostos a ter a parte work e carry, somente heal e move.
                // else {
                //     let upgrader = new RoleUpgrader();
                //     upgrader.run(creep);
                // }
                
            }
        } else {
            //console.log(creep.name + ' está sem energia para curar.');
            CreepsManager.coletarEnergia(creep);
        };
    };
};

module.exports = RoleHealer;
