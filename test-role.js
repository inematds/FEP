// Test just the role topic
const test = {
    'role': {
        titulo: 'Role Prompting (Personas)',
        nivel: 'Iniciante',
        modulo: 2,
        icon: '🎭',
        introducao: `Role Prompting é atribuir uma 'persona' ou papel ao modelo. Ao dizer 'Você é um [especialista X]', você ativa conhecimentos e estilos específicos, moldando a resposta para o contexto desejado.`,

        conteudoCompleto: `Test content`
    }
};

console.log('Success!', test.role.titulo);
