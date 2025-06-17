function renderCard(tarefa) {
    const card = document.createElement('div');
    card.className = 'card';
    card.id = `tarefa-${tarefa.id}`;

    card.innerHTML = `
        <div class="conteudo">
            <h3>${tarefa.setor}</h3>
            <p><strong>Descrição:</strong> ${tarefa.descricao}</p>
            <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>
            <p><strong>Responsável:</strong> ${tarefa.usuario}</p>
        </div>

        <div class="form-editar" style="display:none;">
            <input value="${tarefa.setor}" placeholder="Setor">
            <input value="${tarefa.descricao}" placeholder="Descrição">
            <input value="${tarefa.prioridade}" placeholder="Prioridade">
            <input value="${tarefa.usuario}" placeholder="Usuário">
            <button onclick="salvarEdicao(${tarefa.id})">Salvar</button>
        </div>

        <div class="actions">
            <button onclick="mostrar(${tarefa.id}, '.form-editar')">Editar</button>
            <button onclick="excluir(${tarefa.id})">Excluir</button>
            <button onclick="mostrar(${tarefa.id}, '.form-alterar')">Alterar Status</button> 
        </div>

        <div class="form-alterar" style="display:none;">
            <br>
            <select>
                <option value="fazer" ${tarefa.status === 'fazer' ? 'selected' : ''}>Fazer</option>
                <option value="fazendo" ${tarefa.status === 'fazendo' ? 'selected' : ''}>Fazendo</option>
                <option value="pronto" ${tarefa.status === 'pronto' ? 'selected' : ''}>Pronto</option>
            </select>
            <button onclick="salvarAlteracao(${tarefa.id})">Alterar</button>
        </div>
    `;

    // Verificação se o ID de status existe no DOM
    const coluna = document.getElementById(tarefa.status);
    if (coluna) {
        coluna.appendChild(card);
    } else {
        console.error(`Coluna com ID "${tarefa.status}" não encontrada!`);
    }
}
