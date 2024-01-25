const EMAIL_REGEX = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
const CPF_REGEX = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
const TELEFONE_REGEX = /^(\d{2})(\d{5})(\d{4})$/;
const CEP_REGEX = /^(\d{5})(\d{3})$/;
const RG_REGEX = /^(\d{2})(\d{3})(\d{3})(\d{1,2})$/;
const DATE_REGEX = /^(\d{2})(\d{2})(\d{4})$/;

export default function Format(numero, tipo) {
    try {
        if (tipo === 'email' && numero.match(EMAIL_REGEX)) {
            return numero;
        }

        const nstring = numero.replace(/[^A-Za-z\d]+/g, "");

        switch (tipo) {
            case 'cpf':
                return formatWithRegex(nstring, CPF_REGEX, '$1.$2.$3-$4');
            case 'telefone':
                return formatWithRegex(nstring, TELEFONE_REGEX, '($1) $2-$3');
            case 'cep':
                return formatWithRegex(nstring, CEP_REGEX, '$1-$2');
            case 'rg':
                return formatWithRegex(nstring, RG_REGEX, '$1.$2.$3-$4');
            case 'dNascimento':
                return formatWithRegex(nstring, DATE_REGEX, '$1/$2/$3');
            default:
                return null;
        }
    } catch (error) {
        console.error('Error formatting:', error);
        return null;
    }
}

function formatWithRegex(value, regex, format) {
    const match = value.match(regex);
    return match ? format.replace(/\$(\d)/g, (_, index) => match[index]) : null;
}