import React from 'react';
import { useNavigate } from 'react-router-dom';

function useForceLogin() {
  const navigate = useNavigate();
  const [redirectMessage, setRedirectMessage] = React.useState('');

  const sendToLoginMessage = 'Direcionando para "/login" em 5 segundos...';

  const forceLogin = (customMessage) => {
    if (customMessage) {
      setRedirectMessage(`${customMessage}. ${sendToLoginMessage}`);
    } else {
      setRedirectMessage(sendToLoginMessage);
    }
    setTimeout(() => navigate('/login'), 5000);
  };

  return { forceLogin, redirectMessage };
}

export default useForceLogin;
