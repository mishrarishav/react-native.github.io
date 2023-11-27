import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

function CustomModal({ visible, message, onClose }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'peachpuff', padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, textAlign: 'center' }}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={{ marginTop: 10 }}>
            <Text style={{ color: 'white', backgroundColor: 'red', padding: 10, borderRadius: 5, textAlign: 'center' }}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default CustomModal;