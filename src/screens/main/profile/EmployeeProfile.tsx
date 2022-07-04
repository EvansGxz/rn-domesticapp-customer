import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as React from "react";
// import { useAuth } from "../../../../src/contexts/auth-context";
// import { showHEmployee } from "../../../services/";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { COLORS } from "../../../../config";
import { useNavigation } from "@react-navigation/native";
import IconSkill from "../../../resources/img/profile-icons/skill.png";
import UserImage from "../../../components/user/UserImage";
import { SharedStyles } from "../../../styles/shared-styles";

function EmployeeProfile() {
  const navigation = useNavigation<any>();
  // const { user } = useAuth();
  // const [skills, setSkills] = React.useState(null);
  /* React.useEffect(() => {
    showHEmployee(user.id).then(setSkills);
  }, [user.id]); */

  const skills = {
    employee: {
      id: "1",
      id_user: "SDF2342FSDF3",
      user: "Luke Skywalker",
      full_name: "Luke Skywalker",
      experience: "1",
      /* icon: require("../../../resources/img/profile-icons/skill.png"),
    image_url: require("../../../resources/img/profile-icons/skill.png"), */
    },
  };

  // return 5 elements of the array
  // const firstFive = skills?.slice(0, 7);

  return (
    <>
      <BackTitledHeader title="Perfil del empleado" />
      <View style={[SharedStyles.mainScreen]}>
        <View
          style={{
            height: 75,
            borderRadius: 6,
            backgroundColor: COLORS.white,
            paddingLeft: 10,
            justifyContent: "center",
          }}
        >
          <>
            <View style={styles.headerContainer}>
              <View style={styles.containerImage}>
                <Image style={styles.tinyLogo} source={IconSkill} />
              </View>
              <View>
                <View style={styles.containerUserData}>
                  <Text style={styles.title}>{skills.employee.full_name}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.yearText}>
              {skills.employee.experience} de experiencia
            </Text>
          </>
          ;
        </View>
        <View>
          {1 > 0 ? (
            <View style={styles.stylesFlatList}>
              <TouchableOpacity style={styles.listStyle}>
                <View style={styles.containerSkills}>
                  <Image style={{ width: 27, height: 27 }} source={IconSkill} />
                </View>
              </TouchableOpacity>
              ;
            </View>
          ) : (
            <Text>Sin habilidades</Text>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerImage: {
    justifyContent: "center",
  },
  tinyLogo: {
    width: 64,
    height: 64,
  },
  headerContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    height: 132,
  },
  containerUserData: {
    justifyContent: "center",
    width: 270,
  },
  title: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 32,
    lineHeight: 40,
    color: "#35435E",
  },
  yearText: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 40,
    color: COLORS.grayFade,
  },
  containerSkills: {
    width: 30,
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: COLORS.white,
  },
  textTitle: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 26,
    color: COLORS.colorUserName,
  },
  text: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 20,
    marginTop: 13,
    marginBottom: 13,
    color: COLORS.grayFade,
  },
  listStyle: {
    height: 30,
    width: 30,
    marginVertical: 10,
    backgroundColor: COLORS.white,
  },
  stylesFlatList: {},
});

export default EmployeeProfile;
