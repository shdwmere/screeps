let CreepRole = require('CreepRole');
const CreepsManager = require('CreepsManager');
const { strokeHarvest, strokeDeliveryToStructure } = require('./globals');

class RoleLongDistanceHarvester extends CreepRole {
    constructor() {
        super('longDistanceHarvester');
    }

    run(creep) {
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
            creep.say('🔄');
        }

        // se o creep estiver com capacidade máxima e não estiver trabalhando, manda ele trabalhar
        if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.say('⚡');
            creep.memory.working = true;
        };

        if (creep.memory.working) {
            if (creep.room.name == creep.memory.home) {
                console.log(creep.room.name)
                // filtra as estruturas selecionadas
                let estruturas = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_EXTENSION) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
    
                // a mais próxima do creep
                let estruturaMaisProxima = creep.pos.findClosestByPath(estruturas);
    
                if (estruturaMaisProxima) {
                    if (creep.transfer(estruturaMaisProxima, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(estruturaMaisProxima, { visualizePathStyle: { stroke: strokeDeliveryToStructure } });
                    };
                };
            }
            else {
                // se n voltamos pra casa
                let spawn1 = Game.spawns['Spawn1'];

                if (creep.room.name != creep.memory.home) {
                    creep.moveTo(spawn1.pos, { visualizePathStyle: { stroke: '#ffffff' } });
                    return;
                };
            };

        } 
        else {
            // harvest
            if (creep.room.name == creep.memory.target) {
                let source = creep.room.find(FIND_SOURCES)[creep.memory.sourceIndex];

                if (source && creep.harvest(source === ERR_NOT_IN_RANGE)) {
                    let harvestResult = creep.harvest(source);
                    if (harvestResult == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, { visualizePathStyle: { stroke: strokeHarvest } });
                    }
                    else if (harvestResult === -1) {
                        console.log(`Você não é o dono deste room!: ${harvestResult}`);
                    }
                    else if (harvestResult != OK) {
                        console.log(`Erro na coleta: ${harvestResult}`)
                    };
                };

            } 
            else {
                // se deslocando para o room target
                let exit = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.findClosestByRange(exit), { visualizePathStyle: { stroke: strokeHarvest } });
            };
            
        };



    }
}

module.exports = RoleLongDistanceHarvester;
