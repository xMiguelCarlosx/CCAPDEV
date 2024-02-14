function sidebar_toggle_animation() {

   const sidebar = document.querySelector('.sidebar');
   const toggleBtn = document.querySelector('.toggle-btn');

   toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
   })
}

function toggle_button_animation() {

   const sidebar = document.querySelector('.modify');
   const toggleBtn = document.querySelector('.modify-item');

   toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
   })
}


/*SETTINGS-------------------------- */
function update_profile_pic() {

   let profile_pic = document.getElementById("profile-pic");
   let input_file = document.getElementById("input-file");

   input_file.onchange = function () {
      profile_pic.src = URL.createObjectURL(input_file.files[0]);
   }
}

function edit_profile_description() {
   var description = document.getElementById('profile-description');
   description.contentEditable = 'true';
   document.getElementById('edit-function').style.display = 'none';
   document.getElementById('save-function').style.display = 'inline-block';
}

function save_profile_description() {
   var description = document.getElementById('profile-description');
   description.contentEditable = 'false';
   document.getElementById('edit-function').style.display = 'inline-block';
   document.getElementById('save-function').style.display = 'none';
}

function clear_profile_description() {
   var description = document.getElementById('profile-description');
   description.textContent = "";
}


function check_anonymous_status() {
    document.querySelector('.check-button').addEventListener('click', function() {
        document.querySelector('.anonymous-status').innerText = "Currently reserving as anonymous";
    });

    document.querySelector('.x-button').addEventListener('click', function() {
        document.querySelector('.anonymous-status').innerText = "Not reserving as anonymous";
    });
}

(function() {
    function delete_account() {
        var modal = document.querySelector(".popup-container");
        var btn = document.querySelector(".check-delete-account-button");
        var span = document.querySelector(".close-popup");
        var confirmDeleteBtn = document.querySelector(".confirm-delete-button");
        var cancelDeleteBtn = document.querySelector(".cancel-delete-button");
        var pageContent = document.querySelector(".page-content");

        btn.addEventListener("click", function() {
            modal.style.display = "block";
        });

        span.addEventListener("click", function() {
            modal.style.display = "none";
        });

        confirmDeleteBtn.addEventListener("click", function() {
            pageContent.innerHTML = "<p>Account deleted.</p>";
            modal.style.display = "none";
        });

        cancelDeleteBtn.addEventListener("click", function() {
            modal.style.display = "none";
        });
    }

    window.addEventListener("load", delete_account);
})();
