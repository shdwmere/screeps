module.exports = {
    definirSpawns: function() {
        for (let spawnName in Game.spawns) {
            let spawn = Game.spawns[spawnName];
            // definir o nome do spawn na memória do spawn
            spawn.memory.spawnName = spawnName;
    
            // adicionar o nome do spawn à lista de spawns na memória global
            if (!Memory.spawns) {
                Memory.spawns = {};
            }
            Memory.spawns[spawnName] = spawn.memory;
        }
    
        // remover spawns não mais existentes da memória global
        for (let memorySpawn in Memory.spawns) {
            if (!Game.spawns[memorySpawn]) {
                delete Memory.spawns[memorySpawn];
            }
        }
    },
    identificadorVisualdoSpawn: function() {
        if(Game.spawns['Spawn1'].spawning) { 
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1, 
                Game.spawns['Spawn1'].pos.y, 
                {align: 'left', opacity: 0.8});
        }
    },    
};