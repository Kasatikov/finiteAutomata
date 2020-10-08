function finiteAutomata(str) {

    const charChain = str.toString();

    const STATES = {
        H : 'H',
        SK: 'SK',
        SL: 'SL',
        K: 'K',
        S: 'S',
        ER: 'ER',
    };

    const TERMINALS = ['0', '1'];

    let currentState = STATES.H;

    let html = '';

    [...charChain].forEach((char, index, strArray) => {
        let isLastSymbol = (+index === (strArray.length - 1));
        switch (currentState) {
            case STATES.H: {
                if (char === TERMINALS[0]) {
                    html +=('<div>' + charChain + '-->' + STATES.H + '</div>');
                    currentState = STATES.S;
                    html +=('<div>' + char + '-->' + STATES.S + '</div>');
                }
                else if (char === TERMINALS[1]) {
                    html+=('<div>' + charChain + '-->' + STATES.H + '</div>');
                    currentState = STATES.SK;
                    html+=('<div>' + char + '-->' + STATES.SK + '</div>');
                }
                else {
                    currentState = STATES.ER;
                }
                break;
            }

            case STATES.SK: {
                if (char === TERMINALS[0]) {
                    currentState = STATES.SL;
                    html+=('<div>' + char + '-->' + STATES.SL + '</div>');
                }
                else if (char === TERMINALS[1]) {
                    currentState = STATES.SK;
                    html+=('<div>' +char + '-->' + STATES.SK + '</div>');
                }
                else {
                    currentState = STATES.ER;
                }
                break;
            }

            case STATES.SL: {
                if (char === TERMINALS[1]) {
                    currentState = STATES.K;
                    html+=('<div>' +char + '-->' + STATES.K + ' </div>');
                }
                else {
                    currentState = STATES.ER;
                }
                break;
            }

            case STATES.K: {
                if (!isLastSymbol) {
                    currentState = STATES.ER;
                }
                break;
            }
            case STATES.S: {
                if (!isLastSymbol) {
                    currentState = STATES.ER;
                }
                break;
            }
        }
    });

    currentState === STATES.ER
        ? html+=('<div>Цепочка не принадлежит языку</div>')
        : html+=('<div>Цепочка принадлежит языку</div>');
    document.getElementById('log').insertAdjacentHTML('afterbegin', html);

}

let button = document.getElementById('confirm');
let input = document.getElementById('input');
let log = document.getElementById('log');
button.onclick = function() {
    if (input.value) {
        log.innerHTML = '';
        finiteAutomata(input.value);
    }
};
