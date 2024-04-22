<script>
	export let lc_colorhue;
	export let lb_colorhue;
	export let la_colorhue;
	// export let selected_colorhue;
	export let clicked;
	// clicked = false;
	import { fade } from 'svelte/transition';
	let visible = true;
	// draw();
	let deg = 45;

	// 	Convert deg number to string for CSS
	// $: lc_c1 = `rgba(${Math.floor(selected_colorhue[0][0]*255)}, 
	// 			     ${Math.floor(selected_colorhue[0][1]*255)},
	// 				 ${Math.floor(selected_colorhue[0][2]*255)})` //,${lc_colorhue[0][3]})`
	// $: lc_c2 = `rgba(${Math.floor(selected_colorhue[1][0]*255)}, 
	// 				 ${Math.floor(selected_colorhue[1][1]*255)}, 
	// 				 ${Math.floor(selected_colorhue[1][2]*255)})` //,${lc_colorhue[1][3]})`
	// $: lc_c3 = `rgba(${Math.floor(selected_colorhue[2][0]*255)}, 
	// 				 ${Math.floor(selected_colorhue[2][1]*255)}, 
	// 				 ${Math.floor(selected_colorhue[2][2]*255)})` //,${lc_colorhue[2][3]})`
	// $: lc_c4 = `rgba(${Math.floor(selected_colorhue[3][0]*255)}, 
	// 				 ${Math.floor(selected_colorhue[3][1]*255)}, 
	// 				 ${Math.floor(selected_colorhue[3][2]*255)})` //,${lc_colorhue[3][3]})`
	// $: lc_c5 = `rgba(${Math.floor(selected_colorhue[4][0]*255)}, 
	// 				 ${Math.floor(selected_colorhue[4][1]*255)}, 
	// 				 ${Math.floor(selected_colorhue[4][2]*255)})` //,${lc_colorhue[4][3]})`
	// $: lc_c6 = `rgba(${Math.floor(selected_colorhue[5][0]*255)}, 
	// 				 ${Math.floor(selected_colorhue[5][1]*255)}, 
	// 				 ${Math.floor(selected_colorhue[5][2]*255)})` //,${lc_colorhue[5][3]})`
	// $: lc_c7 = `rgba(${Math.floor(selected_colorhue[6][0]*255)}, 
	// 				 ${Math.floor(selected_colorhue[6][1]*255)}, 
	// 				 ${Math.floor(selected_colorhue[6][2]*255)})` //,${lc_colorhue[6][3]})`
	// $: lc_c8 = `rgba(${Math.floor(selected_colorhue[7][0]*255)}, 
	// 				 ${Math.floor(selected_colorhue[7][1]*255)}, 
	// 				 ${Math.floor(selected_colorhue[7][2]*255)})` //,${lc_colorhue[7][3]})`
	
	$: lc_c1 = `rgba(${Math.floor(lc_colorhue[0][0]*255)}, 
				     ${Math.floor(lc_colorhue[0][1]*255)},
					 ${Math.floor(lc_colorhue[0][2]*255)})` //,${lc_colorhue[0][3]})`
	$: lc_c2 = `rgba(${Math.floor(lc_colorhue[1][0]*255)}, 
					 ${Math.floor(lc_colorhue[1][1]*255)}, 
					 ${Math.floor(lc_colorhue[1][2]*255)})` //,${lc_colorhue[1][3]})`
	$: lc_c3 = `rgba(${Math.floor(lc_colorhue[2][0]*255)}, 
					 ${Math.floor(lc_colorhue[2][1]*255)}, 
					 ${Math.floor(lc_colorhue[2][2]*255)})` //,${lc_colorhue[2][3]})`
	$: lc_c4 = `rgba(${Math.floor(lc_colorhue[3][0]*255)}, 
					 ${Math.floor(lc_colorhue[3][1]*255)}, 
					 ${Math.floor(lc_colorhue[3][2]*255)})` //,${lc_colorhue[3][3]})`
	$: lc_c5 = `rgba(${Math.floor(lc_colorhue[4][0]*255)}, 
					 ${Math.floor(lc_colorhue[4][1]*255)}, 
					 ${Math.floor(lc_colorhue[4][2]*255)})` //,${lc_colorhue[4][3]})`
	$: lc_c6 = `rgba(${Math.floor(lc_colorhue[5][0]*255)}, 
					 ${Math.floor(lc_colorhue[5][1]*255)}, 
					 ${Math.floor(lc_colorhue[5][2]*255)})` //,${lc_colorhue[5][3]})`
	$: lc_c7 = `rgba(${Math.floor(lc_colorhue[6][0]*255)}, 
					 ${Math.floor(lc_colorhue[6][1]*255)}, 
					 ${Math.floor(lc_colorhue[6][2]*255)})` //,${lc_colorhue[6][3]})`
	$: lc_c8 = `rgba(${Math.floor(lc_colorhue[7][0]*255)}, 
					 ${Math.floor(lc_colorhue[7][1]*255)}, 
					 ${Math.floor(lc_colorhue[7][2]*255)})` //,${lc_colorhue[7][3]})`

	$: lb_c1 = `rgba(${Math.floor(lb_colorhue[0][0]*255)}, 
				     ${Math.floor(lb_colorhue[0][1]*255)},
					 ${Math.floor(lb_colorhue[0][2]*255)})` //,${lc_colorhue[0][3]})`
	$: lb_c2 = `rgba(${Math.floor(lb_colorhue[1][0]*255)}, 
					 ${Math.floor(lb_colorhue[1][1]*255)}, 
					 ${Math.floor(lb_colorhue[1][2]*255)})` //,${lc_colorhue[1][3]})`
	$: lb_c3 = `rgba(${Math.floor(lb_colorhue[2][0]*255)}, 
					 ${Math.floor(lb_colorhue[2][1]*255)}, 
					 ${Math.floor(lb_colorhue[2][2]*255)})` //,${lc_colorhue[2][3]})`
	$: lb_c4 = `rgba(${Math.floor(lb_colorhue[3][0]*255)}, 
					 ${Math.floor(lb_colorhue[3][1]*255)}, 
					 ${Math.floor(lb_colorhue[3][2]*255)})` //,${lc_colorhue[3][3]})`
	$: lb_c5 = `rgba(${Math.floor(lb_colorhue[4][0]*255)}, 
					 ${Math.floor(lb_colorhue[4][1]*255)}, 
					 ${Math.floor(lb_colorhue[4][2]*255)})` //,${lc_colorhue[4][3]})`
	$: lb_c6 = `rgba(${Math.floor(lb_colorhue[5][0]*255)}, 
					 ${Math.floor(lb_colorhue[5][1]*255)}, 
					 ${Math.floor(lb_colorhue[5][2]*255)})` //,${lc_colorhue[5][3]})`
	$: lb_c7 = `rgba(${Math.floor(lb_colorhue[6][0]*255)}, 
					 ${Math.floor(lb_colorhue[6][1]*255)}, 
					 ${Math.floor(lb_colorhue[6][2]*255)})` //,${lc_colorhue[6][3]})`
	$: lb_c8 = `rgba(${Math.floor(lb_colorhue[7][0]*255)}, 
					 ${Math.floor(lb_colorhue[7][1]*255)}, 
					 ${Math.floor(lb_colorhue[7][2]*255)})` //,${lc_colorhue[7][3]})`
	
	$: la_c1 = `rgba(${Math.floor(la_colorhue[0][0]*255)}, 
				     ${Math.floor(la_colorhue[0][1]*255)},
					 ${Math.floor(la_colorhue[0][2]*255)})` //,${lc_colorhue[0][3]})`
	$: la_c2 = `rgba(${Math.floor(la_colorhue[1][0]*255)}, 
					 ${Math.floor(la_colorhue[1][1]*255)}, 
					 ${Math.floor(la_colorhue[1][2]*255)})` //,${lc_colorhue[1][3]})`
	$: la_c3 = `rgba(${Math.floor(la_colorhue[2][0]*255)}, 
					 ${Math.floor(la_colorhue[2][1]*255)}, 
					 ${Math.floor(la_colorhue[2][2]*255)})` //,${lc_colorhue[2][3]})`
	$: la_c4 = `rgba(${Math.floor(la_colorhue[3][0]*255)}, 
					 ${Math.floor(la_colorhue[3][1]*255)}, 
					 ${Math.floor(la_colorhue[3][2]*255)})` //,${lc_colorhue[3][3]})`
	$: la_c5 = `rgba(${Math.floor(la_colorhue[4][0]*255)}, 
					 ${Math.floor(la_colorhue[4][1]*255)}, 
					 ${Math.floor(la_colorhue[4][2]*255)})` //,${lc_colorhue[4][3]})`
	$: la_c6 = `rgba(${Math.floor(la_colorhue[5][0]*255)}, 
					 ${Math.floor(la_colorhue[5][1]*255)}, 
					 ${Math.floor(la_colorhue[5][2]*255)})` //,${lc_colorhue[5][3]})`
	$: la_c7 = `rgba(${Math.floor(la_colorhue[6][0]*255)}, 
					 ${Math.floor(la_colorhue[6][1]*255)}, 
					 ${Math.floor(la_colorhue[6][2]*255)})` //,${lc_colorhue[6][3]})`
	$: la_c8 = `rgba(${Math.floor(la_colorhue[7][0]*255)}, 
					 ${Math.floor(la_colorhue[7][1]*255)}, 
					 ${Math.floor(la_colorhue[7][2]*255)})` //,${lc_colorhue[7][3]})`

	$: degString = `${deg}deg`

	//console.log(lc_colorhue[0][2]);
	//console.log(Math.floor(lc_colorhue[0][0]*255));
</script>


<!-- <div class="shorter">
	
</div> -->
<div
	style="
		--gradient-1:{la_c1};
		--gradient-2:{la_c2};
		--gradient-3:{la_c3};
		--gradient-4:{la_c4};
		--gradient-5:{la_c5};
		--gradient-6:{la_c6};
		--gradient-7:{la_c7};
		--gradient-8:{la_c8};
	"
>
</div>


<div
	style="
		--gradient-1:{lb_c1};
		--gradient-2:{lb_c2};
		--gradient-3:{lb_c3};
		--gradient-4:{lb_c4};
		--gradient-5:{lb_c5};
		--gradient-6:{lb_c6};
		--gradient-7:{lb_c7};
		--gradient-8:{lb_c8};
	"
></div>

<div
	style="
		--gradient-1:{lc_c1};
		--gradient-2:{lc_c2};
		--gradient-3:{lc_c3};
		--gradient-4:{lc_c4};
		--gradient-5:{lc_c5};
		--gradient-6:{lc_c6};
		--gradient-7:{lc_c7};
		--gradient-8:{lc_c8};"
></div>



<style>
	div {
		width: 22%;
		height: 50px;
		border: 2px solid black;
		background: linear-gradient(to right, var(--gradient-1) 12.5%, 
									var(--gradient-2) 25%,
									var(--gradient-3) 37.5%,
									var(--gradient-4) 50%,
									var(--gradient-5) 62.5%,
									var(--gradient-6) 75%,
									var(--gradient-7) 87.5%,
									var(--gradient-8) 100%
									);
		transition: --gradient-1 250ms, --gradient-2 250ms, --gradient-3 250ms, --gradient-4 250ms, --gradient-5 250ms, --gradient-6 250ms, --gradient-7 250ms, --gradient-8 250ms;
	}
	/*	
	.shorter {
		background: linear-gradient(rgba(255,0,0,0.2) 0%, rgba(120,120,0,0.4 ) 25%, yellow 50%, green 75%, blue 100%);
	} */
	/* div { */
		/* margin: 10px;
		width: 75%;
		height: 400px;
		border: 2px solid black; */
		/* background: linear-gradient(to right, var(--gradient-1) 12.5%, 
									var(--gradient-2) 25%,
									var(--gradient-3) 37.5%,
									var(--gradient-4) 50%,
									var(--gradient-5) 62.5%,
									var(--gradient-6) 75%,
									var(--gradient-7) 87.5%,
									var(--gradient-8) 100%
									); */
		/* transition: --gradient-1 3s, --gradient-2 3s, --gradient-3 3s, --gradient-4 3s, --gradient-5 3s, --gradient-6 3s, --gradient-7 3s, --gradient-8 3s; */
		
	/* } */

	/* .longer {
		background: linear-gradient(90deg in hsl longer hue, red, blue);
	} */

</style>
