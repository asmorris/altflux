var React = require('react')
var LocationStore = require('../stores/LocationStore')

var Locations = React.createClass({
	getInitialState() {
		return LocationStore.getState()
	},

	componentDidMount() {
		LocationStore.listen(this.onChange)
		LocationsActions.fetchLocations()
	},

	componentWillUnmount() {
		LocationStore.unlisten(this.onChange)
	}
	onChange(state) {
		this.setState(state)
	},
	render() {
		if (this.state.errorMessage) {
			return (
				<div>Something is wrong</div>
			)
		}
		if (!this.state.locations.length) {
			return (
				<div>
					<img src='/my-cool-spinner.gif' />
				</div>
			)
		}
		return (
			<ul>
				{this.state.locations.map((location) => {
					return (
						<li>{location.name}</li>
					)
				})}
			</ul>
		)
	}
})

module.exports = Locations
