import { SafeAreaView, View, Text, FlatList, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../../utility/style";
import Data from "../../utility/Data.json";
import CustomButton from "../../customComponent/CustomButton";

import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore/lite";

const Appointments = () => {
  const [firebaseAppointment, setFirebaseAppointment] = useState();

  const getAppointments = async () => {
    const appointmentCol = collection(db, "appointments");
    const appointmentSnapshot = await getDocs(appointmentCol);
    const appointmentList = appointmentSnapshot.docs.map((doc) => doc.data());

    if (!appointmentList) {
      return alert("No appointment found!!");
    } else {
      setFirebaseAppointment(appointmentList);
      console.log(firebaseAppointment);
    }
  };

  const Item = ({ title, message, name }) => (
    <View style={styles.History}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.partition} />

      <Text style={styles.history_title}>
        Patient Name : <Text style={styles.history_content}>{name}</Text>
      </Text>

      <Text style={styles.history_title}>
        Symptoms : <Text style={styles.history_content}>{message}</Text>
      </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} message={item.message} name={item.name} />
  );

  // ---------------------------Search---------------------

  const [search, setSearch] = useState("");
  const [filteredSearch, setFilteredSearch] = useState(Data);

  useEffect(() => {
    const newSearch = Data.filter(
      (Data) =>
        Data.message.toLowerCase().includes(search.toLowerCase()) ||
        Data.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredSearch(newSearch);
  }, [search]);

  return (
    <SafeAreaView style={[styles.appointment_container]}>
      <View style={styles.search_container}>
        <TextInput
          placeholder="Search..."
          onChangeText={setSearch}
          style={styles.search_Input}
          value={search}
        />
      </View>

      <View
        style={{
          marginHorizontal: "5%",
          paddingTop: "3%",
          paddingBottom: "3%",
        }}
      >
        <CustomButton btnTitle={"Refresh"} onPress={getAppointments} />
      </View>

      <View style={styles.flatlist_avoid_bottom}>
        <FlatList
          showsVerticalScrollIndicator={true}
          data={filteredSearch}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default Appointments;
