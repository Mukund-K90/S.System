const joi = require('joi');

async function studentValidator(req, res, next) {
    const studentSchema = joi.object({
        firstName: joi.string().required().min(2).max(50),
        lastName: joi.string().required().min(2).max(50),
        dob: joi.string().required(),
        gender: joi.string().valid('male', 'female', 'others').required(),
        email: joi.string().required().email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'in']
            }
        }).lowercase(),
        countryCode: joi.string().required(),
        phone: joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
        guardianDetails: joi.object({
            fatherName: joi.string().required(),
            fatherOccupation: joi.string().optional(),
            motherName: joi.string().required(),
            motherOccupation: joi.string().optional(),
        }).required(),
        address: joi.string().required().max(50),
    });

    const { error } = studentSchema.validate(req.body);

    if (error) {
        return res.status(400).send({
            success: false,
            error: error.details[0].message,
        });
    }
    next();
}

module.exports = studentValidator;