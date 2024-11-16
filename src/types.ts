export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

export interface TypeAdvantages {
  [key: string]: {
    superEffective: string[];
    notVeryEffective: string[];
    noEffect: string[];
  };
}

export const typeAdvantages: TypeAdvantages = {
  Normal: {
    superEffective: [],
    notVeryEffective: ["Rock", "Steel"],
    noEffect: ["Ghost"]
  },
  Fire: {
    superEffective: ["Grass", "Ice", "Bug", "Steel"],
    notVeryEffective: ["Fire", "Water", "Rock", "Dragon"],
    noEffect: []
  },
  Water: {
    superEffective: ["Fire", "Ground", "Rock"],
    notVeryEffective: ["Water", "Grass", "Dragon"],
    noEffect: []
  },
  Electric: {
    superEffective: ["Water", "Flying"],
    notVeryEffective: ["Electric", "Grass", "Dragon"],
    noEffect: ["Ground"]
  },
  Grass: {
    superEffective: ["Water", "Ground", "Rock"],
    notVeryEffective: ["Fire", "Grass", "Poison", "Flying", "Bug", "Dragon", "Steel"],
    noEffect: []
  },
  Ice: {
    superEffective: ["Grass", "Ground", "Flying", "Dragon"],
    notVeryEffective: ["Fire", "Water", "Ice", "Steel"],
    noEffect: []
  },
  Fighting: {
    superEffective: ["Normal", "Ice", "Rock", "Dark", "Steel"],
    notVeryEffective: ["Poison", "Flying", "Psychic", "Bug", "Fairy"],
    noEffect: ["Ghost"]
  },
  Poison: {
    superEffective: ["Grass", "Fairy"],
    notVeryEffective: ["Poison", "Ground", "Rock", "Ghost"],
    noEffect: ["Steel"]
  },
  Ground: {
    superEffective: ["Fire", "Electric", "Poison", "Rock", "Steel"],
    notVeryEffective: ["Grass", "Bug"],
    noEffect: ["Flying"]
  },
  Flying: {
    superEffective: ["Grass", "Fighting", "Bug"],
    notVeryEffective: ["Electric", "Rock", "Steel"],
    noEffect: []
  },
  Psychic: {
    superEffective: ["Fighting", "Poison"],
    notVeryEffective: ["Psychic", "Steel"],
    noEffect: ["Dark"]
  },
  Bug: {
    superEffective: ["Grass", "Psychic", "Dark"],
    notVeryEffective: ["Fire", "Fighting", "Poison", "Flying", "Ghost", "Steel", "Fairy"],
    noEffect: []
  },
  Rock: {
    superEffective: ["Fire", "Ice", "Flying", "Bug"],
    notVeryEffective: ["Fighting", "Ground", "Steel"],
    noEffect: []
  },
  Ghost: {
    superEffective: ["Psychic", "Ghost"],
    notVeryEffective: ["Dark"],
    noEffect: ["Normal"]
  },
  Dragon: {
    superEffective: ["Dragon"],
    notVeryEffective: ["Steel"],
    noEffect: ["Fairy"]
  },
  Dark: {
    superEffective: ["Psychic", "Ghost"],
    notVeryEffective: ["Fighting", "Dark", "Fairy"],
    noEffect: []
  },
  Steel: {
    superEffective: ["Ice", "Rock", "Fairy"],
    notVeryEffective: ["Fire", "Water", "Electric", "Steel"],
    noEffect: []
  },
  Fairy: {
    superEffective: ["Fighting", "Dragon", "Dark"],
    notVeryEffective: ["Fire", "Poison", "Steel"],
    noEffect: []
  }
};