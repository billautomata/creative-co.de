/* jshint unused:false */
/* global noise, n_map */

function create_vectorfield(){

  window.particle_pause = true

  draw_vectorfield('masters', 'p')

  var container_div = d3.select('div#vectormap_buttonscontainer')
  var div_button_group = container_div.append('div')
    .attr('class', 'btn-group-sm btn-group-justified')

  ;[ ['p','♟'], ['q','♛'], ['b','♝'], ['r','♜'], ['n','♞'], ['k','♚']].forEach(function(button){

    div_button_group.append('div')
      .attr('class', 'btn btn-primary btn-sm')
      .html(button[1])
      .on('click', function() {
        window.particle_pause = false
        window.heatmap_pause = true
        draw_vectorfield('',button[0])
      })

  })

}

function draw_vectorfield(type, piece) {

  var piece_lut = {
    'p': '♟',
    'q': '♛',
    'b': '♝',
    'r': '♜',
    'n': '♞',
    'k': '♚',
  }

  var graph_height = 8 * 66
  var graph_width = 8 * 66

  var container_div = d3.select('div#vectormap_container')

  container_div.html('')

  var svg = container_div.append('svg')
    .attr('id', 'piece')
    //.attr('width', graph_width)
    //.attr('height', graph_height)
    .attr("preserveAspectRatio", "xMidYMid")
    .attr("viewBox", "0 0 528 528")
    .attr('width', parseInt(container_div.style('width')) * 0.95)
    .attr('height', parseInt(container_div.style('width')) * 0.95)

  // draw chessboard bg

  d3.json('json/vector_fields/combined.vectormaps_' + piece + '.json', function(json) {

    normalize_field(json.masters)
    normalize_field(json.random)

    for (var j = 0; j < 8; j++) {
      for (var i = 0; i < 8; i++) {
        svg.append('rect')
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

        // get the angle of the vector at the point

        var linear_position = (j * 8) + i

        var g_arrow = svg.append('g')
          .attr('class', 'arrow')
          .attr('transform', 'translate(' + (n_map(i, 0, 8, 0, graph_width) + graph_width / 16.0) + ',' + (n_map(j, 0, 8, 0, graph_width) + graph_width / 16.0) + ')')

        // append a line
        g_arrow.append('line')
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', json.masters[linear_position][0] * 20)
          .attr('y2', json.masters[linear_position][1] * 20)
          .attr('stroke', '#B26200')
          .attr('stroke-width', 3.0)
          .attr('stroke-opacity', 1.0)

        // append a line
        g_arrow.append('line')
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', json.random[linear_position][0] * 20)
          .attr('y2', json.random[linear_position][1] * 20)
          .attr('stroke', '#0078B2')
          .attr('stroke-width', 3.0)
          .attr('stroke-opacity', 1.0)

      }
    }

    // create particles
    // tick the particles
    // on each tick,
    // the particles find the place in the vector field and apply that to their velocity
    // the particles check their bounds and bounce off the screen edges

    var n_particles = 256

    //window.particles = []

    function Particle(svg, particle_type) {

      // this.svg_element = svg.append('circle')
      //   .attr('cx', 0)
      //   .attr('cy', 0)
      //   .attr('r', 2)
      //   .attr('fill', 'green')
      //   .attr('fill-opacity', 1.0)

      this.svg_element = svg.append('text')
        .text(piece_lut[piece])
        .attr('x', 0)
        .attr('y', 0)
        .style('text-anchor', 'middle')
        .attr('fill', function(){
          if(particle_type === 'random'){
            return '#0078B2'
          } else {
            return '#B26200'
          }
        })
        .attr('fill-opacity', 0.5)
        .style('font-size', '15px')

      this.__velocity = [0, 0]

      this.__position = [Math.random() * graph_width, Math.random() * graph_height]

      this.__tick = function() {

        var chess_coordinate_x = Math.floor((this.__position[0] / graph_width) * 8.0)
        var chess_coordinate_y = Math.floor((this.__position[1] / graph_height) * 8.0)
        var linear_coordinate = (chess_coordinate_y * 8) + chess_coordinate_x

        this.__velocity[0] += json[particle_type][linear_coordinate][0]
        this.__velocity[1] += json[particle_type][linear_coordinate][1]

        this.__position[0] += this.__velocity[0]
        this.__position[1] += this.__velocity[1]

        // x bounds check
        if (this.__position[0] > graph_width) {
          this.__position[0] = graph_width - (this.__position[0] - graph_width)
          this.__velocity[0] *= -1.0
        }
        if (this.__position[0] < 0) {
          this.__position[0] = Math.abs(this.__position[0])
          this.__velocity[0] *= -1.0
        }

        // y bounds check
        if (this.__position[1] > graph_height) {
          this.__position[1] = graph_height - (this.__position[1] - graph_height)
          this.__velocity[1] *= -1.0
        }
        if (this.__position[1] < 0) {
          this.__position[1] = Math.abs(this.__position[1])
          this.__velocity[1] *= -1.0
        }

        // add noise
        var noise_multi = 0.5
        this.__velocity[0] += noise_multi * noise.simplex3(this.__position[0], this.__position[1], new moment().valueOf());
        this.__velocity[1] += noise_multi * noise.simplex3(this.__position[1], this.__position[0], new moment().valueOf());

        this.__velocity[0] *= 0.99
        this.__velocity[1] *= 0.99

        this.svg_element.attr('x', this.__position[0])
        this.svg_element.attr('y', this.__position[1])

      }
    }



    window.particles = {}
    if (window.particles[type] === undefined) {
      window.particles[type] = {}
    }
    if (window.particles[type][piece] === undefined) {
      window.particles[type][piece] = []
    }

    for (var i = 0; i < n_particles; i++) {
      var particle = new Particle(svg, 'masters')
      window.particles[type][piece].push(particle)
    }

    for (var i = 0; i < n_particles; i++) {
      var particle = new Particle(svg, 'random')
      window.particles[type][piece].push(particle)
    }

    clearInterval(window.particle_tick)
    window.particle_tick = setInterval(function() {
      window.particles[type][piece].forEach(function(particle) {
        if(!window.particle_pause){
          particle.__tick()
        }
      })
    }, 30)

  }) // end of d3.json

  function normalize_field(field) {

    var max_length = 0
    var max_pair = []

    field.forEach(function(element) {

      var this_length = Math.sqrt(Math.pow(element[0], 2) + Math.pow(element[1], 2))

      if (this_length !== 0) {
        element[0] /= this_length
        element[1] /= this_length
      }
      //
      // if(this_length > max_length){
      //   max_length = this_length
      //   max_pair[0] = Math.abs(element[0])
      //   max_pair[1] = Math.abs(element[1])
      // }

    })
    //
    // field.forEach(function(element){
    //
    //   element[0] /= max_pair[0]
    //   element[1] /= max_pair[1]
    //
    // })



  }


}
