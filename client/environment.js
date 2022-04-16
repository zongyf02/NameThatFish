import Constants from 'expo-constants';
import { Platform } from 'react-native';

const localhost =
  Platform.OS === 'ios' || Platform.OS === 'web' ? 'localhost:3001' : '10.0.2.2:3001';

const ENV = {
  // development environment (where you develop new features)
  dev: {
    apiUrl: null,
    amplitudeApiKey: null,
  },
  // staging environment (where you test new features)
  staging: {
    apiUrl: '[your.staging.api.here]',
    amplitudeApiKey: '[Enter your key here]',
    // Add other keys you want here
  },
  // prod environment (built version ready for release)
  prod: {
    apiUrl: '[your.production.api.here]',
    amplitudeApiKey: '[Enter your key here]',
    // Add other keys you want here
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  } else if (env === 'staging') {
    return ENV.staging;
  } else if (env === 'prod') {
    return ENV.prod;
  }
};

export default getEnvVars;
