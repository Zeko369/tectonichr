import { calcIntensity } from "../modules/Surveys/utils/calcIntensity";

describe("Intensity generation", () => {
  it("Expect to check simple", () => {
    const data = ["1", "5", "5", "5", "3"];
    expect(calcIntensity(data)).toBe(5);
  });

  it("Expect to more stuff simple", () => {
    const data = ["1", "<=3", ">=8", "7", "6", "<=4", "5", "5", "5", "3"];
    expect(calcIntensity(data)).toBe(8);
  });

  it("Expect to or simple", () => {
    const data = ["1", "2|3"];
    expect(calcIntensity(data)).toBe(3);
  });
});
