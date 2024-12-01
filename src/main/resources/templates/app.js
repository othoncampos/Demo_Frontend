const API_URL = 'http://localhost:8081/livros';  // URL do backend

// Função para cadastrar um livro
async function addLivro() {
    const livro = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        isbn: document.getElementById('isbn').value,
        anoPublicacao: document.getElementById('anoPublicacao').value,
        editora: document.getElementById('editora').value,
    };

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(livro),
    });

    if (response.ok) {
        alert('Livro cadastrado com sucesso!');
        listarLivros();  // Atualiza a lista de livros
    } else {
        alert('Erro ao cadastrar o livro.');
    }
}

// Função para listar todos os livros
async function listarLivros() {
    const response = await fetch(`${API_URL}/listall`);
    const livros = await response.json();

    const tabelaCorpo = document.getElementById('tabelaCorpo');
    tabelaCorpo.innerHTML = '';  // Limpa a tabela antes de adicionar novos livros

    livros.forEach(livro => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${livro.idLivro}</td>
            <td>${livro.titulo}</td>
            <td>${livro.autor}</td>
            <td>
                <button onclick="deletarLivro(${livro.idLivro})">Deletar</button>
            </td>
        `;
        tabelaCorpo.appendChild(row);
    });
}

// Função para consultar um livro por ID
async function consultarPorId() {
    const id = document.getElementById('idConsulta').value;

    const response = await fetch(`${API_URL}/${id}`);
    if (response.ok) {
        const livro = await response.json();
        alert(`Livro encontrado: ${livro.titulo} - ${livro.autor}`);
    } else {
        alert('Livro não encontrado.');
    }
}

// Função para deletar um livro
async function deletarLivro(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        alert('Livro deletado com sucesso!');
        listarLivros();  // Atualiza a lista de livros
    } else {
        alert('Erro ao deletar o livro.');
    }
}

// Chama a função de listar livros quando a página carrega
window.onload = listarLivros;
