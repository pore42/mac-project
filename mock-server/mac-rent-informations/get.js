var Chance = require('chance');

const chance = new Chance();

const elementCount = chance.integer({min: 1, max: 10});

module.exports = (req, res) => {
    const elements = Array(elementCount).fill().map(() => 
        ({
            name: chance.name(),
            code: chance.word({length: 15}),
            dateFrom: chance.date({string: true}),
            dateTo: chance.date({string: true}),
            serial: chance.word({length: 15}),
            owner: chance.name(),
            fee: chance.integer({min: 0, max: 200}),
            lastMod: chance.name(),
            note: chance.sentence() 
        })
    );
    res.status(200).send(elements);
};