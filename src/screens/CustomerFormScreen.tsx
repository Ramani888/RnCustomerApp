import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import { v4 as uuidv4 } from 'uuid';
import { Customer } from '../types/customer';
import { getData, saveData } from '../utils/storage';

export default function CustomerFormScreen({ navigation }: any) {
  const [form, setForm] = useState({
    name: '',
    companyNumber: '',
    address: '',
    email: '',
    officePhone: '',
    additionalPhone: '',
    notes: '',
  });

  const handleChange = (key: keyof typeof form, value: string) => setForm({ ...form, [key]: value });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Submitting form:', form);
    
    try {
      const stored = await getData<Customer[]>('customers');
      // Handle form submission
      const customer: Customer = {
        id: stored ? (stored.length + 1) : 1, // Simple ID generation
        companyName: form.name,
        phone: form.officePhone,
        ...form,
      };
      
      const existing = (await getData<Customer[]>('customers')) || [];
      existing.push(customer);
      await saveData('customers', existing);
      
      Alert.alert('Success', 'Customer added successfully');
      clearForm();
      navigation.goBack();
    } catch (error) {
      console.error('Error saving customer data:', error);
      Alert.alert('Error', 'Failed to save customer data');
    }
  };

  const clearForm = () => {
    setForm({
      name: "",
      companyNumber: "",
      address: "",
      email: "",
      officePhone: "",
      additionalPhone: "",
      notes: "",
    });
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Company Name */}
      <View style={styles.labelRow}>
        <Icon name="business-outline" size={18} color="#6b7280" />
        <Text style={styles.label}>Company name</Text>
      </View>
      <TextInput
        placeholder="Enter company name"
        placeholderTextColor="#6b7280"
        value={form.name}
        onChangeText={(t) => handleChange('name', t)}
        style={[styles.input, styles.focusedInput]}
      />

      {/* Company Number */}
      <View style={styles.labelRow}>
        <Icon name="card-outline" size={18} color="#6b7280" />
        <Text style={styles.label}>A.M./C.P.</Text>
      </View>
      <TextInput
        placeholder="123456789"
        placeholderTextColor="#6b7280"
        value={form.companyNumber}
        onChangeText={(t) => handleChange('companyNumber', t)}
        style={styles.input}
        keyboardType="numeric"
      />

      {/* Address */}
      <View style={styles.labelRow}>
        <Icon name="location-outline" size={18} color="#6b7280" />
        <Text style={styles.label}>address</Text>
      </View>
      <TextInput
        placeholder="Street, city"
        placeholderTextColor="#6b7280"
        value={form.address}
        onChangeText={(t) => handleChange('address', t)}
        style={styles.input}
      />

      {/* Email */}
      <View style={styles.labelRow}>
        <Icon name="mail-outline" size={18} color="#6b7280" />
        <Text style={styles.label}>דוא״ל</Text>
      </View>
      <TextInput
        placeholder="example@email.com"
        placeholderTextColor="#6b7280"
        value={form.email}
        onChangeText={(t) => handleChange('email', t)}
        style={styles.input}
        keyboardType="email-address"
      />

      {/* Office Phone */}
      <View style={styles.labelRow}>
        <Icon name="call-outline" size={18} color="#6b7280" />
        <Text style={styles.label}>Office phone</Text>
      </View>
      <TextInput
        placeholder="03-1234567"
        placeholderTextColor="#6b7280"
        value={form.officePhone}
        onChangeText={(t) => handleChange('officePhone', t)}
        style={styles.input}
        keyboardType="phone-pad"
      />

      {/* Additional Phone */}
      <View style={styles.labelRow}>
        <Icon name="call-outline" size={18} color="#6b7280" />
        <Text style={styles.label}>Additional phone</Text>
      </View>
      <TextInput
        placeholder="050-1234567"
        placeholderTextColor="#6b7280"
        value={form.additionalPhone}
        onChangeText={(t) => handleChange('additionalPhone', t)}
        style={styles.input}
        keyboardType="phone-pad"
      />

      {/* Notes */}
      <View style={styles.labelRow}>
        <Text style={styles.label}>Notes</Text>
      </View>
      <TextInput
        placeholder="Additional information"
        placeholderTextColor="#6b7280"
        value={form.notes}
        onChangeText={(t) => handleChange('notes', t)}
        style={[styles.input, styles.textArea]}
        multiline
      />

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>Cancellation</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addButton}
          onPress={(event) => handleSubmit(event)}
        >
          <Text style={styles.addText}>Add a customer</Text>
          <Icon name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },

  labelRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  label: {
    fontWeight: '700',
    color: '#111827',
  },
  sectionLabel: {
    marginTop: 18,
    marginBottom: 6,
    fontWeight: '700',
    color: '#111827',
  },

  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
    marginTop: 6,
  },
  focusedInput: {
    borderColor: '#8b5cf6',
    borderWidth: 2,
  },

  textArea: { height: 100, textAlignVertical: 'top' },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelText: { fontWeight: '700', color: '#000' },

  addButton: {
    flex: 1,
    backgroundColor: '#8b5cf6',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    marginLeft: 8,
  },
  addText: {
    color: '#fff',
    fontWeight: '700',
    marginRight: 6,
  },
  inputIcon: { position: 'absolute', right: 16, top: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    marginTop: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
});

