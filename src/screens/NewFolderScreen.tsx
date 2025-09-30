import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { Customer, Folder } from '../types/customer';
import { getData, saveData } from '../utils/storage';

export default function NewFolderScreen({ route, navigation }: any) {
  const { customer }: { customer: Customer } = route.params;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = async () => {
    const folder: Folder = { name, description };
    const existing = (await getData<Folder[]>(`docs-${customer.id}`)) || [];
    existing.push(folder);
    await saveData(`docs-${customer.id}`, existing);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder="Folder Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
      />
      <Button title="Save Folder" onPress={handleSave} />
    </View>
  );
}
