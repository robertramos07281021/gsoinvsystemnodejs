const {userSchemaValidation , itemSchemaValidation , requestSchemaValidation , deployedSchemaValidation , updateUserSchemaValidation , addDeptSchemaValidation , mergeDeptSchemaValidation , editDepartmentSchemaValidation , updateItemSchemaValidation ,userInfoUpdateValidation ,changePassSchemaValidation} = require('./schema')
const ExpressError = require('./utils/expressError')
const Dept = require('./models/department');
const { catchAsync } = require('catch-async-wrapper-express');

module.exports.IsLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}

module.exports.isAdmin = (req, res, next) => {
  if(req.user.role != 'admin') {
    req.flash('error','You dont have permission to do that!')
    return res.redirect('/user/dashboard')
  }
  next();
}

module.exports.isUser = (req, res ,next) => {
  if(req.user.role != 'user') {
    req.flash('error','You dont have permission to do that!')
    return res.redirect('/dashboard')
  }
  next();
}

module.exports.validateUser = (req, res, next) => {
  const {error} = userSchemaValidation.validate(req.body);
  if(error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

module.exports.validateItem = (req, res, next) => {
  const {error} = itemSchemaValidation.validate(req.body);
  if(error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}
module.exports.validateUpdateUnit = (req, res, next) => {
  const {error} = updateItemSchemaValidation.validate(req.body);
  if(error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}




module.exports.validateRequestQty = (req, res, next) => {
  const {error} = requestSchemaValidation.validate(req.body);
  if(error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

module.exports.validateDeployedQty = (req, res, next) => {
  const {error} = deployedSchemaValidation.validate(req.body);
  if(error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}
module.exports.validateUpdateInfoAdmin = (req, res, next) => {
  const {error} = updateUserSchemaValidation.validate(req.body);
  if(error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

module.exports.validateChangePassword = (req, res, next) => {
  const {error} = changePassSchemaValidation.validate(req.body);
  if(error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

module.exports.validateAddDept = (req, res, next) => {
  const {error} = addDeptSchemaValidation.validate(req.body);
  if(error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

module.exports.validateMergeDept = catchAsync(async(req, res, next) => {
  const dept = await Dept.find()
  const existingDept = []
  let notExists = 0;
  Array.from(dept).forEach(element => {
    existingDept.push(element.department)
  })
  Array.from(req.body.mergeDeptChecked).forEach(element => {
    if(!existingDept.includes(element)){
      notExists += 1;
    }
  })
  const {error} = mergeDeptSchemaValidation.validate(req.body);
  if(notExists >= 1 || error) {
    if(notExists >= 1) {
      const msg = 'Please select existing department'
      throw new ExpressError(msg,400)
    } 
    if(error) {
      const msg = error.details.map(el => el.message).join(',');
      throw new ExpressError(msg, 400);
    } 
  } else {
    next()
  }

})

module.exports.validateEditDept = (req, res, next) => {
  const {error} = editDepartmentSchemaValidation.validate(req.body);
  if(error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

module.exports.validateUpdateUserinfo = catchAsync(async(req, res, next) => {
  const {error} = userInfoUpdateValidation.validate(req.body);
  const depts = await Dept.find({department: req.body.department.toUpperCase()})
  if(error || depts.length < 1){
    if(error){
      const msg = error.details.map(el => el.message).join(',');
      throw new ExpressError(msg, 400);
    }
    if(depts.length < 1 ){
      const msg = 'Please select existing department.';
      throw new ExpressError(msg, 400);
    } 
  } else {
    next()
  }

})
