// function* randomGen() {
//   while (true) {
//     yield Math.floor(Math.random() * 9);
//   }
// }
// const rand = randomGen();
const NumOfTiles = 9;

export const getInitialTileValues = () => {
  let res = [];
  const list = Array(NumOfTiles)
    .fill(0)
    .map((_, i) => i);

  // while (res.length <= NumOfTiles) {
  //   const len=list.length;
  //   const val = list.splice(Math.floor(Math.random() * len),1);
  //   if (res.indexOf(val) == -1) {
  //     res.concat(val);
  //   }
  // }
  return list;
};

export function randomArrayShuffle(array: any) {
  "worklet"
  return array
    .sort(function () {
      return 0.5 - Math.random();
    })
    .slice(0);
}
