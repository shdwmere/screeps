let spawnHandler = require('spawnHandler');
let creepsHandler = require('creepsHandler');

let RoleHarvester = require('RoleHarvester');
let RoleUpgrader = require('RoleUpgrader');
let RoleBuilder = require('RoleBuilder');
let RoleRepairer = require('RoleRepairer');

module.exports.loop = function () {
    spawnHandler.definirSpawns();
    spawnHandler.identificadorVisualdoSpawn();

    creepsHandler.limparCreepsMortos();

    // Capacidade total de energia do room inteiro
    let energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
    //console.log(energy)

    let limiteHarvesters = 4;
    let limiteUpgraders = 4;
    let limiteBuilders = 2;
    let limiteRepairers = 1;

    let bodyPartsHarvester = creepsHandler.criarBodyParts(WORK, 6, CARRY, 1, MOVE, 2); // 750
    let bodyPartsUpgrader = creepsHandler.criarBodyParts(WORK, 4, CARRY, 1, MOVE, 2); // 550
    let bodyPartsBuilder = creepsHandler.criarBodyParts(WORK, 4, CARRY, 1, MOVE, 2); // 550
    let bodyPartsRepairer = creepsHandler.criarBodyParts(WORK, 4, CARRY, 1, MOVE, 2); // 550


    // definindo o indice do foco de extracao de energia
    //creepsHandler.definirFonteDeEnergia('builder', 3);
    //creepsHandler.definirFonteDeEnergia('upgrader', 3);
   
	// spawners automáticos
    if(creepsHandler.contarCreeps('harvester') < limiteHarvesters) {
	    creepsHandler.autoSpawnCreep('Spawn1','harvester', bodyPartsHarvester, limiteHarvesters);
	    console.log('\n[+] harvester na queue!');
    }
    else if (creepsHandler.contarCreeps('upgrader') < limiteUpgraders) {
        creepsHandler.autoSpawnCreep('Spawn1','upgrader', bodyPartsUpgrader, limiteUpgraders);
        console.log('\n[+] upgrader na queue!')
    } else if (creepsHandler.contarCreeps('repairer') < limiteRepairers) {
        creepsHandler.autoSpawnCreep('Spawn1','repairer', bodyPartsRepairer, limiteRepairers);
        console.log('\n[+] repairer na queue!')
    }
    else {
        creepsHandler.autoSpawnCreep('Spawn1','builder', bodyPartsBuilder, limiteBuilders);
        console.log('\n[+] builder na queue!')
    };

    // towers filter
    var towers = Game.rooms['E16N19'].find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    
    // comportamento das tower
    for (let tower of towers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        if(target != undefined) {
            tower.attack(target);
        } else {
            let estruturaAReparar = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (e) => e.hits < e.hitsMax && e.structureType != STRUCTURE_WALL
            });

            if(estruturaAReparar) {
                tower.repair(estruturaAReparar)
            }
        }
    }

    // logs
    creepsHandler.logContagemCreeps('harvester');
    creepsHandler.logContagemCreeps('upgrader');
    creepsHandler.logContagemCreeps('builder');
    creepsHandler.logContagemCreeps('repairer');

	// main loop
    for(let name in Game.creeps) {
        let creep = Game.creeps[name];

        if(creep.memory.role == 'harvester') {
            let harvester = new RoleHarvester();
			harvester.run(creep);
        };
        if(creep.memory.role == 'upgrader') {
            let upgrader = new RoleUpgrader();
			upgrader.run(creep);
        };
        if(creep.memory.role == 'builder') {
            let builder = new RoleBuilder();
			builder.run(creep);
        };
        if(creep.memory.role == 'repairer') {
            let repairer = new RoleRepairer();
            repairer.run(creep);
        };        
    };
};