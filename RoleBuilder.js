let CreepRole = require('CreepRole');

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
                creep.moveTo(this.minX + 1, this.minY + 1); // mover para o centro da area
                return;
            }

            // Verificar se o creep tem um alvo específico para construir
            if (creep.memory.targetID) {
                let target = Game.getObjectById(creep.memory.targetID);
                if (target) {
                    if (creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                } else {
                    // Se o alvo não existir mais, limpar o targetID
                    delete creep.memory.targetID;
                }
            } else {
                // Se não tiver um alvo específico, construir conforme o padrão
                var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
                let closestConstructionSite = creep.pos.findClosestByPath(constructionSites);

                if (closestConstructionSite) {
                    if (creep.build(closestConstructionSite) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestConstructionSite, { visualizePathStyle: { stroke: '#ff0ff7' } });
                    }
                }
            }
        } else {
            // busca source pra fazer harvest
            let sources = creep.room.find(FIND_SOURCES);
            let sourceMaisProxima = creep.pos.findClosestByPath(sources);

            if (sourceMaisProxima) {
                if (creep.harvest(sourceMaisProxima) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceMaisProxima, { visualizePathStyle: { stroke: '#e0c61d' } });
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