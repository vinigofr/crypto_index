import { useNavigate } from 'react-router-dom';
import Button from '../StyledComponents/Button';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="not-found-container">
      <h1>Pagina nao encontrada</h1>
      <Button
        onClick={() => navigate('/')}
        type="button"
      >
        Voltar para o inicio
      </Button>
    </div>
  );
}

export default NotFound;
