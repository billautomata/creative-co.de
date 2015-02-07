/* jshint unused:false */
/* global noise, n_map, resize_functions */

function create_heatmaps(piece, pause){

  if(pause === undefined){
    window.heatmap_pause = false
  }

  d3.select('div#heatmaps').html('')
  clearInterval(window.heatmap_interval)

  draw_heatmaps('masters', piece)
  draw_heatmaps('random', piece)

  var container_div = d3.select('div#heatmaps')
  var div_button_group = container_div.append('div')
    .attr('class', 'btn-group-sm btn-group-justified')

  div_button_group.append('div')
    .attr('class', 'btn btn-primary btn-sm')
    .html('reset')
    .on('click', function() {
      window.heatmap_frame = 0
    })

  var div_pause_play = div_button_group.append('div')
    .attr('class', 'btn btn-primary btn-sm')
    .html(function(){
        if(window.heatmap_pause){
          return '||'
        } else {
          return '▷'
        }

    })
    .on('click', function() {
      window.particle_pause = true
      window.heatmap_pause = !window.heatmap_pause


            if (window.heatmap_pause) {
              div_pause_play.html('▷')
            } else {
              div_pause_play.html('||')
            }

    })

  ;[ ['p','♟'], ['q','♛'], ['b','♝'], ['r','♜'], ['n','♞'], ['k','♚']].forEach(function(button){

    div_button_group.append('div')
      .attr('class', 'btn btn-primary btn-sm')
      .html(button[1])
      .on('click', function() {
        window.particle_pause = true
        create_heatmaps(button[0])
      })

  })



  var div_progressbar = container_div.append('div')
    .attr('class', 'progress')
    .append('div').attr('class', 'progress-bar').style('width', '0%')


  window.heatmap_frame = 0
  if(window.heatmap_pause === undefined){
      window.heatmap_pause = true
  }

  window.heatmap_interval = setInterval(function(){

    if (!window.heatmap_pause) {
      var scale_heat = d3.scale.linear().domain([ 0, d3.max(window.__data.masters[window.heatmap_frame]) ]).range([ 0.0, 1.0 ])

      d3.select('div#heatmaps').select('svg#masters').selectAll('text').each(function() {

        var board_index = parseInt(d3.select(this).attr('id'))

        d3.select(this).transition().duration(50).attr('fill-opacity', function() {
          var v = (scale_heat(window.__data.masters[window.heatmap_frame][board_index]))
          return v
        })

      })

      scale_heat = d3.scale.linear().domain([ 0, d3.max(window.__data.random[window.heatmap_frame]) ]).range([ 0.0, 1.0 ])

      d3.select('div#heatmaps').select('svg#random').selectAll('text').each(function() {

        var board_index = parseInt(d3.select(this).attr('id'))

        d3.select(this).transition().duration(50).attr('fill-opacity', function() {
          var v = (scale_heat(window.__data.random[window.heatmap_frame][board_index]))
          return v
        })

      })

      div_progressbar.style('width', window.heatmap_frame + '%')

      if (window.heatmap_pause) {
        div_pause_play.html('▷')
      } else {
        div_pause_play.html('||')
      }

      window.heatmap_frame += 1

      if (window.heatmap_frame >= 100) {
        window.heatmap_frame = 0
      }
    }

  }, 100)

}

function draw_heatmaps(type, piece) {

  var board_box_size = 55

  var graph_height = 8 * board_box_size
  var graph_width = 8 * board_box_size

  var container_div = d3.select('div#heatmaps').append('div')
    .attr('class', 'col-xs-6 map')
    .style('padding-bottom', '10px')

  var svg = container_div.append('svg')
    .attr("preserveAspectRatio", "xMidYMid")
    .attr("viewBox", "0 0 440 440")
    .attr('id', type)
    .attr('width', parseInt(container_div.style('width')) * 0.95)
    .attr('height', parseInt(container_div.style('width')) * 0.95)
  //
  // resize_functions.push(function(){
  //
  //   var width = parseInt(container_div.style('width')) * 0.95
  //   console.log(width)
  //   //var width = $(".map").width();
  //   svg.attr("width", width);
  //   svg.attr("height", width);
  //
  // })



  //
  //
  //
  // var div_frame_conter = div_button_group.append('div')
  //   .attr('class', 'clean_text_container')
  //
  // var div_count = div_frame_conter.append('div')
  //   .attr('class', 'clean_text')
  //   .style('background-color', 'rgb(66,255,255)')
  //   .style('height', '13px')
  //   .html(' ')

  d3.json('json/' + type + '.heatmaps_' + piece + '.json', function(json) {

    var piece_lut = {
      'p': '♟',
      'q': '♛',
      'b': '♝',
      'r': '♜',
      'n': '♞',
      'k': '♚',
    }

    console.log(json)
    if (window.__data[type] === undefined) {
      window.__data[type] = {}
    }
    window.__data[type] = json

    // draw the chessboard
    var g_root = svg.append('g')

    var stepper_for_id = 0

    for (var j = 0; j < 8; j++) {
      for (var i = 0; i < 8; i++) {

        g_root.append('rect')
          .attr('x', n_map(i, 0, 8, 0, graph_width))
          .attr('y', n_map(j, 0, 8, 0, graph_height))
          .attr('width', (graph_width / 8.0))
          .attr('height', (graph_height / 8.0))
          .attr('fill-opacity', 0.05)
          .attr('fill', function() {
            if (j % 2 === 1) {

              if (i % 2 === 0) {
                return 'black'
              } else {
                return 'white'
              }

            } else {

              if (i % 2 === 1) {
                return 'black'
              } else {
                return 'white'
              }

            }
          })

        //
        //
        // g_root.append('rect')
        //   .attr('id', stepper_for_id)
        //   .attr('x', n_map(i, 0, 8, 0, graph_width))
        //   .attr('y', n_map(j, 0, 8, 0, graph_height))
        //   .attr('width', (graph_width / 8.0))
        //   .attr('height', (graph_height / 8.0))
        //   .attr('fill', 'none')

        g_root.append('text')
          .attr('id', stepper_for_id)
          .text(piece_lut[piece])
          .attr('x', n_map(i, 0, 8, 0, graph_width))
          .attr('y', n_map(j, 0, 8, 0, graph_height))
          .attr('dx', graph_width / 16.0)
          .attr('dy', graph_width / 12.0)
          .style('text-anchor', 'middle')
          .style('font-size', 40)
          .style('fill', function(){

            if(type === 'random'){
              return '#0078B2'
            } else {
              return '#B26200'
            }

          })

        stepper_for_id += 1
      }
    }



  }) // end of d3.json




  //
  //
  //
  // if (window.current_frame[type] === undefined) {
  //   window.current_frame[type] = {}
  // }
  // window.current_frame[type][piece] = 0
  //
  // if (window.current_frame_paused[type] === undefined) {
  //   window.current_frame_paused[type] = {}
  // }
  // window.current_frame_paused[type][piece] = true
  //
  // if (window.animation_intervals[type] === undefined) {
  //   window.animation_intervals[type] = {}
  // }
  //
  // window.animation_intervals[type][piece] = setInterval(function() {
  //
  //   // select all the boxes
  //   var scale_heat = d3.scale.linear().domain([0, d3.max(window.__data[type][piece][window.current_frame[type][piece]])]).range([0, 255])
  //     //console.log(window.current_frame, d3.max(window.__data[window.current_frame]) )
  //
  //   svg.selectAll('text').each(function() {
  //
  //     var board_index = parseInt(d3.select(this).attr('id'))
  //
  //     d3.select(this).transition().duration(50).ease('bounce').attr('fill-opacity', function() {
  //       var v = Math.floor(scale_heat(window.__data[type][piece][window.current_frame[type][piece]][board_index])) / 255.0
  //       return v
  //       //return 'rgb(' + v + ',' + v + ',' + v + ')'
  //     })
  //
  //   })
  //
  //   div_progressbar.style('width', window.current_frame[type][piece] + '%')
  //
  //   if (!window.current_frame_paused[type][piece]) {
  //     window.current_frame[type][piece] += 1
  //
  //   }
  //   if (window.current_frame[type][piece] >= 100) {
  //     window.current_frame[type][piece] = 0
  //   }
  //
  // }, 50)


}
