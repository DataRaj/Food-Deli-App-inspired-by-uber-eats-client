import construction from '../../images/construction.svg';
import logo from '../../images/uber-eats.svg';

const Construction = () => {
	return (
		<section className='  flex flex-col justify-center items-center h-screen w-full'>
			<img className=' w-96' src={logo} alt='logo' />
			<div className='flex relative w-full items-center justify-center max-w-7xl mx-auto mt-16 text-center '>
				<img src={construction} alt='construction' />
			</div>
			<h1 className='text-4xl font-bold tracking-tight text-left text-gray-900 sm:text-5xl md:text-6xl md:text-center'>
				<span className='block'>
					Site is Under <span className='block mt-1 text-green-500 lg:inline lg:mt-0 '>Consteruction</span>
				</span>
			</h1>
			<span className='font-bold text-4xl my-10'>We will be Back Soon</span>
		</section>
	);
};

export default Construction;
