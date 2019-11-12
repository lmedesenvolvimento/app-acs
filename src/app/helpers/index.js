import StringMask from 'string-mask';

import moment from '@/services/Timestamp';

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
    const result = new StringMask('(00) 90000-0000').apply(numbers);

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

    const yearDate = new Date();
    const numbers = date.match(/\d+/g).join('');
    const result = new StringMask('0000').apply(numbers);
    const year = parseInt(result, 10);

    updates[target] = yearDate.setFullYear(year);

    this.setState(updates);

    return true;
}

export function convertToMonthYear(date, target) {
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

export function convertToTimestamp(date, target) {
    const updates = {};

    updates[target] = moment(date, 'M/YYYY');

    this.setState(updates);

    return true;
}

export function convertToMoney(number, target) {
    const updates = {};

    if (!number.length || !number.match(/\d+/g)) {
        updates[target] = '';
        this.setState(updates);
        return;
    }

    const numbers = number.match(/\d+/g).join('');
    const result = new StringMask('#.##0,00', { reverse: true }).apply(numbers);

    updates[target] = result;

    this.setState(updates);
}

export function convertToCPF(number, target) {
    const updates = {};

    if (!number.length || !number.match(/\d+/g)) {
        updates[target] = '';
        this.setState(updates);
        return;
    }

    const numbers = number.match(/\d+/g).join('');
    const result = new StringMask('000.000.000-00').apply(numbers);

    updates[target] = result;

    this.setState(updates);
}

export function convertToPISNIS(number, target) {
    const updates = {};

    if (!number.length || !number.match(/\d+/g)) {
        updates[target] = '';
        this.setState(updates);
        return;
    }

    const numbers = number.match(/\d+/g).join('');
    const result = new StringMask('000.00000.00-0').apply(numbers);

    updates[target] = result;

    this.setState(updates);
}

export function convertToHeight(number, target) {
    const updates = {};

    if (!number.length || !number.match(/\d+/g)) {
        updates[target] = '';
        this.setState(updates);
        return;
    }

    const numbers = number.match(/\d+/g).join('');
    const result = new StringMask('0,99', { reverse: true }).apply(numbers);

    updates[target] = result;

    this.setState(updates);
}

export function convertToWeight(number, target) {
    const updates = {};

    if (!number.length || !number.match(/\d+/g)) {
        updates[target] = '';
        this.setState(updates);
        return;
    }

    const numbers = number.match(/\d+/g).join('');
    const result = new StringMask('099,99', { reverse: true }).apply(numbers);

    updates[target] = result;

    this.setState(updates);
}

export default {
    convertToNumber,
    convertToPhone,
    convertToMoney,
    convertToYear,
    convertToPISNIS
};
