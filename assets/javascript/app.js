	function addTopic() {
		console.log('push');
		var newTopic = $('#topic-input').val();
		console.log(newTopic);

		topicArray.push(newTopic);
		renderButtons();

		return false;
	}

	function renderButtons(){ 

		$('#topicButtons').empty();

		for (var i = 0; i < topicArray.length; i++){

		    var a = $('<button>') 
		    a.addClass('topic'); 
		    a.attr('data-name', topicArray[i]); 
		    a.text(topicArray[i]);
		    $('#topicButtons').append(a); 
		}

	}

	function getAPI(){

		var topicCall = $(this).attr('data-name');
		var limit = 10; //controls how many images get returned
		var rating = "y"; //rating limiter. Rating for public key is SFW
		var apiKey = 'dc6zaTOxFJmzC'; //public key. seems to work for this assignment.
		console.log(topicCall);

		var searchQueryURL = "https://api.giphy.com/v1/gifs/search?q="+topicCall+"&limit="+limit+"&rating=" + rating + "&api_key=" + apiKey;

		// Creates AJAX call 
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
