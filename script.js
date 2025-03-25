document.getElementById('adicionar').addEventListener("click", function () {
    let inputTarefa = document.getElementById("novatarefa");
    let tarefaTexto = inputTarefa.value.trim();

    if (tarefaTexto === "") return;

    let lista = document.getElementById("listaTarefas");
    let card = document.createElement("div");
    card.classList.add("tarefa-card");

    let imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    card.appendChild(imgContainer);

    let inputImagem = document.createElement("input");
    inputImagem.type = "file";
    inputImagem.accept = "image/*";
    inputImagem.classList.add("upload-btn");
    inputImagem.addEventListener("change", function (event) {
        let imagemArquivo = event.target.files[0];
        if (imagemArquivo) {
            let img = document.createElement("img");
            img.src = URL.createObjectURL(imagemArquivo);
            img.classList.add("card-image");
            img.onload = function () {
                URL.revokeObjectURL(img.src);
            };
            imgContainer.innerHTML = "";
            imgContainer.appendChild(img);
        }
    });
    card.appendChild(inputImagem);

    let texto = document.createElement("p");
    texto.textContent = tarefaTexto;
    card.appendChild(texto);

    let btnConcluir = document.createElement("button");
    btnConcluir.textContent = "Concluir";
    btnConcluir.classList.add("concluir-btn");
    btnConcluir.addEventListener('click', function () {
        texto.classList.toggle('concluir');
        if (imgContainer.firstChild) {
            imgContainer.firstChild.classList.toggle('concluido-img');
        }
    });

    let btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.classList.add("remover");
    btnRemover.addEventListener('click', function () {
        card.classList.add("remover-animacao");
        setTimeout(() => card.remove(), 500);
    });

    card.appendChild(btnConcluir);
    card.appendChild(btnRemover);
    lista.appendChild(card);

    inputTarefa.value = "";
});