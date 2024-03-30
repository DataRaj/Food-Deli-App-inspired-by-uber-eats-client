interface IErrorSpan {
	message?: string;
}
const ErrorSpan: React.FC<IErrorSpan> = ({message}) => {
	if (message) {
		return (
			<span role={'alert'} className='bg-red-600 text-white px-4 span rounded-md absolute '>
				{message}
			</span>
		);
	}
	return <span className='bg-red-600 text-white px-4 span absolute '>Something went wrong</span>;
};
export default ErrorSpan;
