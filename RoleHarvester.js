let CreepRole = require('CreepRole');
const { strokeHarvest, strokeDeliveryToStructure } = require('./globals');

class RoleHarvester extends CreepRole {
    constructor(minX, maxX, minY, maxY) {
        super('harvester');
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;
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
                        structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            
            if (estruturas.length > 0) {
                if (creep.transfer(estruturas[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(estruturas[0], { visualizePathStyle: { stroke: strokeDeliveryToStructure } });
                }
            }

        } else {
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

            if (sourceMaisProxima) {
                if (creep.harvest(sourceMaisProxima) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceMaisProxima, { visualizePathStyle: { stroke: strokeHarvest } });
                }
            }
        }
    }

    // verificar se o creep está dentro da Área de Coleta
    estaNaAreaDeColeta(creep) {
        return creep.pos.x >= this.minX && creep.pos.x <= this.maxX && creep.pos.y >= this.minY && creep.pos.y <= this.maxY;
    }
}

module.exports = RoleHarvester;
