$(document).ready(function(){
// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
    //   $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
      $("#articles").append(`
      
      <div class="cell large-6 left">
      <div class="callout large">
      <a id='save-article' class="label alert save-tag" href="/save-article">Save Article</a>
      <button data-id='` + data[i]._id + `' class="label secondary note-tag" href="/note-article">Add Note</button>
      <h3 class="article-title"><a class="link" target="_blank" href="`+data[i].link+`">`+data[i].title+`</a></h3>
      <h5 class="summary">`+data[i].summary+`...</h5>
        </div>
        </div>
        
      `)
    }
  });
})
  // Whenever someone clicks a p tag
$(document).on("click", "button", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);

        $("#notes").append(`
            
            <div class="cell large-6 right">
            <div class="callout primary" >
            <h2>`+data.title+`</h2>
            <input id='titleinput' name='title' >
            <textarea id='bodyinput' name='body'></textarea>
            <button class='label success' data-id=` + data._id +` id='savenote'>Save Note</button>
            </div>
            </div>
            
        `)
        
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });