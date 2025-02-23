import AsyncStorage from '@react-native-async-storage/async-storage';

// ฟังก์ชันบันทึก user_id
export const savetoken = async (userId: string) => {
    try {
        await AsyncStorage.setItem('user_id', userId);
    } catch (error) {
        console.error('Error saving user_id:', error);
    }
};

// ฟังก์ชันดึง user_id
export const gettoken = async () => {
    try {
        const userId = await AsyncStorage.getItem('user_id');
        return userId; // ถ้าไม่มีค่า จะได้ null
    } catch (error) {
        console.error('Error retrieving user_id:', error);
        return null;
    }
};

// ฟังก์ชันลบ user_id (ถ้าต้องการ logout)
export const removetoken = async () => {
    try {
        await AsyncStorage.removeItem('user_id');
    } catch (error) {
        console.error('Error removing user_id:', error);
    }
};
