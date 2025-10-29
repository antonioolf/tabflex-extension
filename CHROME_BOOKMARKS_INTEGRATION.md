# 📚 Integração com a API de Bookmarks do Chrome

Este documento explica como o **TabFlex** foi integrado com a API oficial de bookmarks do Google Chrome (`chrome.bookmarks`).

## 🔧 Configuração

### 1. Permissões no Manifest
O arquivo `public/manifest.json` foi atualizado para incluir a permissão necessária:

```json
{
  "permissions": ["bookmarks"]
}
```

### 2. Hook Personalizado
Criado o hook `useChromeBookmarks.js` que:

- ✅ **Detecta automaticamente** se está rodando como extensão do Chrome
- ✅ **Fallback para localStorage** quando não está como extensão
- ✅ **Sincronização em tempo real** com os bookmarks do Chrome
- ✅ **Listeners para mudanças** (criação, remoção, edição, movimentação)

## 🚀 Funcionalidades

### Detecção Automática
```javascript
const isChromeExtension = typeof window !== 'undefined' && 
                         window.chrome && 
                         window.chrome.bookmarks;
```

### Operações Suportadas
- **📖 Leitura**: Carrega toda a árvore de bookmarks do usuário
- **➕ Criação**: Adiciona novos bookmarks e pastas
- **✏️ Edição**: Modifica título e URL de bookmarks existentes
- **🗑️ Remoção**: Remove bookmarks e pastas (com `removeTree` para pastas)
- **🔄 Sincronização**: Atualização automática quando bookmarks mudam

### Interface Visual
- 🔗 **Indicador de conexão**: Mostra quando conectado aos bookmarks do Chrome
- ⏳ **Loading state**: Indicador de carregamento durante operações
- 📁 **Estrutura hierárquica**: Mantém a organização em pastas
- 🎨 **Favicons automáticos**: Gera favicons baseados na URL

## 📋 API Methods Utilizados

| Método | Descrição | Uso |
|--------|-----------|-----|
| `getTree()` | Carrega árvore completa de bookmarks | Inicialização |
| `create()` | Cria novo bookmark ou pasta | Adicionar items |
| `update()` | Atualiza título/URL | Editar items |
| `remove()` | Remove bookmark | Deletar bookmark |
| `removeTree()` | Remove pasta recursivamente | Deletar pasta |
| `get()` | Obtém bookmark específico | Verificar tipo antes de remover |

## 🎯 Eventos Monitorados

```javascript
chrome.bookmarks.onCreated.addListener(handleBookmarkCreated);
chrome.bookmarks.onRemoved.addListener(handleBookmarkRemoved);
chrome.bookmarks.onChanged.addListener(handleBookmarkChanged);
chrome.bookmarks.onMoved.addListener(handleBookmarkMoved);
```

## 🔄 Fallback System

Quando **não** está rodando como extensão:
- Usa `localStorage` para persistência
- Mantém estrutura de dados compatível
- Interface idêntica para o usuário
- Migração automática de dados

## 🛡️ Tratamento de Erros

- **Try-catch** em todas as operações assíncronas
- **Fallback automático** para localStorage em caso de erro
- **Logs detalhados** para debugging
- **Validação de dados** antes das operações

## 📱 Como Testar

### Como Extensão do Chrome:
1. Carregue a extensão no Chrome Developer Mode
2. Abra uma nova aba
3. Veja o indicador "🔗 Conectado aos favoritos do Chrome"
4. Adicione/edite bookmarks - mudanças aparecem em tempo real

### Como Website Normal:
1. Acesse `http://localhost:5174/`
2. Os bookmarks serão salvos no localStorage
3. Funcionalidade completa mantida

## 🔍 Debugging

Para verificar se a API está funcionando:

```javascript
console.log('Chrome extension:', typeof window.chrome !== 'undefined');
console.log('Bookmarks API:', window.chrome?.bookmarks);
```

## ⚠️ Limitações

- **Pasta raiz**: Não é possível modificar pastas especiais do Chrome
- **Barra de favoritos**: Algumas restrições em pastas do sistema
- **Permissões**: Requer permissão "bookmarks" no manifest

## 🎉 Benefícios da Integração

1. **Sincronização Real**: Mudanças aparecem instantaneamente
2. **Dados Consistentes**: Usa os bookmarks reais do usuário
3. **Performance**: Carregamento direto da API nativa
4. **Experiência Unificada**: Gerencia os mesmos bookmarks do Chrome
5. **Backup Automático**: Sincronização com conta Google (se habilitada)

---

Esta integração torna o TabFlex uma extensão verdadeiramente integrada ao Chrome, oferecendo gerenciamento completo dos bookmarks do usuário com interface moderna e intuitiva! 🚀