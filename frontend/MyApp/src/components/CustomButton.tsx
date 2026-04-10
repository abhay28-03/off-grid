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

  const getTextColor = () => {
    if (isDisabled && !isOutline) return '#94A3B8';
    if (isOutline) return '#0F766E';
    if (variant === 'secondary') return '#0F172A';
    return '#18181b';
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
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
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.textBase, { color: getTextColor() }]}>
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
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    minHeight: 56,
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: '#0F766E',
    shadowColor: '#0F766E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  secondary: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  danger: {
    backgroundColor: '#BE123C',
    shadowColor: '#BE123C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#0F766E',
  },
  disabled: {
    backgroundColor: '#E2E8F0',
    borderColor: '#E2E8F0',
    shadowOpacity: 0,
    elevation: 0,
  },
  textBase: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0,
  },
});
