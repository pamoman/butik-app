import { uri } from "config/Client";

export const fetchAll = async (table) => {
    try {
        let res = await fetch(`${uri}/${table}`);

        return await res.json();
    } catch (err) {
        console.error(err);
    }
};

export const fetchOne = async (table, id) => {
    try {
        let res = await fetch(`${uri}/${table}/${id}`);

        return await res.json();
    } catch (err) {
        console.error(err);
    }
};

export const forgot = async (email) => {
    try {
        let res = await fetch(`${uri}/auth/forgot-password`, {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        return await res.json();
    } catch (err) {
        console.error(err);
    }
};

export const reset = async (code, password, passwordConfirmation) => {
    try {
        let res = await fetch(`${uri}/auth/reset-password`, {
            method: 'POST',
            body: JSON.stringify({ code, password, passwordConfirmation }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return await res.json();
    } catch (err) {
        console.error(err);
    }
};