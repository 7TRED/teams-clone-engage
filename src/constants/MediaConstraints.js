const mediaConstraints = {
	audio : {
		echoCancellation : true,
		noiseSuppression : true,
	},

	video : {
		resizeMode  : 'crop-and-scale',
		aspectRatio : 1.777778,
		facingMode  : 'environment',
	},
};

export default mediaConstraints;
