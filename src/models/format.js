export default function Format(numero, tipo) {
    
    if (tipo === 'email' && numero.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i)){
        return numero;
    } else {
        const nstring = numero.replace(/[^A-Za-z\d]+/g, "");
        if (tipo === 'cpf' && nstring.length === 11) {
            return `${nstring.slice(0, 3)}.${nstring.slice(3, 6)}.${nstring.slice(6, 9)}-${nstring.slice(9)}`;
        } else if (tipo === 'telefone' && nstring.length === 11) {
            return `(${nstring.slice(0, 2)}) ${nstring.slice(2, 7)}-${nstring.slice(7)}`;
        } else if (tipo === 'cep' && nstring.length === 8) {
            return `${nstring.slice(0, 5)}-${nstring.slice(5)}`;
        } else if (tipo === 'rg' && nstring.length >= 9) {
            return `${nstring.slice(0, 2)}.${nstring.slice(2, 5)}.${nstring.slice(5, 8)}-${nstring.slice(8)}`;
        } else if (tipo === 'dNascimento' && nstring.length === 8) {
            return `${nstring.slice(0, 2)}/${nstring.slice(2, 4)}/${nstring.slice(4, 8)}`;
        } else {
            return null;
        }
    }
}
