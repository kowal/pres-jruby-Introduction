function getCurrentNotes() {
    var notes = $(".notes");

    notes.hide();
    $("#footer").mouseover(function(){
        notes.show();
    });

    $("#footer").mouseout(function(){
       notes.hide();
    });
}
