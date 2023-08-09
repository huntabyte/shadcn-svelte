export type Payment = {
	id: number;
	amount: number;
	status: "Pending" | "Processing" | "Success" | "Failed";
	email: string;
};

export const paymentData: Payment[] = [
	{
		id: 1,
		amount: 100.25,
		status: "Pending",
		email: "example1@example.com"
	},
	{
		id: 2,
		amount: 50.5,
		status: "Processing",
		email: "example2@example.com"
	},
	{
		id: 3,
		amount: 75.75,
		status: "Success",
		email: "example3@example.com"
	},
	{
		id: 4,
		amount: 200.0,
		status: "Failed",
		email: "example4@example.com"
	},
	{
		id: 5,
		amount: 150.5,
		status: "Pending",
		email: "example5@example.com"
	},
	{
		id: 6,
		amount: 80.25,
		status: "Processing",
		email: "example6@example.com"
	},
	{
		id: 7,
		amount: 95.75,
		status: "Success",
		email: "example7@example.com"
	},
	{
		id: 8,
		amount: 175.0,
		status: "Failed",
		email: "example8@example.com"
	},
	{
		id: 9,
		amount: 120.75,
		status: "Pending",
		email: "example9@example.com"
	},
	{
		id: 10,
		amount: 60.5,
		status: "Processing",
		email: "example10@example.com"
	},
	{
		id: 11,
		amount: 85.75,
		status: "Success",
		email: "example11@example.com"
	},
	{
		id: 12,
		amount: 300.0,
		status: "Failed",
		email: "example12@example.com"
	},
	{
		id: 13,
		amount: 95.25,
		status: "Pending",
		email: "example13@example.com"
	},
	{
		id: 14,
		amount: 40.5,
		status: "Processing",
		email: "example14@example.com"
	},
	{
		id: 15,
		amount: 125.75,
		status: "Success",
		email: "example15@example.com"
	},
	{
		id: 16,
		amount: 250.0,
		status: "Failed",
		email: "example16@example.com"
	},
	{
		id: 17,
		amount: 170.5,
		status: "Pending",
		email: "example17@example.com"
	},
	{
		id: 18,
		amount: 90.25,
		status: "Processing",
		email: "example18@example.com"
	},
	{
		id: 19,
		amount: 105.75,
		status: "Success",
		email: "example19@example.com"
	},
	{
		id: 20,
		amount: 220.0,
		status: "Failed",
		email: "example20@example.com"
	}
];
