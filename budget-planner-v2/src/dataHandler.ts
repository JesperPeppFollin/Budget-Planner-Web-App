import type { Transaction } from './types';



// filtering functions, returns new array based on filtering criteria 
export function filterByYear(transactions: Transaction[]): Transaction[]{
    return [];
}

export function filterByMonth(transactions: Transaction[]): Transaction[]{
    return [];
}

export function filterByCateogory(transactions: Transaction[]): Transaction[]{
    return [];
}

export function filterByIsExpense(transactions: Transaction[]): Transaction[]{
    return [];
}

export function filterByIsIncome(transactions: Transaction[]): Transaction[]{
    return [];
}


// get functions, accumulator functions that return a single value
export function getTotalSum(transactions: Transaction[]): number{
    return 0;
}

export function getLength(transactions: Transaction[]): number{
    return transactions.length;
}