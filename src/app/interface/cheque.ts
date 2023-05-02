export interface Cheque {
	id?: number;
	bank_name: string;
	is_cleared: boolean;
	amount: number;
	transaction_id?: number;
	date: Date;
}
