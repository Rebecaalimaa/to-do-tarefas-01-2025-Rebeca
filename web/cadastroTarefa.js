document.addEventListener('DOMContentLoaded', function() {
  const formTarefa = document.getElementById('formTarefa');
  const mensagemSucesso = document.getElementById('mensagem-sucesso');

  formTarefa.addEventListener('submit', function(event) {
    event.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const setor = document.getElementById('setor').value;
    const prioridade = document.getElementById('prioridade').value;
    const usuario = document.getElementById('usuario').value;
    const status = document.getElementById('status').value;

    // Validação para garantir que todos os campos estão preenchidos
    if (!descricao || !setor || !prioridade || !usuario || !status) {
      alert("Todos os campos devem ser preenchidos.");
      return;
    }

    // Envia os dados para o back-end via AJAX
    fetch('http://localhost:3000/tarefas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ descricao, setor, prioridade, usuario, status })
    })
    .then(response => response.json())
    .then(data => {
      mensagemSucesso.classList.remove('hidden');
      formTarefa.reset();
      renderizarTarefas(); // Atualiza a lista de tarefas
    })
    .catch(error => {
      console.error('Erro ao cadastrar tarefa:', error);
    });
  });

  function renderizarTarefas() {
    fetch('http://localhost:3000/tarefas')
      .then(response => response.json())
      .then(tarefas => {
        // Limpa as colunas antes de renderizar
        document.getElementById('coluna-a-fazer').innerHTML = '<h3>A Fazer</h3>';
        document.getElementById('coluna-fazendo').innerHTML = '<h3>Fazendo</h3>';
        document.getElementById('coluna-pronto').innerHTML = '<h3>Pronto</h3>';

        // Exibe as tarefas nas colunas
        tarefas.forEach(tarefa => {
          const tarefaCard = document.createElement('div');
          tarefaCard.classList.add('tarefa-card');
          tarefaCard.innerHTML = `
            <p><strong>Descrição:</strong> ${tarefa.descricao}</p>
            <p><strong>Setor:</strong> ${tarefa.setor}</p>
            <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>
            <p><strong>Usuário:</strong> ${tarefa.usuario}</p>
            <p><strong>Status:</strong> ${tarefa.status}</p>
          `;
          document.getElementById(`coluna-${tarefa.status}`).appendChild(tarefaCard);
        });
      })
      .catch(error => {
        console.error('Erro ao recuperar tarefas:', error);
      });
  }

});
