## Logica comportamental dos creeps
- _Harvester_: Coleta energia e preenche o spawn, as torres, as extensoes e containers, se todos depósitos estão cheios então ele se comporta como um `Upgrader`.
- _Upgrader_: Coleta energia e se move até o controlador para fazer upgrade.
- _Builder_: Coleta energia e se move até alguma construction site para construir, se não houver nenhuma, ele se comporta como um `Upgrader`.
- _Repairer_: Coleta energia e repara construções decaídas como roads.
- _Wall Repairer_: Coleta energia e repara os muros com a menor porcentagem de HP.
- _Killer_: Creep maluco que se desloca a algum room especifico e assassina todos os creeps e destrói o spawn hostile. Código precisa de melhorias no prototipo de spawn e na logica de funcionamento.
- _Healer_: Creep que cura creeps aliados. Ainda não dei a devida atenção a essa role da mesma forma que o Killer.
--
## Class CreepRole

A classe `CreepRole` é uma classe genérica que serve como base para outras classes de papéis de creeps no jogo. Ela possui um construtor que recebe o papel específico do creep como parâmetro e um método `run(creep)` que será chamado no loop principal do jogo (em `main.js`) para executar o comportamento específico de cada papel.

### Comportamento da classe `CreepRole`:

-   **Constructor**: O construtor da classe `CreepRole` recebe o parâmetro `role`, que é o papel específico do creep (por exemplo, 'harvester', 'upgrader', etc.). Ele armazena esse papel na propriedade `this.role`.
    
-   **Método `run(creep)`:** Este é um método genérico que deve ser implementado nas classes filhas para definir o comportamento específico de cada papel de creep. Se não for implementado em uma classe filha, ele exibirá um erro indicando que o método não foi implementado para o papel correspondente.

Exemplo role.harvester.js:

```
let CreepRole =  require('CreepRole');


class  RoleHarvester  extends  CreepRole {

	constructor() {
		super('harvester');
	};
	 
	run(creep) { 
		if(creep.memory.entregandoEnergia &&  creep.store[RESOURCE_ENERGY] ==  0) {

			creep.memory.entregandoEnergia =  false;

			creep.say('🔄');

		};
	};

};

module.exports  =  RoleHarvester;
```

---
## Prototype Spawner Behavior

Criei a função **`criarCreepBalanceado()`** presente no código **`prototype.spawner`**, que é um protótipo do objeto **`StructureSpawn`**, que como bem sabemos representa um spawn no jogo.

Nesta função prototipada nós estamos criando um creep personalizado com base na energia disponível, o corpo do creep é construído com partes de 'WORK', 'CARRY', 'MOVE', sendo a quantidade de cada parte dependente da energia disponível.

## No loop principal:
-   A capacidade total de energia disponível no quarto é obtida e armazenada na variável `energy`.
-   O número de creeps de cada tipo (`harvester`, `upgrader`, `builder`, `repairer`) é calculado.
-   Limites são definidos para o número máximo de cada tipo de creep que queremos ter.
-   O código então verifica se há menos creeps do que o limite para cada papel.
-   Se houver menos harvester do que o limite, um novo `harvester` é criado usando `createCustomCreep` e a energia disponível.
-   Se não, ele verifica se há menos `upgraders`, `builders` e `repairers`, nessa ordem.
-   Assim que um tipo de creep é decidido para criação, um novo creep é criado usando `createCustomCreep`.
-   Após a criação do creep, uma mensagem é exibida no console indicando qual papel de creep foi colocado na fila para criação.
---
## Spawn 2 - Manual (old):

Criei um módulo com a função `autoSpawnCreep` que recebe os parâmetros sobre o novo creep, como o seu nome, o limite de quantos serão fabricados, e suas partes do corpo sendo especificadas no valor da variável `bodyParts`.

O valor de `bodyParts` será baseado nos valores definidos pelo método `criarBodyParts`, que recebe como parâmetro `(WORK, 1, CARRY, 1, MOVE, 1)`, que seria as body parts com valores customizáveis de acordo com o que quisermos.

Então estamos usando o método em `main.js` da seguinte forma:

`let creepsHandler =  require('creepsHandler');`
`let  limiteHarvesters  =  3;`

`let bodyPartsHarvester = creepsHandler.criarBodyParts(WORK, 4, CARRY, 1, MOVE, 2); // 550`

E tendo definido as bodyParts corretamente, podemos criar um novo creep:
`creepsHandler.autoSpawnCreep('Spawn1','harvester', bodyPartsHarvester, limiteHarvesters);`

**Module**
`autoSpawnCreep: function(spawnName, role, bodyParts, limite)`

**Method**
`criarBodyParts: function criarBodyParts(...args)`

**Usage main.js**
```
// spawners automáticos

if(creepsHandler.contarCreeps('harvester') < limiteHarvesters) {

creepsHandler.autoSpawnCreep('Spawn1','harvester', bodyPartsHarvester, limiteHarvesters);

console.log('\n[+] harvester na queue!');
}
```


---
## Stroke Indicators (globals.js)

- Amarelo (**#FFFF00**): Harvest.

- Branco (**#FFFFFF**): Entregando energia a estrutura.

- Lima (**#00FF00**): Upgrade RCL.

- Azul (**#33FDFF**): Construindo estrutura.

- Vermelho (**#FF0000**): Atacar.

- Cinza (**#808080**): Reparar.

- Verde (**#008000**): Curar.
