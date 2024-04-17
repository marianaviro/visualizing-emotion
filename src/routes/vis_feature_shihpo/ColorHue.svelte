<script>
	// export let lc_colorhue;
	// export let lb_colorhue;
	// export let la_colorhue;
	export let selected_colorhue;
	export let clicked;
	// clicked = false;
	import { fade } from 'svelte/transition';
	let visible = true;
	// draw();
	let deg = 45;

	// 	Convert deg number to string for CSS
	$: lc_c1 = `rgba(${Math.floor(selected_colorhue[0][0]*255)}, 
				     ${Math.floor(selected_colorhue[0][1]*255)},
					 ${Math.floor(selected_colorhue[0][2]*255)})` //,${lc_colorhue[0][3]})`
	$: lc_c2 = `rgba(${Math.floor(selected_colorhue[1][0]*255)}, 
					 ${Math.floor(selected_colorhue[1][1]*255)}, 
					 ${Math.floor(selected_colorhue[1][2]*255)})` //,${lc_colorhue[1][3]})`
	$: lc_c3 = `rgba(${Math.floor(selected_colorhue[2][0]*255)}, 
					 ${Math.floor(selected_colorhue[2][1]*255)}, 
					 ${Math.floor(selected_colorhue[2][2]*255)})` //,${lc_colorhue[2][3]})`
	$: lc_c4 = `rgba(${Math.floor(selected_colorhue[3][0]*255)}, 
					 ${Math.floor(selected_colorhue[3][1]*255)}, 
					 ${Math.floor(selected_colorhue[3][2]*255)})` //,${lc_colorhue[3][3]})`
	$: lc_c5 = `rgba(${Math.floor(selected_colorhue[4][0]*255)}, 
					 ${Math.floor(selected_colorhue[4][1]*255)}, 
					 ${Math.floor(selected_colorhue[4][2]*255)})` //,${lc_colorhue[4][3]})`
	$: lc_c6 = `rgba(${Math.floor(selected_colorhue[5][0]*255)}, 
					 ${Math.floor(selected_colorhue[5][1]*255)}, 
					 ${Math.floor(selected_colorhue[5][2]*255)})` //,${lc_colorhue[5][3]})`
	$: lc_c7 = `rgba(${Math.floor(selected_colorhue[6][0]*255)}, 
					 ${Math.floor(selected_colorhue[6][1]*255)}, 
					 ${Math.floor(selected_colorhue[6][2]*255)})` //,${lc_colorhue[6][3]})`
	$: lc_c8 = `rgba(${Math.floor(selected_colorhue[7][0]*255)}, 
					 ${Math.floor(selected_colorhue[7][1]*255)}, 
					 ${Math.floor(selected_colorhue[7][2]*255)})` //,${lc_colorhue[7][3]})`
	$: degString = `${deg}deg`

	//console.log(lc_colorhue[0][2]);
	//console.log(Math.floor(lc_colorhue[0][0]*255));
</script>


<!-- <div class="shorter">
	
</div> -->

{#if clicked}
	<div transition:fade
		style="
			--gradient-1:{lc_c1};
			--gradient-2:{lc_c2};
			--gradient-3:{lc_c3};
			--gradient-4:{lc_c4};
			--gradient-5:{lc_c5};
			--gradient-6:{lc_c6};
			--gradient-7:{lc_c7};
			--gradient-8:{lc_c8};
		"
	></div>
{/if}
<!-- <label>
	<input type="checkbox" bind:checked={visible} />
	visible
</label> -->
<!-- {#if clicked}
	<p transition:fade>Fades in and out</p>
{/if} -->
<!-- <div
	style="
		--gradient-1:rgba(140, 44, 235);
		--gradient-2:rgba(144, 52, 257);
	"
></div> -->
<!-- <h1>
	{lc_c1}
	{lc_c2}
</h1> -->

<!-- <div
	style="
		--gradient-1:rgba(255,0,0,0.2);
		--gradient-2:rgba(123,123,0,0.2);
	"
></div> -->
<!-- <div class="longer">longer hue</div> -->



<style>
	/* div {
		height: 50vh;
		width: 50%;
		color: white;
		font-weight: bolder;
	}

	.shorter {
		background: linear-gradient(rgba(255,0,0,0.2) 0%, rgba(120,120,0,0.4 ) 25%, yellow 50%, green 75%, blue 100%);
	} */
	div {
		margin: 10px;
		width: 75%;
		height: 400px;
		border: 2px solid black;
		background: linear-gradient(to right, var(--gradient-1) 12.5%, 
									var(--gradient-2) 25%,
									var(--gradient-3) 37.5%,
									var(--gradient-4) 50%,
									var(--gradient-5) 62.5%,
									var(--gradient-6) 75%,
									var(--gradient-7) 87.5%,
									var(--gradient-8) 100%
									)
		
	}

	/* .longer {
		background: linear-gradient(90deg in hsl longer hue, red, blue);
	} */

</style>
