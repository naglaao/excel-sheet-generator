let table = document.getElementsByClassName("sheet-body")[0],
rows = document.getElementsByClassName("rows")[0],
columns = document.getElementsByClassName("columns")[0]
tableExists = false

const generateTable = () => {
    let rowsNumber = parseInt(rows.value), columnsNumber = parseInt(columns.value)
    table.innerHTML = ""
    for(let i=0; i<rowsNumber; i++){
        var tableRow = ""
        for(let j=0; j<columnsNumber; j++){
            tableRow += `<td contenteditable></td>`
        }
        table.innerHTML += tableRow
    }
    if(rowsNumber>0 && columnsNumber>0){
        tableExists = true
    }
    else{
        swal({
            icon: 'error',
            title: 'wrong',
            text: 'Please enter the number of columns and rows!',
            button: "OK"
          })
    }
}

const ExportToExcel = (type, fn, dl) => {
    if(!tableExists){
        swal({
            icon: 'error',
            title: 'wrong',
            text: 'Please Create a Table!',
            button: "OK"
          })
    }
    
    var elt = table
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" })
    return dl ? XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' })
        : XLSX.writeFile(wb, fn || ('MyNewSheet.' + (type || 'xlsx')))
}
