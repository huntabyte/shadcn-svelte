const labels = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];

export const data = {
	labels: labels,
	datasets: [
		{
			data: labels.map(() => Math.floor(Math.random() * 5000) + 1000),
			backgroundColor: [
				"rgba(255, 134,159,0.4)",
				"rgba(98,  182, 239,0.4)",
				"rgba(255, 218, 128,0.4)",
				"rgba(113, 205, 205,0.4)",
				"rgba(170, 128, 252,0.4)",
				"rgba(255, 177, 101,0.4)"
			],
			borderWidth: 2,
			borderColor: [
				"rgba(255, 134, 159, 1)",
				"rgba(98,  182, 239, 1)",
				"rgba(255, 218, 128, 1)",
				"rgba(113, 205, 205, 1)",
				"rgba(170, 128, 252, 1)",
				"rgba(255, 177, 101, 1)"
			]
		}
	]
};
