import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    doctors: [],
    allDoctor: [],
    scheduleTime: [],

    listDoctorInfo: []
}

const adminReducer = (state = initialState, action) => {
    let copyState;
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            copyState = {...state}
            copyState.isLoadingGender = true;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            copyState = {...state}
            copyState.genders = action.data
            copyState.isLoadingGender = false
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_FAIL:
            copyState = {...state}
            copyState.genders = []
            copyState.isLoadingGender = false
            return {
                ...copyState
            }
            case actionTypes.FETCH_ROLE_SUCCESS:
                copyState = {...state}
                copyState.roles = action.data
                return {
                    ...copyState
                }
            case actionTypes.FETCH_ROLE_FAIL:
                copyState = {...state}
                copyState.roles = []
                return {
                    ...copyState
                }
            case actionTypes.FETCH_POSITION_SUCCESS:
                    copyState = {...state}
                    copyState.positions = action.data
                    return {
                        ...copyState
            }
            case actionTypes.FETCH_POSITION_FAIL:
                    copyState = {...state}
                    copyState.positions = []
                    return {
                        ...copyState
            }
            case actionTypes.FETCH_USER_SUCCESS:
                    copyState = {...state}
                    copyState.users = action.data
                    return {
                        ...copyState
            }
            case actionTypes.FETCH_USER_FAILED:
                    copyState = {...state}
                    copyState.users = []
                    return {
                        ...copyState
            }
            case actionTypes.FETCH_DOCTOR_SUCCESS:
                    copyState = {...state}
                    copyState.doctors = action.data
                    return {
                        ...copyState
            }
            case actionTypes.FETCH_DOCTOR_FAILED:
                    copyState = {...state}
                    copyState.doctors = []
                    return {
                        ...copyState
            }
            case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
                    copyState = {...state}
                    copyState.allDoctor = action.data
                    return {
                        ...copyState
            }
            case actionTypes.FETCH_ALL_DOCTOR_FAILED:
                    copyState = {...state}
                    copyState.allDoctor = []
                    return {
                        ...copyState
            }
            case actionTypes.FETCH_TIME_SUCCESS:
                copyState = {...state}
                copyState.scheduleTime = action.data

                return {
                    ...copyState
            }
            case actionTypes.FETCH_TIME_FAIL:
                    copyState = {...state}
                    copyState.scheduleTime = []
                    return {
                        ...copyState
            }
            case actionTypes.FETCH_DOCTOR_INFO_SUCCESS:
                copyState = {...state}
                copyState.listDoctorInfo = action.data
                console.log("Check list doctor info action: ",action.data)

                return {
                    ...copyState
            }
            case actionTypes.FETCH_DOCTOR_INFO_FAIL:
                    copyState = {...state}
                    copyState.listDoctorInfo = []
                    return {
                        ...copyState
            }
        default:
            return state;
    }
}

export default adminReducer;