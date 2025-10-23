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