import { type Transaction } from "./types";

export async function fetchAllTransactions(): Promise<[Transaction[], null]> {

    const data: Transaction[] = [];
    const error = null;

    return [data, error];
}

export async function addTransactions(transactions: Transaction   []){

    for (const transaction of transactions){
        addTransaction(transaction);
    }
    return null;
}

async function addTransaction(transaction: Transaction): Promise<boolean>{

    return false;
}

export async function deleteTransaction(transactionId: string): Promise<boolean>{

    return false;
}

// function updateTransaction(transaction: Transaction): Promise<boolean>{