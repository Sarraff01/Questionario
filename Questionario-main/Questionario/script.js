document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('lifestyleForm');
    const messageElement = document.getElementById('message');
    const exerciseRadios = document.querySelectorAll('input[name="practiceExercise"]');
    const frequencyInput = document.getElementById('frequency');

    // Função para mostrar a mensagem de feedback
    function showMessage(text, type) {
        messageElement.textContent = text;
        messageElement.className = type + ' hidden'; // Garante que começa com 'hidden'
        
        // Remove 'hidden' para exibir e adiciona o tipo de estilo (success ou error)
        setTimeout(() => {
            messageElement.classList.remove('hidden');
        }, 10); 
    }

    // Lógica para controle condicional do campo de frequência
    function toggleFrequencyInput() {
        const selectedValue = document.querySelector('input[name="practiceExercise"]:checked');
        
        if (selectedValue && selectedValue.value === 'Não') {
            frequencyInput.value = 0;
            frequencyInput.disabled = true;
        } else {
            frequencyInput.disabled = false;
        }
    }

    // Inicializa o controle e adiciona o listener
    toggleFrequencyInput();
    exerciseRadios.forEach(radio => {
        radio.addEventListener('change', toggleFrequencyInput);
    });

    // Listener para o envio do formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão

        messageElement.classList.add('hidden'); // Oculta mensagens anteriores
        
        // 1. Coleta os dados do formulário
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // 2. Simulação de Validação Adicional (Exemplo: Idade mínima)
        if (parseInt(data.age) < 15) {
            showMessage("Erro: A idade mínima para participar é 18 anos.", "error");
            return;
        }

        // 3. Processamento/Envio (Simulado)
        // Em um ambiente real, você enviaria 'data' para um servidor via fetch() ou XMLHttpRequest.

        console.log("Dados coletados:", data);
        
        // Simulação de sucesso
        showMessage("Pesquisa enviada com sucesso! Obrigado pela sua participação.", "success");

        // Limpa o formulário após 3 segundos
        setTimeout(() => {
            form.reset();
            messageElement.classList.add('hidden');
            toggleFrequencyInput(); // Reseta o estado condicional
        }, 3000);
    });
});
// Trecho do script.js que cuida do campo condicional:
// ...

    // Lógica para controle condicional do campo de frequência
    function toggleFrequencyInput() {
        const selectedValue = document.querySelector('input[name="practiceExercise"]:checked');
        
        if (selectedValue && selectedValue.value === 'Não') {
            frequencyInput.value = 0;
            frequencyInput.disabled = true;
        } else {
            frequencyInput.disabled = false;
        }
    }
// ...
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('lifestyleForm');
    const messageElement = document.getElementById('message');
    const exerciseRadios = document.querySelectorAll('input[name="practiceExercise"]');
    const frequencyInput = document.getElementById('frequency');

    // --- VARIÁVEL DE CONFIGURAÇÃO IMPORTANTE ---
    // Em um ambiente de desenvolvimento real, este seria o endpoint do seu backend (ex: Node.js, PHP, Python).
    const API_ENDPOINT = '/api/submit-lifestyle-data'; 

    // Função para mostrar a mensagem de feedback
    function showMessage(text, type) {
        // Oculta rapidamente para garantir que a transição ocorra
        messageElement.classList.add('hidden'); 
        
        messageElement.textContent = text;
        messageElement.className = type; // Define a classe (success ou error)
        
        // Exibe após um pequeno atraso
        setTimeout(() => {
            messageElement.classList.remove('hidden');
        }, 10); 
    }

    // Lógica para controle condicional do campo de frequência
    function toggleFrequencyInput() {
        const selectedValue = document.querySelector('input[name="practiceExercise"]:checked');
        
        if (selectedValue && selectedValue.value === 'Não') {
            frequencyInput.value = 0;
            frequencyInput.disabled = true;
        } else {
            frequencyInput.disabled = false;
        }
    }

    // Inicializa o controle e adiciona o listener
    toggleFrequencyInput();
    exerciseRadios.forEach(radio => {
        radio.addEventListener('change', toggleFrequencyInput);
    });

    // Listener para o envio do formulário
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        messageElement.classList.add('hidden'); // Oculta mensagens anteriores
        
        // 1. Coleta os dados do formulário
        const formData = new new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // 2. Simulação de Validação Adicional (Exemplo: Idade mínima)
        if (parseInt(data.age) < 15) {
            showMessage("Erro: A idade mínima para participar é 15 anos.", "error");
            return;
        }
        
        // 3. Preparação dos dados para envio (JSON)
        // O servidor espera que você envie um objeto JSON.
        const jsonData = JSON.stringify(data);
        console.log("Dados prontos para envio:", jsonData);

        // 4. SIMULAÇÃO DE ENVIO PARA O SERVIDOR (BACKEND)
        // Em um ambiente real, esta função faria o envio. Aqui, vamos simular o sucesso.
        try {
            // Em produção, a linha de fetch seria:
            // const response = await fetch(API_ENDPOINT, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: jsonData
            // });

            // SIMULAÇÃO DE REQUISIÇÃO (2 segundos de atraso para dar tempo de visualizar)
            await new Promise(resolve => setTimeout(resolve, 2000)); 
            
            // SIMULAÇÃO DE RESPOSTA DE SUCESSO DO SERVIDOR (HTTP 201 Created)
            const simulatedResponse = { ok: true, status: 201, message: "Dados registrados com sucesso." }; 
            
            if (simulatedResponse.ok) {
                // Se o servidor retornar 200/201
                showMessage("Pesquisa enviada com sucesso! Obrigado, " + (data.name || 'participante') + ".", "success");
            } else {
                // Se o servidor retornar 4xx/5xx (simulação de erro)
                const errorData = await simulatedResponse.json(); // Se houver dados de erro
                showMessage(`Erro no envio: ${errorData.message || 'Falha ao conectar com o banco de dados.'}`, "error");
            }

        } catch (error) {
            // Se houver um erro de rede ou na URL do fetch()
            console.error("Erro ao enviar dados:", error);
            showMessage("Erro de conexão! Não foi possível enviar a pesquisa. Tente novamente.", "error");
        }

        // Limpa o formulário após 5 segundos, se o envio foi bem-sucedido (simulado)
        if (form.checkValidity()) {
            setTimeout(() => {
                form.reset();
                messageElement.classList.add('hidden');
                toggleFrequencyInput(); // Reseta o estado condicional
            }, 5000);
        }
    });
});