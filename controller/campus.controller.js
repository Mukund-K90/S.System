const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Campus = require('../model/campus.model');
const campusDao = require('../dao/campusDao');
const { successResponse, errorResponse } = require('../utils/apiResponse');

//Insert Campus
async function insertCampus(req, res) {
    try {
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
        const campus = await campusDao.findByEmail(email);
        if (campus && !campus.isDelete) {
            return res.status(400).send("campus already exists.");
        }
        if (campus && campus.isDelete) {
            await campusDao.hardDelete(email);
        }
        const campusData =
        {
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
        };
        const newCampus = await campusDao.insert(campusData);
        if (!newCampus) {
            return errorResponse(req, res, 500, "campus not inserted");
        }
        return successResponse(req, res, 200, "Campus inserted successully",);
    } catch (error) {
        return errorResponse(req, res, 500, error.message);
    }
}

//update campus
async function updateCampus(req, res) {
    try {
        const { id, ...updatedData } = req.body;
        const campus = await campusDao.findById(id);

        if (!campus || campus.isDelete === true) {
            return res.status(401).send({ message: "campus not found." });
        }
        const updatedCampus = await campusDao.update(id, updatedData);
        if (!updatedCampus) {
            return errorResponse(req, res, 500, "campus not updated");
        }
        return successResponse(req, res, 200, "campus updated successfully");

    } catch (error) {
        return errorResponse(req, res, 500, error.message);
    }
}

//view campus
async function viewCampus(req, res) {
    try {
        const id = req.body.id;
        const campus = await campusDao.findById(id);
        if (!campus || campus.isDelete === true) {
            return res.status(401).send({ message: "campus not found." });
        }
        const data = {
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
        return successResponse(req, res, 200, "Campus view successully", data);
    } catch (error) {
        errorResponse(req, res, 500, error.message);
    }
}

//list campus
async function fetchCampus(req, res) {
    const campus = await campusDao.fetch();
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
        return successResponse(req, res, 200, "all campus view succefully", formattedCampus);
    } catch (error) {
        return errorResponse(req, res, 500, error.message);
    }
}

//Delete Campus
async function deleteCampus(req, res) {
    try {
        const id = req.body.id;
        const campus = await campusDao.findById(id);
        if (!campus || campus.isDelete === true) {
            return res.status(400).send(`campus Not found. Please check and try again`);
        }
        const deletedCampus = await campusDao.delete(id);
        return successResponse(req, res, 200, "Campus Deleted Successfully", deletedCampus);
    } catch (error) {
        errorResponse(req, res, 500, error.message);
    }
}
module.exports = {
    insertCampus,
    updateCampus,
    viewCampus,
    fetchCampus,
    deleteCampus
}