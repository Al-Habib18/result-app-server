/** @format */

import createController from "./create";
import findAllController from "./findAll";
import findByCodeController from "./findByCode";
import findByNameController from "./findByName";
import findByIdController from "./findById";
import deleteByCodeController from "./deleteByCode";
import deleteByIdController from "./deleteById";
import updateByIdController from "./updateById";
import updateByCodeController from "./updateByCode";
import addRollsController from "../subject/addFailedRolls";
import removeRollsController from "../subject/removeFailedRolls";
import deleteAllController from "./deleteAll";

export {
    createController,
    findAllController,
    deleteAllController,
    findByCodeController,
    findByNameController,
    findByIdController,
    deleteByCodeController,
    deleteByIdController,
    updateByIdController,
    updateByCodeController,
    addRollsController,
    removeRollsController,
};
