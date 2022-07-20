"use strict";
exports.__esModule = true;
exports.Journal = void 0;
var JournalLine_1 = require("./JournalLine");
var yup = require("yup");
var Journal = /** @class */ (function () {
    function Journal(date, client, concept) {
        this.date = date;
        this.client = client;
        this.concept = concept;
        this.lines = [];
    }
    Journal.prototype.getTotalDebit = function () {
        return this.lines.reduce(function (acc, line) { return acc + line.debit; }, 0);
    };
    Journal.prototype.getTotalCredit = function () {
        return this.lines.reduce(function (acc, line) { return acc + line.credit; }, 0);
    };
    Journal.prototype.validateTotalsAreEquals = function () {
        return this.getTotalCredit() === this.getTotalDebit();
    };
    Journal.prototype.addLine = function (journalDto) {
        var schema = yup.object().shape({
            code: yup.string().required(),
            account: yup.string().required(),
            amount: yup.number().required(),
            operation: yup.string().max(1).required()
        });
        var validatedData = schema.validateSync(journalDto);
        if (journalDto.operation === "C") {
            this.lines.push(new JournalLine_1.JournalLine(validatedData.code, validatedData.account, 0, validatedData.amount, this));
        }
        else {
            this.lines.push(new JournalLine_1.JournalLine(validatedData.code, validatedData.account, validatedData.amount, 0, this));
        }
    };

    Journal.prototype.deleteLine = function () {

        var linesCopy = this.lines.slice();

        console.log("*************************** Lineas Iniciales *************************** \n \n ", linesCopy);
        /* en tal caso que de que se quieran eliminar varias lineas se deberá escribir
        index != 1 && index != 2, para que ambas lineas sean eliminadas */
        var nuevoArreglo;
        nuevoArreglo = this.lines.filter(function (a, index) { return index != 2; });
        console.log("*************************** Lineas  Cambiadas ***************************\n \n ", nuevoArreglo);
    };
    return Journal;
}());
exports.Journal = Journal;
