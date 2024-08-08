const prompt = require('prompt-sync')({sigint:true});
const {addNewBook, readBooks, updateBook, deleteBook, searchBook} = require('./library.js');

while(true) {
    console.log(`
:: SISTEMA DE GERENCIAMENTO DE LIVROS ::

1. Adicionar novo livro;
2. Listar livros cadastrados;
3. Atualizar livro;
4. Remover livro;
5. Buscar livro:
0. Sair`);

    const option = +prompt();

    switch(option) {
        case 1:
            addNewBook();
            break;
        case 2:
            readBooks();
            break;
        case 3:
            updateBook();
            break;
        case 4:
            deleteBook();
            break;
        case 5:
            searchBook();
            break;
        case 0:
            console.log("Obrigado! Até a próxima");
            return;
        default:
            console.log("Opção nao encontrada :(");
            break;
    }
}