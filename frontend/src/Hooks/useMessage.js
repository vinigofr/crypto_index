import React from 'react';
import { useNavigate } from 'react-router-dom';

function useMessage() {
  const navigate = useNavigate();
  const [redirectMessage, setRedirectMessage] = React.useState('');

  const setMessage = (params) => {
    const { route, message } = params;

    if (route && message) {
      setRedirectMessage(message);
      setTimeout(() => navigate(route), 5000);
      return;
    }

    if (message) {
      setRedirectMessage(message);
    }

    // if (customMessage) {
    //   setRedirectMessage(`${customMessage}. ${dafaultMessage}`);
    // } else {
    //   setRedirectMessage(dafaultMessage);
    // }
    // setTimeout(() => navigate('/login'), 5000);
  };

  return { setMessage, redirectMessage };
}

export default useMessage;
