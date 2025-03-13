import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const MyComponent = () => {
  
  return (
    <View style={styles.container}>
      <Image
        // source={{ uri: "https://stickerapp.com/cdn-assets/images/preview/2018/05/30/design-26665/template-sticker-300x300.png" }}
        source={{ uri: "http://localhost:3000/uploads/1741431497385-976527796.jpg" }}
        style={styles.image}
        resizeMode="contain"  // เพิ่มการกำหนดให้ใช้การย่อขนาดรูปให้พอดีกับกรอบ
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,  // กำหนดขนาดที่ต้องการ
    height: 300, // กำหนดขนาดที่ต้องการ
  },
});

export default MyComponent;
