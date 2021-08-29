# CRUD-nodeJS
An evaluative project made for the subject of Authoring and Multimedia II of the college course on Systems and Digital Media at the Federal University of Ceará (UFC).)

> Código pertence originalmente ao professor [Wellington Sarmento](https://github.com/wwagner33)

## CRUD
* Create:
  * Formulário de cadastro: [`cadastro.ejs`](https://github.com/VaneskaSousa/CRUD-nodeJS/blob/865548e8e5ee303d1888eb685a7fa63e4cedc2a7/views/pages/cadastro.ejs#L80);
  * Rota no backend: [cadastro no backend em `routes.ejs`](https://github.com/VaneskaSousa/CRUD-nodeJS/blob/865548e8e5ee303d1888eb685a7fa63e4cedc2a7/routes.js#L112);
  * Validação: [função `addValidation(data)`](https://github.com/VaneskaSousa/CRUD-nodeJS/blob/865548e8e5ee303d1888eb685a7fa63e4cedc2a7/public/script.js#L31);
  * Interface entre view e servidor (Controller): [função `add(form,link)`](https://github.com/VaneskaSousa/CRUD-nodeJS/blob/865548e8e5ee303d1888eb685a7fa63e4cedc2a7/public/script.js#L296);
* Read:
  * Listagem na interface do usuário: [`list.ejs`](https://github.com/VaneskaSousa/CRUD-nodeJS/blob/865548e8e5ee303d1888eb685a7fa63e4cedc2a7/views/pages/list.ejs#L19);
  * Montagem dinâmica dos usuarios na tabela [função `createList(resp`](https://github.com/VaneskaSousa/CRUD-nodeJS/blob/865548e8e5ee303d1888eb685a7fa63e4cedc2a7/public/script.js#L375);
  * Rota no backend: [retorno do vetor de usuarios em `routes.ejs`](https://github.com/VaneskaSousa/CRUD-nodeJS/blob/865548e8e5ee303d1888eb685a7fa63e4cedc2a7/routes.js#L135);
  * Ação de listagem [função `updateList(link)`](https://github.com/VaneskaSousa/CRUD-nodeJS/blob/865548e8e5ee303d1888eb685a7fa63e4cedc2a7/public/script.js#L334);
  > Agradeço também ao meu colega [Germano Luz](https://github.com/germanoluz) por ter me auxiliado na construção dinamica da tabela na função [`createList()`.](https://github.com/VaneskaSousa/CRUD-nodeJS/blob/865548e8e5ee303d1888eb685a7fa63e4cedc2a7/public/script.js#L375)
* Update
  * Formulário de edição: [`cadastro.ejs`](https://github.com/VaneskaSousa/CRUD-nodeJS/blob/865548e8e5ee303d1888eb685a7fa63e4cedc2a7/views/pages/cadastro.ejs#L5);
  * Rota no backend: [cadastro no backend em `routes.ejs`](https://github.com/VaneskaSousa/CRUD-nodeJS/blob/865548e8e5ee303d1888eb685a7fa63e4cedc2a7/routes.js#L100);
  * Validação: [função `validaUpdate(data)`](https://github.com/VaneskaSousa/CRUD-nodeJS/blob/865548e8e5ee303d1888eb685a7fa63e4cedc2a7/public/script.js#L6);
  * Interface entre view e servidor (Controller): [função `update(form,link)`](https://github.com/VaneskaSousa/CRUD-nodeJS/blob/865548e8e5ee303d1888eb685a7fa63e4cedc2a7/public/script.js#L80);
  > Criação do professor Welligton em sala de aula (online) junto dos alunos.
* Delete:
  * Formulário de edição para deletar: [`cadastro.ejs`](https://github.com/VaneskaSousa/CRUD-nodeJS/blob/865548e8e5ee303d1888eb685a7fa63e4cedc2a7/views/pages/cadastro.ejs#L5);
  * Rota no backend: [cadastro no backend em `routes.ejs`](https://github.com/VaneskaSousa/CRUD-nodeJS/blob/865548e8e5ee303d1888eb685a7fa63e4cedc2a7/routes.js#L44);
  * Validação: [no servidor](https://github.com/VaneskaSousa/CRUD-nodeJS/blob/865548e8e5ee303d1888eb685a7fa63e4cedc2a7/routes.js#L48);
  * Interface entre view e servidor (Controller): [função `update(form,link)`](https://github.com/VaneskaSousa/CRUD-nodeJS/blob/865548e8e5ee303d1888eb685a7fa63e4cedc2a7/public/script.js#L80);
  > Criação do professor Welligton em sala de aula (online) junto dos alunos.

