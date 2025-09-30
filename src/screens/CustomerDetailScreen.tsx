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
    client: "Packer Sheffi",
  },
  {
    id: "2",
    toBePaid: "₪12,556",
    amount: "₪25,000",
    invoiceNumber: "INV-003630",
    client: "Packer Sheffi",
  },
  {
    id: "3",
    toBePaid: "₪10,000",
    amount: "₪10,000",
    invoiceNumber: "INV-982098",
    client: "Packer Sheffi",
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.hello}>hello</Text>
          <Text style={styles.customerId}>69a628e7 Customer number:</Text>

          <TouchableOpacity style={styles.invoiceButton}>
            <Text style={styles.invoiceText}>New invoice</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveTab("documents")}>
            <Text
              style={[
                styles.tab,
                activeTab === "documents" ? styles.tabActive : styles.tabInactive,
              ]}
            >
              Documents
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab("invoices")}>
            <Text
              style={[
                styles.tab,
                activeTab === "invoices" ? styles.tabActive : styles.tabInactive,
              ]}
            >
              Invoices
            </Text>
          </TouchableOpacity>
        </View>

        {/* Documents (empty for now) */}
        {activeTab === "documents" && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Documents Section</Text>
            <Text style={{ color: "#666" }}>No documents available.</Text>
          </View>
        )}

        {/* Invoices */}
        {activeTab === "invoices" && (
          <>
            {/* Financial Review */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Financial review</Text>

              <View style={styles.row}>
                <Text style={styles.total}>₪0</Text>
                <Text style={styles.label}>Total:</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.total, { color: "green" }]}>₪0</Text>
                <Text style={styles.label}>Paid:</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.total, { color: "red" }]}>₪0</Text>
                <Text style={styles.label}>Balance:</Text>
              </View>
            </View>

            {/* Contact Info */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Contact information</Text>
              <Text style={styles.contactName}>hello</Text>

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
                <Text style={styles.contactText}>Jerusalem</Text>
              </View>

              <Text style={styles.link}>Click to view full details</Text>
            </View>

            {/* Invoices Section */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Invoices</Text>

              {/* Search */}
              <View style={styles.searchBox}>
                <TextInput
                  placeholder="Search by customer name or invoice number"
                  style={styles.input}
                />
                <Ionicons name="search-outline" size={20} color="#999" />
              </View>

              {/* Filter buttons */}
              <View style={styles.filterRow}>
                <TouchableOpacity style={styles.filterBtn}>
                  <Text style={styles.filterText}>Awaiting payment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterBtn}>
                  <Text style={styles.filterText}>Partial payment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterBtn}>
                  <Text style={styles.filterText}>New for payment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterBtnActive}>
                  <Text style={[styles.filterText, { color: "#000" }]}>
                    Full payment
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Table header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.headerCell, { flex: 0.8 }]}>updating</Text>
                <Text style={[styles.headerCell, { flex: 1 }]}>to be paid</Text>
                <Text style={[styles.headerCell, { flex: 1 }]}>amount</Text>
                <Text style={[styles.headerCell, { flex: 1.2 }]}>
                  Invoice number
                </Text>
                <Text style={[styles.headerCell, { flex: 1.2 }]}>client</Text>
                <Text style={styles.headerCell}></Text>
              </View>

              {/* Invoice list */}
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

