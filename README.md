# Cazo Khalix

Página estática em HTML, CSS e JavaScript com identidade natural, materiais, cursos e oficinas, aula gratuita, inspirações, contato e acesso à conta.

## Arquivos

- `index.html`: conteúdo e estrutura semântica.
- `styles.css`: identidade visual, responsividade e animações.
- `app.js`: navegação, filtros, galeria, modais, conta visual e preparação de mensagens.
- `assets/`: fotografias e mascote fornecidos, além das fontes Manrope e DM Sans hospedadas localmente.

O `index.html` fica na raiz do projeto. HTML, CSS e JavaScript puros: não é necessário executar `npm install` ou um build. Os caminhos relativos permitem publicar no GitHub Pages, inclusive em um endereço com nome de repositório.

## Identidade

Verde sálvia `#71816A`, terracota `#B87558`, fundo `#F5F1E8`, caixas `#DDE3D5`, títulos `#292D28`. Manrope nos títulos e DM Sans nos textos. Tons mais escuros do verde são usados em botões e textos pequenos para melhorar o contraste.

## Conteúdo incorporado do site original

As cinco capturas recebidas em 16/10/2026 orientam a apresentação da resina, o acesso a compras, cursos online/oficinas presenciais, a aula gratuita e a seção Fale conosco. O endereço, o e-mail, o CNPJ, os horários e as características da resina foram transcritos desse material fornecido pelo cliente.

O telefone confirmado na captura anterior é +55 11 94470-3377. O WhatsApp flutuante e as consultas de cursos abrem esse contato com mensagem preenchida. O formulário completo usa nome, sobrenome, e-mail, WhatsApp e mensagem para preparar uma conversa; o visitante confirma o envio no WhatsApp. O site não envia dados para servidor próprio.

## Partes visuais que aguardam integração

- Entrar/criar conta: abas e campos navegáveis, sem autenticação, criação de conta ou armazenamento vale ressaltar que isso foi um pedido do cliente. Os formulários de acesso usam `method="dialog"` e o JavaScript impede o envio. Senhas são apagadas ao fechar o painel.
- Aula gratuita: seção, capa e espaço para incorporação do vídeo. Nenhum vídeo ou URL da aula foi fornecido; não há reprodução simulada.
- Materiais: catálogo sem preços, estoque ou checkout.
- Cursos e oficinas: apresentação com consulta pelo WhatsApp; sem agenda, valores ou matrículas inventados.

O código e o endereço do site original não foram fornecidos. A página implementa a referência visual final com base nas imagens recebidas.

## Verificação

Sintaxe JavaScript e integridade de arquivos, âncoras, IDs, rótulos e relações ARIA. Testes de lógica sem navegador para filtros, WhatsApp, abas de acesso via clique/teclado, confirmação de senha, fechamento e limpeza de senhas, cursos, aula e preparação do contato. Checagem estática de medidas em 13 larguras de 320 a 1440 px. A validação visual em navegador/dispositivos reais permanece pendente porque o controle de navegador não está disponível neste ambiente.

Fotos recebidas convertidas para JPEG, compatível com o tipo MIME entregue pela hospedagem. As famílias tipográficas são distribuídas via Google Fonts sob a SIL Open Font License; veja `assets/FONT-LICENSE.txt`.

## Mascote

O mascote aparece em três pontos: apontando na abertura (`mascote-apontando.png`), acenando no contato (`mascote-acenando.png`) e fazendo joinha na chamada de cadastro (`mascote-joinha.png`). A pose de cadastro substitui a estrela decorativa, e as imagens têm espaço próprio para não cobrir textos ou botões. O link dos cursos se alinha ao início do texto do botão da aula gratuita. O PNG original mantém a transparência; o CSS enquadra as margens transparentes e ajusta o tamanho em telas menores.

## Ícone da aba

`assets/favicon-mascote.png` contém a imagem do mascote enviada para o favicon. A referência está no `<head>` do `index.html`.

## Atualizar seu projeto existente

1. Extraia este ZIP.
2. Copie o conteúdo da pasta `cazo-khalix-atualizado` para a pasta do seu projeto, substituindo os arquivos correspondentes. Preserve a pasta `.git` do seu repositório local.
3. Confira e envie as alterações pelo terminal da pasta do seu projeto:

```bash
git status
git add index.html styles.css app.js assets README.md .gitignore .nojekyll
git commit -m "Atualiza site Cazo Khalix com mascotes e favicon"
git push
```

Se o GitHub Pages já publica a branch atual e a pasta raiz, a atualização será publicada pelo GitHub após o push. Caso contrário, configure em Settings → Pages a branch desejada e a pasta `/ (root)`.

## Visualização local

Abra `index.html` no navegador ou use um servidor estático de sua preferência. A página é estática; conta, catálogo e aula mantêm os limites de integração descritos acima.
