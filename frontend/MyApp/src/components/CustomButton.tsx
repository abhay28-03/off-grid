import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacityProps 
} from 'react-native';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  isLoading?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  style,
  ...props
}) => {
  const isOutline = variant === 'outline';
  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isDisabled}
      style={[
        styles.buttonBase,
        styles[variant],
        isDisabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={isOutline ? '#007bff' : '#ffffff'} />
      ) : (
        <Text
          style={[
            styles.textBase,
            isOutline ? styles.textOutline : styles.textLight,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    minHeight: 50,
    flexDirection: 'row',
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadows for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  primary: {
    backgroundColor: '#007bff',
    borderWidth: 1,
    borderColor: '#007bff',
  },
  secondary: {
    backgroundColor: '#6c757d',
    borderWidth: 1,
    borderColor: '#6c757d',
  },
  danger: {
    backgroundColor: '#dc3545',
    borderWidth: 1,
    borderColor: '#dc3545',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007bff',
    elevation: 0,
    shadowOpacity: 0,
  },
  disabled: {
    opacity: 0.6,
    elevation: 0,
    shadowOpacity: 0,
  },
  textBase: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  textLight: {
    color: '#ffffff',
  },
  textOutline: {
    color: '#007bff',
  },
});