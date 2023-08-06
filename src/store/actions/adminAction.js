import actionTypes from './actionTypes';
import {getAllCodeService,createNewUserService,getAllUsers,deleteUserService,editUserService} from '../../services/userService'
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

