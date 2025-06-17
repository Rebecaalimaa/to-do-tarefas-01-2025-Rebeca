document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#cadastro form');
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

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (!form.usuario.value || !form.descricao.value || !form.setor.value || !form.prioridade.value) {
      alert("Todos os campos devem ser preenchidos.");
      return;
    }

    const dados = {
      usuarioId: form.usuarioId.value,
      descricao: form.descricao.value,
      setor: form.setor.value,
      prioridade: form.prioridade.value
    };

    console.log("Dados enviados:", dados);

    fetch('http://localhost:3000/tarefas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then(errorData => {
          throw new Error('Erro ao cadastrar tarefa: ' + errorData.message);
        });
      })
      .then(data => {
        alert('Cadastro de tarefa feito com sucesso!');
        form.reset();
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao cadastrar! Tente novamente.');
      });
  });
});
