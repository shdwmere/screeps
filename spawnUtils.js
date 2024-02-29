module.exports = {
    autoSpawnCreep: function autoSpawnCreep(spawn, role, bodyParts, limite) {
        let creepsEncarregados = _.filter(Game.creeps, (creep) => creep.memory.role == role);
        if (creepsEncarregados.length < limite) {
            let novoNome = role + Game.time;
            if(Game.spawns[spawn]) {
                if (Game.spawns[spawn].spawnCreep(bodyParts, novoNome, { memory: { role: role } }) == OK) {
                    // Obter o novo creep depois de spawnado
                    let novoCreep = Game.creeps[novoNome];
                    
                    // Definir mais propriedades na memória do creep baseado na role
                    if (role == 'builder') {
                        novoCreep.memory.role = role;
                        novoCreep.memory.targetID = '9463deb16ce377f69f66968e'; // Target padrão para builder
                        novoCreep.memory.construindo = false; // Target padrão para builder
                    } else if (role == 'harvester') {
                        novoCreep.memory.role = role;
                        novoCreep.memory.entregandoEnergia = false; // Para controle de entrega
                    } else if (role == 'upgrader') {
                        novoCreep.memory.role = role;
                        novoCreep.memory.aprimorandoControlador = false;
                    }
                }
            }
        }
    },

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

    limparCreepsMortos: function() {
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('[-] Limpando creep não-existente da memória:', name)
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
    }
};