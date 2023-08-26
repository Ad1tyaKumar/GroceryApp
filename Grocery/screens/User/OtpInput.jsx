import React, { useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OtpInput = ({
    setPin1,
    setPin2,
    setPin3,
    setPin4,
    setPin5,
    setPin6,
}) => {
    const pinRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    const setPinAndFocusNext = (index, pin) => {
        if (pin !== '') {
            if (index < pinRefs.length - 1) {
                pinRefs[index + 1].current.focus();
            }
        } else {
            if (index > 0) {
                pinRefs[index - 1].current.focus();
            }
        }
        switch (index) {
            case 0:
                setPin1(pin);
                break;
            case 1:
                setPin2(pin);
                break;
            case 2:
                setPin3(pin);
                break;
            case 3:
                setPin4(pin);
                break;
            case 4:
                setPin5(pin);
                break;
            case 5:
                setPin6(pin);
                break;
            default:
                break;
        }
    };

    const handleKeyPress = (index, event) => {
        if (event.nativeEvent.key === 'Backspace') {
            setPinAndFocusNext(index, '');
        }
    };

    return (
        <View
            style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'center',
            }}>
            {pinRefs.map((ref, index) => (
                <TextInput
                    selectTextOnFocus={true}
                    key={index}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={ref}
                    style={styles.otpInput}
                    onChangeText={(pin) => setPinAndFocusNext(index, pin)}
                    onKeyPress={(event) => handleKeyPress(index, event)}
                />
            ))}
        </View>
    );
};

export default OtpInput;

const styles = StyleSheet.create({
    otpInput: {
        borderWidth: 1,
        width: 30,
        height: 30,
        borderRadius: 5,
        margin: 3,
        textAlign: 'center',
        fontSize: 15,
    },
});
