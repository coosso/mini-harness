export function add(a: number, b: number): number {
  return a + b;
}

export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function greet(name: string): string {
  return `Hello, ${name}!`;
}
