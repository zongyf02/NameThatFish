import { BottomTab } from '../components/navigation';
import { Camera } from '../components/camera';
import { ImgUploader } from '../components/uploader';

const UploadCameraView = () => {
  const screens = [
    { name: 'Upload', component: ImgUploader, iconId: 'upload', iconSize: 30 },
    { name: 'Camera', component: Camera, iconId: 'camera', iconSize: 30 },
  ];
  return <BottomTab screens={screens} />
};

export default UploadCameraView;
