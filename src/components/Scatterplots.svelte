<script lang="ts">
    import { onMount, beforeUpdate, afterUpdate } from 'svelte'
    import * as d3 from 'd3'

    // marginal object
    interface margin {
        top: number
        right: number
        bottom: number
        left: number
        mid: number
    }

    let el;
    let data: Array<number> = [30, 86, 168, 281, 303, 365]

    function translate(x: number, y: number): string {
        return 'translate(' + x + ',' + y + ')'
    }

    let svgWidth: number = 550
    let svgHeight: number = 550
    let margin = { top: 30, right: 10, bottom: 20, left: 40, mid: 10 }
    let width: number = svgWidth - margin.left - margin.right
    let height: number = svgHeight - margin.top - margin.bottom

    let handleButtonClick = () => {
        console.log('button')
    }
    function randomCircle() {
        let circle = {
            val_x: Math.random() * 101,
            val_y: Math.random() * 101,
            size: Math.random() * 6,
            color: d3.interpolateSpectral(Math.random()),
        }
        return circle
    }

    let plot_data = []
    for (let i = 0; i < 100; i++) {
        plot_data.push(randomCircle())
    }

    let px = d3
        .scaleLinear()
        .domain([
            d3.min(plot_data, (d) => d.val_x),
            d3.max(plot_data, (d) => d.val_x),
        ])
        .range([0, width])

    let py = d3
        .scaleLinear()
        .domain([
            d3.min(plot_data, (d) => d.val_y),
            d3.max(plot_data, (d) => d.val_y),
        ])
        .range([height, 0])

    //let divergeScale = d3.scaleLinear(d3.schemeSpectral)

    let button = d3.select('#updateButton').append('button').text('update')
    let svg = d3
        .select(el)
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .append('g')
        .attr('transform', translate(margin.left, margin.top))

    console.log(svg)

    onMount(() => {
        console.log(plot_data)
        svg.selectAll('circle')
        .data(plot_data)
        .enter()
        .append('circle')
        .attr('r', (d) => d.size)
        .attr('cx', (d) => px(d.val_x))
        .attr('cy', (d) => py(d.val_y))
        .style('fill', (d) => d.color)

    let pxAxis = svg
        .append('g')
        .attr('class', 'xAxis')
        .attr('transform', translate(0, height))
        .call(d3.axisBottom(px))

    let pyAxis = svg
        .append('g')
        .attr('class', 'yAxis')
        .call(d3.axisLeft(py))
    })
    

    
    
    /*
    button.on('click', function () {
        for (let i = 0; i < 100; i++) {
            plot_data[i] = randomCircle()
        }

        px = d3
            .scaleLinear()
            .domain([
                d3.min(plot_data, (d) => d.val_x),
                d3.max(plot_data, (d) => d.val_x),
            ])
            .range([0, width])

        py = d3
            .scaleLinear()
            .domain([
                d3.min(plot_data, (d) => d.val_y),
                d3.max(plot_data, (d) => d.val_y),
            ])
            .range([height, 0])

        let circles = svg2.selectAll('circle').data(plot_data)

        let t = d3.transition().duration(500)
        circles
            .transition(t)
            .attr('r', (d) => d.size)
            .attr('cx', (d) => px(d.val_x))
            .attr('cy', (d) => py(d.val_y))
            .style('fill', (d) => d.color)

        pxAxis.transition(t).call(d3.axisBottom(px))
        pyAxis.transition(t).call(d3.axisLeft(py))
    })
    */
</script>

<button name='updateButton' on:click={handleButtonClick}></button>
<div bind:this={el}></div>