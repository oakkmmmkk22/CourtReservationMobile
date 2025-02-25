// axiosInstance.ts
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

// สร้าง Axios instance
//api.get("/point") ได้เลย ถ้าจะเปลี่ยนที่test ก็เปลี่ยนตรงนี้
//http://10.0.2.2:3000 for emulator 
//http://localhost:3000 for pc
//geng phone 0970756504
const api = axios.create({
  baseURL: 'http://10.0.2.2:3000', // ตั้ง base URL สำหรับทุก API
                                        
});




// เพิ่ม Interceptor สำหรับการเช็ค token
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token'); // หรือดึง token จากที่อื่น
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // เพิ่ม token ใน request headers
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
