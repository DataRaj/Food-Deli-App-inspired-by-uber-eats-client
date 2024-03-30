import {Category as ICategory} from '../../graphql/schemaTypes';

const Category = ({category, setSlug, slug}: {category: ICategory; setSlug?: any; slug?: any}) => {
	return (
		<div onClick={() => setSlug(category?.slug)} key={category?.id} className='flex flex-col uppercase items-center cursor-pointer  '>
			<div
				className={`${slug === category.slug && '  shadow-green-500 shadow-inner'}  rounded-full w-14 h-14 bg-cover  `}
				style={{backgroundImage: `url(${category?.iconImg})`}}
			></div>
			<span className={` ${slug === category.slug && 'text-green-600 '}uppercase  mt-2 text-xs md:text-sm md:px-10 md:font-medium`}>{category?.name}</span>
		</div>
	);
};

export default Category;
