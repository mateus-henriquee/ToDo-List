document.getElementById('adicionar').addEventListener("click", function () {
    let inputTarefa = document.getElementById("novatarefa");
    let tarefaTexto = inputTarefa.value.trim();

    if (tarefaTexto === "") return;

    let lista = document.getElementById("listaTarefas");
    let card = document.createElement("div");
    card.classList.add("tarefa-card");

    let editarIcone = document.createElement("span");
    editarIcone.innerHTML = "✏️";
    editarIcone.classList.add("editar-icone");
    editarIcone.style.position = "absolute";
    editarIcone.style.fontSize = "16px"
    editarIcone.style.top = "5px";
    editarIcone.style.right = "5px";
    editarIcone.style.cursor = "pointer";
    editarIcone.style.display = "none";
    card.appendChild(editarIcone);

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
    texto.classList.add("tarefa-texto");
    texto.contentEditable = "false";
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

    editarIcone.addEventListener("click", function () {
        texto.contentEditable = "true";
        texto.focus();
    });

    texto.addEventListener("blur", function () {
        texto.contentEditable = "false";
        if (texto.textContent.trim() === "") {
            texto.textContent = tarefaTexto;
        }
    });

    card.appendChild(btnConcluir);
    card.appendChild(btnRemover);
    lista.appendChild(card);

    inputTarefa.value = "";

    card.style.position = "relative";
    card.addEventListener("mouseenter", function () {
        editarIcone.style.display = "block";
    });
    card.addEventListener("mouseleave", function () {
        editarIcone.style.display = "none";
    });
});