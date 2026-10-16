# Cazo Khalix — Website

Site estático e responsivo em **HTML, CSS e JavaScript**, com as seções de resina ecológica, materiais, cursos, oficinas, aula gratuita, inspirações e contato.

## Estrutura do projeto

| Arquivo ou pasta | Responsabilidade |
| --- | --- |
| `index.html` | Estrutura da página, conteúdo, formulários e modais. |
| `styles.css` | Paleta, tipografia, animações e ajustes para telas menores. |
| `app.js` | Menu, filtros, galeria, WhatsApp, cursos, conta visual e formulários. |
| `assets/*.jpg` | Fotografias dos materiais, peças e ateliê. |
| `assets/leaf.svg` | Ícone da marca usado na aba do navegador. |
| `assets/fonts.css` | Declarações das fontes locais. |
| `assets/*.ttf` | Fontes Manrope e DM Sans. |
| `assets/FONT-LICENSE.txt` | Licenças das fontes. |
| `.gitignore` | Exclusões de arquivos locais e configurações privadas. |
| `.nojekyll` | Mantém o conteúdo como arquivos estáticos no GitHub Pages. |

Os ícones decorativos em SVG estão no próprio HTML. Não há framework, dependência de build ou pacote para instalar.

## Como abrir

1. Extraia o ZIP.
2. Abra a pasta `cazo-khalix` no VS Code.
3. Abra `index.html` no navegador para visualizar o site.

Para testar usando um servidor local, execute dentro da pasta:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.


Depois conecte o endereço do seu repositório e faça o primeiro push:

```bash
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

Substitua `SEU-USUARIO` e `SEU-REPOSITORIO` pelos dados reais. Os caminhos dos arquivos desta exportação são relativos, para permitir hospedar também em um subdiretório, como um projeto do GitHub Pages.

## Identidade visual

- Cor principal: `#71816A`.
- Detalhes: `#B87558`.
- Fundo: `#F5F1E8`.
- Caixas e áreas de apoio: `#DDE3D5`.
- Títulos: `#292D28`.
- Títulos em Manrope; textos em DM Sans.

## O que já funciona

- Menu móvel e navegação pelas seções.
- Filtro de materiais e detalhes dos produtos.
- Ampliação das fotografias.
- Abertura das informações de cursos e oficinas.
- WhatsApp flutuante com assuntos e mensagem preenchida.
- Formulário completo que prepara uma mensagem para o WhatsApp.
- Alternância visual entre entrar e criar conta.

O contato configurado é **+55 11 94470-3377**. Os links apenas abrem a conversa; o visitante confirma o envio no WhatsApp. As fontes e fotografias estão incluídas no projeto.

## Integrações que ainda faltam

- **Login e cadastro:** apenas interface visual; não autenticam, não criam contas e não armazenam dados.
- **Aula gratuita:** capa e área de vídeo prontas para receber o vídeo ou link original.
- **Loja:** catálogo visual sem checkout, estoque, preços ou pagamento.
- **Cursos:** apresentação e consulta pelo WhatsApp, sem sistema de matrícula.
- **Contato:** envio por WhatsApp; não existe serviço próprio de envio de e-mail.

## Verificações realizadas

Sintaxe do JavaScript, arquivos referenciados, links internos, rótulos e referências ARIA; testes de lógica para os principais painéis e formulários; checagens estáticas de medidas em telas de 320 a 1440 px. Foram incorporadas as correções de ícones no iPhone, sobreposição na citação e espaçamento das quebras de linha.

A verificação visual final em navegadores e dispositivos reais continua necessária.

## Sobre esta exportação

Cópia da versão publicada após a correção de espaçamento do celular, de 16/10/2026. A estrutura foi simplificada para publicação independente: os arquivos de `dist` estão na raiz desta pasta. Não foram incluídos o histórico Git nem configurações privadas da hospedagem original.
