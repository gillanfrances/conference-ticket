$(document).ready(function () {
    const $uploadArea = $('.upload');
    const $fileInput = $('#avatar');

    $uploadArea.on('click', function () {
        $fileInput.click();
    });

    $uploadArea.on('dragover dragenter', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).addClass('drag-over');
    });

    $uploadArea.on('dragleave dragend drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass('drag-over');
    });

    $uploadArea.on('drop', function (e) {
        // Get the files from the drop event
        const files = e.originalEvent.dataTransfer.files;
        
        if (files.length > 0) {
            $fileInput[0].files = files;
            $fileInput.trigger('change');
        }
    });

    $fileInput.on('change', function () {
        const file = this.files[0];
        const $valText = $('.validation-text');

        if (file) {
            if (file.size > 512000) {
                $valText.css('color', '#ff7070').text("File is too large! Max 500KB.");
                this.value = ""; 
                return;
            }

            $valText.css('color', '').html('<img src="assets/images/icon-info.svg" /> Image accepted.');

            const reader = new FileReader();
            reader.onload = function (e) {
                $('.fileupload').html(`
                    <img src="${e.target.result}" style="width: 50px; height: 50px; border-radius: 5px; object-fit: cover;">
                    <p style="font-size: 0.7rem; margin-top: 5px;">Image uploaded!</p>
                `);
            };
            reader.readAsDataURL(file);
        }
    });

    $('button[type="submit"]').on('click', function (e) {
        e.preventDefault();

        $('.error-msg').hide();
        
        const fullName = $('#fullname').val().trim();
        const email = $('#email').val().trim();
        const github = $('#github').val().trim();
        const avatar = $('#avatar')[0].files[0];

        let isValid = true;

        if (fullName === "") {
            $('#name-error').fadeIn();
            isValid = false;
        }

        const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (email === "" || !emailReg.test(email)) {
            $('#email-error').fadeIn();
            isValid = false;
        }

        if (github === "") {
            $('#github-error').fadeIn();
            isValid = false;
        }
        
        if (!avatar) {
            $('.validation-text').css('color', '#ff7070');
            isValid = false;
        }

        if (isValid) {
    $('.name-gradient').text(fullName);
    $('.email-highlight').text(email);
    $('#ticket-name-display').text(fullName);
    $('#ticket-github-display').text(github);

    const randomTicketID = Math.floor(10000 + Math.random() * 90000);
    $('.ticket-id').text(`#${randomTicketID}`);
    
    const reader = new FileReader();
    reader.onload = function (e) {
        $('#ticket-img').attr('src', e.target.result);
    };
    reader.readAsDataURL($('#avatar')[0].files[0]);

    $('.form, h2:not(.success h2), p:not(.success p)').fadeOut(300, function () {
        $('.success').fadeIn();
    });
}
    });
});
