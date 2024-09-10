// Dados dos animais
const animais = {
  LEAO: { tamanho: 3, biomas: ["savana"], carnivoro: true },
  LEOPARDO: { tamanho: 2, biomas: ["savana"], carnivoro: true },
  CROCODILO: { tamanho: 3, biomas: ["rio"], carnivoro: true },
  MACACO: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
  GAZELA: { tamanho: 2, biomas: ["savana"], carnivoro: false },
  HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false },
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
    bioma: ["savana", "rio"],
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

      // Se houver animais existentes no recinto
      if (
        typeof recinto.animaisExistentes === "object" &&
        recinto.animaisExistentes !== null
      ) {
        const especieExistente = recinto.animaisExistentes.especie;
        const qntdExistente = recinto.animaisExistentes.qntd;
        const espacoOcupado = especieExistente.tamanho * qntdExistente;

        // Calcular o espaço ocupado pelos animais existentes
        espacoLivre -= espacoOcupado;

        // Verificar bioma adequado e espaço suficiente
        if (
          animalInfo.biomas.some((bioma) => recinto.bioma.includes(bioma)) &&
          espacoLivre >= animalInfo.tamanho * quantidade
        ) {
          // Se for carnívoro, verificar se já existem carnívoros diferentes
          if (animalInfo.carnivoro || especieExistente.carnivoro) {
            return; // Não pode adicionar carnívoros diferentes no mesmo recinto
          }

          // Regras específicas para macacos
          if (animalInfo.nome === "MACACO" && qntdExistente === 0) {
            return; // Macaco precisa de pelo menos outro animal no recinto
          }

          // Regras específicas para hipopótamos
          if (
            animalInfo.nome === "HIPOPOTAMO" &&
            !(recinto.bioma.includes("savana") && recinto.bioma.includes("rio"))
          ) {
            return; // Hipopótamo só tolera outras espécies no bioma 'savana e rio'
          }

          // Se há espécies diferentes, adicionar espaço extra
          if (especieExistente !== animalInfo) {
            espacoLivre -= 1; // Espaço extra para outra espécie
          }

          // Verificar novamente se o espaço ainda é suficiente
          if (espacoLivre >= animalInfo.tamanho * quantidade) {
            recintosViaveis.push(
              `Recinto ${recinto.numero} (espaço livre: ${espacoLivre - animalInfo.tamanho * quantidade} total: ${recinto.tamanhoTotal})`
            );
          }
        }
      } else {
        // Se não houver animais existentes
        if (
          animalInfo.biomas.some((bioma) => recinto.bioma.includes(bioma)) &&
          espacoLivre >= animalInfo.tamanho * quantidade
        ) {
          // Adicionar o recinto à lista de viáveis
          recintosViaveis.push(
            `Recinto ${recinto.numero} (espaço livre: ${espacoLivre - animalInfo.tamanho * quantidade} total: ${recinto.tamanhoTotal})`
          );
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