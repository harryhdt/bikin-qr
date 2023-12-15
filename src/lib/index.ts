type qrConfigProps = {
	width?: number;
	height?: number;
	type?: string;
	data?: string;
	image?: string;
	margin?: number;
	dotsOptions?: {
		color?: string;
		type?: string;
	};
	backgroundOptions?: {
		color?: string;
	};
	imageOptions?: {
		crossOrigin?: string;
		margin?: number;
	};
	qrConfig?: {
		fileName?: string;
	};
};

const defaultConfig = {
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

const generateQR = (config: qrConfigProps) => {
	import('qr-code-styling').then(async ({ default: QRCodeStyling }) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const qrConfig = { ...defaultConfig, ...config } as any;
		const qrCode = new QRCodeStyling(qrConfig);
		qrCode.download({ name: qrConfig.qrConfig.fileName, extension: 'png' });
	});
};

export { generateQR };
