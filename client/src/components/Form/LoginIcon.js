import { useLottie } from 'lottie-react';
import icon from '../../assets/login_animated_icon.json';

const LoginIcon = () => {
  const options = {
    animationData: icon,
    autoplay: true,
    loop: true,
  };

  const { View } = useLottie(options);

  return <> {View} </>;
};

export default LoginIcon;
