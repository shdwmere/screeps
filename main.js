let RoleHarvester = require('RoleHarvester');
let RoleUpgrader = require('RoleUpgrader');
let RoleBuilder = require('RoleBuilder');
let spawnHandler = require('spawnHandler')
let creepsHandler = require('creepsHandler')

module.exports.loop = function () {
    // spawn handling
    spawnHandler.identificadorVisualdoSpawn();
    spawnHandler.definirSpawns();

    // creep handling
    creepsHandler.limparCreepsMortos();

    // delimitando area de coleta
    let areaDeColeta = {
        minX: 19, minY: 1, 
        maxX: 45, maxY: 47
    };

    let limiteHarvesters = 6;
    let limiteUpgraders = 3;
    let limiteBuilders = 8;

    let bodyPartsHarvester = criarBodyParts(WORK, 4, CARRY, 1, MOVE, 2); // 550
    let bodyPartsUpgrader = criarBodyParts(WORK, 2, CARRY, 1, MOVE, 3); // 400
    let bodyPartsBuilder = criarBodyParts(WORK, 2, CARRY, 1, MOVE, 3); // 400


    // definindo o indice do foco de extracao de energia
    //creepsHandler.definirFonteDeEnergia('builder', 3);
    //creepsHandler.definirFonteDeEnergia('upgrader', 3);


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
            let builder = new RoleBuilder();
			builder.run(creep);
        };
    };
};