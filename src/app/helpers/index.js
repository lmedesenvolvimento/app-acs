import StringMask from 'string-mask';

export function convertToNumber(number, target) {
    const updates = {};

    if (!number.length || !number.match(/\d+/g)) {
        updates[target] = '';
        this.setState(updates);
    } else {
        const numbers = number.match(/\d+/g).map(Number).join('');
        updates[target] = numbers;
        this.setState(updates);
    }
}

export function convertToPhone(phone, target) {
    const updates = {};

    if (!phone.length || !phone.match(/\d+/g)) {
        updates[target] = '';
        this.setState(updates);
        return true;
    }

    const numbers = phone.match(/\d+/g).map(Number).join('');
    const result = new StringMask('(00) 00000-0000').apply(numbers);

    updates[target] = result;

    this.setState(updates);

    return true;
}

export default {
    convertToNumber,
    convertToPhone
};
