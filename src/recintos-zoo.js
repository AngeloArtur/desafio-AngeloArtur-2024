// Dados dos animais
const animais = {
  LEAO: { tamanho: 3, biomas: ["savana"], carnivoro: true },
  LEOPARDO: { tamanho: 2, biomas: ["savana"], carnivoro: true },
  CROCODILO: { tamanho: 3, biomas: ["rio"], carnivoro: true },
  MACACO: { tamanho: 1, biomas: ["savana", "floresta"] },
  GAZELA: { tamanho: 2, biomas: ["savana"] },
  HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio"] },
};

const recintos = [
  {
    numero: 1,
    bioma: "savana",
    tamanhoTotal: 10,
    animaisExistentes: { qntd: 3, especie: animais.MACACO },
  },
  {
    numero: 2,
    bioma: "floresta",
    tamanhoTotal: 5,
    animaisExistentes: 0,
  },
  {
    numero: 3,
    bioma: "savana e rio",
    tamanhoTotal: 7,
    animaisExistentes: { qntd: 1, especie: animais.GAZELA },
  },
  {
    numero: 4,
    bioma: "rio",
    tamanhoTotal: 8,
    animaisExistentes: 0,
  },
  {
    numero: 5,
    bioma: "savana",
    tamanhoTotal: 9,
    animaisExistentes: { qntd: 1, especie: animais.LEAO },
  },
];

class RecintosZoo {
  analisaRecintos(animal, quantidade) {
    const animalInfo = animais[animal.toUpperCase()];

    if (!animalInfo) {
      return { erro: "Animal inválido" };
    }

    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    let recintosViaveis = [];

  recintos.forEach((recinto) => {
      let espacoLivre = recinto.tamanhoTotal;
      
      if (
        typeof recinto.animaisExistentes === "object" &&
        recinto.animaisExistentes !== null
      ) {
        const especieExistente = recinto.animaisExistentes.especie;
        const qntdExistente = recinto.animaisExistentes.qntd;
        
        // Calcular o espaço ocupado pelos animais existentes
        espacoLivre -= (especieExistente.tamanho * qntdExistente);

        if (
          animalInfo.biomas.includes(recinto.bioma) && // Bioma adequado
          espacoLivre >= (animalInfo.tamanho * quantidade) // Espaço suficiente
        ) {
          // Se for carnívoro, verificar se já existem carnívoros ou não
          if (animalInfo.carnivoro && (especieExistente.carnivoro && especieExistente !== animalInfo)) {
            return; // Não pode adicionar carnívoros diferentes no mesmo recinto
          }

          // Regras específicas para macacos e hipopótamos
          if (animalInfo.nome === 'MACACO' && qntdExistente === 0) {
            return; // Macaco precisa de pelo menos outro animal no recinto
          }

          if (animalInfo.nome === 'HIPOPOTAMO' && !(recinto.bioma === 'savana e rio')) {
            return; // Hipopótamo só tolera outras espécies no bioma 'savana e rio'
          }

          // Adicionar o recinto à lista de viáveis
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - (animalInfo.tamanho * quantidade)} total: ${recinto.tamanhoTotal})`);
        }
      } else { // Se não houver animais existentes
        if (
          animalInfo.biomas.includes(recinto.bioma) && // Bioma adequado
          espacoLivre >= (animalInfo.tamanho * quantidade) // Espaço suficiente
        ) {
          // Adicionar o recinto à lista de viáveis
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - (animalInfo.tamanho * quantidade)} total: ${recinto.tamanhoTotal})`);
        }
      }
    });

    // Verificar se há recintos viáveis encontrados
    if (recintosViaveis.length > 0) {
      return { recintosViaveis };
    } else {
      return { erro: "Não há recinto viável" };
    }
  }
}

export { RecintosZoo as RecintosZoo };

const zoo = new RecintosZoo();
console.log(zoo.analisaRecintos("MACACO", 2)); // Caso válido
console.log(zoo.analisaRecintos("UNICORNIO", 1)); // Caso inválido
