import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
} from 'react-native';
import MainLayout from './MainLayout';
import {HeaderBar} from '../Components';
import {COLORS, SIZES} from '../Constatnts/theme';
import dummyData from '../Constatnts/dummy';
import icons from '../Constatnts/icons';
import { useState } from 'react';

const SectionTitle = ({title}) => {
  return (
    <View style={{marginTop: SIZES.padding}}>
      <Text style={{color: COLORS.lightGray3, fontWeight: 'bold'}}>
        {title}
      </Text>
    </View>
  );
};

const Setting = ({title, value, type, onPress}) => {
  if (type == 'button') {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
        }}
      >
        <Text style={{flex: 1, color: COLORS.white, fontWeight: 'bold'}}>
          {title}
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{marginRight: SIZES.radius, color: COLORS.lightGray3}}>
            {value}
          </Text>
          <Image
            style={{height: 15, width: 15, tintColor: COLORS.white}}
            source={icons.rightArrow}
          />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
        }}
      >
        <Text style={{color: COLORS.white, fontWeight: 'bold'}}>{title}</Text>
        <Switch
          style={{left: 200}}
          value={value}
          onValueChange={value => onPress(value)}
        />
      </View>
    );
  }
};

const Profile = () => {

const [faceId,setFaceId]=useState(true);

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          backgroundColor: COLORS.black,
        }}
      >
        <HeaderBar title="Profile" />
        <ScrollView>
          <View style={{flexDirection: 'row', marginTop: SIZES.radius}}>
            <View style={{flex: 1}}>
              <Text style={{color: COLORS.white}}>
                {dummyData.profile.email}
              </Text>
              <Text style={{color: COLORS.lightGray3}}>
                ID: {dummyData.profile.id}
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={{height: 25, width: 25}} source={icons.verified} />
              <Text style={{color: COLORS.lightgreen}}>Verified</Text>
            </View>
          </View>

          <SectionTitle title="APP" />

          <Setting
            title="Launch Screen"
            value="Home"
            type="button"
            onPress={() => {
              console.log('Pressed');
            }}
          />
          <Setting
            title="Appearance"
            value="Dark"
            type="button"
            onPress={() => {
              console.log('Pressed');
            }}
          />
          <SectionTitle title="ACCOUNT" />
          <Setting
            title="Payment Currency"
            value="USD"
            type="button"
            onPress={() => {
              console.log('Pressed');
            }}
          />
          <Setting
            title="Languagae"
            value="English"
            type="button"
            onPress={() => {
              console.log('Pressed');
            }}
          />
          <SectionTitle title="SECURITY" />
          <Setting
            title="FACE ID"
            value={faceId}
            type="switch"
            onPress={(value) => {
            setFaceId(value)
            }}
          />
                 <Setting
            title="Password Setting"
            value=""
            type="button"
            onPress={() => {
              console.log('Pressed');
            }}
          />
                 <Setting
            title="Change Password"
            value=""
            type="button"
            onPress={() => {
              console.log('Pressed');
            }}
          />
                 <Setting
            title="Two factor Verification"
            value=""
            type="button"
            onPress={() => {
              console.log('Pressed');
            }}
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
};
export default Profile;
