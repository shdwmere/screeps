class CreepRole {
    constructor(role) {
        this.role = role;
    }

    // Método genérico que será chamado no loop principal
    run(creep) {
        console.log(`[ERROR] Método 'run' não implementado a role: ${this.role}`);
    }
}

module.exports = CreepRole