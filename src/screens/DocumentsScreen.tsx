import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { Customer, Folder } from '../types/customer';
import { getData } from '../utils/storage';

export default function DocumentsScreen({ route, navigation }: any) {
  const { customer }: { customer: Customer } = route.params;
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const load = async () => {
      const stored = await getData<Folder[]>(`docs-${customer.id}`);
      if (stored) setFolders(stored);
    };
    const unsubscribe = navigation.addListener('focus', load);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="New Folder" onPress={() => navigation.navigate('NewFolder', { customer })} />
      <FlatList
        data={folders}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ padding: 16, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
            {item.description && <Text>{item.description}</Text>}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
