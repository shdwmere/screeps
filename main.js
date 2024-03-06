require('prototype.spawn')();
let spawnManager = require('SpawnManager');
let CreepsManager = require('CreepsManager');
let TowerManager = require('TowerManager');

let RoleHarvester = require('role.harvester');
let RoleUpgrader = require('role.upgrader');
let RoleBuilder = require('role.builder');
let RoleRepairer = require('role.repairer');
let RoleWallRepairer = require('role.wallRepairer');


module.exports.loop = function () {
    spawnManager.definirSpawnsERoomsNaMemoria();
    spawnManager.identificadorVisualdoSpawn();
    CreepsManager.limparCreepsMortos();
    
    let energy = Game.spawns.Spawn1.room.energyCapacityAvailable;

    // objeto com as propriedades dos creeps, quantos tem de cada role e qual limite de produção.
    let CreepsObj = {
        limiteHarversters: 4,
        limiteUpgraders: 3,
        limiteBuilders: 3,
        limiteRepairers: 1,
        limiteWallRepairers: 1,

        quantidadeHarvesters: _.sum(Game.creeps, (c) => c.memory.role === 'harvester'),
        quantidadeUpgraders: _.sum(Game.creeps, (c) => c.memory.role === 'upgrader'),
        quantidadeBuilders: _.sum(Game.creeps, (c) => c.memory.role === 'builder'),
        quantidadeRepairers: _.sum(Game.creeps, (c) => c.memory.role === 'repairer'),
        quantidadeWallRepairers: _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairer'),
    }

    // fábrica de creeps em ordem decrescente
    if(CreepsObj.quantidadeHarvesters < CreepsObj.limiteHarversters) {
        harvester = Game.spawns['Spawn1'].criarCreepCustom(energy, 'harvester');
        console.log('\n[+] harvester na queue!');
    }
    else if (CreepsObj.quantidadeUpgraders < CreepsObj.limiteUpgraders) {
        upgrader = Game.spawns['Spawn1'].criarCreepCustom(energy, 'upgrader');
        console.log('\n[+] upgrader na queue!');
    }
    else if (CreepsObj.quantidadeBuilders <  CreepsObj.limiteBuilders) {
        builder = Game.spawns['Spawn1'].criarCreepCustom(energy, 'builder');
        console.log('\n[+] builder na queue!');
    }
    else if (CreepsObj.quantidadeRepairers <  CreepsObj.limiteRepairers) {
        builder = Game.spawns['Spawn1'].criarCreepCustom(energy, 'repairer');
        console.log('\n[+] repairer na queue!');
    }
    else {
        if (CreepsObj.quantidadeWallRepairers <  CreepsObj.limiteWallRepairers) {
            repairer = Game.spawns['Spawn1'].criarCreepCustom(energy, 'wallRepairer');
            console.log('\n[+] wall repairer na queue!');
        }
    }

    // Logs
    console.log(`harvesters: ${CreepsObj.quantidadeHarvesters}`);
    console.log(`upgraders: ${CreepsObj.quantidadeUpgraders}`);
    console.log(`builders: ${CreepsObj.quantidadeBuilders}`);
    console.log(`repairers: ${CreepsObj.quantidadeRepairers}`);
    

    let roomName = Memory.spawns['Spawn1'].roomName;
    let room = Game.rooms[roomName];
    
    // comportamento das towers
    var towers = room.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER 
    });

    for(let tower of towers) {
        let towerManager = new TowerManager(tower);
        towerManager.run();
    };

    
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
        if(creep.memory.role == 'wallRepairer') {
            let wallRepairer = new RoleWallRepairer();
            wallRepairer.run(creep);
        }
    };
};