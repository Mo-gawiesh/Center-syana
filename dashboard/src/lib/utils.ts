export function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatArabicNumber(num: number): string {
  return num.toLocaleString("ar-EG");
}
