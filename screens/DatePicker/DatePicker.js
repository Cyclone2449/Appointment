import {
  Platform,
  View,
  Text,
  ScrollView,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomButton from "../../customComponent/CustomButton";
import styles from "../../utility/style";

import { db } from "../../firebase";
import { doc, addDoc } from "firebase/firestore";

const DatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("time");
  const [show, setShow] = useState(false);

  const [userSelectedDate, setUserSelectedDate] = useState("");
  const [userSelectedTime, setUserSelectedTime] = useState("");
  const [appointment, setAppointment] = useState("");

  // ------------------------Date & Time-----------------------

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);

    let newDate = tempDate.getDate();
    let month = tempDate.getMonth() + 1;
    let fullYear = tempDate.getFullYear();

    let hour = tempDate.getHours();
    let minutes = tempDate.getMinutes();
    let am_pm = "AM";

    if (hour > 11) {
      am_pm = "PM";
      if (hour > 12) {
        hour = hour - 12;
      }
    }

    if (hour == 0) {
      hour = 12;
    }

    let fDate = `${newDate}/${month}/${fullYear}`;
    let fTime = `${hour}:${minutes} ${am_pm}`;

    setUserSelectedDate(fDate);
    setUserSelectedTime(fTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode("date");
  };
  const showTimepicker = () => {
    showMode("time");
  };

  const onAlertSubmitted = () => {};

  const onSubmit = async () => {
    const docRef = await addDoc(doc(db, "appointments", "Random"), {
      date: userSelectedDate,
      reason: appointment,
      time: userSelectedTime,
    });
    // Alert.alert(
    //   "Confirm your Appoitnment",
    //   `Selected ${userSelectedDate} ${userSelectedTime} ${appointment}`,
    //   [
    //     {
    //       text: "Reset",
    //       onPress: () => {
    //         setUserSelectedDate(""),
    //           setUserSelectedTime(""),
    //           setAppointment("");
    //       },
    //     },
    //     {
    //       text: "Confirm",
    //       onPress: () => {
    //         onAlertSubmitted;
    //       },
    //     },
    //   ]
    // );
    setDate(new Date());
  };

  return (
    <SafeAreaView style={styles.HomeContainer}>
      <ScrollView>
        <Text style={styles.screen_header}>Select Date & Time:</Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ alignSelf: "center" }}>{userSelectedDate}</Text>
            <CustomButton
              onPress={showDatePicker}
              type="SECONDARY"
              btnTitle="Select a Date"
            />
          </View>

          <View>
            <Text style={{ alignSelf: "center" }}>{userSelectedTime}</Text>
            <CustomButton
              onPress={showTimepicker}
              btnTitle="Select a Time"
              type="SECONDARY"
            />
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={false}
              display="default"
              onChange={onChange}
              minimumDate={date}
            />
          )}
        </View>

        <TextInput
          maxLength={800}
          numberOfLines={4}
          multiline={true}
          placeholder="What is this appointment is about ?"
          style={{
            paddingLeft: 10,
            paddingBottom: 10,
            textAlign: "left",
            borderWidth: 2,
            borderRadius: 10,
            marginVertical: 10,
            borderColor: "#3B71F3",
          }}
          onChangeText={setAppointment}
        />

        <View>
          <CustomButton btnTitle="Confirm" onPress={onSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DatePicker;
