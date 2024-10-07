const joi = require('joi');

async function teacherValidator(req, res, next) {
    const teacherSchema = joi.object({
        firstName: joi.string().required().min(2).max(50),
        lastName: joi.string().required().min(2).max(50),
        email: joi.string().required().email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'in']
            }
        }).lowercase(),
        countryCode: joi.string().required(),
        phone: joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
        qualification: joi.string().required(),
        specialization: joi.string().required(),
        dob: joi.string().required(),
        dateOfJoining: joi.string().required(),
    });

    const { error } = teacherSchema.validate(req.body);

    if (error) {
        return res.status(400).send({
            success: false,
            error: error.details[0].message,
        });
    }
    next();
}

module.exports = teacherValidator;