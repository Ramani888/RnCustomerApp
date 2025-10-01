import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { Customer } from '../types/customer';
import { getData } from '../utils/storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-paper';

export default function CustomersListScreen({ navigation }: any) {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const load = async () => {
      const stored = await getData<Customer[]>('customers');
      if (stored) setCustomers(stored);
    };
    const unsubscribe = navigation.addListener('focus', load);
    return unsubscribe;
  }, [navigation]);

  const renderCustomer = ({ item }: any) => (
    <Card style={styles.card}>
      <View style={styles.statusBadgeContainer}>
        <Text
        style={[
            styles.statusBadge,
            'Must' === 'Must' ? styles.must : styles.debtFree,
        ]}
        >
        {'חובה'}
        </Text>
      </View>

      <Text style={styles.name}>{item.name}</Text>

      <View style={styles.row}>
        <Icon name="call-outline" size={18} color="#6b7280" />
        <Text style={styles.text}>{item.phone}</Text>
      </View>

      <View style={styles.row}>
        <Icon name="mail-outline" size={18} color="#6b7280" />
        <Text style={styles.text}>{item.email}</Text>
      </View>

      <View style={styles.row}>
        <Icon name="calculator-outline" size={18} color="#6b7280" />
        <Text style={styles.text}>ח.פ.:</Text>
        <Text style={styles.text}>{item.companyNumber}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.amountRow}>
        <View>
          <Text style={styles.label}>חוב</Text>
          <Text style={styles.debt}>₪{item.debt ?? 0}</Text>
        </View>
        <View>
          <Text style={styles.label}>סה״כ שולם</Text>
          <Text style={styles.paid}>₪{item.totalPaid ?? 0}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate('CustomerDetail', { customerId: item.id })}>
        <Text style={styles.viewText}>צפה בלקוח</Text>
        <Icon name="eye-outline" size={18} color="#000" />
      </TouchableOpacity>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* כותרת */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.newCustomerButton} onPress={() => navigation.navigate('CustomerForm')}>
          <Text style={styles.newCustomerText}>לקוח חדש</Text>
          <Icon name="add" size={20} color="#fff" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>לקוחות</Text>
          <Text style={styles.headerSubtitle}>
            נהל את כל הלקוחות שלך במקום אחד
          </Text>
        </View>
      </View>

      {/* אין נתונים */}
      {customers.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Icon name="information-circle-outline" size={60} color="#8b5cf6" />
          <Text style={styles.noDataText}>לא נמצאו לקוחות</Text>
          <Text style={styles.noDataSubtext}>הוסף לקוח חדש כדי להתחיל</Text>
        </View>
      ) : (
        /* רשימה */
        <FlatList
          data={customers}
          keyExtractor={(item) => String(item.id ?? '')}
          renderItem={renderCustomer}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#faf5ff' },

  headerRow: { flexDirection: 'row', marginBottom: 20, alignItems: 'center' },
  newCustomerButton: {
    backgroundColor: '#8b5cf6',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  newCustomerText: { color: '#fff', fontWeight: '600', marginRight: 6 },
  headerTitle: { fontSize: 28, fontWeight: '900', color: '#111827' },
  headerSubtitle: { color: '#6b7280', marginTop: 2, flexShrink: 1 },

  card: {
    marginBottom: 20,
    borderRadius: 14,
    padding: 16,
    elevation: 2,
    backgroundColor: '#fff',
  },

  statusBadgeContainer: { alignItems: 'flex-start', marginBottom: 10 },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontWeight: '600',
    overflow: 'hidden',
  },
  debtFree: { backgroundColor: '#f1f5f9', color: '#475569' },
  must: { backgroundColor: '#ef4444', color: '#fff' },

  name: { fontSize: 20, fontWeight: '700', color: '#000', marginBottom: 6 },
  text: { color: '#6b7280', fontSize: 15 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 2,
  },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 10 },

  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { color: '#6b7280', fontWeight: '500' },
  debt: { color: 'red', fontWeight: '700', marginTop: 2 },
  paid: { color: 'green', fontWeight: '700', marginTop: 2 },

  viewButton: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewText: { fontWeight: '700', color: '#000', marginRight: 6 },
  
  // סגנונות כשאין נתונים
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  noDataText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#374151',
    marginTop: 12,
  },
  noDataSubtext: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
});
