const { meters } = require("../meters/meters");
const { readings } = require("./readings");
const { readingsData } = require("./readings.data");

describe("readings", () => {
    it("should get readings", () => {
        const { getReadings } = readings(readingsData);

        expect(getReadings(meters.METER0).length).toBeGreaterThan(0);
    });

    it("should get readings with meter id", () => {
        const { getReadings } = readings(readingsData);

        expect(getReadings(meters.METER1)[0]).toHaveProperty("time");
        expect(getReadings(meters.METER1)[0]).toHaveProperty("reading");
    });

    it("should get empty array if can't find meter id", () => {
        const { getReadings } = readings(readingsData);

        expect(getReadings("meter-no")).toHaveLength(0);
    });

    it("should set readings with meter id", () => {
        const { getReadings, setReadings } = readings(readingsData);

        const length = getReadings(meters.METER0).length;

        setReadings(meters.METER0, [
            { time: 923874692387, reading: 0.26785 },
            { time: 923874692387, reading: 0.26785 },
            { time: 923874692387, reading: 0.111 },
        ]);

        const newLength = getReadings(meters.METER0).length;

        expect(length + 3).toEqual(newLength);
    });

    it("should get readings for last week by id", () => {
        const mockId = 'mockId'
        const mockData = {
            mockId: [
                { time: 1, reading: 0.1 },
                { time: 1607686000, reading: 0.2 },
                { time: 1607686125, reading: 0.3 }
            ]
        } 
        const { getLastWeekReadings } = readings(mockData)
        const expectedData = [
            { time: 1607686000, reading: 0.2 },
            { time: 1607686125, reading: 0.3 }
        ]
        expect(getLastWeekReadings(mockId)).toEqual(expectedData)
    })
});
