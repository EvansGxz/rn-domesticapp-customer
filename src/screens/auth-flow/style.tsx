import { StyleSheet } from "react-native";
import { COLORS } from "../../../config";

export const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  footerColor: {
    color: '#222'
  },
  tabScreenContainer: {
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    width: '85%',
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    position: "absolute",
    bottom: 10,
  },
  btnAction: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: COLORS.primary
  },
  btnTextAction: {
    fontSize: 18,
    fontFamily: 'Montserrat_600SemiBold',
  },
  inputsContainer: {
    width: '100%',
    justifyContent: 'flex-start'
  },
  header: {
    backgroundColor: '#fff',
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    alignItems: 'center',
    marginBottom: 5,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  tabs: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
  },
  tab: {
    width: '50%'
  },
  tabText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
  tabIndicator: {
    backgroundColor: COLORS.secondary,
    height: 3,
    width: '100%'
  },
  extraSpace: {
    height: 100
  },
  inputBlueRounded: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#0BBBEF',
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    height: 45,
    paddingHorizontal: 15,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 5,
  },
  labelForInput: {
    fontSize: 17,
    fontFamily: 'Poppins_500Medium',
    color: '#787B82',
  },
  pressableImage: {
    marginBottom: 20,
    height: 144,
    width: 144,
    alignSelf: "center",
  },
  imagePlaceholder: {
    height: 144,
    width: 144,
    backgroundColor: '#D9D9D9',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 72
  },
  iconCamera: {
    fontSize: 42,
    color: '#838383'
  },
  iconErase: {
    fontSize: 20,
    color: '#FFF'
  },
  textAddImage: {
    color: '#838383',
    fontFamily: 'Poppins_500Medium',
    fontSize: 12
  },
  imagePhoto: {
    height: 144,
    width: 144,
    borderRadius: 72
  },
  buttonErase: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: '#F00',
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height: 25,
    width: 25,
  },
  picker: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#0BBBEF',
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    height: 45,
    justifyContent: 'center',
  },
  pickerLabel: {
    opacity: 0.4,
    marginBottom: 5
  },
  textPicker: {
    fontFamily: 'Poppins_500Medium',
  }
});