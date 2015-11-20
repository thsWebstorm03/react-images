import React from 'react';
import Lightbox from 'react-images';

var Standard = React.createClass({
	displayName: 'Standard',
	propTypes: {
		images: React.PropTypes.array,
		heading: React.PropTypes.string,
		subheading: React.PropTypes.string,
		sepia: React.PropTypes.bool,
	},
	getInitialState () {
		return {
			lightboxIsOpen: false,
		};
	},
	openLightbox (index, event) {
		event.preventDefault();
		this.setState({
			lightboxIsOpen: true,
			lightboxInitialImage: index,
		});
	},
	closeLightbox () {
		this.setState({
			lightboxIsOpen: false,
		});
	},
	renderGallery () {
		if (!this.props.images) return;
		let gallery = this.props.images.map((obj, i) => {
			return (
				<a key={i} href={obj.src} onClick={(event) => this.openLightbox(i, event)} style={Object.assign({}, styles.thumbnail)}>
				    <img src={obj.thumbnail} width={styles.thumbnail.size} height={styles.thumbnail.size} />
				</a>
			);
		});

		return (
			<div style={styles.gallery}>
				{gallery}
			</div>
		);
	},
	render () {
		return (
			<div className="section">
				{this.props.heading && <h2>{this.props.heading}</h2>}
				{this.props.subheading && <p>{this.props.subheading}</p>}
				{this.renderGallery()}
				<Lightbox
					images={this.props.images}
					initialImage={this.state.lightboxInitialImage}
					isOpen={this.state.lightboxIsOpen}
					onClose={this.closeLightbox}
					styles={this.props.styles}
					width={1200}
				/>
			</div>
		);
	}
});

const THUMBNAIL_SIZE = 58;

const styles = {
	gallery: {
		marginLeft: -5,
		marginRight: -5,
		overflow: 'hidden',
	},
	thumbnail: {
		backgroundSize: 'cover',
		borderRadius: 3,
		float: 'left',
		height: THUMBNAIL_SIZE,
		margin: 5,
		overflow: 'hidden',
		width: THUMBNAIL_SIZE,
	},
	thumbnailImage: {
		display: 'block',
		height: THUMBNAIL_SIZE,
		left: '50%',
		position: 'relative',

		WebkitTransform: 'translateX(-50%)',
		MozTransform:    'translateX(-50%)',
		msTransform:     'translateX(-50%)',
		transform:       'translateX(-50%)',
	},
};

module.exports = Standard;
