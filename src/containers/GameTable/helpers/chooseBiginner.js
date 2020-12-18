// chose which player will begin game
export const chooseBeginner = () => {
  return Math.floor(Math.random() * (2 + 1 - 1)) + 1;
};
