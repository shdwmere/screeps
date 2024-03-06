module.exports = {
    definirSpawns: function() {
        for (let spawnName in Game.spawns) {
            let spawn = Game.spawns[spawnName];
            // Definir o nome do spawn na memória do spawn
            spawn.memory.spawnName = spawnName;
            
            // Capturar e salvar o nome da sala do spawn na memória do spawn
            let roomName = spawn.room.name;
            spawn.memory.roomName = roomName;

            // Adicionar o nome do spawn e informações da sala à lista de spawns na memória global
            if (!Memory.spawns) {
                Memory.spawns = {};
            }
            if (!Memory.rooms) {
                Memory.rooms = {};
            }

            Memory.spawns[spawnName] = spawn.memory;

            // Isso verifica se a sala já foi adicionada à memória e, em caso negativo, a adiciona
            if (!Memory.rooms[roomName]) {
                Memory.rooms[roomName] = { spawns: [] };
            }
            if (!Memory.rooms[roomName].spawns.includes(spawnName)) {
                Memory.rooms[roomName].spawns.push(spawnName);
            }
        }
    
        // Remover spawns não mais existentes da memória global
        for (let memorySpawn in Memory.spawns) {
            if (!Game.spawns[memorySpawn]) {
                // Se o spawn foi removido, também consideramos remover referências dele nas informações da sala
                let roomName = Memory.spawns[memorySpawn].roomName;
                let spawnIndex = Memory.rooms[roomName].spawns.indexOf(memorySpawn);
                if (spawnIndex > -1) {
                    Memory.rooms[roomName].spawns.splice(spawnIndex, 1);
                }
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
