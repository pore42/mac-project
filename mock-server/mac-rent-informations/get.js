var Chance = require('chance');

const chance = new Chance();

const elementCount = chance.integer({min: 7, max: 15});

module.exports = (req, res) => {
    const elements = Array(elementCount).fill().map((element, i) => 
        ({
            id: i+1,
            name: chance.name(),
            code: chance.word({length: 15}),
            dateFrom: chance.date({american: false}),
            dateTo: chance.date({american: false}),
            serial: chance.word({length: 15}),
            owner: chance.name(),
            fee: chance.integer({min: 0, max: 200}),
            lastMod: chance.name(),
            note: chance.sentence() 
        }
    ));
    res.status(200).send(elements);
};