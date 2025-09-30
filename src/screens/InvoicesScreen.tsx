import React from 'react';
import { View, Text } from 'react-native';
import { Customer } from '../types/customer';

export default function InvoicesScreen({ route }: any) {
  const { customer }: { customer: Customer } = route.params;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        Invoices for {customer.companyName}
      </Text>
      <Text>No invoices yet.</Text>
    </View>
  );
}
