export default function calculateEffectiveness(attackType, pokemonType) {
  const primaryType = primaryTypeFrom(pokemonType)

  const typeChart = typeChartFrom(primaryType) 
  
  return typeChart[pokemonType]['attack_from'][attackType]
}

function primaryTypeFrom(pokemonType) {
  return pokemonType.substring(0, pokemonType.indexOf('-'))
}

function typeChartFrom(primaryType) {
  return require(`../types/${primaryType}.json`)
}