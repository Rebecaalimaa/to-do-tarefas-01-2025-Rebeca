document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#formTarefa');
  const usuarioSelect = document.querySelector('#usuario');

  function buscarUsuarios() {
    fetch('http://localhost:3000/usuarios')
      .then(response => response.json())
      .then(usuarios => {
        usuarios.forEach(usuario => {
          const option = document.createElement('option');
          option.value = usuario.id;
          option.textContent = usuario.nome;
          usuarioSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Erro ao buscar usuários:', error));
  }

  buscarUsuarios();

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const dados = {
      usuario: form.usuario.value,
      descricao: form.descricao.value,
      setor: form.setor.value,
      prioridade: form.prioridade.value
    };

  const options = {
  method: 'POST',
  headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/11.2.0'},
  body: '{"usuarioId":4,"descricao":"Verificar validade dos produtos","nomeSetor":"Qualidade","prioridade":"Média","dataCadastro":"2025-06-17","status":"Pendente"}'
};

fetch('http://localhost:3000/tarefas', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
  });
});
