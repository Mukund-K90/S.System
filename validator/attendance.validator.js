const joi = require("joi");

async function attendanceValidator(req, res, next) {
    const attendanceSchema = joi.object({
        studentId: joi.string().required(),
        teacherId: joi.string().required(),
        status: joi.string().valid('present', 'absent', 'late').required(),
        remarks:joi.string().required()
    });

    const { error } = attendanceSchema.validate(req.body);

    if (error) {
        return res.status(400).send({
            success: false,
            error: error.details[0].message,
        });
    }
    next();
}

module.exports = attendanceValidator;