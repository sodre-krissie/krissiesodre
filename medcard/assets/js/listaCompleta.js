// /medcard/assets/js/listaCompleta.js
document.addEventListener('DOMContentLoaded', async () => {
    const listaDados = document.getElementById('lista-dados');
    const editModal = document.getElementById('editModal');
    const editForm = document.getElementById('edit-form');
    const editIndex = document.getElementById('edit-index');
    const editDisciplina = document.getElementById('edit-disciplina');
    const editPergunta = document.getElementById('edit-pergunta');
    const editResposta = document.getElementById('edit-resposta');
    const messageBox = document.getElementById('message-box'); // Para mensagens visuais

    // Função para carregar dados na tabela
    async function loadData() {
        try {
            const response = await fetch('/api/getData');
            if (!response.ok) throw new Error('Erro ao buscar os dados.');

            const dados = await response.json();
            listaDados.innerHTML = '';

            if (dados.length > 0) {
                dados.forEach((item, index) => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${item.disciplina}</td>
                        <td>${item.pergunta}</td>
                        <td>${item.resposta}</td>
                        <td>
                            <button class="btn-edit" data-index="${index}">Editar</button>
                            <button class="btn-delete" data-index="${index}">Excluir</button>
                        </td>
                    `;
                    listaDados.appendChild(tr);
                });
            } else {
                listaDados.innerHTML = '<tr><td colspan="4">Nenhum dado cadastrado.</td></tr>';
            }
        } catch (error) {
            console.error('Erro:', error);
            listaDados.innerHTML = '<tr><td colspan="4">Erro ao carregar os dados.</td></tr>';
        }
    }

    // Função para exibir mensagem de feedback
    function showMessage(message, isError = false) {
        messageBox.textContent = message;
        messageBox.style.color = isError ? 'red' : 'green';
        messageBox.style.display = 'block';

        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 3000);
    }

    // Função para editar um dado
    async function editData(index) {
        const response = await fetch('/api/getData');
        const dados = await response.json();
        const item = dados[index];

        editIndex.value = index;
        editDisciplina.value = item.disciplina;
        editPergunta.value = item.pergunta;
        editResposta.value = item.resposta;

        editModal.style.display = 'block'; // Exibe o modal de edição
    }

    // Função para salvar a edição
    editForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const index = editIndex.value;
        const updatedData = {
            disciplina: editDisciplina.value,
            pergunta: editPergunta.value,
            resposta: editResposta.value,
        };

        try {
            const response = await fetch(`/api/getData`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ index, updatedData }),
            });

            if (!response.ok) throw new Error('Erro ao atualizar os dados.');

            editModal.style.display = 'none'; // Fecha o modal
            showMessage('Dados atualizados com sucesso!');
            await loadData();
        } catch (error) {
            console.error('Erro:', error);
            showMessage('Erro ao atualizar os dados.', true);
        }
    });

    // Função para excluir um dado
    async function deleteData(index) {
        try {
            const response = await fetch(`/api/getData`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ index }),
            });

            if (!response.ok) throw new Error('Erro ao excluir o dado.');

            showMessage('Dado excluído com sucesso!');
            await loadData();
        } catch (error) {
            console.error('Erro:', error);
            showMessage('Erro ao excluir o dado.', true);
        }
    }

    // Adiciona evento de clique para os botões de exclusão e edição
    listaDados.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-delete')) {
            const index = event.target.dataset.index;
            deleteData(index);
        } else if (event.target.classList.contains('btn-edit')) {
            const index = event.target.dataset.index;
            editData(index);
        }
    });

    // Fecha o modal ao clicar no botão "Cancelar"
    document.getElementById('close-modal').addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Carrega os dados iniciais
    loadData();
});
