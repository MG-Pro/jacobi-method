function submit(e) {
    e.preventDefault();
    const textMatrix = e.target[0].value;
    const textVector = e.target[1].value;

    const matrix = textToMatrixWrapper(textMatrix);
    const vector = textToMatrixWrapper(textVector, true);
    const result = calc(matrix, vector);

    showResult(result);
}

function showResult(result) {
    const resultEl = document.querySelector('#result');
    resultEl.innerHTML = '';
    const countEl = document.createElement('p');
    countEl.textContent = 'Count of iterations: ' + result.counter;
    resultEl.appendChild(countEl);

    result.resultVector.forEach((x, i) => {
        const p = document.createElement('p');
        p.textContent = `X${i + 1} = ${x.toFixed(4)}`;
        resultEl.appendChild(p);
    });
}

function setDefVals(form) {
    const defMatrix =
        '10 1 -1\n'
        + '1 10 -1\n'
        + '-1 1 10';

    const defRightSideVector = '11\n10\n10';

    const textMatrixEl = form[0];
    const textVectorEl = form[1];

    textMatrixEl.textContent = defMatrix;
    textVectorEl.textContent = defRightSideVector;
}

function calc(matrix, rightSideVector) {
    const EPS = 0.001; // заданная точность

    const tempX = []; // временное хранилище для итерируемого вида
    const resultVector = new Array(rightSideVector.length).fill(1); // начальное приближение

    let counter = 0; // счетчик итераций
    let norma = 1; // норма, наибольшая разность компонент столбца иксов соседних итераций

    while(norma > EPS) { // продолжаем итерации пока норма будет станет больше заданной точности
        // получаем итерируемый вид в tempX
        for (let i = 0; i < rightSideVector.length; i++) { // проходим по строкам матрицы
            tempX[i] = rightSideVector[i];

            for (let j = 0; j < rightSideVector.length; j++) {
                if (i !== j) {
                    tempX[i] -= matrix[i][j] * resultVector[j];
                }
            }
            tempX[i] /= matrix[i][i];
        }
        // вычисляем начальное значение нормы на текущей итерации
        norma = Math.abs(resultVector[0] - tempX[0]);

        for (let i = 0; i < rightSideVector.length; i++) {
            // вычисляем наибольшую разность компонент столбца иксов соседних итераций
            let res = Math.abs(resultVector[i] - tempX[i]);
            if (res > norma) {
                norma = res;
            }

            // перезаписываем результат итерации
            resultVector[i] = parseFloat((tempX[i]).toFixed(4));
        }
        counter++; // увеличиваем счетчик итераций
    }

    return { // возвращаем результат и счетчик
        counter,
        resultVector,
    };
}

function textToMatrixWrapper(text, isOneLine = false) {
    const delim = ' ';
    const lines = text.split('\n');
    const matrix = [];
    let k = 0;

    for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].split(delim);
        let l = 0;
        for (let j = 0; j < lines[i].length; j++) {
            const num = parseFloat(lines[i][j]);
            if (num !== undefined && !isNaN(num)) {
                if (l === 0) {
                    matrix[k] = [];
                }
                matrix[k][l] = num;
                l++;
            }
        }
        if (l > 0) {
            k++;
        }
    }

    return isOneLine ? matrix.flat() : matrix;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form');
    setDefVals(form);
    form.addEventListener('submit', submit);
});
