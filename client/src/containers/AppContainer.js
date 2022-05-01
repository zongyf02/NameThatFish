import { BottomTab } from '../components/navigation';
import { Camera } from '../components/camera';
import { Gallery } from '../components/gallery';
import { Library } from '../components/library';

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
      name: 'Camera',
      component: Camera,
      iconId: 'camera',
      IconComponent: Entypo,
      iconSize: 30,
    },
    {
      name: 'Library',
      component: Library,
      iconId: 'fishbowl',
      IconComponent: MaterialCommunityIcons,
      iconSize: 30,
    },
  ];
  return <BottomTab screens={screens} />;
};

export default UploadCameraView;
