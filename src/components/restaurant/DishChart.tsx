import {VictoryAxis, VictoryChart, VictoryLine, VictoryVoronoiContainer, VictoryZoomContainer} from 'victory';
import {Order} from '../../graphql/schemaTypes';

const DishChart = ({orders}: {orders: Order[]}) => {
	const data = orders.map((order) => ({x: order.createdAt, y: order.totalPrice}));

	return (
		<div className=' flex  flex-col mt-20 items-center justify-center text-center'>
			<h4 className='text-center text-2xl font-medium'>Sales</h4>
			<div className='w-1/2 mt-20'>
				<VictoryChart domainPadding={50} containerComponent={<VictoryVoronoiContainer />}>
					<VictoryLine data={data} />
					<VictoryAxis dependentAxis tickFormat={(tick) => `${tick} $`} />
					<VictoryAxis tickFormat={(tick) => new Date(tick).toLocaleDateString()} />
				</VictoryChart>
			</div>
		</div>
	);
};

export default DishChart;
