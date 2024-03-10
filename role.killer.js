let CreepRole = require('CreepRole');
const { strokeAttack } = require('./globals');

class RoleKiller extends CreepRole {
    constructor() {
        super('killer');
    }

    run(creep) {

        let roomToRaid = undefined;

        if (roomToRaid != undefined) {
            // iniciar matança no room
            creep.say('😈🔪');
            creep.memory.killing = true;
        }
        
        if (creep.memory.killing) {
            if(roomToRaid) {
                if (creep.room.name != roomToRaid) {
                    creep.moveTo(new RoomPosition(4, 5, roomToRaid), { visualizePathStyle: { stroke: strokeAttack } });
                    return;
                } else {
                    let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    let spawnInimigo = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                        filter: { structureType: STRUCTURE_SPAWN }
                    });
    
                    console.log(target)
    
                    if (target) {
                        // se houver um inimigo, ataca
                        if (creep.attack(target) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, { visualizePathStyle: strokeAttack });
                        }
                    }
                    else if (spawnInimigo) {
                        if (creep.attack(spawnInimigo) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(spawnInimigo, { visualizePathStyle: strokeAttack });
                        };
                    };
    
                };
            } 
            }
        else {
            // retornar para defender a base do spawn
            creep.memory.killing = false;
            let mainSpawn = Game.spawns['Spawn1'];

            if (creep.room.name != creep.memory.home) {
                creep.moveTo(mainSpawn.pos, { visualizePathStyle: { stroke: '#ffffff' } });
                return;
            };

            let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    // caso haja algum creep na nossa base
            if (target) {
                creep.memory.killing = true;
                if (creep.attack(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: strokeAttack });
                }
            };
        };
    };
}

module.exports = RoleKiller;
