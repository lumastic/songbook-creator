import formatRunTime from "./formatRunTime";

describe("returns appropriate conversions", () => {
  test("expected format", () => {
    const actual = formatRunTime(185);
    expect(actual).toBe("3 min. 5 sec.");
  });

  test("expected format", () => {
    const actual = formatRunTime(60);
    expect(actual).toBe("1 min. 0 sec.");
  });

  test("expected format", () => {
    const actual = formatRunTime(30);
    expect(actual).toBe("30 sec.");
  });
});
