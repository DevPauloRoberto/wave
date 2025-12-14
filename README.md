🌊 Wave

🚀 Tecnologias Utilizadas

O projeto foi construído sobre uma stack poderosa e atualizada:

Frontend & UI

Nuxt (v4+): O Framework Vue definitivo para aplicações web híbridas.

Vue.js (v3.5+): O coração reativo da aplicação.

PrimeVue: Suite completa de componentes UI (DataTable, Forms, etc.).

Tailwind CSS: Estilização utilitária para um design rápido e responsivo.

Sass: Pré-processador CSS para estilos avançados.

Nuxt Icon & PrimeIcons: Ícones vetoriais modernos.

Backend & Dados

Sequelize: ORM moderno para Node.js (TypeScript).

MySQL: Banco de dados relacional robusto.

Server Routes (Nitro): API integrada diretamente no Nuxt (server/api).

Segurança & Validação

Zod: Validação de esquemas e tipos (TypeScript-first).

Bcrypt: Hashing de senhas seguro.

JWT (JsonWebToken): Autenticação stateless segura via cookies HttpOnly.

⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

Node.js (versão 18 ou superior)

Yarn (Gerenciador de pacotes)

MySQL (Servidor de banco de dados rodando)

📦 Instalação e Configuração

Clone o repositório:

git clone [https://github.com/SEU-USUARIO/wave-admin.git](https://github.com/SEU-USUARIO/wave-admin.git)
cd wave-admin


Instale as dependências:

yarn install


Configure o Banco de Dados:
Crie um arquivo .env na raiz do projeto (baseado no .env.example) e preencha com suas credenciais:

# .env
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha_mysql
DB_NAME=wave_admin_db
JWT_SECRET=sua_chave_secreta_super_segura


Crie o Banco de Dados:
Acesse seu cliente MySQL (Workbench, DBeaver) e crie o schema:

CREATE DATABASE wave_admin_db;


Nota: O Sequelize irá criar as tabelas automaticamente na primeira execução.

▶️ Rodando o Projeto

Ambiente de Desenvolvimento

Para iniciar o servidor com hot-reload e logs detalhados:

yarn dev

O projeto estará disponível em http://localhost:3000.

Build para Produção

Para gerar a versão otimizada para deploy:

yarn build


🛡️ Funcionalidades Principais

Autenticação Admin: Login seguro com hash de senha e sessão persistente via JWT.

Gestão de Notícias: CRUD completo com editor de conteúdo e upload de imagem (URL).

Categorização: Sistema de Categorias e Tags (Multi-select) para organização de conteúdo.

Dashboard Responsivo: Layout adaptável para Desktop e Mobile (Gaveta lateral).

Tabelas Dinâmicas: Paginação "Lazy" (via servidor), ordenação e ações rápidas.

📂 Estrutura do Projeto

/
├── components/      # Componentes Vue reutilizáveis
├── layouts/         # Layouts (Admin, Auth)
├── middleware/      # Guardas de rota (Auth protection)
├── pages/           # Rotas da aplicação (Vue Router automático)
│   ├── admin/       # Área protegida
│   └── ...
├── server/          # Backend (Nitro)
│   ├── api/         # Endpoints REST (GET, POST, PUT, DELETE)
│   ├── dbModels/    # Modelos do Sequelize (Tabelas)
│   └── utils/       # Conexão com banco e helpers
└── public/          # Arquivos estáticos

Feito com 💙 usando Nuxt.