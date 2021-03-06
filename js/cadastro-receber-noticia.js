require(["jquery-ui"], function (React) {

  $(document).tooltip({
    position: {
      my: "center bottom-20",
      at: "center top",
      using: function( position, feedback ) {
        $( this ).css( position );
        $( "<div>" )
          .addClass( "arrow" )
          .addClass( feedback.vertical )
          .addClass( feedback.horizontal )
          .appendTo( this );
      }
    }
  });

  $("#email.form-control").blur(function(event, ui) {
      var email = this.value;
      if (validaEmail(email)) {
          var id_attr = "#" + $("#email.form-control").attr("id") + "1";
          $("#email.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
          $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
      } else {
          var id_attr = "#" + $("#email.form-control").attr("id") + "1";
          $("#email.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
          $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
      }
  });

 //inicio btn.btn-success.click
 var div = $(".form-group");
  div.find(".btn.btn-success").on("click", function() {

    //Captcha
    if(grecaptcha.getResponse().length == 0) {
      jQuery("#labelCaptcha").text("Resolver o Captcha.");
      return false;
    }else{
      jQuery("#labelCaptcha").text("");
    }

    var $nome = $('#nome').val();
    var $email = $('#email').val();
    var $modal = $('#modalMensagem');

    if (!validaEmail($email)) {
        $("#email.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
        return false;
    } else {
        $("#email.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
    }

    var $json = {"tx_nome_assinante": $nome, "tx_email_assinante": $email};

    $('#loading').show();
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8383/api/user/newsletter/',
      data:$json,
      dataType: 'json',
      success: function(data) {
          console.log(data.responseText);
          $modal.modal('show');
      },
      error: function(e) {
         console.log(e);
          jQuery("#modalTitle").text("Problema na solicitação!");
          if (e.status==500){
            jQuery("#modalConteudo").text("Sistema indisponível no momento. Por favor, tente mais tarde.");
          }else{
            try{
                $msg =JSON.parse(e.responseText).message;
             }catch(e){
                $msg = "Sistema indisponível no momento. Por favor, tente mais tarde.";
             }
            jQuery("#modalConteudo").text($msg);
          }
          $modal.modal('show');
          return false
      },
      complete: function(){
        $('#loading').hide();
      }
    });
  }); //Final btn click

});


function validaEmail(email) {
    usuario = email.substring(0, email.indexOf("@"));
    dominio = email.substring(email.indexOf("@") + 1, email.length);

    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") == -1) &&
        (dominio.search("@") == -1) &&
        (usuario.search(" ") == -1) &&
        (dominio.search(" ") == -1) &&
        (dominio.search(".") != -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        return true;
    } else {
        return false;
    }
}
