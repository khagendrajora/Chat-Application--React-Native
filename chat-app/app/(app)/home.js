import { StatusBar } from "expo-status-bar";
import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ChatList from "../../components/ChatList";
import Loading from "../../components/Loading";
import { useAuth } from "../../context/authContext";
import { userRef } from "../../firebaseConfig";

export default function home() {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.uid) getUsers();
  }, []);

  const getUsers = async () => {
    const q = query(userRef, where("userId", "!=", user?.uid));
    const querySnap = await getDocs(q);
    let data = [];
    querySnap.forEach((doc) => {
      data.push({ ...doc.data() });
    });
    setUsers(data);
  };
  return (
    <View className="bg-white flex-1">
      <StatusBar style="light" />
      {users.length > 0 ? (
        <ChatList currentUser={user} users={users} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <Loading size={hp(8)} />
        </View>
      )}
    </View>
  );
}
