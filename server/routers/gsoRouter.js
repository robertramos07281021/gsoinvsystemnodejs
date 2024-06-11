const express = require('express');
const router = express.Router();
const gsoController = require('../controllers/gsoController')
const {IsLoggedIn , isAdmin , isUser , validateItem , validateDeployedQty , validateRequestQty , validateAddDept , validateMergeDept , validateEditDept , validateUpdateUnit} = require('../../middlewares')

router.get('/dashboard',IsLoggedIn, isAdmin, gsoController.dashBoard);
router.get('/userspage',IsLoggedIn, isAdmin, gsoController.usersPage);


router.get('/departments',IsLoggedIn, isAdmin, gsoController.departmentPage);
router.get('/departments/manage',IsLoggedIn, isAdmin, gsoController.departmentMgmt);
router.post('/departments/manage/add',IsLoggedIn, isAdmin, validateAddDept, gsoController.saveDepartment);
router.delete('/departments/delete/:id',IsLoggedIn, isAdmin, gsoController.deleteDepartment);
router.patch('/departments/manage/:id',IsLoggedIn, isAdmin, validateEditDept, gsoController.editDepartment);
router.post('/departments/manage/merge',IsLoggedIn, isAdmin, validateMergeDept, gsoController.mergeDeptartment)

router.get('/items',IsLoggedIn, isAdmin, gsoController.itemPage)
router.get('/items/manage',IsLoggedIn, isAdmin, gsoController.itemMgmt);
router.post('/items/manage',IsLoggedIn, isAdmin, validateItem, gsoController.addUnit);
router.patch('/items/manage/update/:id',IsLoggedIn, isAdmin, validateUpdateUnit, gsoController.editUnit);
router.post('/items/manage/deploy',IsLoggedIn, isAdmin, validateDeployedQty, gsoController.deployUnit);
router.delete('/items/manage/delete/:id',IsLoggedIn, isAdmin, gsoController.deleteUnit);
router.get('/items/manage/deploy',IsLoggedIn, isAdmin, gsoController.deployPage);
router.delete('/items/manage/deploy/delete/:id',IsLoggedIn, isAdmin, gsoController.deleteDeployUnit);
router.patch('/items/manage/deploy/update/:id',IsLoggedIn, isAdmin, gsoController.updateDeployUnit);
router.delete('/request/delete/:id',IsLoggedIn, isAdmin, gsoController.deleteRequest)
router.get('/reports',IsLoggedIn, isAdmin, gsoController.reportsPage)
router.get('/reports/available',IsLoggedIn, isAdmin, gsoController.printScreenAvailableUnits)
router.get('/reports/deployed',IsLoggedIn, isAdmin, gsoController.printScreenDeployedUnits)
router.get('/reports/complete',IsLoggedIn, isAdmin, gsoController.printScreenCompleteTransacion)
router.get('/approval',IsLoggedIn, isAdmin, gsoController.deployApproval);
router.patch('/approval/:id',IsLoggedIn, isAdmin, gsoController.deployApprove);


// ======================== User Side

router.get('/user/dashboard',IsLoggedIn, isUser, gsoController.userDashBoard);
router.get('/user/myrequest',IsLoggedIn, isUser, gsoController.userMyRequest);
router.put('/user/myrequest/requests/edit/:id',IsLoggedIn, isUser, gsoController.editMyRequest);
router.delete('/user/myrequest/requests/delete/:id',IsLoggedIn, isUser, gsoController.deleteMyRequest);
router.post('/user/myrequest/requests/add/:id',IsLoggedIn, isUser, validateRequestQty, gsoController.userAddRequest);
router.put('/user/myrequest/receive/:id',IsLoggedIn, isUser, gsoController.userReceive);
router.get('/user/receive/reports',IsLoggedIn, isUser, gsoController.userReports);
router.get('/user/request/reports/printpreview',IsLoggedIn, isUser, gsoController.printPreview);


// ========================= API
router.get('/user/requests/:id', gsoController.forRequestApi);
router.get('/department',gsoController.forDepartmentApi);
router.get('/department/:id',gsoController.forSearchDeptApi);
router.get('/user/:id',gsoController.forUserApi);
router.get('/history/:id',gsoController.forFindHistoryApi);
router.get('/unit/available/:id',gsoController.findAvailableUnit)
router.get('/items/manage/deploy/:id', gsoController.deployUnitApi);
module.exports = router;

