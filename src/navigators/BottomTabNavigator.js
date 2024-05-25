import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import { Image } from "react-native";
import Header from "../components/HomeHeader";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {

    const activeColor = '#ffffff';
    const passiveColor = '#f2f2f2';

    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused }) => {
                let iconName;
                if (route.name === 'Home') {
                    iconName = require('../icons/home.png');
                }
                else if (route.name === 'Settings') {
                    iconName = require('../icons/settings.png');
                }
                return <Image source={iconName} tintColor={focused ? "black" : "grey"} style={{ width: 24, height: 24 }} />;
            },
            tabBarActiveBackgroundColor: activeColor,
            tabBarInactiveBackgroundColor: passiveColor,
            tabBarLabelStyle: {
                marginBottom: 3,
                fontSize: 12
            },
        })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: "Home",
                    headerShown: true,
                    header: () => <Header username="Bhushan" />,
                }}
            />

            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerShown: true,
                    tabBarLabel: "Settings",
                }}
            />
        </Tab.Navigator>
    );
}
