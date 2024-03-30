const NumericInput = ({quantity, changeQuantity, dishId}) => {
	return (
		<>
			<div className='flex justify-center items-center custom-number-input '>
				<div className='flex flex-row h-7 w-20 rounded-lg relative bg-transparent'>
					<button
						type='button'
						disabled={quantity === 1}
						onClick={() => {
							changeQuantity(dishId, 'decrease');
						}}
						className=' bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none'
					>
						<span className='m-auto text-lg font-thin'>−</span>
					</button>
					<input type='number' onChange={() => console.log('ok')} value={quantity} className='border-2 w-12 border-gray-100 focus:outline-none text-center  font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none' name='custom-input-number' />
					<button
						type='button'
						onClick={() => {
							changeQuantity(dishId, 'increase');
						}}
						className='bg-gray-100 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer'
					>
						<span className='m-auto text-lg font-thin'>+</span>
					</button>
				</div>
			</div>
		</>
	);
};

export default NumericInput;
