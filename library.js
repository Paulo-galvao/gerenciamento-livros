const prompt = require('prompt-sync')({sigint:true});

const library = [
    {
        id: 1,
        title: "abc",
        author: "Joseph Campbell",
        year: 1950,
        genre: "psicanálise",
        newVersionsYear: [1960, 1970]
    }
];
let lastId;

if(library.length == 0) {
    lastId = 0;
} else {
    lastId = library[library.length -1].id;
}

function model() {
    const newVersionsYear = [];
    const id = lastId;
    const title = prompt("Qual o título do livro? ");
    const author = prompt("Qual o autor do livro? ");
    const year = prompt("Qual o ano de lançamento do livro? ");
    const genre = prompt("Qual o gênero do livro? ");

    while(true) {
        const version = prompt("Versões dos livro(digite 0 para sair): ");
        if(version == 0) {
            break;
        } else {
            newVersionsYear.push(version);
        }
    }

    if(title != "" && author != "" && year != "" && !isNaN(year) && genre != "") {
        return {
            id,
            title,
            author,
            year,
            genre,
            newVersionsYear
        }
    } else {
        return undefined;
    }
}

function addNewBook() {
    lastId++;
    const newBook = model();
    if ( newBook != undefined ) {
        library.push(newBook);
    } else {
        console.log("Dados inválidos :(");
    }
}

function readBooks() {
    if(library.length < 1) {
        console.log("Ainda não possuimos nehum título cadastrado :(");
    } else {
        console.log("\nLista de livros atualizada:");
        library.forEach((book, index) => {
            console.log(`Id: ${book.id} \nTítulo: ${book.title} \nAutor: ${book.author} \nAno: ${book.year} \nGênero: ${book.genre} \nAno das Novas Versões: ${book.newVersionsYear}` );
        });
    }
}

function updateBook() {
    if(library.length < 1) {
        console.log("Ainda não possuimos nehum título cadastrado :(");
    } else {
        readBooks();
        const id = prompt("Qual item você deseja atualizar(escolha o livro pelo seu ID)? ");
        let findId = library.findIndex( book => book.id == id);        
        
        if(findId != -1) {
            let updatedBook = model();
            if(updatedBook != undefined) {
            library.forEach((book, index) => {
                if(book.id == id) {
                    updatedBook.id = library[index].id; 
                    library[index] = updatedBook;
                    console.log("Título atualizado com sucesso");
                } 
            })
            } else {
                console.log("Dados inválidos");
            }
        } else {
            console.log("Id não encontrado");
        }        
    }
}

function deleteBook() {
    if(library.length < 1) {
        console.log("Ainda não possuimos nehum título cadastrado :(");
    } else {
        readBooks();
        const id = prompt("Qual item você deseja remover(escolha o livro pelo seu ID)? ");
        let findId = library.findIndex( book => book.id == id);
        if(findId != -1) {
            library.forEach((book, index) => {
                if(book.id == id) {
                    library.splice(library[index], 1);
                    console.log("Título removido com sucesso");
                }
            })
        } else {
            console.log("Id não encontrado");
        }     
    }
}

function searchBook() {
    while(true) {
        console.log(`
:: BUSCA DE LIVRO ::

1. Por título;
2. Por autor;
3. Por ano;
4. Por gênero
0. Voltar`);
    
        const option = +prompt();

        switch(option) {
            case 1:
                const titleToSearch = prompt("Qual o titulo do livro?");
                library.forEach( book => {
                    if(book.title == titleToSearch);
                    console.log(book);
                })
               
                // console.log(library[0].title);
                // let titleReturned = library.filter( book => {
                //     book.title == titleToSearch;
                // })
                // console.log(titleReturned);
                break;
            case 0:
                return;
            default:
                console.log("Opcão não encontrada");
                break;
        }
    }


}

module.exports = {addNewBook, readBooks, updateBook, deleteBook, searchBook};