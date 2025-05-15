const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Doctor = require("./../Models/doctorModel");

exports.getDoctors = function (request, response, next) {
  Doctor.find({ type: "Doctor" })
    .populate({
      path: "_id",
      model: "User",
    })
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((error) => {
      error.status = 500;
      next(error);
    });
};

exports.getDoctorById = function (request, response, next) {
  let errors = validationResult(request);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  } else {
    Doctor.findOne({ _id: request.params.id, type: "Doctor" })
      .populate({
        path: "_id",
        model: "User",
      })
      .then((data) => {
        if (!data) {
          next(new Error("Doctor id not Found"));
          response.status(422).json(data);
        } else {
          response.status(200).json(data);
        }
      })
      .catch((error) => {
        next(error);
      });
  }
};

exports.addDoctor = function (request, response, next) {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  } else {
    let userObject = new User({
      firstName: request.body._id.firstName,
      lastName: request.body._id.lastName,
      phoneNumber: request.body._id.phoneNumber,
      age: request.body._id.age,
      email: request.body._id.email,
      password: request.body._id.password,
      address: request.body._id.address,
      profileImg: request.body._id.profileImg,
      gender: request.body._id.gender,
      type: "Doctor",
    });

    let doctorObject = new Doctor({
      _id: userObject._id,
      speciality: request.body.speciality,
      appointments: [],
      patients: [],
    });

    userObject
      .save()
      .then(() => {
        doctorObject
          .save()
          .then(() => {
            response.status(201).json({ message: "Doctor added successfully" });
          })
          .catch((error) => {
            User.deleteOne(
              { phoneNumber: userObject.phoneNumber },
              function (err) {
                if (err) throw err;
              }
            );
            error.status = 500;
            next(error);
          });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};

exports.addAppointmentToDoctor = function (request, response, next) {
  let errors = validationResult(request);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  } else {
    Doctor.updateOne(
      { _id: request.body.id },
      {
        $push: {
          appointments: request.body.appointment,
        },
      }
    )
      .then(() => {
        response
          .status(201)
          .json({ message: "Appointment added successfully to the doctor" });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};

exports.removeAppointmentFromDoctor = function (request, response, next) {
  let errors = validationResult(request);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  } else {
    Doctor.updateOne(
      { _id: request.body.id },
      {
        $pull: {
          appointments: request.body.appointment,
        },
      }
    )
      .then(() => {
        response
          .status(201)
          .json({
            message: "Appointment removed successfully from the doctor",
          });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};

exports.addPatientToDoctor = function (request, response, next) {
  let errors = validationResult(request);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  } else {
    Doctor.updateOne(
      { _id: request.body.id },
      {
        $addToSet: {
          patients: request.body.patient,
        },
      }
    )
      .then(() => {
        response
          .status(201)
          .json({ message: "Patient added successfully to the doctor" });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};

exports.removePatientFromDoctor = function (request, response, next) {
  let errors = validationResult(request);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  } else {
    Doctor.updateOne(
      { _id: request.body.id },
      {
        $pull: {
          patients: request.body.patient,
        },
      }
    )
      .then(() => {
        response
          .status(201)
          .json({ message: "Patient removed successfully from the doctor" });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};

exports.updateDoctor = function (request, response, next) {
  let errors = validationResult(request);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " , ", "");
    next(error);
  } else {
    Doctor.updateOne(
      { _id: request.body._id._id },
      {
        $set: {
          speciality: request.body.speciality,
        },
      }
    )
      .then((result) => {
        if (result.matchedCount)
          User.updateOne(
            { _id: request.body._id._id },
            {
              $set: {
                firstName: request.body._id.firstName,
                lastName: request.body._id.lastName,
                phoneNumber: request.body._id.phoneNumber,
                age: request.body._id.age,
                email: request.body._id.email,
                address: request.body._id.address,
                profileImg: request.body._id.profileImg,
                gender: request.body._id.gender,
              },
            }
          )
            .then(() => {
              response
                .status(201)
                .json({ message: "Doctor updated successfully" });
            })
            .catch((error) => {
              error.status = 500;
              next(error);
            });
        else {
          let error = new Error();
          error.status = 422;
          error.message = "Doctor id not found";
          next(error);
        }
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};

exports.deleteDoctor = function (request, response, next) {
  let errors = validationResult(request);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    next(error);
  } else {
    Doctor.deleteOne({ _id: request.params.id })
      .then(() => {
        User.deleteOne({ _id: request.params.id })
          .then((result) => {
            if (result.deletedCount != 0)
              response
                .status(201)
                .json({ message: "Doctor deleted successfully" });
            else {
              let error = new Error();
              error.status = 422;
              error.message = "Doctor id not found";
              throw error;
            }
          })
          .catch((error) => {
            error.status = 500;
            next(error);
          });
      })
      .catch((error) => {
        error.status = 500;
        next(error);
      });
  }
};
