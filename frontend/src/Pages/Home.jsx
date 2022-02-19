/* eslint-disable max-len */
function Home() {
  return (
    <div>
      Home page!
    </div>
  );
}

export default Home;

// Essa página é onde será possível ver a conversão de Bitcoin em outras moedas.

// Ao carregar, a página deve fazer uma requisição GET para o endpoint /api/crypto/btc para obter os valores de conversão.

// A página deve conter um input onde será possível digitar um valor em Bitcoins e quatro campos com os valores correspondentes em USD, BRL, EUR e CAD. Ao digitar o valor no input, os quatros campos devem ser atualizados.
