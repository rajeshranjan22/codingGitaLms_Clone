export function getInitials(name = "") {
  const words = name.trim().split(" ").filter(Boolean);

  if (words.length === 0) return "";
  if (words.length === 1) return words[0][0].toUpperCase();

  return (words[0][0] + words[1][0]).toUpperCase();
}
