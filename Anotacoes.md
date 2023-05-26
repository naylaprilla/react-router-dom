Uma SPA (Single Page Application) é uma aplicação que acontece sempre na mesma página HTML, normalmente chamada de index.html. A “troca entre páginas” é feita puramente com o JS, ou por alguma ferramenta que abstrai o JS. No caso desse curso é a biblioteca react-router-dom, que no final das contas utiliza os próprios recursos do JS para realizar a navegação.

Dessa forma, a navegação entre as rotas é muito mais rápida do que em sites tradicionais, que, onde a cada link que clicamos, devemos esperar uma nova requisição ao servidor, e a página do navegador é recarregada quando a nova página HTML está pronta para ser exibida. Já em uma SPA, a ideia é passar a sensação de que a pessoa usuária está em uma aplicação desktop.

Alguns dos recursos nativos do JS que o react-router-dom utiliza por debaixo dos panos são o window.history e o window.location. O objetivo da biblioteca é melhorar a experiência de criação de uma SPA, abstraindo esses recursos nativos para métodos e componentes mais intuitivos e manuteníveis do que seria com JS puro.

O React em conjunto com o react-router-dom não é a única forma de construir SPAs. Outros frameworks front-end, como Angular e Vue.js também utilizam os mesmos recursos nativos do JS para criar seus próprios ecossistemas de navegação.



Vamos utilizar o componente NavLink! Dentro do index.js do componente MenuLink, remova o useLocation e utilize o NavLink no lugar do Link, fazendo as alterações necessárias.

Primeiramente, remova a seguinte linha de código:

const localizacao = useLocation();COPIAR CÓDIGO
Remova também esse código que está dentro da template string do Link:

${localizacao.pathname === to ? styles.linkDestacado : ""}COPIAR CÓDIGO
Agora, troque o componente Link por NavLink. Não esqueça de importar NavLink:

import { NavLink } from 'react-router-dom';COPIAR CÓDIGO
Você pode aproveitar para remover os imports useLocation e Link.

Como é dito na seção NavLink da documentação, por padrão, o NavLink adiciona uma classe active para o link que realmente está ativo. Porém, como estamos utilizando Módulos CSS, precisaríamos criar um arquivo CSS normal com o estilo de link destacado.

Ao invés disso, vamos utilizar outro recurso que o NavLink oferece. Nos atributos className e style, em vez de atribuir uma string diretamente a eles, podemos atribuir uma função que retorna uma string. Essa função fornece como parâmetro um objeto que contém a propriedade isActive. Para acessar essa propriedade, vamos substituir a template string do className para uma função que retorna essa template string:

        <NavLink
            className={({ isActive }) => `
                ${styles.link}
            `}
            to={to}
        >
            {children}
        </NavLink>COPIAR CÓDIGO
Como o nome indica, a propriedade isActive (do inglês "está ativo") é true se o link estiver ativo e false se não estiver. Assim, podemos adicionar mais uma interpolação, com uma verificação semelhante à que estávamos fazendo antes:

${isActive ? styles.linkDestacado : ""}COPIAR CÓDIGO
Nesse ponto, pode ser que aconteça com você dos dois links ficarem ativos ao mesmo tempo quando você estiver na rota inicial! Isso porque o react-router-dom pode interpretar que a rota /sobremim também vai corresponder à rota /, pois ela também começa com /.

Para evitar isso, você pode adicionar a propriedade end no NavLink para garantir que esse comportamento não aconteça.

O código completo fica assim:

import { NavLink } from 'react-router-dom';
import styles from './MenuLink.module.css';

export default function MenuLink({ children, to }) {

    return (
        <NavLink
            className={({ isActive }) => `
                ${styles.link}
                ${isActive ? styles.linkDestacado : ""}
            `}
            to={to}
            end
        >
            {children}
        </NavLink>
    )
}COPIAR CÓDIGO

SPA com react-router-dom
Dessa forma, o projeto continua a funcionar igual a antes! Mas em vez de obter a rota através do useLocation e fazer uma verificação da rota atual, obtemos diretamente essa verificação pelo componente NavLink.

Nessa aula, você aprendeu como:
Diferenciar o comportamento de sites tradicionais e de SPAs;

Sites tradicionais são compostos por várias páginas HTML, e uma requisição é realizada para o servidor do site sempre que queremos ir para uma nova página. Já as SPAs (Single Page Applications) são compostas por uma única página HTML, e seu conteúdo é alterado dinamicamente pelo JavaScript.
Utilizar o componente Link do react-router-dom;

Ele mantém o comportamento de uma SPA, impedindo que a página do navegador recarregue.
Utilizar o hook useLocation;

Com ele, podemos obter informações da rota que estamos atualmente.
Utilizar o componente NavLink do react-router-dom.

Com ele, temos acesso direto à informação do link estar ativo ou não.

A sintaxe import { ReactComponent as NomeDoComponente } from 'caminho_do_componente'; é possível devido ao pacote SVGR, que já vem por padrão em um projeto React. Esse pacote permite que utilizemos um SVG como um componente React, assim não precisamos utilizá-lo como uma tag img.

Rotas aninhadas -  componente Outlet do react-router-dom
    Na rota "/", a estrutura a ser renderizada é:

    <PaginaPadrao>
        <Inicio />
    </PaginaPadrao>

    Na rota "/sobremim", a estrutura a ser renderizada é:

    <PaginaPadrao>
        <SobreMim />
    </PaginaPadrao>

Rotas index e caminhos relativos 
Você viu que quando queremos reaproveitar partes da nossa aplicação em apenas algumas rotas em vez de todas, utilizamos o recurso de rotas aninhadas, que são rotas filhas de uma mesma rota pai. Você pode ver sobre isso na documentação.

Aproveite também para conferir a documentação sobre rotas index.

Da documentação, há o seguinte exemplo:

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Activity />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="activity" element={<Activity />} />
      </Route>
    </Routes>
  );
}COPIAR CÓDIGO
Veja que há três rotas aninhadas de Layout. A primeira delas possui um atributo index em vez de um atributo path. Isso é mesmo que dizer que o caminho desta rota é igual ao da rota pai, ou seja, nesse caso é a mesma coisa que um atributo path="/".

As outras duas rotas têm caminhos que iniciam sem a /. Isso quer dizer que essas rotas serão relativas ao caminho da rota pai, e são equivalentes a "/invoices" e "/activity", respectivamente.

Se a rota pai tivesse o caminho "/qualquercoisa", os caminhos das três rotas aninhadas seriam equivalentes a "/qualquercoisa, "/qualquercoisa/invoices" e "/qualquercoisa/activity". Utilizando rotas index e caminhos relativos, evitamos repetição de código e o deixamos mais legível.

Agora que você conhece esses recursos, deixei um desafio para você na próxima atividade, vamos lá?

Simplifique os caminhos das rotas aninhadas de PaginaPadrao! Utilize o atributo index na rota Inicio e remova a / da rota SobreMim.

VER OPINIÃO DO INSTRUTOR
Opinião do instrutor

O código fica assim:

        <Route path="/" element={<PaginaPadrao />}>
          <Route index element={<Inicio />} />
          <Route path="sobremim" element={<SobreMim />} />
        </Route>COPIAR CÓDIGO
Dessa forma, funcionará igual a antes!

Nessa aula, você aprendeu como:
Identificar quando utilizar rotas aninhadas;

Colocamos as páginas Inicio e SobreMim como filhas de PaginaPadrao, para que apenas elas reaproveitassem a mesma estrutura. Não queríamos que o Banner aparecesse na página 404.
Utilizar o componente Outlet;

A rota que é pai de outras se responsabiliza por dizer onde elas serão renderizadas com o Outlet do react-router-dom.
Utilizar o atributo index do Route;

O index indica que o caminho da rota é igual ao da rota pai.
Diferenciar caminhos relativos e absolutos.

Caminhos absolutos iniciam com /, enquanto caminhos relativos iniciam sem a /, partindo do caminho da rota pai.

useParams

O markdown é uma linguagem de marcação, assim como o HTML. Inclusive, no projeto React que criamos, já vem um arquivo chamado README.md na raiz do projeto. A extensão .md indica que é um arquivo escrito em markdown.

Você pode ler mais sobre essa linguagem no artigo Markdown: como trabalhar com essa linguagem de markup?

No Olá Mundo, guardamos os textos markdown no JSON, mas essa não é a melhor forma de trabalhar com o markdown, pois o JSON possui limitações, como não permitir quebra de linha nas strings (foi utilizado \n em vez de quebra de linha). Porém, os cenários ideais são um pouco mais avançados, envolvendo consumo de serviços externos. Então, apesar das limitações do JSON, ele é mais simples de utilizar e supre as necessidades do nosso projeto.

Para melhor experiência de escrita, você pode escrever seus posts em markdown e depois passar para a string do JSON, mas se atente para substituir as quebras de linha por \n (e duas quebras de linha \n\n para um novo parágrafo), assim como já está sendo feito no posts.json.

No vídeo anterior, utilizamos um componente Routes dentro do componente Post, que já é uma rota dentro do Routes que é utilizado em routes.js. Este é o recurso de Routes descendente do react-router-dom, que é quando um componente Routes é utilizado dentro de outro.

Aliás, se você abrir agora alguns dos posts do projeto no navegador (em http://localhost:3000/posts/1, por exemplo) e abrir o console, aparecerá um alerta como esse:

You rendered descendant <Routes> (or called useRoutes()) at "/posts/1" (under <Route path="posts/:id">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="posts/:id"> to <Route path="posts/:id/*">.

Traduzindo o alerta, temos algo assim:

Você renderizou um <Routes> (ou chamou useRoutes()) descendente em "/posts/1", mas o caminho da rota pai não possui "*" ao final. Isso significa que se você criar rotas mais profundas, a rota pai não conseguirá renderizá-las.

Por favor, altere o pai <Route path="posts/:id"> para <Route path="posts/:id/*">.

No nosso caso, esse alerta passou despercebido, pois estamos utilizando apenas uma rota dentro do Routes descendente que está em Post. Mas se ele tivesse uma rota com o caminho "/posts/:id/detalhes" (ou simplesmente "detalhes", relativo ao caminho da rota pai), essa rota não seria renderizada.

Então, para evitar qualquer bug no futuro e seguir as boas práticas, vamos seguir o conselho do alerta, colocando um * ao final da rota do Post:

<Route path="posts/:id/*" element={<Post />} />COPIAR CÓDIGO
Dessa forma, o alerta do console irá sumir!


Para saber mais: solução alternativa com children
PRÓXIMA ATIVIDADE

No vídeo anterior, utilizamos um Routes descendente, para podermos utilizar um Route para PaginaPadrao e reutilizar seu Outlet. Porém, há outra abordagem para resolver esse problema, vamos conhecê-la?

Para aplicá-la, você pode remover os Routes e Route que colocamos no componente de Post, deixando seu JSX do jeito que estava antes. Agora, vamos envolver diretamente o PostModelo por PaginaPadrao, deixando o JSX assim:

        <PaginaPadrao>
            <PostModelo
                fotoCapa={`/assets/posts/${post.id}/capa.png`}
                titulo={post.titulo}
            >
                <div className="post-markdown-container">
                    <ReactMarkdown>
                        {post.texto}
                    </ReactMarkdown>
                </div>
            </PostModelo>
        </PaginaPadrao>
COPIAR CÓDIGO
Porém, para que consigamos renderizar o JSX que passamos para PaginaPadrao, devemos utilizar o children do React. Assim, vamos para o index.js de PaginaPadrao e receber a prop children. E, logo abaixo de <Outlet />, escrevemos {children}. O código fica assim:

export default function PaginaPadrao({ children }) {
    return (
        <main>
            <Banner />

            <Outlet />
            {children}
        </main>
    )
}COPIAR CÓDIGO
Ou seja, deixamos o componente PaginaPadrao mais reutilizável, podendo ser utilizado como rota pai ou diretamente como um componente pai. De uma forma ou de outra, PaginaPadrao irá renderizar o conteúdo ou em <Outlet /> ou em {children}.

Essa também é uma solução super válida e você pode escolher a que fizer mais sentido para você!

Consulte a documentação do Scroll To Top. Essa documentação é da versão 5 do react-router-dom, mas a solução continua válida para a versão 6 que estamos utilizando.

Para se aprofundar nos métodos JavaScript que usamos no Desafio, seguem os links da documentação da MDN:

filter
sort
slice

Nessa aula, você aprendeu como:
Componentizar um botão;

Criamos o componente BotaoPrincipal, que recebe props que definem seus estilos.
Utilizar o hook useNavigate;

Podemos utilizá-lo para fazer navegações mais complexas, como voltar para a página anterior no navegador.
Tratar o caso de post não encontrado;

Utilizamos o componente NaoEncontrada para quando um post não era encontrado. Vimos duas possíveis soluções para reutilizar o componente PaginaPadrao apenas quando um post era encontrado. Uma delas é aproveitando o Outlet e adicionando os componentes Routes e Route dentro do componente Post; outra é adicionando {children} em PaginaPadrao e permitindo ele possa ser utilizado como um componente pai direto.
Publicar o projeto!

Você aprendeu a publicar seu projeto na Vercel para que o mundo possa vê-lo :)

[00:00] Parabéns por ter chegado no final deste curso de React Router DOM, aprendemos muita coisa. Construímos o “Olá, Mundo!” que já está até publicado, você já deve ter o seu link disponível. E eu espero que você tenha também personalizado seu projeto, tenha colocado suas cores, tenha adicionado mais recursos. Tenha colocado sua foto, a sua história sobre mim, e já tenha até começado a escrever seus próprios posts se você já não tiver colocado na página inicial também.

[00:32] Aprendemos com a SPA (Single Page Application), aprendemos como construir ela com a biblioteca React Router DOM, temos diversas páginas, diversas rotas. Vimos como utilizar o recurso de Rotas Aninhadas onde utilizamos um mesmo recurso em diferentes rotas. Temos a página não encontrada, se eu colocar /qualquercoisa no final da URL vamos para a página não encontrada. Vimos como selecionar ela, aquele [ININTELIGÍVEL] de asterisco.

[00:58] E se vamos para um post, conseguimos ver também um recurso de rotas dinâmicas. Colocamos /posts/3 e você pega aquela informação como hook use params. Falando em hook, também vimos o hook use location, usamos ele para estilizar os links de início dependendo da rotas que estávamos, pois precisávamos dessa informação da rota que estávamos.

[01:25] Utilizamos também use location em um desafio que eu deixei porá você, que falando nesse desafio vou até mostrar ele. Vou no card de qualquer artigo, e se for até o final vemos estes cards de posts recomendados. Não perde ele, está até com solução em vídeo. Vimos nesse desafio como utilizar o use location pra colocar aquele componente de scroll to top.

[01:52] Realmente espero que você tenha aprendido muito, que você viu bastante coisa. Não deixa de compartilhas o seu aprendizado, o seu próprio projeto com todas as pessoas nas redes sociais. No Instagram, no LinkedIn, marca alguém, me marca que vou ficar muito feliz de ver o seu projeto também. Falando nisso também, eu quero saber o que você achou desse curso, se você tem alguma sugestão de melhoria. O que você mais gostou. Isso é muito bacana para sabermos o que temos que melhorar em nossos cursos e continuar entregando conteúdo de qualidade pra você.

[02:22] Participe do nosso Discord, tire dúvida dos outros alunos e alunas, tire suas próprias dúvidas se você também estiver com dificuldade no curso. Foi uma ótima jornada que eu tive com você e te espero no próximo curso.