import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          HomeScreen: {
            screens: {
              HomeScreen: 'one',
            },
          },
          InfoScreen: {
            screens: {
              InfoScreen: 'two',
            },
          },
        },
      },
      AddTask: 'modal',
      Task: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
