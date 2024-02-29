let RoleHarvester = require('RoleHarvester');
let RoleUpgrader = require('RoleUpgrader');
let RoleBuilder = require('RoleBuilder');
let spawnUtils = require('spawnUtils')

module.exports.loop = function () {

    let areaDeConstrucao = {
        minX: 27, minY: 22,
        maxX: 30, maxY: 26
    }

    let areaDeColeta = {
        minX: 25, minY: 13, 
        maxX: 44, maxY: 43
    }

	spawnUtils.identificadorVisualdoSpawn();
	spawnUtils.limparCreepsMortos();

	
	// spawners
    spawnUtils.autoSpawnCreep('Spawn1','upgrader', [WORK, CARRY, MOVE, MOVE], 5);
	spawnUtils.autoSpawnCreep('Spawn1','harvester', [WORK, WORK, CARRY, MOVE], 5);
	//spawnUtils.autoSpawnCreep('Spawn1','builder', [WORK, CARRY, CARRY, MOVE], 5);
    spawnUtils.definirSpawns()
	

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