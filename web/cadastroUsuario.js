document.addEventListener('DOMContentLoaded', function() {
  const formUsuario = document.getElementById('formUsuario');
  const mensagemSucesso = document.getElementById('mensagem-sucesso');

  // Função para lidar com o envio do formulário
  formUsuario.addEventListener('submit', function(event) {
    event.preventDefault();  // Impede o envio tradicional do formulário

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    // Validação: garantir que os campos estão preenchidos
    if (!nome || !email) {
      alert("Todos os campos devem ser preenchidos.");
      return;
    }

    // Validação do e-mail
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    // Cria o objeto de usuário
    const usuario = { nome, email };

    // Armazena o usuário no localStorage (simulando o cadastro)
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Exibe a mensagem de sucesso
    mensagemSucesso.classList.remove('hidden');

    // Reseta o formulário após o envio
    formUsuario.reset();

    // Esconde a mensagem de sucesso após 5 segundos
    setTimeout(function() {
      mensagemSucesso.classList.add('hidden');
    }, 5000);
  });
});
