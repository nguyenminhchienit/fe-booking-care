import axios from "../axios";

let handleLogin = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

let getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

let createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

let deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

let editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

let getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

let getDoctor = (limit) => {
  return axios.get(`/api/get-doctor?type=${limit}`);
};

let getAllDoctorService = () => {
  return axios.get("/api/get-all-doctor");
};

let getAllBookingService = () => {
  return axios.get("/api/get-all-bookings");
};

let postInfoDoctorService = (data) => {
  return axios.post("/api/post-info-doctor", data);
};

let getDoctorInfoDetailService = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

let bulkCreateScheduleService = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

let getScheduleDoctorService = (date, doctorId) => {
  return axios.get(
    `/api/get-schedule-doctor?doctorId=${doctorId}&date=${date}`
  );
};

let getExtraDoctorInfoService = (doctorId) => {
  return axios.get(`/api/get-extra-doctor-info-by-id?doctorId=${doctorId}`);
};

let getProfileDoctorByIdService = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

let getBookingWithDayService = (dayBooking) => {
  return axios.get(`/api/get-booking-with-day?dayBooking=${dayBooking}`);
};

let postPatientAppointmentService = (data) => {
  return axios.post("/api/post-book-appointment", data);
};

let postVerifyAppointmentService = (data) => {
  return axios.post("/api/verify-book-appointment", data);
};

let postCreateNewSpecialtyService = (data) => {
  return axios.post("/api/create-new-specialty", data);
};

let getAllSpecialtyService = () => {
  return axios.get("/api/get-all-specialty");
};

let getSpecialtyDoctorById = (data) => {
  return axios.get(
    `/api/get-specialty-doctor-by-id?id=${data.id}&location=${data.location}`
  );
};

let postCreateNewClinicService = (data) => {
  return axios.post("/api/create-new-clinic", data);
};

let getAllClinicService = () => {
  return axios.get("/api/get-all-clinic");
};

let updateClinicService = (data) => {
  return axios.put("/api/update-clinic", data);
};

let getClinicDoctorById = (data) => {
  return axios.get(`/api/get-clinic-doctor-by-id?id=${data.id}`);
};

let deleteClinicService = (clinicId) => {
  return axios.delete("/api/delete-clinic", {
    data: {
      id: clinicId,
    },
  });
};

let updateHandbookService = (data) => {
  return axios.put("/api/update-handbook", data);
};

let deleteHandbookService = (handbookId) => {
  return axios.delete("/api/delete-handbook", {
    data: {
      id: handbookId,
    },
  });
};
let getListPatientForDoctorService = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};

let getListPatientForDoctorDoneService = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor-done?doctorId=${data.doctorId}&date=${data.date}`
  );
};

let postSendRemedyService = (data) => {
  return axios.post("/api/post-send-remedy", data);
};

let postSendCancelBookingService = (data) => {
  return axios.put("/api/get-booking-cancel", data);
};

let postSendRemedyDoneService = (data) => {
  return axios.post("/api/post-send-remedy-done", data);
};

let handleSearch = (name) => {
  return axios.get(`api/search-specialty?name=${name}`);
};

let postCreateNewHandbookService = (data) => {
  return axios.post("/api/create-new-handbook", data);
};

let getHandbookByIdService = (data) => {
  return axios.get(`/api/get-handbook-by-id?id=${data.id}`);
};

let getAllHandbookService = () => {
  return axios.get("/api/get-all-handbook");
};

let getAllDateBookingWithMonth = () => {
  return axios.get("/api/get-booking-with-month");
};

let getBookingUser = (data) => {
  return axios.get(
    `/api/get-booking-user?patientId=${data.patientId}&date=${data.date}`
  );
};

export {
  updateHandbookService,
  deleteHandbookService,
  postSendCancelBookingService,
  getBookingUser,
  deleteClinicService,
  updateClinicService,
  handleLogin,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getDoctor,
  getAllDoctorService,
  postInfoDoctorService,
  getDoctorInfoDetailService,
  bulkCreateScheduleService,
  getScheduleDoctorService,
  getExtraDoctorInfoService,
  getBookingWithDayService,
  getProfileDoctorByIdService,
  postPatientAppointmentService,
  postVerifyAppointmentService,
  postCreateNewSpecialtyService,
  getAllSpecialtyService,
  getSpecialtyDoctorById,
  postCreateNewClinicService,
  getAllClinicService,
  getClinicDoctorById,
  getListPatientForDoctorService,
  postSendRemedyService,
  handleSearch,
  postCreateNewHandbookService,
  getHandbookByIdService,
  getAllHandbookService,
  getAllBookingService,
  getAllDateBookingWithMonth,
  getListPatientForDoctorDoneService,
  postSendRemedyDoneService,
};
