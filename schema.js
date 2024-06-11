const Joi = require('joi')

module.exports.userSchemaValidation = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  role: Joi.string().required(),
  address: Joi.string().required(),
  department: Joi.string().required(),
  phone: Joi.string().required().regex(/^[0][9][0-9]{9}$/),
  email: Joi.string().required().email({minDomainSegments:2, tlds: {allow: true}}),
  username: Joi.string().required(),
  password: Joi.string().required(),
  password2: Joi.string().required()
})

module.exports.userInfoUpdateValidation = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  phone: Joi.string().required().regex(/^[0][9][0-9]{9}$/),
  email: Joi.string().required().email({minDomainSegments:2, tlds: {allow: true}}),
  address: Joi.string().required(),
  department: Joi.string().required()
})

module.exports.itemSchemaValidation = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().required(),
  description: Joi.string().required(),
  qty: Joi.number().required().min(1)
})

module.exports.updateItemSchemaValidation = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().required(),
  qty: Joi.number().required().min(0),
  description: Joi.string().required()

})


module.exports.requestSchemaValidation = Joi.object({
  formRequestQty: Joi.number().required().min(1)
})

module.exports.deployedSchemaValidation = Joi.object({
  department: Joi.string().required(),
  qty: Joi.number().required().min(1),
  unitId: Joi.string().required()

})


module.exports.updateUserSchemaValidation = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  phone: Joi.string().required().regex(/^[0][9][0-9]{9}$/),
  email: Joi.string().required().email({minDomainSegments:2, tlds: {allow: true}}),
  address: Joi.string().required(),
  role: Joi.string().required(),
  status: Joi.string().required(),
  department: Joi.string().required()
})

module.exports.changePassSchemaValidation = Joi.object({
  oldPass: Joi.string().required(),
  newPass: Joi.string().required(),
  confirmNewPass: Joi.string().required()

})

module.exports.addDeptSchemaValidation = Joi.object({
  departmentHidden: Joi.string().required()
})

module.exports.mergeDeptSchemaValidation = Joi.object({
  mergeDeptName: Joi.string().required(),
  mergeDeptChecked: Joi.array().required()
})

module.exports.editDepartmentSchemaValidation = Joi.object({
  newNameOfDept: Joi.string().required()
})