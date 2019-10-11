import StringMask from 'string-mask';

export function convertToNumber(number, target) {
    const updates = {};

    if (!number.length || !number.match(/\d+/g)) {
        updates[target] = '';
    } else {
        const numbers = number.match(/\d+/g).join('');
        updates[target] = numbers;
    }

    this.setState(updates);

    return true;
}

export function convertToPhone(phone, target) {
    const updates = {};

    if (!phone.length || !phone.match(/\d+/g)) {
        updates[target] = '';
        this.setState(updates);
        return true;
    }

    const numbers = phone.match(/\d+/g).join('');
    const result = new StringMask('(00) 00000-0000').apply(numbers);

    updates[target] = result;

    this.setState(updates);

    return true;
}

export function convertToDate(date, target) {
    const updates = {};

    if (!date.length || !date.match(/\d+/g)) {
        updates[target] = '';
        this.setState(updates);
        return true;
    }

    const numbers = date.match(/\d+/g).join('');
    const result = new StringMask('00/00/0000').apply(numbers);

    updates[target] = result;

    this.setState(updates);

    return true;
}

export function convertToYear(date, target) {
    const updates = {};

    if (!date.length || !date.match(/\d+/g)) {
        updates[target] = '';
        this.setState(updates);
        return true;
    }

    const numbers = date.match(/\d+/g).join('');
    const result = new StringMask('00/0000').apply(numbers);

    updates[target] = result;

    this.setState(updates);

    return true;
}

export function convertToMoney(number, target) {
    const updates = {};

    if (!number.length || !number.match(/\d+/g)) {
        updates[target] = '';
        this.setState(updates);
        return true;
    }

    const numbers = number.match(/\d+/g).join('');
    const result = new StringMask('#.##0,00', { reverse: true }).apply(numbers);

    updates[target] = result;

    this.setState(updates);

    return true;
}

export default {
    convertToNumber,
    convertToPhone,
    convertToMoney,
    convertToYear
};
