

// create_dynamic_table_form_obj start

function create_dynamic_table_form_obj(obj) {

    var data = obj.data;
    var table_id = obj.table_id;
    var table_class = obj.table_class;

    // EXTRACT VALUE FOR HTML HEADER fields.
    var col = obj.col;

    // EXTRACT VALUE FOR HTML HEADER text.
    var col_name_obj = obj.col_name_obj;

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    table.setAttribute("id", table_id);
    table.setAttribute("class", table_class);

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col_name_obj[col[i]];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < data.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            if( typeof data[i][col[j]] === 'undefined' || data[i][col[j]] === null ){
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = "NA";
                }
            else{
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = data[i][col[j]];
            }
        }
//        // extra add extra field for deleting the row
//        var tabCell = tr.insertCell(-1);
//        tabCell.innerHTML = `<button class="delete_row">Delete</button>`;
    }

    return table;

}

// extra adding one row
//function add_row(table_id, col_count){
//    var table = $(`#${table_id} tbody`)
//    var col = col_count;
//    var row = '<tr> ';
//    for(var i=0; i<col; i++){
//        row += `<td class="edit_mode_on" contenteditable="true">`;
//    }
//    row += `<td> <button class="delete_row">Delete</button> </td> </tr>`;
//    table.append(row);
//    add_event_listeners();
//}
// create_dynamic_table_form_obj start
