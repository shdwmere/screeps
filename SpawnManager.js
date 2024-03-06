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
    },  
    // autoSpawnCreep: function(spawnName, role, bodyParts, limite) {
    //     let creepsEncarregados = _.filter(Game.creeps, (creep) => creep.memory.role == role);
    //     if (creepsEncarregados.length < limite) {

    //         let novoNome = role + Game.time;
    //         let spawn = Game.spawns[spawnName];

    //         if(spawn) {
    //             let resultado = spawn.spawnCreep(bodyParts, novoNome, { memory: { role: role } });
    //             if(resultado === OK) {
    //                 console.log(`spawnando novo ${role}: ${novoNome}`);
    //             }
    //         } else {
    //             console.log(`spawn não encontrado: ${spawnName}`);
    //         }
    //     }
    // },

    // criarBodyParts: function criarBodyParts(...args) {
    //     let bodyParts = [];
    //     for (let i = 0; i < args.length; i += 2) {
    //         let part = args[i];
    //         let count = args[i + 1];
    //         for (let j = 0; j < count; j++) {
    //             bodyParts.push(part);
    //         }
    //     }
    //     return bodyParts;
    // },
};
