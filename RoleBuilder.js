let CreepRole = require('CreepRole');
const { strokeHarvest, strokeBuild } = require('./globals');
let RoleUpgrader = require('RoleUpgrader');

class RoleBuilder extends CreepRole {
    constructor(minX, maxX, minY, maxY) {
        super('builder');
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;
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
        // logica do construindo
        if (creep.memory.construindo) {

            // verificar se os creeps estao dentro da area de construcao
            if (!this.estaNaAreaDeConstrucao(creep, this.minX, this.maxX, this.minY, this.maxY)) {
                creep.moveTo(this.minX + 1, this.minY + 1), { visualizePathStyle: { stroke: strokeBuild } }; // mover para o centro da area
                return;
            } else {
                var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
                let closestConstructionSite = creep.pos.findClosestByPath(constructionSites);

                if (closestConstructionSite) {
                    if (creep.build(closestConstructionSite) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestConstructionSite, { visualizePathStyle: { stroke: strokeBuild } });
                    }
                }
                // se o creep n tiver perto de nenhuma construcao, ent ele vai fazer upgrade no rcl
                else {
                    let upgrader = new RoleUpgrader();
                    upgrader.run(creep);
                }
            }

        } else {
            // busca source pra fazer harvest
            let sources = creep.room.find(FIND_SOURCES);
            let sourceMaisProxima = creep.pos.findClosestByPath(sources);

            if (sourceMaisProxima) {
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