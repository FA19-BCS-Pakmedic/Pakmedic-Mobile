import * as React from 'react';
import {View} from 'react-native';
import {Button, Menu, Divider, Provider} from 'react-native-paper';

const MenuDropdown = props => {
  return (
    <Provider>
      <View
        style={{
          paddingTop: 50,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Menu
          visible={props.visible}
          onDismiss={props.closeMenu}
          anchor={<Button onPress={props.openMenu}>Show menu</Button>}>
          {props.links.map((link, index) => {
            return (
              <Menu.Item
                key={index}
                onPress={() => {
                  // props.navigation.navigate(link.route);
                }}
                title={link.title}
              />
            );
          })}
        </Menu>
      </View>
    </Provider>
  );
};

export default MenuDropdown;
