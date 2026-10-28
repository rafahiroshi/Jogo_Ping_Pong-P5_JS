# 🏓 Jogo Ping Pong — p5.js

Jogo de Ping Pong desenvolvido em **JavaScript**, utilizando a biblioteca **p5.js**, como parte dos meus estudos de **lógica de programação** na **Alura**.

Este foi meu **segundo projeto na plataforma** e é um registro do meu aprendizado: desde os primeiros testes no editor online até a organização dos arquivos para desenvolver e versionar o código pelo **VS Code e GitHub**.

## 🎮 Sobre o projeto

O projeto recria a ideia do clássico Ping Pong (Pong), com uma bolinha, raquetes e efeitos sonoros. Durante o desenvolvimento, pratiquei a organização do código, a lógica de movimentação e o tratamento das colisões.

**Links do projeto:**

- 🎮 [Jogar online — versão original no p5.js](https://editor.p5js.org/RafaelHiroshi/full/hHlzoRKMW)
- 💻 [Ver o projeto no editor p5.js](https://editor.p5js.org/RafaelHiroshi/sketches/hHlzoRKMW)
- 📂 [Repositório no GitHub](https://github.com/rafahiroshi/Jogo_Ping_Pong-P5_JS)

## 🛠️ Tecnologias utilizadas

- **JavaScript** — lógica e funcionamento do jogo.
- **p5.js** — desenho e animação dos elementos.
- **p5.sound** — reprodução dos efeitos sonoros.
- **HTML e CSS** — estrutura e estilo da página.
- **Git e GitHub** — controle de versões e registro da evolução.

## 🚀 Como executar localmente

1. Clone este repositório:

   ```bash
   git clone https://github.com/rafahiroshi/Jogo_Ping_Pong-P5_JS.git
   ```

2. Abra a pasta do projeto no **Visual Studio Code**.
3. Instale a extensão **Live Server**, caso ainda não a tenha.
4. Abra o arquivo `index.html` com **Open with Live Server**.
5. O jogo será aberto no navegador.

> As bibliotecas `p5.js` e `p5.sound.min.js` fazem parte dos arquivos do projeto. Não é necessário instalá-las separadamente nem utilizar links externos para carregá-las.

## 📁 Estrutura do projeto

```text
Jogo_Ping_Pong-P5_JS/
├── index.html         # Página que carrega o jogo
├── sketch.js          # Lógica principal do Ping Pong
├── style.css          # Estilos da página
├── p5.js              # Biblioteca p5.js (local)
├── p5.sound.min.js    # Biblioteca de áudio (local)
├── AIPoint.mp3        # Efeito sonoro
├── ambient.mp3        # Áudio ambiente
├── ballHit.mp3        # Efeito sonoro da bola
├── myPoint.mp3        # Efeito sonoro
└── README.md          # Documentação
```

## 🧠 Aprendizados e desafios

Uma das partes mais desafiadoras foi resolver um **bug relacionado aos toques da bolinha**. Depois de testar diferentes ideias e reescrever trechos do código, encontrei uma solução usando um **limitador de toques com contagem regressiva**.

Essa experiência me mostrou a importância de experimentar, errar, revisar a lógica e comentar o código para entender melhor o funcionamento de cada parte.

Também passei a manter os arquivos do projeto localmente, para facilitar as alterações no VS Code e registrar a evolução por meio de commits no GitHub.

## 🙏 Agradecimentos

Agradeço ao professor **Guilherme Lima** e à equipe da **Alura** pelo conteúdo e pelo incentivo ao aprendizado de programação.

---

Desenvolvido por [Rafael Hiroshi](https://github.com/rafahiroshi) como parte da minha jornada de estudos em programação.