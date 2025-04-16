import * as React from 'react';
import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { EyeIcon } from '../Icons';
import { EyeOffIcon } from '../Icons';
import { Pressable, StyleSheet } from 'react-native';

export const TextLabel = ({ label, style, value, onChangeText, secureText, hasEye }) => {  

  const [isSecure, setIsSecure] = useState(secureText);

  return (
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        style={style}  
        textColor='#fff'
        secureTextEntry = { isSecure }
        right={
          hasEye && (
            <TextInput.Icon
              icon={() => (
                <Pressable
                  onPress={() => setIsSecure(!isSecure)}
                  style={styles.touchableArea}
                >
                  {isSecure ? <EyeIcon /> : <EyeOffIcon />}
                </Pressable>
              )}
            />
          )
        }
      />
  );
};

const styles = StyleSheet.create({
  touchableArea: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40, 
    height: 40, 
  },
});
