let CreepRole = require('CreepRole');
const { strokeHarvest, strokeBuild } = require('./globals');
let RoleUpgrader = require('RoleUpgrader');

class RoleBuilder extends CreepRole {
    constructor() {
        super('builder');
    }

    run(creep) {

        // se o creep tiver sem energia ele nao ira mais construir
        if (creep.memory.construindo && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.construindo = false;
            creep.say('🔄');
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
                    creep.moveTo(constructionSites[0], { visualizePathStyle: { stroke: strokeHarvest } });
                }
            } else {
                // se não houver sites de construção, mudar para upgrade no RCL
                creep.say('⬆️');
                let upgrader = new RoleUpgrader();
                upgrader.run(creep);
            }
        } else {
            // busca source pra fazer harvest
            let sources = creep.room.find(FIND_SOURCES);
            let sourceMaisProxima = creep.pos.findClosestByPath(sources);

            // Verificar se a source mais próxima está ocupada por muitos creeps
            let creepsNaSource = creep.room.find(FIND_MY_CREEPS, {
                filter: creep => creep && creep.pos.isNearTo(sourceMaisProxima)
            });

            if (creepsNaSource.length >= 3) {
                // Enviar para outra source se a atual estiver cheia de creeps upgraders
                sources = sources.filter(source => source.id !== sourceMaisProxima.id);
            }

            if (sources.length > 0) {
                if (creep.harvest(sourceMaisProxima) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceMaisProxima, { visualizePathStyle: { stroke: strokeHarvest } });
                }
            }
        }
    };

    // verificar se o creep está dentro da Área de Construção
    estaNaAreaDeConstrucao(creep) {
        return creep.pos.x >= this.minX && creep.pos.x <= this.maxX && creep.pos.y >= this.minY && creep.pos.y <= this.maxY;
    }
}

module.exports = RoleBuilder;