

const questions = document.querySelectorAll('.question');
        let currentQuestionIndex = 0;
        let correctAnswersCount = 0;
        let countdown;

        function startCountdown() {
            let seconds = 10;
            updateCountdown();

            function updateCountdown() {
                document.querySelector('.countdown').textContent = `Temps restant : ${seconds} secondes`;
                seconds--;

                if (seconds < 0) {
                    questionSuivante();
                } else {
                    countdown = setTimeout(updateCountdown, 1000);
                }
            }
        }

        function resetCountdown() {
            clearTimeout(countdown);
            document.querySelector('.countdown').textContent = '';
        }

        function afficherQuestion(index) {
            resetCountdown();
            
            questions.forEach((question, i) => {
                if (i === index) {
                    question.style.display = 'block';
                } else {
                    question.style.display = 'none';
                }
            });

            startCountdown();
        }



        function questionSuivante() {
            resetCountdown();
            
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                afficherQuestion(currentQuestionIndex);
            } else {
                afficherResultats();
            }
        }

        function questionPrecedente() {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                afficherQuestion(currentQuestionIndex);
            }
        }

        function revien() {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                afficherQuestion(currentQuestionIndex);
            }
        }

        function suivant() {
            const dropZones = document.querySelectorAll('.choix-container');
            let elementsDeplaces = 0;

            dropZones.forEach(dropZone => {
                if (dropZone.children.length > 0) {
                    elementsDeplaces++;
                }
            });

            if (elementsDeplaces > 0) {
                verifierReponse(currentQuestionIndex);
            }

            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                afficherQuestion(currentQuestionIndex);
            } else {
                afficherResultats();
            }
        }



        // alert personnalisé du score total
        function afficherResultats() {
            const scoreSpan = document.getElementById('score');
            scoreSpan.textContent = `${correctAnswersCount}/${currentQuestionIndex}`;
            
            const modal = document.getElementById('resultModal');
            const overlay = document.getElementById('modalOverlay');

            modal.style.display = 'block';
            overlay.style.display = 'block';
        }

        // Fermer la modal
        function fermerModal() {
            const modal = document.getElementById('resultModal');
            const overlay = document.getElementById('modalOverlay');

            modal.style.display = 'none';
            overlay.style.display = 'none';
        }



        // afficher la première question au démarrage sinon page vide - le compteur commence par question 1
        afficherQuestion(currentQuestionIndex);


        // Drag and drop des résultats
        function dragStart(event) {
            event.dataTransfer.setData("text", event.target.id);
        }

        function drop(event) {
            event.preventDefault();

            const dropZone = event.target;
            const question = dropZone.closest('.question');
            const correctAnswer = question.getAttribute('data-correct');
            const choixElements = dropZone.getElementsByClassName('choix');

            if (choixElements.length === 0) {
                const data = event.dataTransfer.getData("text");
                const draggedElement = document.getElementById(data);

                const draggableElements = document.querySelectorAll(`.${question.classList[1]} .choix`);
                draggableElements.forEach(element => {
                    element.draggable = false;
                });

                if (dropZone.children.length > 0) {
                    dropZone.removeChild(dropZone.children[0]);
                }

                dropZone.appendChild(draggedElement);

                // Vérifiez si la réponse est correcte et incrémentez le compteur
                verifierReponse(correctAnswer, draggedElement.innerHTML.trim());
            }
        }

        function verifierReponse(reponseCorrecte, reponse) {
            if (reponseCorrecte == reponse) {
                correctAnswersCount++;
            }
        }

        function allowDrop(event) {
            const dropZone = event.target;
            if (dropZone.children.length === 0) {
                event.preventDefault();
            }
        }
