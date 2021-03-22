const { meterPricePlanMap } = require('../meters/meters')
const { usageCost } = require('../usage/usage')

const read = (getData, req) => {
    const meter = req.params.smartMeterId;
    return getData(meter);
};

const store = (setData, req) => {
    const data = req.body;
    return setData(data.smartMeterId, data.electricityReadings);
};

const readLastWeek = (getLastWeek, req) => {
    const meter = req.params.smartMeterId;
    const lastWeekReadings = getLastWeek(meter);
    const pricePlan = meterPricePlanMap[meter]
    if (!pricePlan) {
        throw Error('No price plan for meter id ' + meter)
    }
    return {
        "smartMeterId": meter,
        "usageCostLastWeek": usageCost(lastWeekReadings, pricePlan.rate)
    }
}

module.exports = { read, store, readLastWeek };
