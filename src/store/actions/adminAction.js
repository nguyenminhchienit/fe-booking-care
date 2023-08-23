import actionTypes from './actionTypes';
import {getAllCodeService,createNewUserService,getAllUsers,postInfoDoctorService,deleteUserService,
    editUserService,getDoctor,getAllDoctorService, getAllSpecialtyService} from '../../services/userService'
import { toast } from 'react-toastify';

export const fetchGenderStart = () => {
    return async (dispatch,getState) => {
        try {
            dispatch({type: actionTypes.FETCH_GENDER_START})

            let res = await getAllCodeService('gender');
            if(res && res.errCode === 0){
                dispatch(fetchGenderSuccess(res.data))
            }else{
                dispatch(fetchGenderFail())
            }
            
        } catch (e) {
            dispatch(fetchGenderFail())
            console.log("fetch gender start error: ",e);
        }
    }
}

export const fetchGenderSuccess = (dataGender) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: dataGender
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})



//FETCH_ROLE_SUCCESS
export const fetchRoleStart = () => {
    return async (dispatch,getState) => {
        try {
            let res = await getAllCodeService('ROLE');
            if(res && res.errCode === 0){
                dispatch(fetchRoleSuccess(res.data))
            }else{
                dispatch(fetchRoleFail())
            }
            
        } catch (e) {
            dispatch(fetchRoleFail())
            console.log("fetch Role start error: ",e);
        }
    }
}

export const fetchRoleSuccess = (dataRole) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: dataRole
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})


export const fetchPositionStart = () => {
    return async (dispatch,getState) => {
        try {

            let res = await getAllCodeService('POSITION');
            if(res && res.errCode === 0){
                dispatch(fetchPositionSuccess(res.data))
            }else{
                dispatch(fetchPositionFail())
            }
            
        } catch (e) {
            dispatch(fetchPositionFail())
            console.log("fetch Position start error: ",e);
        }
    }
}

export const fetchPositionSuccess = (dataPosition) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: dataPosition
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

export const createNewUser = (data) => {
    return async (dispatch,getState) => {
        try {
            let res = await createNewUserService(data);
            if(res && res.errCode === 0){
                toast.success("Create new user success!")
                dispatch(saveUserSuccess())
                dispatch(fetchUserStart())
            }else{
                toast.error("Create new user failed!")
                dispatch(saveUserFailed())
            }
            
        } catch (e) {
            toast.error("Create new user failed!")
            dispatch(saveUserFailed())
            console.log("fetch Position start error: ",e);
        }
    }
}

export const saveUserSuccess = (dataPosition) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAIL
})


export const fetchUserStart = () => {
    return async (dispatch,getState) => {
        try {
            let res = await getAllUsers('ALL');
            if(res && res.errCode === 0){
                dispatch(fetchUserSuccess(res.users));

            }else{
                dispatch(fetchUserFailed())
            }
            
        } catch (e) {
            dispatch(fetchUserFailed())
            console.log("fetch Position start error: ",e);
        }
    }
}

export const fetchUserSuccess = (data) => ({
    type: actionTypes.FETCH_USER_SUCCESS,
    data
})

export const fetchUserFailed = () => ({
    type: actionTypes.FETCH_USER_FAILED
})


export const DeleteUser = (id) => {
    return async (dispatch,getState) => {
        try {
            let res = await deleteUserService(id);
            if(res && res.errCode === 0){
                toast.success("Delete user success!")
                dispatch(deleteUserSuccess())
                dispatch(fetchUserStart())
            }else{
                toast.error("Delete user failed!")
                dispatch(deleteUserFailed())
            }
            
        } catch (e) {
            toast.error("Delete user failed!")
            dispatch(deleteUserFailed())
            console.log("fetch Position start error: ",e);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAIL
})


export const EditUser = (data) => {
    return async (dispatch,getState) => {
        try {
            let res = await editUserService(data);
            if(res && res.errCode === 0){
                toast.success("Update user success!")
                dispatch(EditUserSuccess())
                dispatch(fetchUserStart())
            }else{
                toast.error("Update user failed!")
                dispatch(EditUserFailed())
            }
            
        } catch (e) {
            toast.error("Update user failed!")
            dispatch(deleteUserFailed())
            console.log("fetch edit error: ",e);
        }
    }
}

export const EditUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const EditUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAIL
})


export const fetchDoctorStart = () => {
    return async (dispatch,getState) => {
        try {
            let res = await getDoctor('8');
            if(res && res.errCode === 0){
                dispatch(fetchDoctorSuccess(res.data))
            }else{
                dispatch(fetchDoctorFailed())
            }
            
        } catch (e) {
            dispatch(fetchDoctorFailed())
            console.log("fetch doctor error: ",e);
        }
    }
}

export const fetchDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_DOCTOR_SUCCESS,
    data: data
})

export const fetchDoctorFailed = () => ({
    type: actionTypes.FETCH_DOCTOR_FAILED
})


export const fetchAllDoctorStart = () => {
    return async (dispatch,getState) => {
        try {
            let res = await getAllDoctorService();
            if(res && res.errCode === 0){
                dispatch(fetchAllDoctorSuccess(res.data))
            }else{
                dispatch(fetchAllDoctorFailed())
            }
            
        } catch (e) {
            dispatch(fetchAllDoctorFailed())
            console.log("fetchAllDoctorFailed: ",e);
        }
    }
}

export const fetchAllDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    data: data
})

export const fetchAllDoctorFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
})


export const createInfoDoctorStart = (data) => {
    return async (dispatch,getState) => {
        try {
            let res = await postInfoDoctorService(data);
            if(res && res.errCode === 0){
                toast.success("Update info doctor success!")
                dispatch(createInfoDoctorSuccess())
            }else{
                toast.error("Update info doctor failed!")
                dispatch(createInfoDoctorSuccess())
            }
            
        } catch (e) {
            toast.error("Update info doctor failed!")
            dispatch(fetchAllDoctorFailed())
            console.log("fetchAllDoctorFailed: ",e);
        }
    }
}

export const createInfoDoctorSuccess = () => ({
    type: actionTypes.CREATE_INFO_DOCTOR_SUCCESS,
})

export const createInfoDoctorFailed = () => ({
    type: actionTypes.CREATE_INFO_DOCTOR_FAIL
})

export const fetchScheduleTimeStart = () => {
    return async (dispatch,getState) => {
        try {
            let res = await getAllCodeService('TIME');
            if(res && res.errCode === 0){
                dispatch(fetchScheduleTimeSuccess(res.data))
            }else{
                dispatch(fetchScheduleTimeFail())
            }
            
        } catch (e) {
            dispatch(fetchScheduleTimeFail())
            console.log("fetchScheduleTimeFail: ",e);
        }
    }
}

export const fetchScheduleTimeSuccess = (dataTime) => ({
    type: actionTypes.FETCH_TIME_SUCCESS,
    data: dataTime
})

export const fetchScheduleTimeFail = () => ({
    type: actionTypes.FETCH_TIME_FAIL
})


export const fetchDoctorInfoStart = () => {
    return async (dispatch,getState) => {
        try {
            let resPrice = await getAllCodeService('PRICE');
            let resProvince = await getAllCodeService('PROVINCE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resSpecialty = await getAllSpecialtyService()

            // console.log("check resPrice: ",resPrice)
            // console.log("check resProvince: ",resProvince)
            // console.log("check resPayment: ",resPayment)


            if(resPrice && resPrice.errCode === 0 
                && resProvince && resProvince.errCode === 0 
                && resPayment && resPayment.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0){
                let data = {
                    resPrice: resPrice.data,
                    resProvince: resProvince.data,
                    resPayment: resPayment.data,
                    resSpecialty: resSpecialty.data
                }
                dispatch(fetchDoctorInfoSuccess(data))
            }else{
                dispatch(fetchDoctorInfoFail())
            }
            
        } catch (e) {
            dispatch(fetchDoctorInfoFail())
            console.log("fetch DoctorInfo start error: ",e);
        }
    }
}

export const fetchDoctorInfoSuccess = (dataDoctorInfo) => ({
    type: actionTypes.FETCH_DOCTOR_INFO_SUCCESS,
    data: dataDoctorInfo
})

export const fetchDoctorInfoFail = () => ({
    type: actionTypes.FETCH_DOCTOR_INFO_FAIL
})


