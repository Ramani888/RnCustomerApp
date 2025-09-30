import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import CustomersListScreen from './src/screens/CustomersListScreen';
import CustomerFormScreen from './src/screens/CustomerFormScreen';
import CustomerDetailScreen from './src/screens/CustomerDetailScreen';
import DocumentsScreen from './src/screens/DocumentsScreen';
import InvoicesScreen from './src/screens/InvoicesScreen';
import NewFolderScreen from './src/screens/NewFolderScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CustomerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CustomersList" component={CustomersListScreen} options={{ title: 'Customers' }} />
      <Stack.Screen name="CustomerForm" component={CustomerFormScreen} options={{ title: 'Add Customer' }} />
      <Stack.Screen name="CustomerDetail" component={CustomerDetailScreen} options={{ title: 'Customer Details' }} />
      <Stack.Screen name="Documents" component={DocumentsScreen} />
      <Stack.Screen name="Invoices" component={InvoicesScreen} />
      <Stack.Screen name="NewFolder" component={NewFolderScreen} options={{ title: 'New Folder' }} />
    </Stack.Navigator>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{title}</Text>
    </View>
  );
}

import Icon from 'react-native-vector-icons/Ionicons';

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#7b28ef', // Active tab label color
          tabBarInactiveTintColor: '#777777', // Inactive tab label color
          tabBarStyle: {
            paddingBottom: 8, // Adds some padding at the bottom
            paddingTop: 5, // Adds some padding at the top
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            
            if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Suppliers') {
              iconName = focused ? 'business' : 'business-outline';
            } else if (route.name === 'Customers') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Payments') {
              iconName = focused ? 'cash' : 'cash-outline';
            } else if (route.name === 'Collection') {
              iconName = focused ? 'receipt' : 'receipt-outline';
            } else if (route.name === 'Dashboard') {
              iconName = focused ? 'grid' : 'grid-outline';
            }

            // You can return any component here
            return <Icon name={iconName || 'help'} size={size} color={focused ? '#7b28ef' : '#777777'} />;
          },
        })}
      >
        <Tab.Screen name="Profile" children={() => <Placeholder title="Profile Page" />}  />
        <Tab.Screen name="Suppliers" children={() => <Placeholder title="Suppliers Page" />} />
        <Tab.Screen name="Customers" component={CustomerStack} />
        <Tab.Screen name="Payments" children={() => <Placeholder title="Payments Page" />} />
        <Tab.Screen name="Collection" children={() => <Placeholder title="Collection Page" />} />
        <Tab.Screen name="Dashboard" children={() => <Placeholder title="Dashboard Page" />} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

