import {gql} from '@apollo/client';

export const NEW_PENDING_ORDER = gql`
	subscription PendingOrderSub {
		pendingOrders {
			id
			# items {
			# 	id
			# 	dish {
			# 		name
			# 		options {
			# 			name
			# 		}
			# 	}
			# 	options {
			# 		name
			# 	}
			# }
		}
	}
`;
// export const COOKED_ORDER_SUB = gql`
// 	subscription cookedOrderSub($data: OrderInputType!) {
// 		cookedOrders(data: $data) {
// 			restaurant {
// 				name
// 			}
// 			totalPrice
// 			customer {
// 				email
// 			}
// 		}
// 	}
// `;
export const NEW_UPDATE_ORDER = gql`
	subscription UpdateOrders {
		updateOrders {
			id
			status
			driver {
				email
			}
			restaurant {
				id
				name
				isPromoted
				address
				category {
					id
				}
				coverImg
			}
			# items {
			# 	id
			# 	options {
			# 		id
			# 		name
			# 		extra
			# 	}
			# }
			totalPrice
			customer {
				id
			}
			createdAt
		}
	}
`;
