/*** Componente responsável pela parte superior da página ***/
define(['react','rotas'], function(React) {


  var tituloLogo = "Mapa das Organizações da Sociedade Civil";
  var tituloPortal = "O Portal";
  var tituloDados = "Dados";
  var usuarioLogado = "";

  //Componentes individuais
  var BotaoResponsivo = React.createClass({
    renderListItems: function(){
      var icons = [];
      var qtdeLinha = 3;
      for (var i = 0; i < qtdeLinha; i++) {
        icons.push(<span className="icon-bar"></span>);
      }
      return icons;
    },
    render: function () {
      return (
        <div>
          <a href="index.html" className="navbar-brand brand-master-style" contenteditable="true">
            <img src="img/simbolo.png" className="brand-style"></img>
            <span className="brand-text-style">{tituloLogo}</span>
          </a>
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-ex-collapse">
            <span className="sr-only">Toggle navigation</span>
            {this.renderListItems()}
          </button>
        </div>);
    }
  });

  var DropdownMenu = React.createClass({
    renderList: function(){
      var elems = [];
      for (var i=0; i< this.props.submenu.length; i++) {
        var l = this.props.submenu[i];
        //se titulo vir vazio entende-se que devemos adicionar um separador
        if (l.text=='') elems.push(<li className="divider"></li>);
        else elems.push(<li><a href={l.link}>{l.text}</a></li>);
      }
      return elems;
    },
    render: function () {
      return (<div>
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{this.props.titulo}<i className="fa fa-caret-down"></i></a>
              <ul className="dropdown-menu" role="menu">{this.renderList()}</ul>
              </div>);
    }
  });

  var Menu = React.createClass({
    renderListItems: function(){
      var items = [];

      for (var i = 0; i < this.props.headerObject.menuList.length; i++) {
        if(i==1){//posição em que o dropdown do Portal deve aparecer
          items.push(<li id="dropdown-menu-header" className="dropdown"><DropdownMenu submenu={this.props.headerObject.dropdown} titulo={tituloPortal}/></li>);
          items.push(<li><a href={this.props.headerObject.menuList[i].link}>{this.props.headerObject.menuList[i].text}</a></li>);
        }
        else if(i==2){//posição em que o dropdown do Dados deve aparecer
          items.push(<li id="dropdown-menu-header" className="dropdown"><DropdownMenu submenu={this.props.headerObject.menuDados} titulo={tituloDados}/></li>);
          items.push(<li><a href={this.props.headerObject.menuList[i].link}>{this.props.headerObject.menuList[i].text}</a></li>);
        }
        else if(i == this.props.headerObject.menuList.length-1){//posição em que o dropdown do Usuario Logado deve aparecer
          items.push(<li><a id="btnEntrar" className="btn-link"  data-toggle="modal" data-target="#modalLogin">{this.props.headerObject.menuList[i].text}</a></li>);
          items.push(<li id="dropdown-menu-header" className="dropdown logado menuLogado"><DropdownMenu submenu={this.props.headerObject.menuLogado} titulo={usuarioLogado}/></li>);
        }
        else{
          items.push(<li><a href={this.props.headerObject.menuList[i].link}>{this.props.headerObject.menuList[i].text}</a></li>);
        }
      }
      return items;
    },
    render: function () {
      return (
        <div>
          <ul className="nav navbar-nav navbar-right">{this.renderListItems()}</ul>
        </div>
      );
    }
  });

  //Componente COMPLETO do cabeçalho
  var Header = React.createClass({

    getComponent: function(index) {



      if( index == 1){
          desativaContraste();
      }
      else if (index == 2) {
          ativaContraste();
      }
      else if (index == 3) {

        var size = $("body").css('font-size');

        size = size.replace('px', '');
        size = Number(size) + 0.5;
        if (size <= 18) {
          $("body").animate({
            'font-size' : size + 'px'
          });
        }

      }
      else if (index == 4) {

        $("body").animate({
          'font-size' : '14px'
        });

      }
      else if (index == 5) {
        var size = $("body").css('font-size');

        size = size.replace('px', '');
        size = Number(size) - 0.5;
        if (size >= 11) {
          $("body").animate({
            'font-size' : size + 'px'
          });
        }
      }else if (index == 6) {

          var email =  $('#emailLogin').val();
          var senha =  $('#senhaLogin').val();
          jQuery("#labelError").text("");


          if (!validaEmail(email)){
            $("#emailLogin.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
            jQuery("#labelError").text("Endereço de e-mail inválido.");
            return false;
          }else{
            $("#emailLogin.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
          }

          if (senha.length < 5){
            $("#senhaLogin.form-control").closest('.form-group').removeClass('has-success').addClass('has-error');
            jQuery("#labelError").text("Senha inválida.");
            return false;
          }else{
            $("#senhaLogin.form-control").closest('.form-group').removeClass('has-error').addClass('has-success');
          }

          var $json = {
              "tx_email_usuario": email,
              "tx_senha_usuario": senha
          };

          var rotas = new Rotas();

          $.ajax({
          // CORRETO url: rotas.Login(),//"http://mapaosc-desenv.ipea.gov.br:8383/api/user/login/",
          url: "http://mapaosc-desenv.ipea.gov.br:8383/api/user/login/",
          type: 'POST',
          dataType: 'json',
          data: $json,
           success: function (data) {
            jQuery("#labelError").text("");
            window.localStorage.setItem('User', data.id_usuario);
            window.localStorage.setItem('Authorization', data.access_token);
            window.localStorage.setItem('Nome', data.tx_nome_usuario);
            $('#modalLogin').modal('hide');
            verificarLogado();
          },
          error: function (data) {
              console.log(data);
              if (data.status == 200){
                console.log(data.responseText.tx_nome_usuario);   
                jQuery("#labelError").text("");
                window.localStorage.setItem('User', data.responseText.id_usuario);
                window.localStorage.setItem('Authorization', data.responseText.access_token);
                window.localStorage.setItem('Nome', data.responseText.tx_nome_usuario);
                $('#modalLogin').modal('hide');
                verificarLogado();
              }else {
                jQuery("#labelError").text("Senha incorreta. Tente novamente.");
                console.log(data.responseText);
              }
          }
      });

      }
      else if (index == 0) {
      }

  },
    render:function(){
      var headerObject = this.props.headerObject;

      return (
      <div>
        <div className="container extensao">
          <div id="topo_acessibilidade">
            <ul id="nav1">
              <li>Ir para o <a href="#conteudo" accesskey="1">Conteúdo [1]</a></li>
              <li>Ir para o <a href="#navbar-ex-collapse" accesskey="2">Menu [2]</a></li>
              <li>Ir para o <a href="#rodape" accesskey="3">Rodapé [3]</a></li>
            </ul>
            <ul id="nav2">
              <li><a href="acessibilidade.html" target="_self">Acessibilidade</a></li>
              <li id="contraste">Contraste <a id="contraste_normal" href="" data-toggle="tooltip" data-placement="bottom" onClick={this.getComponent.bind(this, 1)}><img src="img/contraste1.png" title="Contraste normal" width="13" height="14"/></a><a id="alto_contraste" href="" data-toggle="tooltip" data-placement="bottom" onClick={this.getComponent.bind(this, 2)}><img src="img/contraste2.png" title="Alto contraste" width="13" height="14"/></a></li>
              <li>Tamanho do texto
              <a href="#" data-toggle="tooltip" data-placement="bottom" title="Aumentar fonte" className="inc-font" onClick={this.getComponent.bind(this, 3)}> A+</a>
              <a href="#" data-toggle="tooltip" data-placement="bottom" title="Fonte padrão" className="res-font" onClick={this.getComponent.bind(this, 4)}> A</a>
              <a href="#" data-toggle="tooltip" data-placement="bottom" title="Diminuir fonte" className="dec-font" onClick={this.getComponent.bind(this, 5)}> A-</a></li>
            </ul>
          </div>
        </div>
        <div className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div id="menu-mobile" className="navbar-header"><BotaoResponsivo/></div>
            <div className="collapse navbar-collapse" id="navbar-ex-collapse"><Menu headerObject={headerObject}/></div>
          </div>
        </div>
        <div className="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="modalLogin">Identificação</h4>
              </div>
              <div className="modal-body">
                <form className="form-login">
                  <div className="form-group">
                    <label className="control-label">E-mail: <span className="obrigatorio glyphicon-asterisk">(Campo Obrigatório)</span></label>
                    <input className="form-control" id="emailLogin" placeholder="Email" type="text"></input>
                  </div>
                  <div className="form-group">
                    <label className="control-label">Senha: <span className="obrigatorio glyphicon-asterisk">(Campo Obrigatório)</span></label>
                    <input className="form-control" id="senhaLogin" placeholder="Senha" type="password"></input>
                  </div>
                  <div className="form-group row-centered">
                       <span id="labelError" className="label label-danger centered"></span>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <a type="submit" className="btn btn-success" onClick={this.getComponent.bind(this, 6)}>Entrar</a>
                <a className="btn btn-danger" data-dismiss="modal">Cancelar</a>
                <a type="button" className="btn btn-link" href="recuperar-senha.html">Esqueci a senha</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    }
  });

  //ReactDOM.render(<BotaoResponsivo icons={menu}/>, document.getElementById("menu-mobile"));
  //ReactDOM.render(<Menu items={menu}/>, document.getElementById("navbar-ex-collapse"));
  //ReactDOM.render(<DropdownMenu submenu={linksSubmenu}/>, document.getElementById("dropdown-menu-header"));
  //ReactDOM.render(<Header/>, document.getElementById("header"));
  return Header;
});


function validaEmail(email){

  var usuario = email.substring(0, email.indexOf("@"));
  var dominio = email.substring(email.indexOf("@")+ 1, email.length);

  if ((usuario.length >=1) &&
  (dominio.length >=3) &&
  (usuario.search("@")==-1) &&
  (dominio.search("@")==-1) &&
  (usuario.search(" ")==-1) &&
  (dominio.search(" ")==-1) &&
  (dominio.search(".")!=-1) &&
  (dominio.indexOf(".") >=1)&&
  (dominio.lastIndexOf(".") < dominio.length - 1)) {
    return true;
  }else{
    return false;
  }
}
