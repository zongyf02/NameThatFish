import { BottomTab } from '../components/navigation';
import { Camera } from '../components/camera';
import { Gallery } from '../components/gallery';

import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

const UploadCameraView = () => {
  const screens = [
    {
      name: 'Home',
      component: Gallery,
      iconId: 'home',
      IconComponent: Entypo,
      iconSize: 30,
    },
    {
      name: 'Library',
      component: Camera, // place the results page component here
      iconId: 'fishbowl',
      IconComponent: MaterialCommunityIcons,
      iconSize: 30,
    },
    {
      name: 'Camera',
      component: Camera, // place the results page component here
      iconId: 'camera',
      IconComponent: Entypo,
      iconSize: 30,
    },
  ];
  return <BottomTab screens={screens} />;
};

export default UploadCameraView;
