export function spaceComponents(components) {
  let i = 1;
  while (i < components.length) {
    components.splice(i, 0, ' ');
    i += 2;
  }
  return components;
}
