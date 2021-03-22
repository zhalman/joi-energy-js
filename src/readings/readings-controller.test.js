const { read, store, readLastWeek } = require("./readings-controller");
const { readingsData } = require("./readings.data");
const { readings } = require("./readings");
const { meters, meterPricePlanMap } = require("../meters/meters");
const { usageCost } = require("../usage/usage")

jest.mock("../usage/usage")

describe("readings", () => {
    it("should get readings with meter id from params", () => {
        const { getReadings } = readings(readingsData);
        const readingsForMeter = read(getReadings, {
            params: {
                smartMeterId: meters.METER0,
            },
        });

        expect(readingsForMeter).toEqual(readingsData[meters.METER0]);
    });

    it("should store readings with meter id and readings from body", () => {
        const { setReadings, getReadings } = readings(readingsData);

        const originalLength = getReadings(meters.METER0).length;

        const fixture = {
            smartMeterId: meters.METER0,
            electricityReadings: [
                {
                    time: 981438113,
                    reading: 0.0503,
                },
                {
                    time: 982087047,
                    reading: 0.0213,
                },
            ],
        };

        store(setReadings, {
            body: fixture,
        });

        const newLength = getReadings(meters.METER0).length;

        expect(originalLength + 2).toEqual(newLength);
    });
    it("should get readings for meterId for last week", () => {
        const mockData = [
            { time: 1607686000, reading: 0.2 },
            { time: 1607686125, reading: 0.3 }
        ]
        const getLastWeekMock = jest.fn().mockReturnValue(mockData)
        readLastWeek(getLastWeekMock, { params: { smartMeterId: meters.METER0}})

        expect(getLastWeekMock).toBeCalledTimes(1)
        expect(getLastWeekMock).toBeCalledWith(meters.METER0)
        expect(usageCost).toBeCalledWith(mockData, meterPricePlanMap[meters.METER0].rate)
    });
    it("should throw error if no price plan exists for meterId", () => {
        expect(() => readLastWeek(() => {}, { params: { smartMeterId: 'meterIdWithOut price plan'}})).toThrow()
    });
});
