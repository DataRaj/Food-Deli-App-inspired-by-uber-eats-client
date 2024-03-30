const Loading = () => {
	return (
		<div className='h-screen flex justify-center items-center w-full'>
			<div className='h-12  w-12 absolute border-2 border-green-400 animate-ping rounded-full'></div>
			<div className='h-14  w-14 absolute border-2 border-green-400 animate-ping rounded-full'></div>
			<div className='h-16  w-16 absolute border-2 border-green-400 animate-wiggle rounded-full'></div>
		</div>
	);
};

export default Loading;
