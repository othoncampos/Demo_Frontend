let livrosData = []; // Variável para armazenar os livros

function carregarLivros() {
    $.ajax({
        url: 'http://localhost:8081/livros/listall',  // URL correta para o back-end
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            livrosData = data; // Armazenando os dados em uma variável global

            const tableBody = $('#livrosTable tbody');
            tableBody.empty(); // Limpa a tabela antes de preenchê-la

            // Percorrendo os dados recebidos e preenchendo a tabela
            data.forEach(function(livro) {
                const row = `<tr>
                    <td>${livro.titulo}</td>
                    <td>${livro.autor}</td>
                    <td>
                        <a href="#" onclick="deletarLivro(${livro.idLivro})">Deletar</a> | 
                        <a href="/livros/consultar/${livro.idLivro}">Ver Detalhes</a>
                    </td>
                </tr>`;
                tableBody.append(row);
            });
        },
        error: function(error) {
            alert('Erro ao carregar os livros.');
        }
    });
}

// Função para deletar um livro
function deletarLivro(idLivro) {
    if (confirm('Tem certeza que deseja deletar este livro?')) {
        $.ajax({
            url: `/livros/deletar/${idLivro}`,  // URL que faz a requisição de deletar
            type: 'GET',
            success: function(response) {
                carregarLivros();  // Atualiza a lista após deletar
            },
            error: function(error) {
                alert('Erro ao deletar livro.');
            }
        });
    }
}


// Função para consultar um livro por ID
function consultarLivroPorId(idLivro) {
    $.ajax({
        url: `/livros/${idLivro}`,  // URL que retorna os dados do livro
        type: 'GET',
        dataType: 'json',
        success: function(livro) {
            $('#titulo').text(livro.titulo);
            $('#autor').text(livro.autor);
            $('#isbn').text(livro.isbn);
            $('#preco').text(livro.preco);
        },
        error: function(error) {
            alert('Erro ao consultar livro.');
        }
    });
}
