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
import {useSelector} from 'react-redux';
import ROLES from '../../../utils/constants/ROLES';

export default function MenuDropDown({children, options}) {
  console.log(options);

  const role = useSelector(state => state.role.role);

  return (
    <Menu>
      <MenuTrigger>{children}</MenuTrigger>
      <MenuOptions>
        {options.length &&
          options.map((option, index) => (
            <TouchableOpacity key={index}>
              <MenuOption
                style={[
                  styles.option,
                  {
                    backgroundColor:
                      role === ROLES.doctor
                        ? colors.secondaryMonoChrome100
                        : colors.primaryMonoChrome300,
                  },
                ]}
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
    zIndex: 10,
  },

  option: {
    paddingVertical: dimensions.Height / 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary1,
    paddingHorizontal: dimensions.Width / 20,
    backgroundColor: colors.primaryMonoChrome100,
  },
});
