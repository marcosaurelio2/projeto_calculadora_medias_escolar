const form = document.getElementById('form-atividade');
const corpoTabela = document.querySelector('tbody');
const mediaNotaElement = document.getElementById('media-nota');
const resultadoMediaElement = document.getElementById('resultado-media');
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado" />';

// Adiciona evento de submit no formulário
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const inputNome = document.getElementById('nome-atividade').value.trim();
    const inputNota = parseFloat(document.getElementById('nota-atividade').value);

    if (inputNome && !isNaN(inputNota)) {
        adicionarLinhaTabela(inputNome, inputNota);
        atualizarMedia();
        limparCampos();
    }
});

// Função para adicionar a linha na tabela
function adicionarLinhaTabela(nome, nota) {
    const linha = document.createElement('tr');

    linha.innerHTML = `
        <td>${nome}</td>
        <td>${nota.toFixed(2)}</td>
        <td>${gerarResultadoAprovacao(nota)}</td>
    `;

    corpoTabela.appendChild(linha);
}

// Função para gerar o resultado de aprovação
function gerarResultadoAprovacao(nota) {
    return nota >= 7 ? imgAprovado : imgReprovado;
}

// Função para atualizar a média
function atualizarMedia() {
    const mediaMinima = parseFloat(document.getElementById('media-escola').value);
    const notas = Array.from(corpoTabela.querySelectorAll('td:nth-child(2)'))
                        .map(td => parseFloat(td.textContent));
    
    const media = calcularMedia(notas);

    // Exibe a média calculada
    mediaNotaElement.textContent = media.toFixed(2);

    // Atualiza o status de aprovação/reprovação
    resultadoMediaElement.innerHTML = `
        <span class="resultado ${media >= mediaMinima ? 'aprovado' : 'reprovado'}">
            ${media >= mediaMinima ? 'Aprovado!' : 'Reprovado!'}
        </span>
    `;
}

// Função para calcular a média das notas
function calcularMedia(notas) {
    return notas.reduce((total, nota) => total + nota, 0) / notas.length;
}

// Função para limpar os campos de entrada
function limparCampos() {
    form.reset(); // Reseta todos os campos do formulário
}

// Limpa a tabela e reinicia as informações de média
document.getElementById('limparBtn').addEventListener('click', function() {
    corpoTabela.innerHTML = ''; 
    mediaNotaElement.textContent = '0'; 
    resultadoMediaElement.innerHTML = '<span class="resultado aprovado">Aprovado!</span>'; 
});
