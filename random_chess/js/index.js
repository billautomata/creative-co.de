/* jshint unused:false */
/* global noise */

var resize_functions = []

run()




function run() {

  noise.seed(Math.random());

  window.__data = {}
  window.current_frame = {}
  window.current_frame_paused = {}
  window.animation_intervals = {}
  window.particles = {}
  window.particles_pause = {}

  draw_inital_findings()

  draw_moves_histograms()
  draw_captures_histograms()
  //
  var p = 'k'
  // //
//  draw_vectorfield('random', p)
  // // draw_vectorfield('masters', 'all')
  // // draw_vectorfield('b')
  //
  create_heatmaps(p,true)
  create_vectorfield()
  // draw_heatmaps('masters', p)
  // draw_heatmaps('masters', 'b')
  // draw_heatmaps('masters', 'r')
  // draw_heatmaps('masters', 'n')
  // draw_heatmaps('masters', 'k')
  // draw_heatmaps('masters', 'q')

  // return;
  //
  // // check states
  // var check_states_normalized_for_duration_of_game_random = [422,2384,4348,6191,7487,8870,10083,11078,12149,12738,13904,14351,15175,15845,16401,17485,18002,18355,19469,19832,21603,21813,22875,23853,23976,26249,26979,27735,29272,29563,31537,32152,33413,34197,35391,36895,37979,38833,40046,39692,42631,42450,43289,44074,45243,46305,46745,47279,48463,45565,52710,50112,50943,51353,51567,52445,52932,52933,53538,52212,55301,54050,54610,54298,54764,55190,55134,54982,55721,54864,56368,55472,55935,55722,54120,57539,55962,55608,55873,54359,57175,55746,55973,55449,55673,56017,55772,55289,55734,54813,56229,55150,55529,55373,55108,55459,55486,55316,57298,50549]
  //
  // draw_histogram(check_states_normalized_for_duration_of_game_random,2.0)
  //
  // var check_states_normalized_for_duration_of_game_masters = [0,31,388,959,1681,2209,2669,3021,3359,3094,3577,3417,3492,3397,3404,3279,3416,3272,3387,2833,3837,3454,3294,3549,3244,4202,3746,3763,4156,3958,4585,4286,4641,4808,4757,5135,5365,5554,5830,5372,6880,6574,6791,6847,7208,7734,8045,7947,8695,6691,11004,9376,9596,10201,10150,10684,11370,11421,12071,11148,13845,12888,13499,13490,14113,15037,15061,15343,15917,15774,17365,17105,17485,18194,16401,20421,19850,19858,20067,18545,23702,21683,22196,22837,23085,24672,25195,25079,26472,25626,29142,28634,30006,30977,30491,33755,34098,29856,42171,11934]
  //
  // draw_histogram(check_states_normalized_for_duration_of_game_masters,2.0)
  //
  // // what captured what
  // var results = {
  //   q: { p: 170134, b: 43633, n: 47753, r: 38071, q: 24920 },
  //   p: { r: 65464, p: 340739, q: 38040, n: 82468, b: 69914 },
  //   k: { q: 79250, p: 101292, n: 83999, r: 115825, b: 89772 },
  //   n: { p: 203779, b: 58080, r: 51124, q: 32134, n: 47680 },
  //   b: { p: 224918, n: 73489, q: 34582, r: 72117, b: 62382 },
  //   r: { n: 80014, q: 41138, r: 79825, p: 198371, b: 83873 }
  // }
  //
  // var masters_results = {
  //   p: { p: 1119684, n: 163537, b: 162650, q: 37294, r: 40014 },
  //   n: { p: 373207, n: 261440, b: 143897, q: 34144, r: 47460 },
  //   b: { n: 311012, b: 249856, p: 262204, q: 29890, r: 68562 },
  //   q: { p: 246186, n: 91534, q: 156383, b: 127481, r: 73165 },
  //   k: { q: 18853, b: 44821, n: 17796, p: 73256, r: 35356 },
  //   r: { r: 321697, n: 84349, q: 69253, b: 110518, p: 327247 }
  // }
  //
  // var max_moves_per_game_masters = 400
  // var moves_per_game_histogram_masters = [0,254,11,3,8,7,15,20,17,49,35,81,66,163,106,259,187,378,322,741,571,818,662,1100,872,1244,998,1391,1133,1645,1357,1853,1414,1956,1578,1951,1570,2266,1681,2462,1897,2568,1896,2685,2028,2844,2190,3143,2293,3283,2544,3389,2496,3469,2695,3701,2736,3755,2893,4247,3749,4471,3340,4417,3270,4268,3295,4342,3237,4283,3509,4429,3555,4478,3356,4409,3280,4450,3582,5013,5988,8021,5245,5292,3807,4202,3148,3953,2840,3456,2735,3171,2671,2968,2436,2914,2349,2760,2281,2587,2186,2605,2085,2390,1974,2216,1944,2247,1712,2160,1732,1969,1845,2138,1795,1885,1490,1704,1428,1830,1898,1774,1431,1484,1090,1235,1030,1165,937,1065,978,1081,897,877,763,782,720,725,657,738,597,627,532,615,547,687,522,530,449,525,415,405,354,405,364,409,318,327,265,308,314,271,239,285,211,234,205,223,167,190,160,198,158,193,152,152,130,167,137,137,152,137,103,113,86,112,96,108,86,78,80,74,82,67,56,55,56,61,56,70,76,59,51,60,35,47,28,44,51,50,42,35,18,46,45,47,27,34,21,25,21,33,18,23,34,34,18,23,23,14,18,17,14,20,12,16,20,14,11,17,16,12,18,11,13,13,9,11,11,8,7,8,6,11,12,5,10,8,6,4,1,3,8,7,5,8,11,10,2,8,4,4,6,4,3,8,1,9,8,3,1,4,0,1,2,3,2,4,0,0,2,2,6,1,1,2,1,0,7,3,2,2,1,1,1,2,0,3,2,1,1,3,1,0,2,0,1,0,2,1,2,2,1,1,2,2,0,5,0,2,2,0,2,0,0,0,1,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0]
  //
  // draw_histogram(moves_per_game_histogram_masters)
  //
  // var max_moves_per_game_random = 818
  // var moves_per_game_histogram_random = [0,0,0,0,8,3,9,6,11,10,11,17,13,17,7,16,8,11,14,22,20,16,13,18,18,14,21,22,16,18,21,24,30,31,16,21,18,26,31,17,33,35,23,29,32,29,38,40,37,33,23,41,46,38,45,31,35,49,47,52,49,45,53,50,51,35,57,57,49,50,53,59,48,60,53,51,61,62,67,75,59,58,62,67,72,57,70,70,72,69,67,61,58,77,79,60,82,61,55,64,84,68,86,67,63,83,75,77,71,74,89,64,88,80,70,77,91,81,77,82,86,76,74,99,81,78,94,83,82,84,74,80,83,88,78,89,101,78,78,87,82,78,102,89,73,73,92,79,87,83,102,102,77,73,82,67,79,88,89,82,72,81,50,80,79,90,88,83,101,109,95,90,81,74,79,80,68,78,85,77,80,80,100,78,93,83,80,86,99,79,86,90,94,79,107,81,70,100,74,94,97,108,87,95,83,100,62,107,87,101,82,101,97,105,103,102,114,111,110,108,103,106,112,101,129,110,102,108,113,117,112,127,135,113,128,102,136,118,125,130,116,143,160,147,125,120,145,156,159,148,159,178,170,158,189,177,193,180,196,147,193,179,197,208,216,215,224,214,235,228,219,218,213,241,239,240,217,255,239,246,261,274,256,258,273,266,266,262,276,275,264,288,323,313,312,316,318,308,299,276,309,321,301,311,312,309,323,351,355,377,381,356,360,380,379,362,349,414,366,385,383,408,387,408,417,435,401,423,408,396,411,430,434,411,399,424,402,407,437,437,431,422,420,424,418,415,490,427,453,430,411,458,412,449,439,428,415,436,420,469,422,446,456,423,428,424,431,436,438,404,451,420,427,453,468,426,469,446,436,417,432,427,426,428,408,402,407,405,381,426,408,407,420,428,395,420,391,425,421,408,362,391,398,397,387,380,383,384,376,371,343,391,368,330,387,362,320,318,343,337,340,348,329,341,313,336,350,301,299,305,303,321,292,315,277,289,247,278,296,281,278,295,270,242,263,234,236,288,258,271,239,276,246,231,220,224,238,226,214,249,232,240,218,196,214,217,198,197,177,180,201,186,202,158,193,198,170,163,150,165,160,161,170,170,155,163,149,156,116,148,122,140,151,127,116,113,118,115,140,110,125,115,100,103,134,100,103,130,102,101,95,92,91,91,88,104,88,75,75,110,95,87,77,74,67,71,85,78,61,70,68,73,62,60,62,55,56,59,58,71,77,39,44,54,58,43,39,52,43,53,43,43,50,54,45,42,45,40,38,38,35,39,38,31,31,22,30,48,21,21,32,33,34,22,24,26,24,24,21,27,24,32,20,25,33,16,17,18,17,11,17,20,18,18,14,16,17,18,21,18,15,18,20,14,8,16,19,7,17,13,16,7,15,21,13,8,11,10,15,16,8,6,10,10,6,10,6,11,6,8,8,7,10,6,4,5,8,4,6,7,4,4,7,4,8,9,3,2,5,6,4,5,2,7,4,8,3,3,4,5,3,2,2,1,4,3,2,5,4,1,1,3,2,0,1,2,3,3,1,3,2,2,0,1,5,2,2,1,1,2,1,2,0,1,1,2,4,2,0,0,0,2,1,0,0,3,1,0,1,3,0,2,0,2,1,1,1,0,0,1,4,0,0,1,0,0,0,1,0,2,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,2,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
  //
  // draw_histogram(moves_per_game_histogram_random)
  //
  // console.log('hello world')
  //
  // console.log('random')
  // draw_captured_graph(results)
  //
  // console.log('masters')
  // draw_captured_graph(masters_results)

} // end of run()


function draw_moves_histograms(){

  d3.json('json/moves.per.game.histogram.combined.json', function(json){

    console.log(json)
    draw_histogram_moves({
      values: json.random,
      div_id: 'moves_histogram_random',
      max_x: json.random.length,
      title: 'random'
    })
    draw_histogram_moves({
      values: json.masters,
      div_id: 'moves_histogram_masters',
      max_x: json.random.length,
      title: 'masters'
    })

  })

}

function draw_captures_histograms(){

  d3.json('json/check_states_normalized.combined.json', function(json){

    console.log(json)
    draw_histogram_captures({
      values: json.random,
      div_id: 'moves_histogram_random',
      max_y: d3.max(json.random),
      title: 'random'
    })
    draw_histogram_captures({
      values: json.masters,
      div_id: 'moves_histogram_masters',
      max_y: d3.max(json.random),
      title: 'masters'
    })

  })

}

function draw_inital_findings(){

  d3.json('json/initial_findings.json', function(json){

    // horizontal bar chart for wins and losses
    create_horizontal_bar_chart('random', json.number_of_games_random, json.number_of_wins_random)
    create_horizontal_bar_chart('masters', json.number_of_games_masters, json.number_of_wins_masters)

  })

  function create_horizontal_bar_chart(type, a,b){

    var div_container = d3.select('div#initial_findings_'+type)

    var scale_y = d3.scale.linear().domain([ 0, a ]).range([ 0, 100 ])

    var svg = div_container.append('svg')
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("viewBox", "0 0 100 15")
      .attr('id', 'piece')
      .attr('width', parseInt(div_container.style('width')) * 0.95)
      //.attr('height', parseInt(div_container.style('width')) * 0.95)

    var g_root = svg.append('g')

    g_root.append('rect')
        .attr('class', 'game_wins_'+type)
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', scale_y(b))
        .attr('height', 15)

    g_root.append('text')
      .text('win')
      .attr('class', 'initial_findings_text')
      .attr('x', scale_y(b) * 0.5 )
      .attr('y', 7)
      .attr('dy', '0.333em')

    g_root.append('rect')
        .attr('class', 'game_losses_'+type)
        .attr('x', scale_y(b))
        .attr('y', 0)
        .attr('width', scale_y(a-b))
        .attr('height', 15)

    g_root.append('text')
      .text('draw')
      .attr('class', 'initial_findings_text')
      .attr('x', scale_y(b) + (scale_y(a-b) * 0.5 ))
      .attr('y', 7)
      .attr('dy', '0.333em')

    g_root.append('text')
      .text('n = '+(a))
      .attr('x', scale_y(a) * 0.99 )
      .attr('y', 14)
      .attr('dy', '0.333em')
      .attr('font-size', '1.333px')
      .attr('fill', 'rgb(220,220,220)')
      .attr('text-anchor', 'end')


  }


}


function draw_histogram_moves(options) {

  var values = options.values
  var div_id = options.div_id
  var max_x = options.max_x + 50
  var title = options.title

  var graph_height = 200
  var graph_width = parseInt(d3.select('div#moves_per_game').style('width'),10)

  var svg

  if (title === 'random') {
    svg = d3.select('div#moves_per_game').append('svg')
        .attr("preserveAspectRatio", "xMidYMid")
        .attr("viewBox", "0 0 "+graph_width+" " +(graph_height*2.0))
        .attr('id', 'piece')
        .attr('width', graph_width)
        .attr('height', graph_height*2.0)
  } else {
    svg = d3.select('div#moves_per_game').select('svg')
    console.log('here')
  }


  var g_root = svg.append('g')
    // .attr('transform', 'translate(25,10) scale(' + graph_width_multi + ',1)')

  if (options.title === 'masters') {
    console.log('here')
    g_root.attr('transform', 'translate(0,'+graph_height+')')
  }

  var scale_x_moves_per_game = d3.scale.linear().domain([0, max_x]).range([0, graph_width])
  var scale_y_number_of_games = d3.scale.linear().domain([0, d3.max(values)]).range([0, graph_height])

  for(var i = 0; i < max_x; i++){
    if(i%100 === 0 && i > 0){
      var line = g_root.append('rect')
        .attr('x', scale_x_moves_per_game(i))
        .attr('y', 0)
        .attr('width', 1.0)
        .attr('height', graph_height)
        .attr('stroke','rgb(250,250,250)')

    }
  }

  if (options.title === 'random') {

    var fill_color = '#0078B2'

    values.forEach(function(d, i) {

      var line = g_root.append('rect')
        .attr('transform', 'translate(0.0,' + (graph_height) + ')')
        .attr('x', scale_x_moves_per_game(i))
        .attr('y', 0)
        .attr('width', scale_x_moves_per_game(1))
        //.attr('height', scale_y_number_of_games(d))
        .attr('height', 0)
        .attr('stroke', fill_color)
        .attr('fill', fill_color)

      line.transition().delay(Math.random()*500).attr('transform', 'translate(0.0,' + (graph_height - scale_y_number_of_games(d)) + ')').attr('height', scale_y_number_of_games(d))

    })

    var g_legend = g_root.append('g')
      .attr('transform','translate('+(graph_width * 0.914)+',352)')

    g_legend.append('text')
      .text('occurrences ↕')
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill','rgba(0,0,0,0.5)')
      .style('font-size', '12px')
      .style('text-anchor', 'end')

    g_legend.append('text')
      .text('# moves ↔')
      .attr('x', 0)
      .attr('y', 15)
      .attr('fill','rgba(0,0,0,0.5)')
      .style('font-size', '12px')
      .style('text-anchor', 'end')


  } else {

    fill_color = '#B26200'

    values.forEach(function(d, i) {

      var line = g_root.append('rect')
        //.attr('transform', 'translate(0.0,' + (graph_height - scale_y_number_of_games(d)) + ')')
        .attr('x', scale_x_moves_per_game(i))
        .attr('y', 0)
        .attr('width', scale_x_moves_per_game(1))
        .attr('height', 0)
        .attr('stroke', fill_color)
        .attr('fill', fill_color)

      line.transition().delay(Math.random()*500).attr('height', scale_y_number_of_games(d))

    })


  }

  for(var i = 0; i < max_x; i++){
    if(i%100 === 0 && i > 0){

      if (options.title === 'masters') {
        var text_legend = g_root.append('text')
          .text(i)
          .attr('x', scale_x_moves_per_game(i)  + 4)
          .attr('y', graph_height-5)
          .attr('fill','rgba(0,0,0,0.5)')
          .attr('stroke', 'none')
          .style('font-size', '10px')
      }

    }
  }

}


function draw_histogram_captures(options) {

  var values = options.values
  var div_id = options.div_id
  var max_y = options.max_y
  var title = options.title


  var max_x = 100

  var graph_height = 200
  var graph_width = parseInt(d3.select('div#captures_over_time').style('width'),10)

  var svg

  if (title === 'random') {
    svg = d3.select('div#captures_over_time').append('svg')
        .attr("preserveAspectRatio", "xMidYMid")
        .attr("viewBox", "0 0 "+graph_width+" " +(graph_height*1.5))
        .attr('id', 'piece')
        .attr('width', graph_width)
        .attr('height', graph_height*1.5)
  } else {
    svg = d3.select('div#captures_over_time').select('svg')
    console.log('here')
  }

  var g_root = svg.append('g')
    // .attr('transform', 'translate(25,10) scale(' + graph_width_multi + ',1)')

  if (options.title === 'masters') {
    console.log('here')
    g_root.attr('transform', 'translate(0,'+graph_height+')')
  }

  var scale_x_moves_per_game = d3.scale.linear().domain([0, 100]).range([0, graph_width])
  var scale_y_number_of_games = d3.scale.linear().domain([0, 0.75]).range([0, graph_height])

  for(var i = 0; i < max_x; i++){
    if(i%10 === 0 && i > 0){
      var line = g_root.append('rect')
        .attr('x', scale_x_moves_per_game(i))
        .attr('y', 0)
        .attr('width', 1.0)
        .attr('height', graph_height)
        .attr('stroke','rgb(250,250,250)')

    }
  }

  if (options.title === 'random') {

    var fill_color = '#0078B2'

    values.forEach(function(d, i) {

      var line = g_root.append('rect')
        .attr('transform', 'translate(0.0,' + (graph_height) + ')')
        .attr('x', scale_x_moves_per_game(i))
        .attr('y', 0)
        .attr('width', scale_x_moves_per_game(1))
        //.attr('height', scale_y_number_of_games(d))
        .attr('height', 0)
        .attr('stroke', fill_color)
        .attr('fill', fill_color)

      line.transition().delay(Math.random()*500).attr('transform', 'translate(0.0,' + (graph_height - scale_y_number_of_games(d)) + ')').attr('height', scale_y_number_of_games(d))

    })



  } else {

    var fill_color = '#B26200'

    values.forEach(function(d, i) {

      var line = g_root.append('rect')
        //.attr('transform', 'translate(0.0,' + (graph_height - scale_y_number_of_games(d)) + ')')
        .attr('x', scale_x_moves_per_game(i))
        .attr('y', 0)
        .attr('width', scale_x_moves_per_game(1))
        .attr('height', 0)
        .attr('stroke', fill_color)
        .attr('fill', fill_color)

      line.transition().delay(Math.random()*500).attr('height', scale_y_number_of_games(d))

    })


  }

  for(var i = 0; i < max_x; i++){
    if(i%10 === 0 && i > 0){

      if (options.title === 'masters') {
        var text_legend = g_root.append('text')
          .text(i+'%')
          .attr('x', scale_x_moves_per_game(i)  + 4)
          .attr('y', graph_height * 0.5)
          .attr('fill','rgba(0,0,0,0.5)')
          .attr('stroke', 'none')
          .style('font-size', '10px')
      }

    }
  }

  if (options.title === 'masters') {

    var g_legend = g_root.append('g')
      .attr('transform','translate('+(graph_width * 0.88)+',40)')

    g_legend.append('text')
      .text('probability of king in check ↕')
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill','rgba(0,0,0,0.5)')
      .style('font-size', '12px')
      .style('text-anchor', 'end')

    g_legend.append('text')
      .text('% through game ↔')
      .attr('x', 0)
      .attr('y', 15)
      .attr('fill','rgba(0,0,0,0.5)')
      .style('font-size', '12px')
      .style('text-anchor', 'end')
  }


}

function draw_captured_graph(results) {

  var svg = d3.select('body').append('svg')
    .attr('width', 200)
    .attr('height', 550)
    .style('display', 'inline-block')


  var predator_total_captures = {}
  var prey_total_captures = {}

  ;
  ['q', 'p', 'k', 'n', 'b', 'r'].forEach(function(predator_name) {

    var predator = results[predator_name]

    if (predator !== undefined) {

      if (predator_total_captures[predator_name] === undefined) {
        predator_total_captures[predator_name] = 0
      }

      _.each(_.keys(predator), function(prey_name) {

        predator_total_captures[predator_name] += results[predator_name][prey_name]

        if (prey_total_captures[prey_name] === undefined) {
          prey_total_captures[prey_name] = 0
        }

        prey_total_captures[prey_name] += results[predator_name][prey_name]

      })

    }

  })

  normalize_results(predator_total_captures)
  normalize_results(prey_total_captures)

  console.log(predator_total_captures)
  console.log(prey_total_captures)

  // convert to array for d3

  var display_data_predator = []

  _.each(_.keys(predator_total_captures), function(predator_name) {

    display_data_predator.push({
      name: predator_name,
      value: predator_total_captures[predator_name]
    })

  })

  var display_data_prey = []

  _.each(_.keys(predator_total_captures), function(prey_name) {

    display_data_prey.push({
      name: prey_name,
      value: predator_total_captures[prey_name]
    })

  })

  display_data_predator.sort(function(a, b) {
    return a.name < b.name
  })
  display_data_prey.sort(function(a, b) {
    return a.name < b.name
  })

  /////////////////////////////////////////////////
  // DRAW

  var scale_y_predator_boxes = d3.scale.linear().domain([0, 1.0]).range([0, 500])

  var running_y = 0.0
  display_data_predator.forEach(function(predator) {

    var g_element_root = svg.append('g')
      .attr('transform', 'translate(0,' + running_y + ')')

    g_element_root.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 100)
      .attr('height', scale_y_predator_boxes(predator.value))
      .attr('fill', function() {
        return 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')'
      })

    g_element_root.append('text')
      .text(predator.name)
      .attr('x', 50)
      .attr('y', scale_y_predator_boxes(predator.value) * 0.5)
      .attr('fill', 'white')

    running_y += scale_y_predator_boxes(predator.value)

  })

}

function normalize_results(d) {

  var sum = 0
  _.each(_.keys(d), function(key_name) {
    sum += d[key_name]
  })

  _.each(_.keys(d), function(key_name) {
    d[key_name] /= sum
  })

}


function n_map(v, in_min, in_max, out_min, out_max) {
  return (v - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
