import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const invoices = [
  {
    id: "1",
    toBePaid: "₪0",
    amount: "₪20,000",
    invoiceNumber: "INV-018593",
    client: "פאקר שפי",
  },
  {
    id: "2",
    toBePaid: "₪12,556",
    amount: "₪25,000",
    invoiceNumber: "INV-003630",
    client: "פאקר שפי",
  },
  {
    id: "3",
    toBePaid: "₪10,000",
    amount: "₪10,000",
    invoiceNumber: "INV-982098",
    client: "פאקר שפי",
  },
];

const CustomerDetailScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"documents" | "invoices">(
    "invoices"
  );

  const renderInvoice = ({ item }: { item: typeof invoices[0] }) => (
    <View style={styles.invoiceRow}>
      <Ionicons name="document-text-outline" size={20} color="#555" />

      <Text style={[styles.invoiceCell, { flex: 1 }]}>{item.toBePaid}</Text>
      <Text style={[styles.invoiceCell, { flex: 1 }]}>{item.amount}</Text>
      <Text style={[styles.invoiceCell, { flex: 1.2 }]}>{item.invoiceNumber}</Text>
      <Text style={[styles.invoiceCell, { flex: 1.2 }]}>{item.client}</Text>

      <Ionicons name="chevron-forward" size={20} color="#888" />
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* כותרת */}
        <View style={styles.header}>
          <Text style={styles.hello}>שלום</Text>
          <Text style={styles.customerId}>מספר לקוח: 69a628e7</Text>

          <TouchableOpacity style={styles.invoiceButton}>
            <Text style={styles.invoiceText}>חשבונית חדשה</Text>
          </TouchableOpacity>
        </View>

        {/* לשוניות */}
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveTab("documents")}>
            <Text
              style={[
                styles.tab,
                activeTab === "documents" ? styles.tabActive : styles.tabInactive,
              ]}
            >
              מסמכים
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab("invoices")}>
            <Text
              style={[
                styles.tab,
                activeTab === "invoices" ? styles.tabActive : styles.tabInactive,
              ]}
            >
              חשבוניות
            </Text>
          </TouchableOpacity>
        </View>

        {/* מסמכים (ריק בינתיים) */}
        {activeTab === "documents" && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>מדור מסמכים</Text>
            <Text style={{ color: "#666" }}>אין מסמכים זמינים.</Text>
          </View>
        )}

        {/* חשבוניות */}
        {activeTab === "invoices" && (
          <>
            {/* סקירה פיננסית */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>סקירה פיננסית</Text>

              <View style={styles.row}>
                <Text style={styles.total}>₪0</Text>
                <Text style={styles.label}>סה״כ:</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.total, { color: "green" }]}>₪0</Text>
                <Text style={styles.label}>שולם:</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.total, { color: "red" }]}>₪0</Text>
                <Text style={styles.label}>יתרה:</Text>
              </View>
            </View>

            {/* פרטי קשר */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>פרטי קשר</Text>
              <Text style={styles.contactName}>שלום</Text>

              <View style={styles.contactRow}>
                <Ionicons name="call-outline" size={18} color="black" />
                <Text style={styles.contactText}>0226020550</Text>
              </View>

              <View style={styles.contactRow}>
                <MaterialIcons name="email" size={18} color="black" />
                <Text style={styles.contactText}>ronb54310@gmail.com</Text>
              </View>

              <View style={styles.contactRow}>
                <Ionicons name="location-outline" size={18} color="black" />
                <Text style={styles.contactText}>ירושלים</Text>
              </View>

              <Text style={styles.link}>לחץ לצפייה בפרטים מלאים</Text>
            </View>

            {/* חלק החשבוניות */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>חשבוניות</Text>

              {/* חיפוש */}
              <View style={styles.searchBox}>
                <TextInput
                  placeholder="חפש לפי שם לקוח או מספר חשבונית"
                  style={styles.input}
                />
                <Ionicons name="search-outline" size={20} color="#999" />
              </View>

              {/* כפתורי סינון */}
              <View style={styles.filterRow}>
                <TouchableOpacity style={styles.filterBtn}>
                  <Text style={styles.filterText}>ממתין לתשלום</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterBtn}>
                  <Text style={styles.filterText}>תשלום חלקי</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterBtn}>
                  <Text style={styles.filterText}>חדש לתשלום</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterBtnActive}>
                  <Text style={[styles.filterText, { color: "#000" }]}>
                    תשלום מלא
                  </Text>
                </TouchableOpacity>
              </View>

              {/* כותרת טבלה */}
              <View style={styles.tableHeader}>
                <Text style={[styles.headerCell, { flex: 0.8 }]}>עדכון</Text>
                <Text style={[styles.headerCell, { flex: 1 }]}>לתשלום</Text>
                <Text style={[styles.headerCell, { flex: 1 }]}>סכום</Text>
                <Text style={[styles.headerCell, { flex: 1.2 }]}>
                  מספר חשבונית
                </Text>
                <Text style={[styles.headerCell, { flex: 1.2 }]}>לקוח</Text>
                <Text style={styles.headerCell}></Text>
              </View>

              {/* רשימת חשבוניות */}
              <FlatList
                data={invoices}
                renderItem={renderInvoice}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { padding: 15, paddingBottom: 100 },

  header: { alignItems: "center", marginBottom: 20 },
  hello: { fontSize: 28, fontWeight: "bold", color: "#000" },
  customerId: { fontSize: 14, color: "#6b7280", marginVertical: 5 },
  invoiceButton: {
    backgroundColor: "#7c3aed",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 10,
  },
  invoiceText: { color: "#fff", fontWeight: "600" },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  tab: {
    fontSize: 16,
    marginHorizontal: 15,
    paddingBottom: 5,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#7c3aed",
    fontWeight: "bold",
    color: "#000",
  },
  tabInactive: { color: "#6b7280" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  total: { fontSize: 16, fontWeight: "600", color: "#000" },
  label: { fontSize: 14, color: "#6b7280" },

  contactName: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  contactRow: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  contactText: { marginLeft: 8, fontSize: 14, color: "#000" },
  link: { color: "#6b7280", fontSize: 12, marginTop: 10 },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: { flex: 1, paddingVertical: 8 },

  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  filterBtn: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  filterBtnActive: {
    borderWidth: 1,
    borderColor: "#7c3aed",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  filterText: { fontSize: 13, color: "#555" },

  tableHeader: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  headerCell: {
    fontSize: 12,
    fontWeight: "600",
    color: "#555",
    textTransform: "capitalize",
  },

  invoiceRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  invoiceCell: { fontSize: 13, color: "#333", marginHorizontal: 4 },
});

export default CustomerDetailScreen;

