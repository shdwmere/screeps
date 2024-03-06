let CreepRole = require('CreepRole');
const CreepsManager = require('CreepsManager');
const { strokeBuild } = require('./globals');

let RoleUpgrader = require('role.upgrader');


class RoleBuilder extends CreepRole {
    constructor() {
        super('builder');
    }

    run(creep) {
        // se o creep tiver sem energia ele nao ira mais construir
        if (creep.memory.construindo && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.construindo = false;
        };
        // se o creep estiver full capacity e nao estiver construindo, manda ele construir 
        if (!creep.memory.construindo && creep.store.getFreeCapacity() == 0) {
            creep.memory.construindo = true;
            creep.say('🚧');
        };
        // lógica de construção
        if (creep.memory.construindo) {
            let constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);

            if (constructionSites.length > 0) {
                if (creep.build(constructionSites[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSites[0], { visualizePathStyle: { stroke: strokeBuild } });
                }
            } else {
                // se não houver sites de construção, mudar para upgrade no RCL
                let upgrader = new RoleUpgrader();
                upgrader.run(creep);

            }
        } else {
            CreepsManager.coletarEnergia(creep);
        }
    };
}

module.exports = RoleBuilder;