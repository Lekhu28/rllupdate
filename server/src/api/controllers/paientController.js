const { validationResult } = require("express-validator");
const Patient = require("./../models/patientModel");
const fs = require("fs");
const { response, request } = require("express");

// Utility function to handle validation errors
const handleValidationErrors = (request, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array().map(e => e.msg).join(", "));
        error.status = 422;
        return next(error); // Return early if there are validation errors
    }
};

//---------------------------- Get All Patients
exports.getAllPatient = (request, response, next) => {
    Patient.find({})
        .then(data => response.status(200).json(data))
        .catch(error => next(error));
};

//---------------------------- Get Patient by ID
exports.getPatient = (request, response, next) => {
    Patient.findOne({ _id: request.params._id })
        .then(data => {
            if (!data) {
                const error = new Error("Patient ID not found");
                error.status = 404; // Not Found
                return next(error);
            }
            response.status(200).json(data);
        })
        .catch(error => next(error));
};

//---------------------------- Create Patient
exports.createPatient = (request, response, next) => {
    handleValidationErrors(request, next);  // Early return if validation fails

    const patientObject = new Patient({
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        phone_number: request.body.phone_number,
        age: request.body.age,
        gender: request.body.gender,
        address: request.body.address,
        profile_img: request.body.profile_img
    });

    patientObject.save()
        .then(data => response.status(201).json({ message: "Patient Added", data }))
        .catch(error => next(error));
};

//---------------------------- Update Patient
exports.updatePatient = (request, response, next) => {
    handleValidationErrors(request, next); // Early return if validation fails

    Patient.findByIdAndUpdate(request.body._id, {
        $set: {
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            phone_number: request.body.phone_number,
            age: request.body.age,
            gender: request.body.gender,
            address: request.body.address
        }
    })
    .then(data => {
        if (!data) {
            const error = new Error("Patient not found");
            error.status = 404; // Not Found
            return next(error);
        }
        response.status(200).json({ message: "Patient Updated", data });
    })
    .catch(error => next(error));
};

//---------------------------- Delete Patient
exports.deletePatient = (request, response, next) => {
    Patient.findByIdAndDelete(request.params._id)
        .then(data => {
            if (!data) {
                const error = new Error("Patient not found");
                error.status = 404; // Not Found
                return next(error);
            }
            response.status(200).json({ message: "Patient Deleted" });
        })
        .catch(error => next(error));
};

//---------------------------- Add Doctor to Patient
exports.addDoctortoPatient = (request, response, next) => {
    handleValidationErrors(request, next); // Early return if validation fails

    Patient.updateOne({ _id: request.body._id }, {
        $addToSet: { Doctor: request.body.doctor }
    })
    .then(data => {
        if (!data) {
            const error = new Error("Patient not found");
            error.status = 404; // Not Found
            return next(error);
        }
        response.status(200).json({ message: "Doctor added to Patient" });
    })
    .catch(error => next(error));
};

//---------------------------- Add Appointment to Patient
exports.addAppointmenttoPatient = (request, response, next) => {
    handleValidationErrors(request, next); // Early return if validation fails

    Patient.updateOne({ _id: request.body._id }, {
        $addToSet: { Appointment: request.body.appointment }
    })
    .then(data => {
        if (!data) {
            const error = new Error("Patient not found");
            error.status = 404; // Not Found
            return next(error);
        }
        response.status(200).json({ message: "Appointment added to Patient" });
    })
    .catch(error => next(error));
};

//---------------------------- Add Prescription to Patient
exports.addPrescriptiontoPatient = (request, response, next) => {
    handleValidationErrors(request, next); // Early return if validation fails

    Patient.updateOne({ _id: request.body._id }, {
        $addToSet: { Prescriptions: request.body.prescription }
    })
    .then(data => {
        if (!data) {
            const error = new Error("Patient not found");
            error.status = 404; // Not Found
            return next(error);
        }
        response.status(200).json({ message: "Prescription added to Patient" });
    })
    .catch(error => next(error));
};

//---------------------------- Delete Doctor from Patient
exports.deleteDoctorfromPatient = (request, response, next) => {
    handleValidationErrors(request, next); // Early return if validation fails

    Patient.updateOne({ _id: request.body._id }, {
        $pull: { Doctor: request.body.doctor }
    })
    .then(data => {
        if (!data) {
            const error = new Error("Patient not found");
            error.status = 404; // Not Found
            return next(error);
        }
        response.status(200).json({ message: "Doctor removed from Patient" });
    })
    .catch(error => next(error));
};

//---------------------------- Delete Appointment from Patient
exports.deleteAppointmentfromPatient = (request, response, next) => {
    handleValidationErrors(request, next); // Early return if validation fails

    Patient.updateOne({ _id: request.body._id }, {
        $pull: { Appointment: request.body.appointment }
    })
    .then(data => {
        if (!data) {
            const error = new Error("Patient not found");
            error.status = 404; // Not Found
            return next(error);
        }
        response.status(200).json({ message: "Appointment removed from Patient" });
    })
    .catch(error => next(error));
};

//---------------------------- Delete Prescription from Patient
exports.deletePrescriptionfromPatient = (request, response, next) => {
    handleValidationErrors(request, next); // Early return if validation fails

    Patient.updateOne({ _id: request.body._id }, {
        $pull: { Prescriptions: request.body.prescription }
    })
    .then(data => {
        if (!data) {
            const error = new Error("Patient not found");
            error.status = 404; // Not Found
            return next(error);
        }
        response.status(200).json({ message: "Prescription removed from Patient" });
    })
    .catch(error => next(error));
};
