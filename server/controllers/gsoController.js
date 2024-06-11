const mongoose = require('mongoose')
const catchAsync = require('express-async-handler');
const User = require('../../models/user')
const Dept = require('../../models/department')
const Item = require('../../models/items');
const Unit = require('../../models/unit')
const Deploy = require('../../models/deployedItem')
const Request = require('../../models/request');
const paginate = require('page-hopper');
const HistoryDept = require('../../models/history');
const ExpressError = require('../../utils/expressError');




// mongoose.connect('mongodb://127.0.0.1:27017/gsosystem')
//   .then(()=> {
//     console.log('connection open')
//   })
//   .catch((err) => {
//     console.log(`Error: ${err}`);
//   })


exports.dashBoard = catchAsync(async(req, res) => {
  const countRequest = await Request.countDocuments({approve: {$eq: false}})
  const unit = await Unit.find();
  const deployed = await Deploy.find();
  var totalUnit = 0;
  for(let x = 0; x < unit.length; x++) {
    totalUnit += unit[x].qty
  }
  for(let v = 0; v < deployed.length; v++) {
    totalUnit += deployed[v].qty
  }
  
  const items = await Item.find()
  const newArrayUnits = [];

  for(let v = 0 ; v < items.length; v++) {
    const deployedUnit = await Deploy.find({item: {$eq: items[v].id}})
    const itemUnit = await Unit.find({item: {$eq: items[v].id}})
    const newItem = {
      itemName: items[v].name,
      itemCode: items[v].code,
      deployed: function() {
        var deployQty = 0;
        Array.from(deployedUnit).forEach(deployed => {
          deployQty += deployed.qty;
        })
        return deployQty;
      },
      unit: function() {
        var unitQty = 0;
        Array.from(itemUnit).forEach(unit => {
          unitQty += unit.qty;
        })
        return unitQty;
      }
    }
    newArrayUnits.push(newItem)
  }
 

  
  const users = await User.find()
  const userPage = req.query.usersPage
  const pagginateUser = paginate(users,Number(userPage),10)

  const totalUser = await User.countDocuments({status: {$eq: 'active'}});
    res.render('gsopages/dashboard',{users ,totalUser,countRequest,totalUnit,newArrayUnits,pagginateUser,userPage});
})



exports.usersPage = catchAsync(async(req, res) => {
  const users = await User.find({status: {$eq:'active'}});
  const userActiveCount = await User.countDocuments({status: {$eq: `active`}})
  const usersDeactive = await User.find({status: {$eq: 'deactive'}})
  const userCounts = await User.countDocuments()
  const usersQueryPages = req.query.activeUserPages;
  const usersDeactiveQueryPages = req.query.deactiveUserPages;


  const usersPaginate = [];
  if(Boolean(usersQueryPages)) {
    const paginateActiveUser = paginate(users,Number(usersQueryPages),10);
    for(let v = 0; v < paginateActiveUser.data.length ; v++) {
      usersPaginate.push(paginateActiveUser.data[v])
    }
  } else {
    const paginateActiveUser = paginate(users,1,10);
    for(let v = 0; v < paginateActiveUser.data.length ; v++) {
      usersPaginate.push(paginateActiveUser.data[v])
    }
  }

  const usersDeactivePaginate = [];
  if(Boolean(usersDeactiveQueryPages)) {
    const paginateDeactiveUser = paginate(usersDeactive,Number(usersDeactiveQueryPages),8);
    for(let y = 0; y < paginateDeactiveUser.data.length ; y++) {
      usersDeactivePaginate.push(paginateDeactiveUser.data[y])
    }
  } else {
    const paginateDeactiveUser = paginate(usersDeactive,1,8);
    for(let u = 0; u < paginateDeactiveUser.data.length ; u++) {
      usersDeactivePaginate.push(paginateDeactiveUser.data[u])
    }
  }

  res.render('gsopages/users',{users, userActiveCount, userCounts, usersDeactive,usersQueryPages,usersPaginate,usersDeactiveQueryPages ,usersDeactivePaginate});

})



// ==================================  Report Page
exports.reportsPage = catchAsync(async(req,res) => {
  const units = await Unit.find().populate('item')
  const deployeds = await Deploy.find().populate('item').populate('department')
  const dept = await Dept.find()
  const deptWithDeploys = [];
  Array.from(dept).forEach(element => {
    if(element.deployed.length > 0) {
      deptWithDeploys.push(element.department)
    }
  })
  const completeTransactionDepts = [];
  const requests = await Request.find({receive: {$eq: true}}).populate('user')
  Array.from(requests).forEach(element => {
    if(!completeTransactionDepts.includes(element.department.department)) {
      completeTransactionDepts.push(element.department.department);
    }
  })
  res.render('gsopages/report',{units,deployeds,deptWithDeploys,requests,completeTransactionDepts})
})



exports.printScreenAvailableUnits = catchAsync(async(req,res) => {
  const units = await Unit.find().populate('item')

  res.render('gsopages/availableUnitsPrintScreen',{units})
})


exports.printScreenDeployedUnits = catchAsync(async(req,res) => {
  const deployedData = [];

  
  if(!Boolean(req.query.q)) {
     const deployed = await Deploy.find().populate('department').populate('item')
    Array.from(deployed).forEach(element => {
      deployedData.push(element)
    })

  } else {
    const dept = await Dept.findOne({department: {$eq: req.query.q.toUpperCase()}})
    if(!dept) {
      req.flash('error','Please Select Department!!')
      res.redirect('/reports')
    }

    const deployed = await Deploy.find({_id: {$in: dept.deployed}}).populate('department').populate('item')
    Array.from(deployed).forEach(element => {
      deployedData.push(element)
    })
  }

  res.render('gsopages/deployedUnitsPrintScreen',{deployedData})
})


exports.printScreenCompleteTransacion = catchAsync(async(req,res) => {
  const requestData = []
  const request = await Request.find({receive: {$eq: true}}).populate('user')

  function newDate(date) {
    return new Date(date).getMonth() + 1 + '/' + new Date(date).getDate() + '/' + new Date(date).getFullYear();
  }

  if(Boolean(req.query.completeDept) && Boolean(req.query.dateQuery)) {
    Array.from(request).forEach(element => {
      const requestDate  = newDate(element.receivedate)
      const queryDate = newDate(req.query.dateQuery)
      if(element.department.department == req.query.completeDept.toUpperCase() && requestDate == queryDate) {
        requestData.push(element)
      }
    })
  }

  if(Boolean(req.query.completeDept) && !Boolean(req.query.dateQuery)){
    Array.from(request).forEach(element => {
      if(element.department.department === req.query.completeDept.toUpperCase()){
        requestData.push(element);
      }
    })  
  }

  if(!Boolean(req.query.completeDept) && Boolean(req.query.dateQuery)){
    Array.from(request).forEach(element => {
      if(newDate(req.query.dateQuery) == newDate(element.receivedate)) {
        requestData.push(element);
      }
    })
  }

  if(!req.query.completeDept && !req.query.dateQuery){
    Array.from(request).forEach(element => {
      requestData.push(element)
    })
  }
  res.render('gsopages/completeTransPrintScreen',{requestData})
})


// ===========================================================================   Department page

exports.departmentPage = catchAsync(async(req, res) => {
  const departments = await Dept.find()
  const departmentsId = [];
  const deployedUnits = [];
  const usersOnDept = [];
  const querySelector = req.query.selectedDept;
  for(let b = 0; b < departments.length; b++){
    departmentsId.push(departments[b].id)
  }
  if(Boolean(req.query.selectedDept)){
    if(departmentsId.includes(querySelector)){
      const deployeds = await Deploy.find({department: {$eq: req.query.selectedDept}}).populate('item')
      for(let b = 0; b < deployeds.length; b++){
        deployedUnits.push(deployeds[b])
      }
      const departmentName = await Dept.findById(req.query.selectedDept)
      const users = await User.find({department: {$eq: departmentName.department}})
      for(let x = 0; x < users.length; x++) {
        usersOnDept.push(users[x])
      }
    } else {
      req.flash('error','You selected wrong department!')
      res.redirect('/departments')
    }
  } else {
    const deployeds = await Deploy.find({department: {$eq: departments[0].id}}).populate('item')
    for(let b = 0; b < deployeds.length; b++){
      deployedUnits.push(deployeds[b])
    }
    const users = await User.find({department: {$eq: departments[0].department}})
    for(let x = 0; x < users.length; x++) {
      usersOnDept.push(users[x])
    }

  }
  res.render('gsopages/departments',{departments,querySelector,deployedUnits,usersOnDept})
})


exports.departmentMgmt = catchAsync(async(req, res) => {
  const depts = await Dept.find({});
  const histories = await HistoryDept.find({}).populate('user');
  res.render('gsopages/departmentsmgmt',{depts,histories});
})



exports.saveDepartment = catchAsync(async(req, res) => {
  const findDept = await Dept.find({department: {$eq: req.body.departmentHidden.toUpperCase()}})
  if(findDept.length > 0) {
    req.flash('error','You added a existing department')
    res.redirect('/departments/manage')
  } else {
    const newDept = new Dept({department: req.body.departmentHidden});
    const history = new HistoryDept({action: 'add',user: req.user._id});
    history.department.push(req.body.departmentHidden.toUpperCase());
    const user = await User.findById(req.user._id);
    req.flash('success',`You successfuly added ${req.body.departmentHidden.toUpperCase()}`);
    user.history.push(history);
    await user.save();
    await history.save();
    await newDept.save();
    res.redirect('/departments/manage');
  }
  
})



exports.deleteDepartment = catchAsync(async(req, res) => {
  const {id} = req.params;
  const deleteDepartment = await Dept.findByIdAndDelete(id).populate('deployed');
  if(!deleteDepartment) {
    req.flash('error','Department does not exist!');
    return res.redirect('/departments/manage');
  }
  const history = new HistoryDept({action: 'delete',user: req.user._id});
  const user = await User.findById(req.user._id)
  history.department.push(deleteDepartment.department);
  user.history.push(history)
  await user.save();
  await history.save();
  req.flash('success',`You successfully deleted ${deleteDepartment.department}`);
  res.redirect('/departments/manage');
})



exports.editDepartment = catchAsync(async(req, res) => {
  const {id} = req.params;
  const ifDeptIsExist = await Dept.find({department: req.body.newNameOfDept.toUpperCase()})
  if(ifDeptIsExist.length < 1) {
    const editDept = await Dept.findByIdAndUpdate(id,{department: req.body.newNameOfDept});
    const history = new HistoryDept({action: 'update',newname:  req.body.newNameOfDept.toUpperCase(),user: req.user._id});
    const dept = await Dept.findById(id);
    history.department.push(dept.department);
    const user = await User.findById(req.user._id)
    user.history.push(history)
    await user.save();
    await history.save();
    req.flash('success',`Successfully update ${dept.department} to ${req.body.newNameOfDept.toUpperCase()}`);
    res.redirect('/departments/manage');
  } else {
    req.flash('error','New department name is already in used')
    res.redirect('/departments/manage');
  }
})


exports.mergeDeptartment = catchAsync(async(req, res) => {
  try {
    const dept = await Dept.find({department: {$in: req.body.mergeDeptChecked}})
    const newDeptAdd = new Dept({department: req.body.mergeDeptName})
    Array.from(dept).forEach(element => {
      Array.from(element.deployed).forEach(async(deployed) => {
        const deployUnit = await Deploy.findById(deployed)
        const updateUnit = await Unit.findOneAndUpdate({item: {$eq: deployUnit.item}},{$inc: {qty: Number(deployUnit.qty)}})
        const deleteDeploy = await Deploy.findByIdAndDelete(deployed)
      })
    })
    const user = await User.find({department: {$in: req.body.mergeDeptChecked}})
    Array.from(user).forEach(async (user) => {
      await User.findByIdAndUpdate(user._id,{department: req.body.mergeDeptName})
    })
    const deleted = await Dept.deleteMany({department: {$in: req.body.mergeDeptChecked}})
    
    const history = new HistoryDept({action: 'merge',newname: req.body.mergeDeptName, user: req.user._id})
    Array.from(req.body.mergeDeptChecked).forEach(element => {
      history.department.push(element)
    })
    const currentUser = await User.findById(req.user._id)
    currentUser.history.push(history);
    await currentUser.save();
    await history.save();
    await newDeptAdd.save();
    req.flash('success','Successfuly merge')
    res.redirect('/departments/manage');
  } catch(err) {
    console.log(err)
  }

})


//============================================================================================================================ items page

exports.itemPage = catchAsync( async(req, res) => {
  const units = await Unit.find({}).populate('item')
  const deployed = await Deploy.find({}).populate('department').populate('item')
  const depts = await Dept.find({}).populate('deployed')
  const deptsWithDeploy = [];

  Array.from(depts).forEach(element => {
    if(element.deployed.length > 0) {
      deptsWithDeploy.push(element)
    }
  })
  res.render('gsopages/items',{units,deployed,deptsWithDeploy})
})

exports.itemMgmt = catchAsync( async(req, res) => {
  const units = await Unit.find().populate('item')
  const depts = await Dept.find();
  const deploys = await Deploy.find().populate('item')
  res.render('gsopages/itemsmgmt', {units, depts, deploys})
})


exports.deleteUnit = catchAsync(async(req,res) => {
  const {id} = req.params;
  const deleteUnit = await Unit.findByIdAndDelete(id).populate('item');
  const deleteItem = await Item.findByIdAndDelete(deleteUnit.item.id)
  if(!deleteUnit) {
    req.flash('error','Please select unit you want to delete')
    res.redirect('/items/manage')
  }
  req.flash('deleteEvent',`Successfully deleted ${deleteUnit.item.name}`)
  res.redirect('/items/manage')
})


exports.addUnit = catchAsync(async(req, res) => {
  const newItem = new Item({name: req.body.name, code: req.body.code, description: req.body.description})
  await newItem.save()
  .then(async()=> {
    const newUnit = new Unit({qty: req.body.qty,item: newItem});
    req.flash('success','Successfuly add new units');
    await newUnit.save();
    res.redirect('/items/manage')
  })
  .catch(err => {
    req.flash('error','Code is already in used')
    res.redirect('/items/manage')
  })
})

exports.editUnit = catchAsync(async(req, res) => {
  const unitId = req.params.id;
  const findUnit = await Unit.findById(unitId).populate('item')
  const itemUpdate = await Item.findByIdAndUpdate(findUnit.item.id,{name: req.body.name, code: req.body.code, description: req.body.description})
  .then(async()=> {
    const unit = await Unit.findByIdAndUpdate(unitId,{qty: Number(req.body.qty)}).populate('item')
    req.flash('updateEvent','Update success!')
    res.redirect('/items/manage');
  })
  .catch(err=> {
    if(err.code === 11000){
      req.flash('error','Code is already in used')
    }
    res.redirect('/items/manage');
  })


})



exports.deployUnit = catchAsync(async(req, res) => {
  const dept = await Dept.findById(req.body.department);
  const unit = await Unit.findById(req.body.unitId).populate('item');
  if(!dept) {
    req.flash('error','Please select department!')
    res.redirect('/items/manage')
  }

  const findDeploy = await Deploy.findOne({$and: [{item: {$eq: unit.item.id}},{department: {$eq: dept}}]});
  if(findDeploy) {
    const updateDeploy = await Deploy.findByIdAndUpdate(findDeploy,{$inc: {qty: Number(req.body.qty)}})
    const updateUnit = await Unit.findByIdAndUpdate(req.body.unitId,{$inc: {qty: -Number(req.body.qty)}});
    req.flash('success',`Successfully deploy ${unit.item.name} to ${dept.department}`)
    res.redirect('/items/manage')
  } else {
    const newdeploy = new Deploy({item: unit.item.id,qty: Number(req.body.qty),department: req.body.department});
    if(unit.qty < Number(req.body.qty)) {
      req.flash('error',`You have ${unit.qty} total ${unit.qty > 1 ? 'units':'unit'} in ${unit.item.name}!`)
      res.redirect('/items/manage')
    } else {
      const updateUnit = await Unit.findByIdAndUpdate(req.body.unitId,{$inc: {qty: -Number(req.body.qty)}});
      dept.deployed.push(newdeploy);
      await dept.save();
      await newdeploy.save();
      req.flash('success',`Successfully deploy ${unit.item.name} to ${dept.department}`)
      res.redirect('/items/manage')
    }
  }
})


exports.deleteDeployUnit = catchAsync(async(req, res) => {
  const {id} = req.params
  const deletedDeploy = await Deploy.findByIdAndDelete(id).populate('department');
  const updateDepartment = await Dept.findByIdAndUpdate(deletedDeploy.department.id, {$pull: {deployed: id}})
  res.redirect('/items/manage/deploy');
})


exports.updateDeployUnit = catchAsync(async(req,res) => {
  const {id} = req.params
  const updateDeploy = await Deploy.findByIdAndUpdate(id,{qty: Number(req.body.hiddenQty)}).populate('item')
  if(!updateDeploy) {
    req.flash('error','Please select deployed unit to update!!')
    res.redirect('/items/manage/deploy')
  }
  req.flash('updateEvent',`You successfully update ${updateDeploy.item.name} !`)
  res.redirect('/items/manage/deploy')
})


exports.deployPage = catchAsync(async(req, res) => {
  const deploys = await Deploy.find({}).populate('item').populate('department')
  const depts = await Dept.find().populate('deployed')
  const deptsWithDeploy = [];
  Array.from(depts).forEach(element => {
    if(element.deployed.length > 0) {
      deptsWithDeploy.push(element.department)
    }
  })
  res.render('gsopages/deploy',{deploys,deptsWithDeploy})
})

//==================================================================Approval pages

exports.deployApproval = catchAsync(async(req, res) => {

  const forApprovals = await Request.find({approve: {$eq: false}}).populate({path: 'deployed', populate: {path: "item"}}).populate({path: 'deployed', populate: {path: 'department'}}).populate('user')
  const forReceives = await Request.find({$and: [{approve: {$eq: true}},{receive: {$eq: false}}]}).populate({path: 'deployed', populate: {path: 'item'}}).populate({path: 'deployed', populate: {path: 'department'}}).populate('user')
  const completeReceived = await Request.find({receive: {$eq: true}}).populate('user')
  res.render('gsopages/approval',{forApprovals,forReceives,completeReceived})
})


exports.deployApprove = catchAsync(async(req,res) => { 
  const {id} = req.params

  function addStamp(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  const updateRequestApprove = await Request.findByIdAndUpdate(id,{approve: true, stamp: addStamp(8),approvedby: req.user._id, approvedate: new Date()}).populate('deployed');

  const updateDeployed = await Deploy.findByIdAndUpdate(updateRequestApprove.deployed._id, {$inc: {qty: -Number(updateRequestApprove.qty)}});

  if(!updateRequestApprove && !updateDeployed) {
    req.flash('error','Please select request to approved!')
    res.redirect('/approval')
  }

  req.flash('success','Request has been approved.')

  res.redirect('/approval')
})


exports.deleteRequest = catchAsync(async(req,res) => {
  const {id} = req.params;
  const deleteRequest = await Request.findByIdAndDelete(id)
  if(!deleteRequest) {
    req.flash('error','Please Select Request To Delete!')
  }
  req.flash('success',`You successfully delete request w/ tracking no ${deleteRequest.tracking}.`)
  res.redirect('/approval')
})

//================================================================================================================================USER SIDE

exports.userDashBoard = catchAsync(async(req, res) => {
  const depts = await Dept.find({department : {$ne: req.user.department}})
  const deptsWithDeploy = [];
  Array.from(depts).forEach(element => {
    if(element.deployed.length > 0) {
      deptsWithDeploy.push(element)
    }
  })
  const currentUserDept = await Dept.find({department: {$eq: req.user.department}}).populate('deployed')
  const deployedUnitsOnYourDept = await Deploy.find({department: {$eq: currentUserDept[0]}}).populate('item');
  const availableUnits = await Unit.find().populate('item');
  const otherDeptUnits = await Deploy.find({department: {$ne: currentUserDept[0]}}).populate('item').populate('department');
  res.render('gsousers/userdashboard',{deployedUnitsOnYourDept,availableUnits,otherDeptUnits,deptsWithDeploy});
})


// =================================================================================  path: /user/myrequest
exports.userMyRequest = catchAsync(async(req, res) => {
  const depts = await Dept.find({department : {$ne: req.user.department}})
  const deploy = await Deploy.find({department: {$eq: depts[0]}}).populate('item')
  const request = await Request.find({$and: [{user: {$eq: req.user._id}},{approve: {$eq: false}}]}).populate('deployed')
  const approvedRequests = await Request.find({$and: [{user: {$eq: req.user}},{approve: {$eq: true}},{receive: {$eq: false}}]}).populate('deployed')
  const requestCount = await Request.countDocuments({$and: [{user: {$eq: req.user._id}},{approve: {$eq: false}}]})
  const approvedCount = await Request.countDocuments({$and: [{user: {$eq: req.user._id}},{approve: {$eq: true}},{receive: {$eq: false}}]})
  const receivedCount = await Request.countDocuments({$and: [{user: {$eq: req.user._id}},{receive: {$eq: true}}]})
  const receivedRequests = await Request.find({$and: [{user: {$eq: req.user._id}},{receive: {$eq: true}}]})
  res.render('gsousers/myrequest',{deploy,request,approvedRequests,requestCount,approvedCount,receivedCount,receivedRequests})
})


//================================================================================== User Edit Request
exports.editMyRequest = catchAsync(async(req, res) => {
  const {id} = req.params;
  const request = await Request.findById(id).populate('deployed')
  if((Number(req.body.requestQty) > 0 ) || (Number(req.body.requestQty) < request.qty)) {
    const editMyRequestData = await Request.findByIdAndUpdate(id,{qty: Number(req.body.requestQty)})
    req.flash('updateEvent',`You successfully update request, with tracking no ${editMyRequestData.tracking}`)
  } else {
    req.flash('error','Please enter request valid quantity')
  }
  res.redirect('/user/myrequest')
 })


//================================================================================== User Add Request
exports.userAddRequest = catchAsync(async(req, res) => {
  const {id} = req.params;
  const deployUnit = await Deploy.findById(id).populate('item').populate('department')
  const department = await Dept.findById(deployUnit.department.id)
  const item = await Item.findById(deployUnit.item.id)
  if((Number(req.body.formRequestQty) > deployUnit.qty) && (Number(req.body.formRequestQty) <= 0 ) ){
    req.flash('error', `Please enter valid request quantity`)
    res.redirect('/user/myrequest')
  } else {
    function addTracking(length){
      let trackingNo = '';
      const dateToDay = new Date();
      const month = ['01','02','03','04','05','06','07','08','09','10','11','12']
      const day = ['01', '02', '03', '04', '05', '06', '07', '08', '09']
      trackingNo += dateToDay.getFullYear();
      trackingNo += month[dateToDay.getMonth()];
      if(dateToDay.getDate() < 10) {
        trackingNo += day[dateToDay.getDate() - 1];
      }else {
        trackingNo += dateToDay.getDate();
      }
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        trackingNo += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return trackingNo;
    }
    const newRequest = new Request({deployed: deployUnit,item: item, department: department,qty: Number(req.body.formRequestQty),tracking: addTracking(5)});
    const userRequest = await User.findById(req.user._id)
    userRequest.request.push(newRequest)
    newRequest.user = userRequest
    await newRequest.save();
    await userRequest.save();
    req.flash('addEvent',`You successfully add ${Number(req.body.formRequestQty)} ${Number(req.body.formRequestQty) > 1 ?  'requests' : 'request'}, Wait for approval`)
    res.redirect('/user/myrequest')
  }

 
})


// ========================================================= for Receiving
exports.userReceive = catchAsync(async(req, res) => {
  const {id} = req.params;
  const request = await Request.findById(id)
  if( req.body.stampNumber === request.stamp ) {
    const updateReceive = await Request.findByIdAndUpdate(id, {receive: true, receivedate: new Date()})
    req.flash('requestReceivedSuccess',`Item received with tracking no. ${updateReceive.tracking}`)
  } else {
    req.flash('error', `Tracking no. ${request.tracking}, Invalid Stamp code`)
  }
  res.redirect('/user/myrequest')
})




// ====================================================== DELETE Request
exports.deleteMyRequest = catchAsync(async( req, res ) => {
  const {id} = req.params;
  const deleteRequestInUser = await User.findByIdAndUpdate(req.user._id, {$pull: {request: id}})
  const deleteRequest = await Request.findByIdAndDelete(id);
  req.flash('deleteEvent',`Request with tracking no. ${deleteRequest.tracking} has been deleted`)
  res.redirect('/user/myrequest')
})





// ===========================================================User Reports
exports.userReports = catchAsync(async(req, res ) => {
  const requests = await Request.find({$and: [{user: {$eq: req.user._id}},{receive: {$eq: true}} ]}).populate({path: 'deployed',populate: 'item'}).populate('user')

  res.render('gsousers/reportuser',{requests})

})

exports.printPreview = catchAsync(async(req, res) => {
  const query = req.query.dateQuery
  const requestsQuery = [];
  const request = await Request.find({$and: [{user: {$eq: req.user._id}},{receive: {$eq: true}}]}).populate({path: 'deployed',populate: 'item'})
  const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  if(Boolean(query) == true) {
    for(let b = 0 ; b < request.length; b++) {
      if(query.includes(month[new Date(request[b].receivedate).getMonth()]) && query.includes(new Date(request[b].receivedate).getDate()) && query.includes(new Date(request[b].receivedate).getFullYear())){
        requestsQuery.push(request[b])
      } 
    } 
  } 
  if(Boolean(query) == false){
    for(let x = 0 ; x < request.length ; x++) {
      requestsQuery.push(request[x]);
    }
  }
  res.render('gsousers/userprintpreview',{requestsQuery})
})




//============================================================ API`s 
exports.forRequestApi = catchAsync (async(req, res) => {
  const {id} = req.params;
  const requests = await Request.findById(id).populate({path: 'deployed', populate: {path: 'item'}}).populate('user').populate('approvedby');
  res.send(requests);
})

exports.forWishlistApi = catchAsync(async(req, res) => {
  const {id} = req.params;
  const wishlist = await Wishlist.findById(id)
  res.send(wishlist);
})

exports.forDepartmentApi = catchAsync(async(req, res) => {
  const department = await Dept.find();
  res.send(department);
})


exports.forSearchDeptApi = catchAsync(async(req, res) => {
  const {id} = req.params
  const dept = await Dept.findById(id)
  res.send(dept)
})

exports.forUserApi = catchAsync(async(req, res) => {
  const {id} = req.params;
  const user = await User.findById(id);
  res.send(user)
})

exports.forFindHistoryApi = catchAsync(async(req, res) => {
  const {id} = req.params;
  const history = await HistoryDept.findById(id).populate('user')
  res.send(history)
})

exports.findAvailableUnit = catchAsync(async(req, res) => {
  const {id} = req.params;
  const availableUnit = await Unit.findById(id).populate('item')
  res.send(availableUnit)
})

exports.deployUnitApi = catchAsync (async(req,res) => {
  const{id} = req.params
  const findDeployUnit = await Deploy.findById(id).populate('item').populate('department');
  res.send(findDeployUnit);
})