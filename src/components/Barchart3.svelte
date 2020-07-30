<script>
    import { onMount, beforeUpdate, afterUpdate } from 'svelte'
    import * as d3 from 'd3'
    import { bar_data, bar_domain } from '../stores.js';

    function translate(x, y) {
        return 'translate(' + x + ',' + y + ')'
    }

    let svgWidth = 550
    let svgHeight = 550
    let margin = { top: 30, right: 10, bottom: 20, left: 40, mid: 10 }
    let width = svgWidth - margin.left - margin.right
    let height = svgHeight - margin.top - margin.bottom
    
    //-------------------------------------------------------------bar
    
    let el
    let svg
    let dx = d3.scaleBand().domain(bar_domain).range([0, width])
    let dy = d3.scaleLinear().domain([0, 100]).range([height, 0])

    let dxAxis = d3.axisBottom(dx)
    let dyAxis = d3.axisLeft(dy)

    let colorScale = d3.scaleOrdinal(d3.schemeCategory10)
    
    function handleUpdate() {
        console.log('handle')
        /*
        bar_data.update(bd => {
            let bbd = bd.map(function (d) {
                d.value = Math.random() * 100
                return d;
            })
            return bbd;
        })
        */
    }
    
    
    

    onMount(() => {
        console.log('mount')
        svg = d3
            .select(el)
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .append('g')
            .attr('transform', translate(margin.left, margin.top))

        svg.append('g').attr('transform', translate(0, width)).call(dxAxis)

        svg.append('g').call(dyAxis)
        
            
    })

    bar_data.subscribe(() => {
        svg.selectAll('rect')
            .data($bar_data)
            .join('rect')
            .attr('width', 40)
            .attr('height', (d) => dy(d.value))
            .style('fill', (d, i) => colorScale(i))
            .attr('x', (d, i) => (40 + margin.mid) * i)
            .attr('y', (d, i) => height - dy(d.value))
            .on('click', () => console.log('click'));
    });
    
</script>

<button on:click={handleUpdate}>update</button>
<div bind:this={el} />
