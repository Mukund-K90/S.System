const joi = require('joi');

async function studentValidate(req, res, next) {
    const studentSchema = joi.object({
        firstName: joi.string().required().min(2).max(50),
        lastName: joi.string().required().min(2).max(50),
        dob: joi.string().required(),
        gender: joi.string().valid('male', 'female').required(),
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
        password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).min(6).max(15) 
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

async function teacherValidate(req, res, next) {
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
        qualification:joi.string().required(),
        specialization:joi.string().required(),
        dob: joi.string().required(),
        dateOfJoining: joi.string().required(),
        password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).min(6).max(15) 
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

module.exports = {
    studentValidate,
    teacherValidate,
}
