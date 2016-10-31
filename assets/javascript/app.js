	function addTopic() {
		console.log('push');
		var newTopic = $('#topic-input').val();
		console.log(newTopic);

		topicArray.push(newTopic);
		renderButtons();

		return false;
	}

	function renderButtons(){ 

		// Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
		$('#topicButtons').empty();

		// Loops through the array of movies
		for (var i = 0; i < topicArray.length; i++){

			// Note the jQUery syntax here... 
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('topic'); // Added a class 
		    a.attr('data-name', topicArray[i]); // Added a data-attribute
		    a.text(topicArray[i]); // Provided the initial button text
		    $('#topicButtons').append(a); // Added the button to the HTML
		}

	}

	function getAPI(){

		var topicCall = $(this).attr('data-name');
		var limit = 10; //controls how many images get returned
		var rating = ""; //rating limiter
		var apiKey = 'dc6zaTOxFJmzC'; //public key. get your own.
		console.log(topicCall);

		var searchQueryURL = "https://api.giphy.com/v1/gifs/search?q="+topicCall+"&limit="+limit+"&api_key=" + apiKey;

		// Creates AJAX call for the specific movie being 
		$.ajax({url: searchQueryURL, method: 'GET'}).done(function(response) {

			console.log(response);

			var subjectDiv = $('<div>');

			for (var i = 0; i < limit; i++) {
				var rating = response.data[i].rating;
				var imageURL = response.data[i].images.fixed_width.url;
				var imageStillURL = response.data[i].images.fixed_width_still.url;

				var image = $('<img class="giphy">').attr("src", imageStillURL);
				image.attr("data-state", "still");
				image.attr("data-animate", imageURL);
				image.attr("data-still", imageStillURL);
				var pRating = $('<p>').text( "Rating: " + rating);

				subjectDiv.append(image);
				subjectDiv.append(pRating);

				$("#topics").prepend(subjectDiv);
			}

		});

	}

	function toggleAnimation() {
		var state = $(this).attr('data-state');

	    if (state === "still") {
	        $(this).attr('src', $(this).attr('data-animate'));
	        $(this).attr('data-state','animate');
	    }
	    else {
	        $(this).attr('data-state','still')
	        $(this).attr('src', $(this).attr('data-still'));
	    }
	} 
