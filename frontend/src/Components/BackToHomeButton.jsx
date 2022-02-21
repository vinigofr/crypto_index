import { useNavigate } from 'react-router-dom';
import Button from '../StyledComponents/Button';

function BackToHomeButton({ loading, children }) {
  const navigate = useNavigate();

  return (
    <Button
      type="button"
      disabled={loading}
      onClick={() => navigate('/')}
      className="back-button"
    >
      {children}
    </Button>
  );
}

export default BackToHomeButton;
