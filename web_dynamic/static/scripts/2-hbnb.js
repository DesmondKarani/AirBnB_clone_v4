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
});
