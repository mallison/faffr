let ID = 1;

export default function getID() {
  let id = `id${ID}`;
  ID += 1;
  return id;
}
