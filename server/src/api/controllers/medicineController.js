const { validationResult } = require("express-validator");
const Medicine = require("../models/medicineModel");



exports.getMedicines = (request, response, next) => {
    Medicine.find({})
        .then(result => {
            response.status(200).json(result);
        })
        .catch(error => {
            error.status = 500;
            next(error);
        });
};



exports.getMedicine = (request, response, next) => {
    Medicine.findOne({ _id: request.params._id })
        .then(result => {
            if (!result) {
                let error = new Error("Medicine ID not found");
                error.status = 404;
                
                return next(error);
                
            }
            response.status(200).json(result);
        })
        .catch(error => {
            error.status = 500;
            next(error);
        });
};



exports.createMedicine = (request, response, next) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        let error = new Error(errors.array().map(e => e.msg).join(", "));
        error.status = 422; 
        
        return next(error); 
        
    }

    const medicineObject = new Medicine({
        name: request.body.name,
        description: request.body.description
    });

    medicineObject.save()
        .then(() => {
            response.status(201).json({ message: "Medicine Added" });
        })
        .catch(error => {
            error.status = 500;
            next(error);
        });
};


exports.updateMedicine = (request, response, next) => {
    if (!request.body._id) {
        let error = new Error("No ID provided for update");
        error.status = 400; 
        
        return next(error); 
        
    }

    Medicine.updateOne({ _id: request.body._id }, {
        $set: {
            name: request.body.name,
            description: request.body.description
        }
    })
    .then(() => {
        response.status(200).json({ message: "Medicine Updated" });
    })
    .catch(error => {
        error.status = 500;
        next(error);
    });
};



exports.deleteMedicine = (request, response, next) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        let error = new Error(errors.array().map(e => e.msg).join(", "));
        error.status = 422;
        
        return next(error); 
        
    }

    Medicine.deleteOne({ _id: request.params._id })
        .then(result => {
            if (result.deletedCount === 0) {
                let error = new Error("Medicine ID not found");
                error.status = 404; 
                
                return next(error); 
                
            }
            response.status(200).json({ message: "Medicine Deleted" });
        })
        .catch(error => {
            error.status = 500;
            next(error);
        });
};
