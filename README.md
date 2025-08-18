# Jidosha Hoken (自動車保険)

Sistema de gerenciamento de seguros de automóveis desenvolvido com Angular e Node.js, com suporte offline e notificações push.

## 📋 Sobre o Projeto

Jidosha Hoken é um Progressive Web App (PWA) para gerenciamento de seguros de automóveis que permite:

- Cadastro de seguros de veículos
- Listagem de seguros cadastrados
- Funcionamento offline com sincronização automática
- Notificações push
- Interface responsiva com Semantic UI

## 🚀 Tecnologias Utilizadas

### Frontend
- **Angular 18** - Framework principal
- **TypeScript** - Linguagem de programação
- **Semantic UI** - Framework CSS
- **Service Worker** - Funcionalidade offline
- **IndexedDB (Dexie)** - Armazenamento local
- **RxJS** - Programação reativa

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Web Push** - Notificações push
- **CORS** - Cross-Origin Resource Sharing
- **Body Parser** - Parsing de requisições

## 📦 Estrutura do Projeto

```
jidosha-hoken/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── cadastro-seguro/     # Componente para cadastrar seguros
│   │   │   ├── listar-seguros/      # Componente para listar seguros
│   │   │   └── menu/                # Componente de navegação
│   │   ├── models/
│   │   │   ├── Seguro.ts            # Modelo de dados do seguro
│   │   │   └── MarcaCarro.ts        # Interface para marca do carro
│   │   └── services/
│   │       ├── seguro.service.ts           # Serviço de gerenciamento de seguros
│   │       ├── marca-carro.service.ts      # Serviço de marcas de carros
│   │       └── online-offline.service.ts   # Serviço de detecção de conexão
├── public/
│   ├── manifest.webmanifest         # Configuração PWA
│   └── icons/                       # Ícones da aplicação
├── index.js                         # Servidor Express
├── seguro-service.js               # Lógica de negócio dos seguros
├── enviar-notificacao.js           # Serviço de notificações
└── adiciona-push-subscriber.js     # Gerenciamento de subscribers
```

## 🔧 Instalação e Configuração

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/0nF1REy/jidosha-hoken.git
   cd jidosha-hoken
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor backend**
   ```bash
   node index.js
   ```

4. **Em outro terminal, inicie o frontend**
   ```bash
   npm start
   ```

5. **Acesse a aplicação**
   - Frontend: `http://localhost:4200`
   - Backend API: `http://localhost:9000`

## 📱 Funcionalidades

### 🔹 Cadastro de Seguros
- Formulário para cadastro de novos seguros
- Validação de dados
- Seleção de marca do veículo
- Informações do proprietário

### 🔹 Listagem de Seguros
- Visualização de todos os seguros cadastrados
- Interface responsiva
- Carregamento automático

### 🔹 Funcionalidade Offline
- Armazenamento local com IndexedDB
- Sincronização automática quando online
- Detecção de status de conexão
- Funcionamento completo offline

### 🔹 Notificações Push
- Sistema de notificações web push
- Configuração VAPID
- Gerenciamento de subscribers

### 🔹 Progressive Web App (PWA)
- Instalação no dispositivo
- Service Worker para cache
- Manifest configurado
- Ícones otimizados

## 🌐 API Endpoints

### Seguros
- `GET /api/seguros` - Lista todos os seguros
- `POST /api/seguros` - Cadastra um novo seguro

### Notificações
- `POST /api/notificacao` - Adiciona subscriber de notificação
- `POST /api/notificacao/enviar` - Envia notificação push

## 📊 Modelo de Dados

### Seguro
```typescript
interface Seguro {
  id?: string;
  marcaCarro?: MarcaCarro;
  modeloCarro?: string;
  placaCarro?: string;
  nomeProprietario?: string;
  sobrenomeProprietario?: string;
  dataNascimentoProprietario?: string;
}
```

### Marca do Carro
```typescript
interface MarcaCarro {
  codigo: string;
  nome: string;
}
```

## 🎯 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento Angular
- `npm run build` - Compila a aplicação para produção
- `npm test` - Executa os testes unitários
- `npm run lint` - Executa o linter
- `npm run watch` - Compila em modo watch

## 🔒 Configuração de Notificações Push

As chaves VAPID estão configuradas no arquivo `index.js`:

```javascript
const vapidKeys = {
    "publicKey": "BBl5Vw0PCEM8nbonAjahMaBPAR3MEibrU-zwkXHd0vp_bL4w43ej_K41pLBWOIjCW_3TnotZvskdY_Xmg0Hde3I",
    "privateKey": "QHznI0Lrhm5c8ByTsuNyuJKZamqo7qSXwuyBfSD7sIs"
};
```

> ⚠️ **Importante**: Em produção, substitua essas chaves por suas próprias chaves VAPID.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença especificada no arquivo [LICENSE](LICENSE).

## 👨‍💻 Autor

Desenvolvido por [0nF1REy](https://github.com/0nF1REy)

---

**Jidosha Hoken** (自動車保険) - Sistema de Seguro de Automóveis
