export default function partition(arr, callback) {
	return arr.reduce(callback, [[], []]);
}
