const { strokeHarvest } = require('./globals');

module.exports = {


    coletarEnergia: function (creep) {
        // Encontrar o spawn na sala
        let spawn = Game.spawns['Spawn1'];

        // verificar se o creep está na mesma sala que o spawn
        if (creep.room.name != creep.memory.home) {
            //console.log('indo para nosso room')
            // se o creep não estiver na mesma sala que o spawn, mover para a sala do spawn
            creep.moveTo(spawn.pos, { visualizePathStyle: { stroke: '#ffffff' } });
            return;
        }
        else {
            //console.log('no nosso room')

            // se o creep estiver na mesma sala que o spawn

            // // lidando com energia dropada
            let recursosNoChao = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: (resource) => resource.resourceType === RESOURCE_ENERGY
            });

            if (recursosNoChao) {
                if (creep.pickup(recursosNoChao[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(recursosNoChao[0], { visualizePathStyle: { stroke: '#ffaa00' } }); // Ajuste a cor conforme necessário
                    console.log('saindo do nosso room')

                    return; // encerrar a função aqui pra evitar que tente fazer outra ação na mesma rodada
                }
              } 
              

            // lidando com tombstones
            // verificar se existem tombstones próximos com energia

            let tombstonesComEnergia = creep.room.find(FIND_TOMBSTONES, {
                filter: (tombstone) => tombstone.store.getUsedCapacity(RESOURCE_ENERGY) > 0
            });
            let tombstoneMaisProximo = creep.pos.findClosestByPath(tombstonesComEnergia);

            if (tombstoneMaisProximo) {
                if (creep.withdraw(tombstoneMaisProximo, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tombstoneMaisProximo, { visualizePathStyle: { stroke: strokeHarvest } });

                    return; // encerrar a função aqui para evitar conflitos de ação
                }
            }


            // comportamento padrao
            // encontrar as sources mais próximas do spawn
            let sources = spawn.room.find(FIND_SOURCES_ACTIVE);
            let sourceMaisProxima = creep.pos.findClosestByPath(sources);
            if (sourceMaisProxima) {
                // Se houver uma source mais próxima do spawn, coletar energia dela
                if (creep.harvest(sourceMaisProxima) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourceMaisProxima, { visualizePathStyle: { stroke: strokeHarvest } });
                }
            } else {
                // sacar do container caso nao hajam fontes disponiveis.
                //console.log(`nenhuma source disponivel encontrada próxima do ${spawn}, sacando do container.`);
                //this.sacarEnergiaContainer(creep)
            };
        };

    },



    sacarEnergiaContainer: function (creep) {
        /*
        'role.harvester.js'
        [!] Lembrar de comentar o bloco de entregar energia para containers:
        // structure.structureType == STRUCTURE_CONTAINER ||

        [!] E descomentar o bloco de execucao desse metodo:
        // || CreepsManager.sacarEnergiaContainer(creep);
        */
        let containers = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => {
                return s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] !== 0;;
            }
        });

        let containersProximos = creep.pos.findClosestByPath(containers);

        if (containersProximos) {
            if (creep.withdraw(containersProximos, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containersProximos, { visualizePathStyle: { stroke: strokeHarvest } });

            }
        }
        //console.log(containers)
    },

    limparCreepsMortos: function () {
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('[-] Limpando creep não-existente da memória:', name)
            }
        }
    },
};