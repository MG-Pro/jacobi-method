class Jacobi {
    tempX = [];

    norma = 1; // норма, определяемая как наибольшая разность компонент столбца иксов соседних итераций.

    eps = 0.001;

    calc(matrixA, vectorB) {
        // заданная точность

        const vectorX = this.initVectorX(vectorB.length); // Начальное приближение всегда равно 1

        while (this.norma > this.eps) {
            for (let i = 0; i < vectorB.length; i++) {
                this.tempX[i] = vectorB[i];
                for (let j = 0; j < vectorB.length; j++) {
                    if (i !== j) {
                        this.tempX[i] -= matrixA[i][j] * vectorX[j];
                    }
                }
                this.tempX[i] /= matrixA[i][i]
            }
            this.norma = Math.abs(vectorX[0] - this.tempX[0]);
            for (let i = 0; i < vectorB.length; i++) {
                let res = Math.abs(vectorX[i] - this.tempX[i]);
                if (res > this.norma) {
                    this.norma = res;
                }
                vectorX[i] = parseFloat((this.tempX[i]).toFixed(4));
            }
        }
        return vectorX;
    }

    initVectorX(length) {
        const vectorX = [];
        for (let i = 0; i < length; i++) {
            vectorX.push(1);
        }
        return vectorX;
    }

    static textToMatrixWrapper(text, isOneLine = false) {
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

        return isOneLine ? matrix[0] : matrix;
    }
}
