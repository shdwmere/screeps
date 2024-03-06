class TowerManager {
    constructor(tower) {
        this.tower = tower;
    };

    run() {
        let target = this.tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        if (target) {
            this.tower.attack(target);
        }
        else {
            let structureToRepair = this.tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL
            });

            if (structureToRepair) {
                this.tower.repair(structureToRepair);
            }
        };
    };
};

module.exports = TowerManager;