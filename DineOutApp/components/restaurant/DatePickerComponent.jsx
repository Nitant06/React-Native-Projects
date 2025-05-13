import DateTimePicker from "@react-native-community/datetimepicker";
import { useMemo, useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';


const DatePickerComponent = ({ date, setDate }) => {

    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {

        console.log("Event:", event.type, "Selected Date:", selectedDate);

        setShow(false);

        if (event.type === "set" && selectedDate) {
            setDate(selectedDate);
        }
    };

    const handlePress = () => {
        setShow(true);
    };


    const today = useMemo(() => new Date(), []);
    const maxDate = useMemo(() => {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        console.log("Max Date:", date);
        return date;
    }, []);

    return (
        <View className="flex flex-row">
            <TouchableOpacity
                onPress={handlePress}
                className={` rounded-lg text-white text-base ${Platform.OS === "android" && "px-2 py-1 justify-center bg-[#474747]"
                    } `}
            >
                {Platform.OS === "android" && (
                    <Text className="px-2 py-1 bg-[#474747] text-white">
                        {date.toLocaleDateString()}
                    </Text>
                )}
                {Platform.OS === "android" && show && (
                    <DateTimePicker
                        accentColor="#f49b33"
                        textColor="#f49b33"
                        value={date}
                        mode="date"
                        onChange={onChange}
                        display="calendar"
                        minimumDate={today}
                        maximumDate={maxDate}
                    />
                )}
                {Platform.OS === "ios" && (
                    <DateTimePicker
                        accentColor="#f49b33"
                        textColor="#f49b33"
                        value={date}
                        mode="date"
                        onChange={onChange}
                        display="calendar"
                        minimumDate={today}
                        maximumDate={maxDate}
                    />
                )}
            </TouchableOpacity>
        </View>
    )
}

export default DatePickerComponent