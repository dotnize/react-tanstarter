export function formatGitHubStars(count: number) {
  if (count < 1000) {
    return count.toLocaleString("en-US");
  }

  const compactValue = count / 1000;
  const roundedValue =
    compactValue >= 10 ? Math.round(compactValue) : Math.round(compactValue * 10) / 10;

  return `${roundedValue.toLocaleString("en-US", {
    maximumFractionDigits: compactValue >= 10 ? 0 : 1,
    minimumFractionDigits: 0,
  })}k`;
}
