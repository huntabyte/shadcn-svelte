export type Payment = {
	id: string;
	amount: number;
	status: "pending" | "processing" | "success" | "failed";
	email: string;
};

export const paymentData: Payment[] = [
	{
		id: "1",
		amount: 100.25,
		status: "pending",
		email: "example1@example.com"
	},
	{
		id: "2",
		amount: 50.5,
		status: "processing",
		email: "example2@example.com"
	},
	{
		id: "3",
		amount: 75.75,
		status: "success",
		email: "example3@example.com"
	},
	{
		id: "4",
		amount: 200.0,
		status: "failed",
		email: "example4@example.com"
	},
	{
		id: "5",
		amount: 150.5,
		status: "pending",
		email: "example5@example.com"
	},
	{
		id: "6",
		amount: 80.25,
		status: "processing",
		email: "example6@example.com"
	},
	{
		id: "7",
		amount: 95.75,
		status: "success",
		email: "example7@example.com"
	},
	{
		id: "8",
		amount: 175.0,
		status: "failed",
		email: "example8@example.com"
	},
	{
		id: "9",
		amount: 120.75,
		status: "pending",
		email: "example9@example.com"
	},
	{
		id: "10",
		amount: 60.5,
		status: "processing",
		email: "example10@example.com"
	},
	{
		id: "11",
		amount: 85.75,
		status: "success",
		email: "example11@example.com"
	},
	{
		id: "12",
		amount: 300.0,
		status: "failed",
		email: "example12@example.com"
	},
	{
		id: "13",
		amount: 95.25,
		status: "pending",
		email: "example13@example.com"
	},
	{
		id: "14",
		amount: 40.5,
		status: "processing",
		email: "example14@example.com"
	},
	{
		id: "15",
		amount: 125.75,
		status: "success",
		email: "example15@example.com"
	},
	{
		id: "16",
		amount: 250.0,
		status: "failed",
		email: "example16@example.com"
	},
	{
		id: "17",
		amount: 170.5,
		status: "pending",
		email: "example17@example.com"
	},
	{
		id: "18",
		amount: 90.25,
		status: "processing",
		email: "example18@example.com"
	},
	{
		id: "19",
		amount: 105.75,
		status: "success",
		email: "example19@example.com"
	},
	{
		id: "20",
		amount: 220.0,
		status: "failed",
		email: "example20@example.com"
	}
];
