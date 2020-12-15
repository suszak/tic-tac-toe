// chose which player will begin game
export const randomBeginner = () => {
  return Math.floor(Math.random() * (2 + 1 - 1)) + 1;
};
