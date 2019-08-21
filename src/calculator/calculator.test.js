import calculateEffectiveness from './calculator';
import chai from "chai";

const expect = chai.expect;

it('return the correct value for the specified attack and type', () => {
  const attackType = 'water'
  const pokemonType = 'fire-fire'

  const expectedEffectiveness = 2
  const effectiveness = calculateEffectiveness(attackType, pokemonType)

  expect(effectiveness).to.be.equal(expectedEffectiveness)
});
