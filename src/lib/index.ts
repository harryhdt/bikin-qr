type DotType = 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
type CornerDotType = 'dot' | 'square';
type CornerSquareType = 'dot' | 'square' | 'extra-rounded';
type GradientType = 'radial' | 'linear';
type DrawType = 'canvas' | 'svg';
type Gradient = {
	type: GradientType;
	rotation?: number;
	colorStops: {
		offset: number;
		color: string;
	}[];
};
type TypeNumber = 40;
type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
type Mode = 'Numeric' | 'Alphanumeric' | 'Byte' | 'Kanji';
type Extension = 'svg' | 'png' | 'jpeg' | 'webp';
type DownloadOptions = {
	name?: string;
	extension?: Extension;
};

type QRCodeOptions = {
	type?: DrawType;
	width?: number;
	height?: number;
	margin?: number;
	data?: string;
	image?: string;
	qrOptions?: {
		typeNumber?: TypeNumber;
		mode?: Mode;
		errorCorrectionLevel?: ErrorCorrectionLevel;
	};
	imageOptions?: {
		hideBackgroundDots?: boolean;
		imageSize?: number;
		crossOrigin?: string;
		margin?: number;
	};
	dotsOptions?: {
		type?: DotType;
		color?: string;
		gradient?: Gradient;
	};
	cornersSquareOptions?: {
		type?: CornerSquareType;
		color?: string;
		gradient?: Gradient;
	};
	cornersDotOptions?: {
		type?: CornerDotType;
		color?: string;
		gradient?: Gradient;
	};
	backgroundOptions?: {
		color?: string;
		gradient?: Gradient;
	};
	downloadOptions?: DownloadOptions;
};
const defaultConfig: QRCodeOptions = {
	width: 300,
	height: 300,
	type: 'svg',
	data: 'https://harryhdt.dev',
	image: '',
	margin: 8,
	dotsOptions: {
		color: '#000',
		type: 'square'
	},
	backgroundOptions: {
		color: '#fff'
	},
	imageOptions: {
		crossOrigin: 'anonymous',
		margin: 20
	}
};

const generateQR = (config: QRCodeOptions) => {
	if ('QRCodeStyling' in window) {
		const theConfig = { ...defaultConfig, ...config } as QRCodeOptions;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		const qrCode = new window.QRCodeStyling(theConfig);
		qrCode.download({ name: theConfig.downloadOptions?.name, extension: 'png' });
	} else {
		alert('Something went wrong !!!');
	}
};

export { generateQR };
