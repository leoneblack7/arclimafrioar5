# Configuração Manual do Supabase

Este guia explica como configurar manualmente o Supabase para o projeto ArclimaFrio.

## 1. Criar uma Conta no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Clique em "Start your project"
3. Faça login ou crie uma conta

## 2. Criar um Novo Projeto

1. Clique em "New Project"
2. Escolha um nome para o projeto (ex: "arclimaFrio")
3. Escolha uma senha forte para o banco de dados
4. Selecione a região mais próxima
5. Clique em "Create new project"

## 3. Configurar as Credenciais

1. No dashboard do projeto, vá para "Project Settings" > "API"
2. Você encontrará duas informações importantes:
   - Project URL (ex: https://xyzabc.supabase.co)
   - anon/public key (começa com "eyJ...")
3. Copie essas informações

## 4. Configurar no Admin

1. No painel admin do ArclimaFrio, vá para "Conexão Supabase"
2. Cole a URL do projeto e a chave anônima nos campos correspondentes
3. Clique em "Salvar Conexão"
4. Use o botão "Testar Conexão" para verificar se está funcionando
5. Se necessário, use "Importar Dados" para migrar dados existentes

## 5. Verificar Funcionalidades

Após a configuração, verifique se as seguintes funcionalidades estão operando corretamente:

- Upload de imagens de produtos
- Gerenciamento de produtos
- Gerenciamento de banners
- Configurações da loja (logo, etc)
- Pedidos e dados de clientes

## Observações Importantes

- Mantenha suas chaves de API seguras e nunca as compartilhe
- Faça backup regular dos dados
- Monitore o uso do banco de dados e armazenamento
- Em caso de problemas, verifique os logs no dashboard do Supabase