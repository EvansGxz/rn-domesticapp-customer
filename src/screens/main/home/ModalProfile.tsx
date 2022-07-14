/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, useState } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { styles } from '../../shared/Profile';
import { SharedStyles } from '../../../styles/shared-styles';
import { AxiosError } from 'axios'

// COMPOONENTs
import Button from "../../../components/ui/Button";
import LabeledInput from "../../../components/ui/LabeledInput";
import Alert from '../../../controllers/Alert';
import { PayloadActionKind } from '../../../contexts/authReducer';
import { useAuth } from '../../../hooks/use-auth';
import { httpClient } from "../../../controllers/http-client";


const countryOptions = [
  { value: 'Colombia', label: 'Colombia' },
  { value: 'España', label: 'España' },
];

const docTypes = [
  { value: 'cc', label: 'Cédula de Ciudadanía' },
  { value: 'nit', label: 'Número de Identificación Tributaria' },
  { value: 'ce', label: 'Cédula de Extranjería' },
  { value: 'pas', label: 'Pasaporte' },
];

const clientTypeOptions = [
  { value: 'Persona', label: 'Persona' },
  { value: 'Empresa', label: 'Empresa' },
];

interface userDataProp {
  lada: string;
  phone: string;
  country: string;
  client_type: string;
  document_id: string;
  document_type: string;
}

interface ModalsProps {
  docType: boolean;
  clientType: boolean;
  country: boolean;
}

interface ModalProfileProps {
  setIsOpen: Dispatch<boolean>
}

export default function ModalProfile(props: ModalProfileProps) {
  const {state, dispatch, loadSession} = useAuth();
  const [userdata, setData] = useState<userDataProp>({
    lada: '',
    phone: '',
    country: '',
    client_type: '',
    document_id: '',
    document_type: '',
  });

  const [openModals, setModalOpen] = useState<ModalsProps>({
    docType: false,
    clientType: false,
    country: false,
  });

  const onChangeText = (name: string, value: string) => setData({ ...userdata, [name]: value });
  const into = 'Por favor introduzca';
  const ConfirmProfile = async () => {
    if (userdata.document_type === '') return Alert({msg: `${into} el tipo de su documento`, type: 'WARNING'});
    else if (userdata.document_id === '') return Alert({msg: `${into} el numero de su documento`, type: 'WARNING'});
    else if (userdata.client_type === '') return Alert({msg: `${into} un tipo de cliente`, type: 'WARNING'});
    else if (userdata.country === '') return Alert({msg: `${into} un pais`, type: 'WARNING'});
    else if (userdata.lada === '') return Alert({msg: `${into} el indicatico de su pais`, type: 'WARNING'});
    else if (userdata.phone === '') return Alert({msg: `${into} un numero telefonico`, type: 'WARNING'});
    dispatch({type: PayloadActionKind.PRELOADER, payload: {preloader: true}});

    try {
      const dataUser = {
        phone: userdata.phone,
        lada: userdata.lada,
      };
      const formData = {
        'country': userdata.country,
        'client_type': userdata.client_type,
        'document_id': userdata.document_id,
        'document_type': userdata.document_type,
      };

      await httpClient.patch(`/user_update/${state.user.user_id}`, dataUser, {headers: {Authorization: `Token token=${state.user.token}`}});
      const response = await httpClient.patch('/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token token=${state.user.token}`
        }
      });
      await loadSession(response.data.token, response.data);
      props.setIsOpen(false);
      dispatch({type: PayloadActionKind.PRELOADER, payload: {preloader: false}});
    } catch (err) {
      dispatch({type: PayloadActionKind.PRELOADER, payload: {preloader: false}});
      const errors: any = ((err as AxiosError).response?.data as any).errors;
      Alert({
        title: 'Error',
        msg: errors,
        type: 'DANGER'
      })
    }
  }

  return (
    <>
      <Text style={styles.heading}>Bienvenido a Domesticapp</Text>
      <Text style={styles.subHeading}>Por favor complete estos datos para continuar</Text>
      <View style={{ marginVertical: 10, zIndex: 3 }}>
        <Text style={[styles.pickerLabel, styles.labelForInput]}>Tipo de Documento</Text>
        <DropDownPicker
          items={docTypes}
          style={styles.picker}
          open={openModals.docType}
          value={userdata.document_type}
          textStyle={styles.textPicker}
          placeholder='Selecione un documento'
          setValue={(value: any) => onChangeText('document_type', value())}
          setOpen={(value: any) => setModalOpen({ docType: value, clientType: false, country: false })}
        />
      </View>
      <LabeledInput
        inputProps={
          {
            blurOnSubmit: false,
            returnKeyType: 'next',
            autoCapitalize: "none",
            value: userdata.document_id,
            style: styles.inputBlueRounded,
            onChangeText: (value: string) => onChangeText('document_id', value),
          }
        }
        style={styles.labelForInput}
        label="Número de Documento"
      />
      <View style={{ marginBottom: 10, zIndex: 2 }}>
        <Text style={[styles.pickerLabel, styles.labelForInput]}>Tipo de cliente</Text>
        <DropDownPicker
          style={styles.picker}
          items={clientTypeOptions}
          open={openModals.clientType}
          value={userdata.client_type}
          textStyle={styles.textPicker}
          placeholder='Seleccione un tipo'
          setValue={(value: any) => onChangeText('client_type', value())}
          setOpen={(value: any) => setModalOpen({ clientType: value, docType: false, country: false })}
        />
      </View>
      <View style={{ marginBottom: 10, zIndex: 1 }}>
        <Text style={[styles.pickerLabel, styles.labelForInput]}>Pais</Text>
        <DropDownPicker
          closeOnBackPressed
          style={styles.picker}
          items={countryOptions}
          value={userdata.country}
          open={openModals.country}
          textStyle={styles.textPicker}
          placeholder='Selecione un pais'
          setValue={(value: any) => onChangeText('country', value())}
          setOpen={(value: any) => setModalOpen({ country: value, docType: false, clientType: false })}
        />
      </View>
      <LabeledInput
        inputProps={
          {
            maxLength: 10,
            blurOnSubmit: false,
            value: userdata.lada,
            returnKeyType: 'next',
            autoCapitalize: "none",
            keyboardType: 'default',
            placeholder: 'Ejemplo +58',
            style: styles.inputBlueRounded,
            onChangeText: (value: string) => onChangeText('lada', value),
          }
        }
        style={styles.labelForInput}
        label="Indicativo"
      />
      <LabeledInput
        inputProps={
          {
            maxLength: 10,
            blurOnSubmit: false,
            returnKeyType: 'next',
            value: userdata.phone,
            autoCapitalize: "none",
            keyboardType: 'number-pad',
            style: styles.inputBlueRounded,
            onChangeText: (value: string) => onChangeText('phone', value),
          }
        }
        style={styles.labelForInput}
        label="Telefono"
      />
      <View
        style={[SharedStyles.centerContent, SharedStyles.mainPadding]}>
        <Button
          style={[SharedStyles.backgroundPrimary]}
          onPress={ConfirmProfile}>
          Confirmar
        </Button>
      </View>
    </>
  )
}


