$(document).ready(function() {
  let selectedAmenities = {};

  $('input[type="checkbox"]').change(function() {
    if (this.checked) {
      // Add the amenity ID to the selectedAmenities object
      selectedAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      // Remove the amenity ID from the selectedAmenities object
      delete selectedAmenities[$(this).data('id')];
    }

    // Update the H4 tag with the list of selected amenities
    $('.amenities h4').text(Object.values(selectedAmenities).join(', '));
  });
// API Status Check
fetch('http://0.0.0.0:5001/api/v1/status/')
		.then(response => response.json())
		.then(data => {
			if (data.status === 'OK') {
				$('#api_status').addClass('available');
			} else {
				$('#api_status').removeClass('available');
			}
		})
		.catch(error => {
			console.log('API Status check failed:', error);
		});
// Fetch places
    const apiUrl = "http://0.0.0.0:5001/api/v1/places_search";

    function fetchAndDisplayPlaces() {
        $.ajax({
            url: apiUrl,
            type: "POST",
            data: JSON.stringify(amenities),
            contentType: "application/json",
            dataType: "json", 
            success: function(places) {
                $("section.places").empty(); // Clear existing place articles
                for (let place of places) {
                    let article = $(`<article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>`);
                    $("section.places").append(article);
                }
            }
        });
    }

    $('button').click(function() {
        fetchAndDisplayPlaces(); // Fetch and display places when button clicked
    });

    fetchAndDisplayPlaces(); // Fetch and display places on page load
});
