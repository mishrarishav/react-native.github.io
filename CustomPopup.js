import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Root, Popup } from 'popup-ui'

function CustomPopup() {
  return (
<Root>
    <View>
        <TouchableOpacity
            onPress={() =>
              Popup.show({
                type: 'Success',
                title: 'Upload complete',
                button: false,
                textBody: 'Congrats! Your upload successfully done',
                buttontext: 'Ok',
                callback: () => Popup.hide()
              })
            }
        >
            <Text>Open Popup</Text>
        </TouchableOpacity>
    </View>
</Root>
  );
}

export default CustomPopup;