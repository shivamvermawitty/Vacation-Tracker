let c = 0;
export function findPosition(a) {
  for (let i = 0; i < 10; i++) {
    if (!a.has(i)) {
      a.add(i);
      c += 0.1;

      return i;
    }
  }
}

export function removePosition(set, id, pos) {
  c = c - 1;
  // console.log(c)
  set.delete(pos[id]);
  delete pos[id];
}
let s = new Set();
s.add(0);
