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
import { Formik } from 'formik';
import * as Yup from 'yup';
// import { v4 as uuidv4 } from 'uuid';
import { Customer } from '../types/customer';
import { getData, saveData } from '../utils/storage';

// Define validation schema
const CustomerValidationSchema = Yup.object().shape({
  name: Yup.string().required('Company name is required'),
  companyNumber: Yup.string().matches(/^\d+$/, 'Must be only digits').required('Company number is required'),
  address: Yup.string().required('Address is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  officePhone: Yup.string()
    .matches(/^[0-9-]+$/, 'Invalid phone format')
    .min(7, 'Phone number too short').required('Office phone is required'),
  additionalPhone: Yup.string()
    .matches(/^[0-9-]*$/, 'Invalid phone format')
    .required('Additional phone is required'),
  notes: Yup.string(),
});

export default function CustomerFormScreen({ navigation }: any) {
  const initialValues = {
    name: '',
    companyNumber: '',
    address: '',
    email: '',
    officePhone: '',
    additionalPhone: '',
    notes: '',
  };

  const handleSubmit = async (values: typeof initialValues, { resetForm }: any) => {
    console.log('Submitting form:', values);
    
    try {
      const stored = await getData<Customer[]>('customers');
      // Handle form submission
      const customer: Customer = {
        id: stored ? (stored.length + 1) : 1, // Simple ID generation
        companyName: values.name,
        phone: values.officePhone,
        ...values,
      };
      
      const existing = (await getData<Customer[]>('customers')) || [];
      existing.push(customer);
      await saveData('customers', existing);
      
      Alert.alert('Success', 'Customer added successfully');
      resetForm();
      navigation.goBack();
    } catch (error) {
      console.error('Error saving customer data:', error);
      Alert.alert('Error', 'Failed to save customer data');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CustomerValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleSubmit, values, errors, touched, handleBlur }) => (
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
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            style={[styles.input, errors.companyNumber && touched.companyNumber ? styles.inputError : null]}
          />
          {errors.name && touched.name && (
            <Text style={styles.errorText}>{errors.name}</Text>
          )}

          {/* Company Number */}
          <View style={styles.labelRow}>
            <Icon name="card-outline" size={18} color="#6b7280" />
            <Text style={styles.label}>A.M./C.P.</Text>
          </View>
          <TextInput
            placeholder="123456789"
            placeholderTextColor="#6b7280"
            value={values.companyNumber}
            onChangeText={handleChange('companyNumber')}
            onBlur={handleBlur('companyNumber')}
            style={[styles.input, errors.companyNumber && touched.companyNumber ? styles.inputError : null]}
            keyboardType="numeric"
          />
          {errors.companyNumber && touched.companyNumber && (
            <Text style={styles.errorText}>{errors.companyNumber}</Text>
          )}

          {/* Address */}
          <View style={styles.labelRow}>
            <Icon name="location-outline" size={18} color="#6b7280" />
            <Text style={styles.label}>address</Text>
          </View>
          <TextInput
            placeholder="Street, city"
            placeholderTextColor="#6b7280"
            value={values.address}
            onChangeText={handleChange('address')}
            onBlur={handleBlur('address')}
            style={[styles.input, errors.address && touched.address ? styles.inputError : null]}
          />
          {errors.address && touched.address && (
            <Text style={styles.errorText}>{errors.address}</Text>
          )}

          {/* Email */}
          <View style={styles.labelRow}>
            <Icon name="mail-outline" size={18} color="#6b7280" />
            <Text style={styles.label}>דוא״ל</Text>
          </View>
          <TextInput
            placeholder="example@email.com"
            placeholderTextColor="#6b7280"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            style={[styles.input, errors.email && touched.email ? styles.inputError : null]}
            keyboardType="email-address"
          />
          {errors.email && touched.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          {/* Office Phone */}
          <View style={styles.labelRow}>
            <Icon name="call-outline" size={18} color="#6b7280" />
            <Text style={styles.label}>Office phone</Text>
          </View>
          <TextInput
            placeholder="03-1234567"
            placeholderTextColor="#6b7280"
            value={values.officePhone}
            onChangeText={handleChange('officePhone')}
            onBlur={handleBlur('officePhone')}
            style={[styles.input, errors.officePhone && touched.officePhone ? styles.inputError : null]}
            keyboardType="phone-pad"
          />
          {errors.officePhone && touched.officePhone && (
            <Text style={styles.errorText}>{errors.officePhone}</Text>
          )}

          {/* Additional Phone */}
          <View style={styles.labelRow}>
            <Icon name="call-outline" size={18} color="#6b7280" />
            <Text style={styles.label}>Additional phone</Text>
          </View>
          <TextInput
            placeholder="050-1234567"
            placeholderTextColor="#6b7280"
            value={values.additionalPhone}
            onChangeText={handleChange('additionalPhone')}
            onBlur={handleBlur('additionalPhone')}
            style={[styles.input, errors.additionalPhone && touched.additionalPhone ? styles.inputError : null]}
            keyboardType="phone-pad"
          />
          {errors.additionalPhone && touched.additionalPhone && (
            <Text style={styles.errorText}>{errors.additionalPhone}</Text>
          )}

          {/* Notes */}
          <View style={styles.labelRow}>
            <Text style={styles.label}>Notes</Text>
          </View>
          <TextInput
            placeholder="Additional information"
            placeholderTextColor="#6b7280"
            value={values.notes}
            onChangeText={handleChange('notes')}
            onBlur={handleBlur('notes')}
            style={[styles.input, errors.notes && touched.notes ? styles.inputError : null, styles.textArea]}
            multiline
          />
          {errors.notes && touched.notes && (
            <Text style={styles.errorText}>{errors.notes}</Text>
          )}

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
              onPress={handleSubmit}
            >
              <Text style={styles.addText}>Add a customer</Text>
              <Icon name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </Formik>
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
  inputError: {
    borderColor: '#ef4444',
    borderWidth: 1,
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
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

