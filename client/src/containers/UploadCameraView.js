import { BottomTab } from '../components/navigation';
import { Camera } from '../components/camera';
import { ImgUploader } from '../components/uploader';

const UploadCameraView = () => {
  const screens = [
    { name: 'Gallery', component: ImgUploader, iconId: 'folder-images', iconSize: 30 },
    { name: 'Camera', component: Camera, iconId: 'camera', iconSize: 30 },
  ];
  return <BottomTab screens={screens} />
};

export default UploadCameraView;
