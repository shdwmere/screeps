// main.js
require('prototype.spawn')();
let spawnManager = require('SpawnManager');
let CreepsManager = require('CreepsManager');
let TowerManager = require('TowerManager');

let RoleHarvester = require('role.harvester');
let RoleUpgrader = require('role.upgrader');
let RoleBuilder = require('role.builder');
let RoleRepairer = require('role.repairer');
let RoleWallRepairer = require('role.wallRepairer');
let RoleHealer = require('role.healer');
let RoleKiller = require('role.killer');
let RoleLongDistanceHarvester = require('role.longDistanceHarvester');

const HOME = 'E16N19'

module.exports.loop = function () {
    spawnManager.definirSpawnsERoomsNaMemoria();
    spawnManager.identificadorVisualdoSpawn();
    CreepsManager.limparCreepsMortos();
    
    let energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
    //console.log(`capacidade de energia: ${energy}`)

    // objeto com as propriedades dos creeps, quantos tem de cada role e qual limite de produção.
    let CreepsObj = {
        limiteHarversters: 4,
        limiteLongDistanceHarvester: 2,
        limiteUpgraders: 4,
        limiteBuilders: 4,
        limiteRepairers: 0,
        limiteWallRepairers: 2,
        limiteHealers: 0,
        limiteKillers: 0,

        quantidadeHarvesters: _.sum(Game.creeps, (c) => c.memory.role === 'harvester'),
        quantidadeLongDistanceHarvester: _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceHarvester'),
        quantidadeUpgraders: _.sum(Game.creeps, (c) => c.memory.role === 'upgrader'),
        quantidadeBuilders: _.sum(Game.creeps, (c) => c.memory.role === 'builder'),
        quantidadeRepairers: _.sum(Game.creeps, (c) => c.memory.role === 'repairer'),
        quantidadeWallRepairers: _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairer'),
        quantidadeHealers: _.sum(Game.creeps, (c) => c.memory.role === 'healer'),
        quantidadeKillers: _.sum(Game.creeps, (c) => c.memory.role === 'killer'),
    }

    // fábrica de creeps em ordem decrescente
    if(CreepsObj.quantidadeHarvesters < CreepsObj.limiteHarversters) {
        harvester = Game.spawns['Spawn1'].criarCreepBalanceado(energy, 'harvester', HOME);
        console.log('\n[+] harvester na queue!');
    }
    else if (CreepsObj.quantidadeLongDistanceHarvester < CreepsObj.limiteLongDistanceHarvester) {
        LDHarvester = Game.spawns['Spawn1'].criarHarvesterLongaDistancia(energy, 5, HOME, 'E15N19', 0);
        console.log('\n[+] longDistanceHarvester na queue!');
    }
    else if (CreepsObj.quantidadeUpgraders <  CreepsObj.limiteUpgraders) {
        builder = Game.spawns['Spawn1'].criarCreepBalanceado(energy, 'upgrader', HOME);
        console.log('\n[+] upgrader na queue!');
    }
    else if (CreepsObj.quantidadeBuilders <  CreepsObj.limiteBuilders) {
        builder = Game.spawns['Spawn1'].criarCreepBalanceado(energy, 'builder', HOME);
        console.log('\n[+] builder na queue!');
    }
    else if (CreepsObj.quantidadeRepairers <  CreepsObj.limiteRepairers) {
        repairer = Game.spawns['Spawn1'].criarCreepBalanceado(energy, 'repairer', HOME);
        console.log('\n[+] repairer na queue!');
    }
    else if (CreepsObj.quantidadeKillers <  CreepsObj.limiteKillers) {
        killer = Game.spawns['Spawn1'].criarKiller(800, 'killer');
        console.log('\n[+] killer na queue!');
    }
    else if (CreepsObj.quantidadeHealers <  CreepsObj.limiteHealers) {
        healer = Game.spawns['Spawn1'].criarHealer(energy, 'healer');
        console.log('\n[+] healer na queue!');
    }
    else {
        if (CreepsObj.quantidadeWallRepairers <  CreepsObj.limiteWallRepairers) {
            wallRepairer = Game.spawns['Spawn1'].criarCreepBalanceado(energy, 'wallRepairer', HOME);
            console.log('\n[+] wall repairer na queue!');
        }
    }

    // Logs
    console.log(`harvesters: ${CreepsObj.quantidadeHarvesters}/${CreepsObj.limiteHarversters}`);
    console.log(`LD harvesters: ${CreepsObj.quantidadeLongDistanceHarvester}/${CreepsObj.limiteLongDistanceHarvester}`);
    console.log(`upgraders: ${CreepsObj.quantidadeUpgraders}/${CreepsObj.limiteUpgraders}`);
    console.log(`builders: ${CreepsObj.quantidadeBuilders}/${CreepsObj.limiteBuilders}`);
    console.log(`repairers: ${CreepsObj.quantidadeRepairers}/${CreepsObj.limiteRepairers}`);
    console.log(`wall repairers: ${CreepsObj.quantidadeWallRepairers}/${CreepsObj.limiteWallRepairers}`);
    console.log(`healers: ${CreepsObj.quantidadeHealers}/${CreepsObj.limiteHealers}`);
    console.log(`killers: ${CreepsObj.quantidadeKillers}/${CreepsObj.limiteKillers}`);
    

    // comportamento das towers
    var towers = Game.rooms[HOME].find(FIND_STRUCTURES, {
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
        if(creep.memory.role == 'longDistanceHarvester') {
            let LDharvester = new RoleLongDistanceHarvester();
			LDharvester.run(creep);
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
        };
        if(creep.memory.role == 'killer') {
            let killer = new RoleKiller();
            killer.run(creep);
        };
        if(creep.memory.role == 'healer') {
            let healer = new RoleHealer();
            healer.run(creep);
        };
    };
};