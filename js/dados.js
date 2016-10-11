require(['jquery-ui'], function (React) {
  $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
  $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
} );


require(["nv.d3.lib"], function (React) {

  var jsonGrafico3 = [{key: "Grafico 3", values: [{"label" : "CEBAS Educação", "value" : 4 }, {"label" : "CEBAS Saúde", "value" : 200 } ,{ "label" : "CEBAS Assistência Social" , "value" : 498 } , {"label" : "OSCIP", "value" : 7991}]}];
  var jsonGrafico4 = [{key: "Grafico 4", values: [{"label" : "FINEP", "value" : 5 }, {"label" : "SALIC", "value" : 515 } , { "label" : "SLIE" , "value" : 656 } , {"label" : "SICONV", "value" : 1921} , { "label" : "Tituladas ou Certificadas" , "value" : 8693 }, { "label" : "SIAFI" , "value" : 68021 } ]}];
  var jsonGrafico1 = [{"label": "Fundação Privada", "value" : 8123 } ,  {"label": "Organização Religiosa", "value" : 41587 } , { "label": "Associação Privado", "value" : 391582} ];
  var jsonGrafico2 = [{"label": "Fundação Privada", "value" : 330521 } ,  {"label": "Organização Religiosa", "value" : 35621 } , { "label": "Associação Privado", "value" : 1837907} ];
  var jsonGrafico5 = [{key: "Privada", values: [{"label" : "FINEP", "value" : 3355 }, {"label" : "CEBAS Educação", "value" : 4144 }, {"label" : "CEBAS Assistência Social", "value" : 1194 }]},
                      {key: "Publica", values: [{"label" : "FINEP", "value" : 3899 }, {"label" : "CEBAS Educação", "value" : 2155 }, {"label" : "CEBAS Assistência Social", "value" : 2124 }]},
                      {key: "Associacao", values: [{"label" : "FINEP", "value" : 4000 }, {"label" : "CEBAS Educação", "value" : 3166 }, {"label" : "CEBAS Assistência Social", "value" : 3144 }]}];
  var jsonGrafico6 = [
    {
      values: [{"x" : 0, "y" : 200 }, {"x" : 10, "y" : 300 }, {"x" : 20, "y" : 800 }],
      key: 'Privada'
    },
    {
      values: [{"x" : 0, "y" : 800 }, {"x" : 10, "y" : 700 }, {"x" : 20, "y" : 600 }],
      key: 'Publica'
    },
    {
      values: [{"x" : 0, "y" : 500 }, {"x" : 10, "y" : 600 }, {"x" : 20, "y" : 100 }],
      key: 'Associação'
    }
  ];

  var jsonGrafico71 = [
      {
        "key" : "Quantidade" ,
        "bar": true,
        "color": "#ccf",
        "values" : [ [ 2005 , 12710.0] , [ 2006 , 125000.0] , [ 2007 , 151000.0] , [ 2008 , 100] ]
      } ,
      {
        "key" : "Preço" ,
        "color" : "#333",
        "values" : [ [ 2005 , 71.89] , [ 2006 , 75.51] , [ 2007 , 68.49] , [ 2008 , 62.72] ]
      }
    ];
    var jsonGrafico7 = [
        {
          "key" : "Quantidade" ,
          "bar": true,
          "color": "#ccf",
          "values" : [ {"label" : 2005, "value" : 12710.0} , {"label" : 2006, "value" : 151000.0} , {"label" : 2007, "value" : 125000.0} , {"label" : 2008, "value" : 100} ]
        } ,
        {
          "key" : "Preço" ,
          "color" : "#333",
          "values" : [ {"label" : 2005, "value" : 71.89} , {"label" : 2006, "value" : 75.51} , {"label" : 2007, "value" : 68.49} , {"label" : 2008, "value" : 62.72} ]
        }
      ];

  createDonutChart('#grafico-1',jsonGrafico1);
  createDonutChart('#grafico-2',jsonGrafico2);
  createBarChart('#grafico-3',jsonGrafico3);
  createBarChart('#grafico-4',jsonGrafico4);
  createMultiBarChart('#grafico-5',jsonGrafico5);
  createLineChart('#grafico-6',jsonGrafico6);
  createLinePlusBarChart('#grafico-7',jsonGrafico7);

  jQuery('#tabGrafico a').click(function (e) {
      e.preventDefault()
      jQuery(this).tab('show')
      jQuery(window).trigger('resize'); // Added this line to force NVD3 to redraw the chart
  })


} );
