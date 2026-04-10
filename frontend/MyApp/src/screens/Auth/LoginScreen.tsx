import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomButton } from '../../components/CustomButton';
import { CustomInput } from '../../components/CustomInput';

export const LoginScreen = ({ navigation }: any) => {
  const [role, setRole] = useState<'owner' | 'employee'>('employee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform authentication logic here
    if (role === 'owner') {
      navigation.replace('OwnerDashboard');
    } else {
      navigation.replace('EmployeeDashboard');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to StoreManager</Text>
      
      <View style={styles.roleToggle}>
        <CustomButton 
          title="I am an Employee" 
          variant={role === 'employee' ? 'primary' : 'secondary'}
          onPress={() => setRole('employee')} 
        />
        <CustomButton 
          title="I am the Owner" 
          variant={role === 'owner' ? 'primary' : 'secondary'}
          onPress={() => setRole('owner')} 
        />
      </View>

      <CustomInput placeholder="Email ID" value={email} onChangeText={setEmail} />
      <CustomInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      
      <CustomButton title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  roleToggle: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
});