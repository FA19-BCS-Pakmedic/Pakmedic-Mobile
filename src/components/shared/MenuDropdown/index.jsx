import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import dimensions from '../../../utils/styles/themes/dimensions';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import colors from '../../../utils/styles/themes/colors';

export default function MenuDropDown({children, options}) {
  return (
    <Menu>
      <MenuTrigger>{children}</MenuTrigger>
      <MenuOptions>
        {/* <MenuOption onSelect={() => alert(`Save`)} text="Save" />
        <MenuOption onSelect={() => alert(`Delete`)}>
        <Text style={{color: 'red'}}>Delete</Text>
        </MenuOption>
        <MenuOption
        onSelect={() => alert(`Not called`)}
          disabled={true}
          text="Disabled"
        /> */}
        {options.map((option, index) => (
          <TouchableOpacity key={index}>
            <MenuOption
              style={styles.option}
              onSelect={() => option.onSelect()}
              text={option.text}
            />
          </TouchableOpacity>
        ))}
      </MenuOptions>
    </Menu>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: dimensions.Width / 10,
  },

  option: {
    paddingVertical: dimensions.Height / 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary1,
    paddingHorizontal: dimensions.Width / 20,
    backgroundColor: colors.primaryMonoChrome100,
  },
});
