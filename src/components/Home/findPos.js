export function findPosition(a) {
  for (let i = 0; i < 10; i++) {
    if (!a.has(i)) {
      a.add(i);
      return i;
    }
  }
}

export function removePosition(set, id, pos) {
  set.delete(pos[id]);
  delete pos[id];
}
let s = new Set();
s.add(0);
