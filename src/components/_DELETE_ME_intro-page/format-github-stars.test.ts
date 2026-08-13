import { describe, expect, it } from "vite-plus/test";

import { formatGitHubStars } from "./format-github-stars";

describe("formatGitHubStars", () => {
  it.each([
    { count: 999, expected: "999" },
    { count: 1000, expected: "1k" },
    { count: 1500, expected: "1.5k" },
    { count: 9999, expected: "10k" },
    { count: 10_499, expected: "10k" },
    { count: 10_500, expected: "11k" },
  ])("formats $count stars as $expected", ({ count, expected }) => {
    expect(formatGitHubStars(count)).toBe(expected);
  });
});
