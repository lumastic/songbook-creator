import formatTime from "./formatTime";

describe("Time ago tests", () => {
  test("less than 1m ago", () => {
    expect(
      formatTime({
        time: new Date() - 1,
      })
    ).toStrictEqual("a few seconds ago");
  });
});

describe("additional format testing", () => {
  test("full date", () => {
    expect(
      formatTime({
        time: "2020-04-06T18:19:00.000Z",
        fullDate: true,
      })
    ).toStrictEqual("April 6, 2020");
  });
  test("full date and time", () => {
    expect(
      formatTime({
        time: "2020-04-06T18:19:00.000Z",
        fullDate: true,
        withTime: true,
      })
    ).toStrictEqual("April 6, 2020 2:19 PM");
  });
});
