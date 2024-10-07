const joi = require('joi');

async function campusValidator(req, res, next) {
    const campusSchema = joi.object({
        name: joi.string().required().min(2).max(50),
        email: joi.string().required().email({
            minDomainSegments: 2,
            tlds: ['com', 'in']
        }).lowercase(),
        countryCode: joi.string().required(),
        phone: joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
        address: joi.string().required().max(50),
        city: joi.string().required().max(50),
        state: joi.string().required().max(50),
        zipCode: joi.string().required(),
        principalDetails: joi.object({
            principalName: joi.string().required(),
            number: joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
            principalEmail: joi.string().required().email({
                minDomainSegments: 2,
                tlds: ['com', 'in']
            }).lowercase(),
        }),
        affiliation: joi.string().required(),
    });

    const { error } = campusSchema.validate(req.body);
    if (error) {
        return res.status(400).send({
            success: false,
            error: error.details[0].message,
        });
    }
    next();
}

module.exports = campusValidator;