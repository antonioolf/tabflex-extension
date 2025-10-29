# 🔧 Como Carregar a Extensão no Chrome

## ⚠️ **IMPORTANTE**: Por que os bookmarks fictícios aparecem?

Quando você acessa `http://localhost:5173/`, o projeto roda como **website normal** onde a API `chrome.bookmarks` não está disponível. Por isso, o sistema usa o fallback com bookmarks fictícios do localStorage.

Para usar os **bookmarks reais do Chrome**, você precisa carregar o projeto como **extensão do Chrome**.

## 📋 **Passos para Carregar como Extensão:**

### **1. Fazer o Build**
```bash
npm run build
```
Isso cria a pasta `dist/` com os arquivos da extensão.

### **2. Abrir Chrome Developer Mode**
1. Abra o Chrome
2. Digite na barra: `chrome://extensions/`
3. Ative o "Modo do desenvolvedor" (toggle no canto superior direito)

### **3. Carregar Extensão Não Empacotada**
1. Clique em "Carregar sem compactação" ou "Load unpacked"
2. Selecione a pasta `dist/` do seu projeto
3. A extensão será carregada e aparecerá na lista

### **4. Testar a Extensão**
1. Abra uma **nova aba** no Chrome
2. A nova aba será substituída pelo TabFlex
3. Você verá: "🔗 Conectado aos favoritos do Chrome"
4. Os bookmarks mostrados serão os **reais** do seu Chrome

## 🔍 **Como Verificar se Está Funcionando:**

### **Logs no Console:**
Abra as DevTools (F12) e veja os logs:
- ✅ `window existe: true`
- ✅ `window.chrome existe: true` 
- ✅ `chrome.bookmarks existe: true`
- ✅ `isChromeExtension: true`
- ✅ `Carregando bookmarks do Chrome...`

### **Interface Visual:**
- Aparece: "🔗 Conectado aos favoritos do Chrome"
- Os bookmarks são os mesmos da barra do Chrome
- Mudanças sincronizam em tempo real

## 🔄 **Diferenças Entre os Modos:**

| Modo | URL | API Chrome | Bookmarks | Indicador |
|------|-----|------------|-----------|-----------|
| **Website** | `localhost:5173` | ❌ Não disponível | Fictícios (localStorage) | Sem indicador |
| **Extensão** | `chrome-extension://...` | ✅ Disponível | Reais do Chrome | 🔗 Conectado |

## 🛠️ **Desenvolvimento:**

Para desenvolvimento, você pode:

1. **Fazer mudanças no código**
2. **Executar `npm run build`**
3. **Recarregar a extensão** no `chrome://extensions/`

Ou configurar hot-reload para extensões (mais avançado).

## 🎯 **Teste Rápido:**

1. **Adicione um bookmark** na barra do Chrome
2. **Abra nova aba** com a extensão
3. **Veja o bookmark aparecer** instantaneamente
4. **Edite pelo TabFlex** e veja mudar no Chrome

---

A integração só funciona quando carregada como **extensão do Chrome**, não como website! 🚀