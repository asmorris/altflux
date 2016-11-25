var alt = require('../alt')

class LocationActions {
	updateLocations(locations) {
		return locations
	}

	fetchLocations() {
		return (dispatch) => {
			// we dispatch an event so we can have a 'loading' state.
			dispatch()
			Location.source.fetch()
				.then((locations) => {
					// we can access other actions within our action through 'this.actions'
					this.updateLocations(locations)
				})
				.catch((errorMessage) => {
					this.locationsFailed(errorMessage)
			})
		}
	}

	locationsFailed(errorMessage) {
		return errorMessage
	}

	favoriteLocation(locationId) {
		this.dispatch(locationId)
	}

	resetAllFavorites() {
		this.locations = this.locations.map((location) => {
			return {
				id: location.id,
				name: location.name,
				has_favorite: false
			}
		})
	}

	setFavorites(location) {
		this.waitFor(FavoritesStore)

		var favoritedLocations = FavoritesStore.getState().locations

		this.resetAllFavorites()

		favoritedLocations.forEach((location) => {
			//find each location in the array

			for (var i=0; i<this.locations.length; i++) {
				// set has_favorite to true
				if (this.locations[i].id === location.id) {
					this.locations[i].has_favorite = true
					break
				}
			}
		})
	}

}

module.exports = alt.createActions(LocationActions)
