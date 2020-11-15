const defMatrix =
    `10 1 -1
1 10 -1
-1 1 10`;

const defVector = '11 10 10';

function submit(e) {
    e.preventDefault();
    const text = e.target[0].value;

    const matrix = Jacobi.textToMatrixWrapper(text);
    const vector = Jacobi.textToMatrixWrapper(defVector, true);
    const method = new Jacobi();
    const result = method.calc(matrix, vector);
    console.log(result);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const textArea = form.querySelector('textarea');

    textArea.textContent = defMatrix;
    form.addEventListener('submit', submit);
});


