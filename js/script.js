'use strict';

document.addEventListener('DOMContentLoaded', e => {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();
        let error  = formValidate(form);

        let formData =  new FormData(form);
        formData.append('image', formImage.files[0]);

        if(error === 0) {
            form.parentElement.classList.add('_sending');
             let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
             });
             if(response.ok) {
                 let result = await response.json();
                 alert(result.message);
                 formPreview.innerHTML = ``;
                 form.reset(); 
                 form.parentElement.classList.remove('_sending');
             } else {
                alert('Ошибка');
                form.parentElement.classList.remove('_sending');
             }

        } else {
            alert('Заполните обязательные поля');
        }
    }


    function formValidate (form) {
        let error  = 0;
        let formReq = document.querySelectorAll('._req');

        for(  let i = 0; i < formReq.length; i++ ) {
            const input  = formReq[i];
            formRemoveError(input);

            if(input.classList.contains('_email')) {
                 if(emailTest(input)) {
                    formAddError(input);
                    error++;
                 } 
            }else if(input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
             } else {
                   if(input.value === '') {
                    formAddError(input);
                    error++;
                   }
             }
 
        }
        return error;
    }


    function formAddError (input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError (input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    // Функция теста email
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    const formImage = document.getElementById('formImage');
    const formPreview = document.getElementById('formPreview');
    // Слушаем изменение в инпуте file
    formImage.addEventListener('change', () => {
       uploadFile(formImage.files[0]);
    });

    function uploadFile(file) {
        // проверяем тип файла
        if(!['image/jpeg', 'iamge/png', 'iamge/gif'].includes(file.type)) {
            alert('Разрешены только изображения');
            formImage.value = '';
            return;
        }
        //проверяем размер файла (<2mb)
        if(file.size > 2 * 1024 * 1024) {
            alert('Файл должен быть менее 2Мб');
            return;
        }

        let reader = new FileReader();
        reader.onload = e => {
           formPreview.parentElement.insertAdjacentHTML(
                'beforeend',` <div>
                <img title="${e.target.result}" src="${e.target.result}" alt="Image">
           </div>`
            );
        }
        reader.onerror = e => {
           alert('Ошибка');
        };
        reader.readAsDataURL(file);





    }


});


