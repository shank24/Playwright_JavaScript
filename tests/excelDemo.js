const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');


//Way 1 via Promise
//Workbook
/*const workBook = new ExcelJs.Workbook();
//Read File
workBook.xlsx.readFile("/Users/shankykalra/Downloads/download.xlsx").then(function () {
    //Sheet
    const worksheet = workBook.getWorksheet('Sheet1');
    //Traversing Row and Cell
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, collNumber) => {
            console.log(cell.value);
        });
    });
})*/


//Way 2 Via async and await
async function excelTravserse() {
    console.log("Via Function");
    const workBook = new ExcelJs.Workbook();
    //Read File
    await workBook.xlsx.readFile("/Users/shankykalra/Downloads/download.xlsx")
    //Sheet
    const worksheet = workBook.getWorksheet('Sheet1');
    //Traversing Row and Cell
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, collNumber) => {
            console.log(cell.value);
        });
    });
}
//excelTravserse();


//Getting Specific Cell Number and Value

async function writeExcelTest(searchText, replaceText, change, filePath) {
    const workBook = new ExcelJs.Workbook();
    //Read File
    await workBook.xlsx.readFile(filePath)
    //Sheet
    const worksheet = workBook.getWorksheet('Sheet1');
    //Traversing Row and Cell
    const output = await readExcel(worksheet, searchText);

    //Writing Specific Cell
    const cellToWrite = worksheet.getCell(output.row, output.col + change.colChange);
    cellToWrite.value = replaceText;
    await workBook.xlsx.writeFile(filePath);
}


async function readExcel(worksheet, searchText) {
    let output = { row: 1, col: 1 };

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, collNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.col = collNumber;
            }

        })
    })
    return output;
}


//writeExcelTest("Coconut", "350",{rowChange:0, colChange:2}, "/Users/shankykalra/Downloads/download.xlsx");

test('Uplaod Download Excel Validations', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

})
