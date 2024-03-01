let RoleHarvester = require('RoleHarvester');
let RoleUpgrader = require('RoleUpgrader');
let RoleBuilder = require('RoleBuilder');
let spawnHandler = require('spawnHandler')
let creepsHandler = require('creepsHandler')

module.exports.loop = function () {

    creepsHandler.limparCreepsMortos();

    // funções essenciais
    spawnHandler.identificadorVisualdoSpawn();
    spawnHandler.definirSpawns();

    // delimitando áreas de trabalho
    let areaDeConstrucao = {
        minX: 27, minY: 22,
        maxX: 32, maxY: 25
    };
    let areaDeColeta = {
        minX: 25, minY: 13, 
        maxX: 44, maxY: 43
    };

    let limiteHarvesters = 3;
    let limiteUpgraders = 3;
    let limiteBuilders = 3;

    let bodyPartsHarvester = criarBodyParts(WORK, 1, CARRY, 1, MOVE, 1);
    let bodyPartsUpgrader = criarBodyParts(WORK, 2, CARRY, 1, MOVE, 1);
    let bodyPartsBuilder = criarBodyParts(WORK, 1, CARRY, 1, MOVE, 1);

    function criarBodyParts(...args) {
        let bodyParts = [];
        for (let i = 0; i < args.length; i += 2) {
            let part = args[i];
            let count = args[i + 1];
            for (let j = 0; j < count; j++) {
                bodyParts.push(part);
            }
        }
        return bodyParts;
    };
   
	// spawners automáticos
    if(creepsHandler.contarCreeps('harvester') < limiteHarvesters) {
	    creepsHandler.autoSpawnCreep('Spawn1','harvester', bodyPartsHarvester, limiteHarvesters);
	    console.log('\n[+] harvester na queue!');
    }
    else if (creepsHandler.contarCreeps('upgrader') < limiteUpgraders) {
        creepsHandler.autoSpawnCreep('Spawn1','upgrader', bodyPartsUpgrader, limiteUpgraders);
        console.log('[+] upgrader na queue!')
    }
    else {
        creepsHandler.autoSpawnCreep('Spawn1','builder', bodyPartsBuilder, limiteBuilders);
        console.log('[+] builder na queue!')
    };

    // logs
    creepsHandler.logContagemCreeps('harvester');
    creepsHandler.logContagemCreeps('upgrader');
    creepsHandler.logContagemCreeps('builder');
	

	// main loop
    for(let name in Game.creeps) {
        let creep = Game.creeps[name];

        if(creep.memory.role == 'harvester') {
            let harvester = new RoleHarvester(areaDeColeta.minX, areaDeColeta.maxX, areaDeColeta.minY, areaDeColeta.maxY);
			harvester.run(creep);
        };
        if(creep.memory.role == 'upgrader') {
            let upgrader = new RoleUpgrader();
			upgrader.run(creep);
        };
        if(creep.memory.role == 'builder') {
            let builder = new RoleBuilder(areaDeConstrucao.minX, areaDeConstrucao.maxX, areaDeConstrucao.minY, areaDeConstrucao.maxY);
			builder.run(creep);
        };
    };
};