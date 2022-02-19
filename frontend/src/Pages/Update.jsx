/* eslint-disable max-len */
function Update() {
  return (
    <div>
      Update page!
    </div>
  );
}

export default Update;

// A página deverá conter:

// Um select onde deverá ser possível selecionar a moeda cuja cotação se deseja atualizar. Os valores possíveis devem ser BRL, EUR e CAD;

// Após ter selecionado uma moeda, um texto deve mostrar o valor atual da cotação;

// Um input onde o novo valor de cotação poderá ser digitado;

// Um botão "Atualizar". Ao clicar nesse botão, deve ser feita uma requisição POST para o endpoint /api/crypto/btc, com o novo valor da moeda selecionada. Caso a requisição seja bem sucedida, a página deverá ser redirecionada para a home. Caso contrário, a mensagem de erro retornada pela API deve ser exibida na página;

// Um botão "Voltar" que, quando clicado, redireciona para a home, sem atualizar o valor da moeda selecionada.
