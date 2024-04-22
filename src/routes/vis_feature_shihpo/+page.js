import * as d3 from 'd3';
import npyjs from "npyjs";

export async function load({ fetch }) {
	// load the csv file as a string
	const res = await fetch('/dataset_version2.csv');
	const text = await res.text();
	// parse the string into an array of objects.
	// d3.autoType will automatically detect the types of the columns
	const dataset = d3.csvParse(text, d3.autoType);
	
	// let n = new npyjs();


	// const res2 = await n.load("http://localhost:5173/CS229/m20_dfs_a_lc_feat.npy", (array, shape) => {
	// 	console.log('test');
	// 	console.log(array);
	// 	console.log(array['data']);
	// 	console.log(array['shape']);
	// });


	// const feature_maps = await n.load("http://localhost:5173/CS229/m20_dfs_a_lc_feat.npy");
	// console.log(feature_maps);
	// console.log(feature_maps['data']);

	return { dataset};

	
}
