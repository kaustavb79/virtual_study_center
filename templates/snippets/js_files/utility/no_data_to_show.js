"use strict"

$(document).ready(function() {
    var table = $(".no_data_to_show").closest("table");
    var table_id = table.attr("id");
    if(table.length){
        var td = table.find(".no_data_to_show").closest("td")
        var th_count = table.find("tr:first th").length;
        td.attr('colspan',`${th_count}`);
    }
})