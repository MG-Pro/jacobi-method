const defMatrix =
    `10 1 -1
1 10 -1
-1 1 10`;

const defRightSideVector =
    `11 10 10`;

function submit(e) {
    e.preventDefault();
    const textMatrix = e.target[0].value;
    const textVector = e.target[1].value;

    const matrix = Jacobi.textToMatrixWrapper(textMatrix);
    const vector = Jacobi.textToMatrixWrapper(textVector, true);

    const method = new Jacobi();

    const result = method.calc(matrix, vector);
    console.log(result);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const textMatrixEl = form[0];
    const textVectorEl = form[1];

    textMatrixEl.textContent = defMatrix;
    textVectorEl.textContent = defRightSideVector;

    form.addEventListener('submit', submit);
});


