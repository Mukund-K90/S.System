const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Campus = require('../model/campus.model');

//Insert Campus
async function insertCampus(req, res) {
    const {
        name,
        email,
        countryCode,
        phone,
        address,
        city,
        state,
        zipCode,
        principalDetails,
        affiliation,
    } = req.body;
    const { principalName, number, principalEmail } = principalDetails;
    const campus = await Campus.findOne({ email: email });
    if (campus && campus.isDelete === false) {
        return res.status(400).send("campus already exists.");
    }
    if (campus && campus.isDelete === true) {
        try {
            const campus = await Campus.findOneAndUpdate(
                { email: email }, {
                name,
                email,
                countryCode: `+${countryCode}`,
                phone,
                address,
                city,
                state,
                zipCode,
                principalDetails: {
                    principalName,
                    number,
                    principalEmail
                },
                affiliation,
                isDelete: false
            });

            await campus.save();
            return res.status(200).send({
                code: 200,
                success: true,
                message: "campus Inserted Successfully",
                id: campus._id
            });

        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
            });
        }
    }
    else {
        try {
            const campus = new Campus({
                name,
                email,
                countryCode: `+${countryCode}`,
                phone,
                address,
                city,
                state,
                zipCode,
                principalDetails: {
                    principalName,
                    number,
                    principalEmail
                },
                affiliation,
            });
            await campus.save();
            return res.status(200).send({
                code: 200,
                success: true,
                message: "campus Inserted Successfully",
                data: campus._id
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
            });
        }
    }
}

//update campus
async function updateCampus(req, res) {
    const id = req.params.id;
    const updateData = req.body;
    const campus = await Campus.findById(id);

    if (!campus || campus.isDelete === true) {
        return res.status(401).send({ message: "campus not found." });
    }
    else {
        try {
            const updatedCampus = await Campus.findByIdAndUpdate(
                id,
                updateData,
                { new: true, select: 'updatedAt' }
            );
            return res.status(200).send({
                code: 200,
                success: true,
                message: "campus Updated Successfully",
                data: {
                    _id: updatedCampus._id,
                    updatedAt: updatedCampus.updatedAt,
                }
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
            });
        }
    }
}

//view campus
async function viewCampus(req, res) {
    const id = req.params.id;
    const campus = await Campus.findById(id);
    if (!campus || campus.isDelete === true) {
        return res.status(401).send({ message: "campus not found." });
    }
    else {
        try {
            return res.status(200).send({
                code: 200,
                success: true,
                message: "campus View Successfully",
                data: {
                    _id: campus._id,
                    name: campus.name,
                    email: campus.email,
                    mobile: `${campus.countryCode}${campus.phone}`,
                    address: campus.address,
                    city: campus.city,
                    state: campus.state,
                    zipcode: campus.zipCode,
                    principalDetails: campus.principalDetails,
                    affiliation: campus.affiliation,
                }
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
            });
        }
    }
}

//list campus
async function fetchCampus(req, res) {
    const campus = await Campus.find().sort({ createdAt: -1 }).where({ isDelete: false });
    if (!campus) {
        return res.status(401).send({ message: "campus not found." });
    }
    const formattedCampus = campus.map(c => ({
        _id: c._id,
        name: c.name,
        email: c.email,
        mobile: `${c.countryCode}${c.phone}`,
        address: c.address,
        city: c.city,
        state: c.state,
        zipcode: c.zipCode,
        affiliation: c.affiliation,
    }));
    try {
        return res.status(200).send({
            code: 200,
            success: true,
            message: "campus List",
            data: formattedCampus
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
}

//Delete Campus
async function deleteCampus(req, res) {
    const id = req.params.id;
    const campus = await Campus.findByIdAndUpdate(
        id,
        { isDelete: true },
        { new: true, select: 'updatedAt' }
    ); if (!campus || campus.isDelete === true) {
        return res.status(400).send(`campus Not found. Please check and try again`);
    }
    else {
        try {
            return res.status(200).send({
                code: 200,
                success: true,
                message: "Campus Deleted Successfully",
                data: {
                    id: id
                }
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: error.message,
            });
        }

    }
}
module.exports = {
    insertCampus,
    updateCampus,
    viewCampus,
    fetchCampus,
    deleteCampus
}