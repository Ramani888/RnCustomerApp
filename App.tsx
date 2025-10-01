import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { I18nManager, Text, View, StyleSheet } from 'react-native';
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
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: I18nManager.isRTL ? 'left' : 'left', // Only "center" or "left" are allowed
        headerStyle: {
          // Removed unsupported "direction" property
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          // Removed unsupported "textAlign" property
        }
      }}
    >
      <Stack.Screen 
        name="CustomersList" 
        component={CustomersListScreen} 
        options={{ title: 'לקוחות' }} 
      />
      <Stack.Screen 
        name="CustomerForm" 
        component={CustomerFormScreen} 
        options={{ title: 'הוספת לקוח' }} 
      />
      <Stack.Screen 
        name="CustomerDetail" 
        component={CustomerDetailScreen} 
        options={{ title: 'פרטי לקוח' }} 
      />
      <Stack.Screen 
        name="Documents" 
        component={DocumentsScreen} 
        options={{ title: 'מסמכים' }} 
      />
      <Stack.Screen 
        name="Invoices" 
        component={InvoicesScreen} 
        options={{ title: 'חשבוניות' }} 
      />
      <Stack.Screen 
        name="NewFolder" 
        component={NewFolderScreen} 
        options={{ title: 'תיקייה חדשה' }} 
      />
    </Stack.Navigator>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>{title}</Text>
    </View>
  );
}

import Icon from 'react-native-vector-icons/Ionicons';

export default function App() {
  // Ensure the app respects RTL direction
  React.useEffect(() => {
    // This will ensure RTL is applied when the component mounts
    if (!I18nManager.isRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    }
  }, []);
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
            
            if (route.name === 'פרופיל') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'ספקים') {
              iconName = focused ? 'business' : 'business-outline';
            } else if (route.name === 'לקוחות') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'תשלומים') {
              iconName = focused ? 'cash' : 'cash-outline';
            } else if (route.name === 'גבייה') {
              iconName = focused ? 'receipt' : 'receipt-outline';
            } else if (route.name === 'לוח בקרה') {
              iconName = focused ? 'grid' : 'grid-outline';
            }

            // You can return any component here
            return <Icon name={iconName || 'help'} size={size} color={focused ? '#7b28ef' : '#777777'} />;
          },
        })}
      >
        <Tab.Screen 
          name="פרופיל" 
          children={() => <Placeholder title="עמוד פרופיל" />}  
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: styles.headerTitle,
            title: 'פרופיל'
          }}
        />
        <Tab.Screen 
          name="ספקים" 
          children={() => <Placeholder title="עמוד ספקים" />} 
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: styles.headerTitle,
            title: 'ספקים'
          }}
        />
        <Tab.Screen 
          name="לקוחות" 
          component={CustomerStack} 
        />
        <Tab.Screen 
          name="תשלומים" 
          children={() => <Placeholder title="עמוד תשלומים" />} 
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: styles.headerTitle,
            title: 'תשלומים'
          }}
        />
        <Tab.Screen 
          name="גבייה" 
          children={() => <Placeholder title="עמוד גבייה" />} 
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: styles.headerTitle,
            title: 'גבייה'
          }}
        />
        <Tab.Screen 
          name="לוח בקרה" 
          children={() => <Placeholder title="עמוד לוח בקרה" />} 
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitleStyle: styles.headerTitle,
            title: 'לוח בקרה'
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    direction: I18nManager.isRTL ? 'rtl' : 'ltr',
  },
  placeholderText: {
    fontSize: 18,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
  }
});

