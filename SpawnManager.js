module.exports = {
    definirSpawnsERoomsNaMemoria: function() {
        for (let spawnName in Game.spawns) {
            let spawn = Game.spawns[spawnName];
            let roomName = spawn.room.name;

            // definir o nome do spawn na memória spawns
            if (!Memory.spawns) {
                Memory.spawns = {};
            }
            Memory.spawns[spawnName] = {
                spawnName: spawnName,
                roomName: roomName
            };

            // definir o nome da sala do spawn na memória do spawn
            if (!Memory.rooms) {
                Memory.rooms = {};
            }
            Memory.rooms[roomName] = roomName;
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
    }
};
