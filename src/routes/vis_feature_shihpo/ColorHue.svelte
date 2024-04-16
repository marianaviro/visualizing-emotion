<script>
	export let lc_colorhue;
	export let lb_colorhue;
	export let la_colorhue;
	// draw();
	let deg = 45;

	// 	Convert deg number to string for CSS
	$: lc_c1 = `rgba(${Math.floor(lc_colorhue[0][0]*255)}, 
				     ${Math.floor(lc_colorhue[0][1]*255)},
					 ${Math.floor(lc_colorhue[0][3]*255)})`
	$: lc_c2 = `rgba(${Math.floor(lc_colorhue[1][0]*255)}, 
					 ${Math.floor(lc_colorhue[1][1]*255)}, 
					 ${Math.floor(lc_colorhue[1][3]*255)})`
	$: degString = `${deg}deg`

	//console.log(lc_colorhue[0][2]);
	//console.log(Math.floor(lc_colorhue[0][0]*255));
</script>


<!-- <div class="shorter">
	
</div> -->

<div
	style="
		--gradient-1:{lc_c1};
		--gradient-2:{lc_c2};
	"
	
></div>
<div
	style="
		--gradient-1:rgba(140, 44, 235);
		--gradient-2:rgba(144, 52, 257);
	"
	
></div>
<h1>
	{lc_c1}
	{lc_c2}
</h1>

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
		width: 200px;
		height: 200px;
		border: 2px solid black;
		background: linear-gradient(var(--gradient-1), 
									var(--gradient-2)
									)
	}

	/* .longer {
		background: linear-gradient(90deg in hsl longer hue, red, blue);
	} */

</style>
