import Utils from "../Utils";

describe("Utils test", () => {

  test("random number must in range", () => {
    let caseResult = 0;
    for (let i = 0; i < 1000; i++) {
      let number = Utils.random(0, 10);
      if (number > 10 || number < 0) caseResult++;
    }
    expect(caseResult).toEqual(0);

  });

  test("sleep is work",async () => {
    let testCase = 500;
    let startTime = new Date().getTime();
    await Utils.sleep(testCase);
    let endTime = new Date().getTime();
    expect(endTime - startTime).toBeGreaterThanOrEqual(testCase);

  });

  test("Chinese characters be calculated correctly",async () => {
    const testCase = "变身へんしんhenshin"
    const caseResult = 19;
    const testResult = Utils.bytes(testCase);  
    expect(testResult).toBeGreaterThanOrEqual(caseResult);

  });

  test("Get a two-bit array from an array based on key",async () => {
    const testCase = [
      {no:1,name:"a"},{no:1,name:"b"},{no:1,name:"c"},{no:2,name:"d"},{no:2,name:"e"},
    ]
    const caseResult = {
      "1":[{no:1,name:"a"},{no:1,name:"b"},{no:1,name:"c"}],
      "2":[{no:2,name:"d"},{no:2,name:"e"}],
    }
    const testResult = Utils.groupBy(testCase,"no");  
    expect(testResult).toEqual(caseResult);

  });



});