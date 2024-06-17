# Desafio Técnico - Lista de Fornecedores

> <h3> Descritivo: </h3>
> Como desafio deverá ser desenvolvido um CRUD para uma Lista de Fornecedores.
> Na tela principal, deverá listar os fornecedores criados pelo usuário através do formulário
> disponibilizado pelo botão Novo. O botão de edição e exclusão deverão ser habilitados quando
> houver algum item selecionado no grid. Sendo assim, o botão de edição permitirá a edição de apenas
> um Fornecedor por vez, e o de exclusão permitirá uma remoção em massa. Na última coluna do grid,
> deverá conter uma opção para o usuário favoritar ou desfavoritar o fornecedor, ao clicar no botão
> quando não favorito deve favoritar, e quando favorito ao clicar deve desfavoritar. Os fornecedores
> favoritos devem vir ordenados por primeiro na listagem.
>
> No formulário de edição deverá conter os campos Nome, E-mail, Telefones, Tipo de
> Fornecedor e Observação. Os campos Nome, E-mail, Tipo de Fornecedor e Telefones deverão ser
> obrigatórios. O campo Telefones, deverá conter no mínimo um telefone informado podendo adicionar  
> mais números como opcional clicando no botão . Observação é um campo de texto aberto não
> obrigatório. O formulário deverá conter as validações de obrigatoriedade e a veracidade das
> informações de E-mail (xxxxx@xxxx.com) e Telefone ((xx) x xxxx-xxxx) deverão obedecer a máscara do
> campo.


> <h3> Configurações iniciais: </h3>
>
> - Acesse o arquivo <b>'application.properties'</b> que está no caminho <b>'src/main/resources/application.properties'</b>.
> - Faça as alterações necessárias:
> - Altere a variável <b>'seubancodedados'</b> em <b>'spring.datasource.url=jdbc:mysql://localhost:3306/seubancodedados?serverTimezone=America/Sao_Paulo'</b> para o nome do seu banco de dados.
> - Altere a variável <b>'seuusuario'</b> em <b>'spring.datasource.username=seuusuario'</b> para o seu usuário de acesso ao banco de dados.
> - Altere a variável <b>'suasenha'</b> em <b>'spring.datasource.password=suasenha'</b> para o seu usuário de acesso ao banco de dados.
> - Altere a variável <b>'seucontexto'</b> em <b>'server.servlet.context-path=/seucontexto'</b> para um caminho de contexto de sua preferência.
> 
>   O valor dessa variável definirá o caminho da sua URL após a URL base <b>localhost:8080</b>.
>   Caso não queira inserir um contexto, comente esse linha inserido o caractere <b># (hashtag)</b> no início da linha.
   

> <h3> Preparação do projeto: </h3>
>
> - Abra o terminal da sua IDE e execute o comando: <b>mvn clean install</b>.
> - Ao finalizar o processo, se tudo ocorrer bem você deve ver a mensagem <b>BUILD SUCCES</b>.

> <h3>Iniciando a aplicação:</h3>
> 
> - Após buildar o projeto, no terminal execute o comando: <b>mvn spring-boot:run</b>.
> - Então é só acessar a URL <b>'localhost:8080/seucontexto'</b> ou <b>'localhost:8080'</b> caso não tenha configurado um contexto.





