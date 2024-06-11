const mongoose = require('mongoose')
const catchAsync = require('express-async-handler');
const User = require('../../models/user')
const Dept = require('../../models/department')


// mongoose.connect('mongodb://127.0.0.1:27017/gsosystem')
//   .then(()=> {
//     console.log('connection open')
//   })
//   .catch((err) => {
//     console.log(`Error: ${err}`);
//   })
  
  // ======================================================================================= Admin side

exports.registrationForm = catchAsync(async(req, res) => {
  const depts =await Dept.find({});
  res.render('users/registrationform',{depts})
})




exports.saveAccount = catchAsync(async(req, res) => {
  const depts =await Dept.find({});
  const deptsArray = [];
  for(let dept of depts) {
      deptsArray.push(dept.department)
  }
  try{
    const {firstname, lastname, phone, email, address, username, password, role, department} = req.body
    if(deptsArray.includes(department)){
      const user = new User({firstname, lastname, phone, email, address, username, role, department});
      const registerUser = await User.register(user,password)
      req.flash('success','Created account success')
      res.redirect('/userspage')
    } else {
      req.flash('error','That department is not registered')
      res.redirect('/register')
    }
  } catch(e) {
    req.flash('error',e.message)
    res.redirect('/register')
  }
  
})

exports.loginUserFirstPage = catchAsync(async(req, res) => {
  const {username} = req.body
  const user = await User.findOne({username: username}).exec();
  req.flash('success',`Welcome ${user.firstname.toUpperCase()}`)
  if(user.role === 'admin'){
    res.redirect('/dashboard')
  } else {
    res.redirect('/user/dashboard')
  }
})

exports.loginFormFirstPage = catchAsync(async(req, res) => {
  res.render('users/login')
})


exports.loginForm = catchAsync(async(req, res) => {
  res.render('users/login')
})


exports.loginUser = catchAsync(async(req, res) => {
  const {username} = req.body
  const user = await User.findOne({username: username}).exec();
  req.flash('success',`Welcome ${user.firstname.toUpperCase()}`)
  if(user.role === 'admin'){
    res.redirect('/dashboard')
  } else {
    res.redirect('/user/dashboard')
  }
})

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if(err){
      return next(err);
    }
  res.redirect('/login');
  })

}


exports.viewUser = catchAsync(async(req, res) => {
  const {id} = req.params;
  const user = await User.findById(id);
  if(!user) {
    req.flash('error','User does not exist!')
    return res.redirect('/userspage')
  }
  res.render('gsopages/viewuser', {user});
})

exports.updateUserPage = catchAsync(async(req, res) => {
  const {id} = req.params
  const user = await User.findById(id)
  const depts = await Dept.find()
  res.render('gsopages/userpageupdateuser',{user,depts})
})


exports.updateUserInfo = catchAsync(async(req, res) => {
  const {id} = req.params;
  const depts = await Dept.find();
  const checkForDepartment = [];
  
  for(let b = 0; b < depts.length; b++) {
    checkForDepartment.push(depts[b].department)
  }
  if(checkForDepartment.includes(req.body.department)) {
    const updateUser = await User.findByIdAndUpdate(id,{...req.body})
    req.flash('updateEvent','User update info success')
    res.redirect(`/userspage/view/${id}`)
  } else {
    req.flash('error','You select wrong department')
    res.redirect(`/userspage/update/${id}`)
  }  
} )

exports.adminUserChangePassword = catchAsync(async(req, res) => {
  const {id} = req.params
  const user = await User.findById(id)
  user.changePassword(req.body.oldPass, req.body.newPass,function(err) {
    if(err) {
      req.flash('error',"Incorrect Old Password")
      res.redirect(`/userspage/update/${id}`)
    } else {
      req.flash('updateEvent','Successfully change password')
      res.redirect(`/userspage/update/${id}`)
    }
  })
})


exports.adminMyProfile = catchAsync(async(req, res) => {
  const {id} = req.params
  const user = await User.findById(id);
  res.render('gsopages/myprofile',{user})
})

exports.adminUpdatePage = catchAsync(async(req, res) => {
  const {id} = req.params
  const user = await User.findById(id)
  const depts = await Dept.find()
  res.render('gsopages/updatemyprofile',{user,depts})
})

exports.adminUpdateInfo = catchAsync(async(req, res) => {
  const {id} = req.params;
  const depts = await Dept.find();
  const checkForDepartment = [];
  
  for(let b = 0; b < depts.length; b++) {
    checkForDepartment.push(depts[b].department)
  }
  if(checkForDepartment.includes(req.body.department)) {
    const updateMyProfileInfo = await User.findByIdAndUpdate(id,{...req.body})
    req.flash('updateEvent','User update info success')
    res.redirect(`/admin/myprofile/view/${id}`)
  } else {
    req.flash('error','You select wrong department')
    res.redirect(`/admin/myprofile/update/${id}`)
  }  
})


exports.adminMyProfileChangePassword = catchAsync(async(req, res) => {
  const {id} = req.params
  const user = await User.findById(id)
  user.changePassword(req.body.oldPass, req.body.newPass,function(err) {
    if(err) {
      req.flash('error',"Incorrect Old Password")
      res.redirect(`/userspage/update/${id}`)
    } else {
      req.flash('updateEvent','Successfully change password')
      res.redirect(`/userspage/update/${id}`)
    }
  })
})



// =====================================================User side

exports.userMyProfile = catchAsync(async(req,res) => {
  const {id} = req.params;
  const user = await User.findById(id);

  res.render('gsousers/myprofile',{user});
})

exports.updateMyProfilePage = catchAsync(async(req, res) => {
  const {id} = req.params;
  const user = await User.findById(id)
  const depts = await Dept.find()
  res.render('gsousers/updatemyprofile',{user,depts})
})

exports.updateMyProfileInfo = catchAsync(async(req, res) => {
  const {id} = req.params;
  const updateUser = await User.findByIdAndUpdate(id,{...req.body});
  if(!updateUser) {
    req.flash('error','User is not exists!')
    res.redirect(`/user/myprofile/view/${id}`)
  }
  req.flash('updateEvent','You successfully update your info')
  res.redirect(`/user/myprofile/view/${id}`)

})



exports.userChangePassword = catchAsync(async(req, res) => {
const {id} = req.params
const user = await User.findById(id)
user.changePassword(req.body.oldPass, req.body.newPass,function(err) {
  if(err) {
    req.flash('error',"Incorrect Old Password")
    res.redirect(`/user/myprofile/update/${id}`)
  } else {
    req.flash('updateEvent','Successfully change password')
    res.redirect(`/user/myprofile/view/${id}`)
  }
})

})