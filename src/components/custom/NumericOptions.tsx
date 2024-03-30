const NumericOptions = ({quantity, changeDishOptionQuantity, optionId, dishId}) => {
	return (
		<div className=' justify-center items-center custom-number-input '>
			<div className='flex flex-row h-7 mx-5 rounded-lg relative bg-transparent'>
				<button
					type='button'
					onClick={() => {
						changeDishOptionQuantity(optionId, 'decrease');
					}}
					className=' bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none'
				>
					<span className='m-auto text-lg font-thin'>−</span>
				</button>
				<input type='number' value={quantity} onChange={() => console.log('')} className='border-2 border-gray-100 focus:outline-none text-center w-12  font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none' name='custom-input-number' />
				<button
					type='button'
					onClick={() => {
						changeDishOptionQuantity(optionId, 'increase');
					}}
					className='bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer'
				>
					<span className='m-auto text-lg font-thin'>+</span>
				</button>
			</div>
		</div>
	);
};

export default NumericOptions;
