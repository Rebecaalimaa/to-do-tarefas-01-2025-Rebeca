const URL = 'http://localhost:3000/tarefas';

window.onload = () => fetch(URL)
    .then(res => res.json())
    .then(tarefas => tarefas.forEach(renderCard));

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

    document.getElementById(tarefa.status).appendChild(card);
}

function mostrar(id, seletor) {
    document.querySelector(`#tarefa-${id} ${seletor}`).style.display = 'block';
    if (seletor === '.form-editar') {
        document.querySelector(`#tarefa-${id} .conteudo`).style.display = 'none';
    }
}

function salvarEdicao(id) {
    const card = document.getElementById(`tarefa-${id}`);
    const inputs = card.querySelectorAll('.form-editar input');

    const [setor, descricao, prioridade, usuario] = [...inputs].map(input => input.value);

    fetch(`${URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ setor, descricao, prioridade, usuario}) 
    }).then(() => location.reload());
}

function salvarAlteracao(id) {
    const status = document.querySelector(`#tarefa-${id} select`).value;

    fetch(`${URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    }).then(() => location.reload());
}

function excluir(id) {
    if (confirm('Deseja excluir esta tarefa?')) {
        fetch(`${URL}/${id}`, { method: 'DELETE' }).then(() => location.reload());
    }
}