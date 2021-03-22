const readings = (data) => ({
    getReadings: (meterId) => data[meterId] || [],
    setReadings: (meterId, readings) => {
        const currentReadings = data[meterId];
        data[meterId] = [...currentReadings, ...readings];
        return data[meterId];
    },
    getLastWeekReadings: (meterId) => {
        const allReadings = data[meterId] || []
        const today = 1607686125
        const dayInSeconds = 86400
        const sevenDaysAgo = today - dayInSeconds * 7
        return allReadings.filter(reading => reading.time >= sevenDaysAgo)
    }
});

module.exports = { readings };
