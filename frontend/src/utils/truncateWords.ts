function truncateWords(text: string, maxWords = 20): string {
  const words = text.trim().split(/\s+/);
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : text;
}

export default truncateWords;