import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
}

export interface AddressItem {
  __typename?: 'AddressItem';
  address: Scalars['String'];
  apartment: Scalars['String'];
  city: Scalars['String'];
  id: Scalars['String'];
  postalCode: Scalars['Float'];
  region: Scalars['String'];
}

export interface AddressItemObjectType {
  address: Scalars['String'];
  apartment: Scalars['String'];
  city: Scalars['String'];
  id: Scalars['String'];
  postalCode: Scalars['Float'];
  region: Scalars['String'];
}

export interface CategoriesOutput {
  __typename?: 'CategoriesOutput';
  categories?: Maybe<Array<Category>>;
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
}

export interface Category {
  __typename?: 'Category';
  createdAt?: Maybe<Scalars['DateTime']>;
  iconImg?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name: Scalars['String'];
  restaurantCount: Scalars['Int'];
  restaurants: Array<Restaurant>;
  slug?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
}

export interface CategoryInput {
  iconImg?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  restaurants: Array<RestaurantInput>;
  slug?: InputMaybe<Scalars['String']>;
}

export interface CategoryInputType {
  page?: InputMaybe<Scalars['Int']>;
  slug: Scalars['String'];
}

export interface CategoryOutput {
  __typename?: 'CategoryOutput';
  category?: Maybe<Category>;
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  restaurants?: Maybe<Array<Restaurant>>;
  totalPages?: Maybe<Scalars['Int']>;
}

export interface CreateCategoryInput {
  iconImg?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  slug?: InputMaybe<Scalars['String']>;
}

export interface CreateCategoryOutput {
  __typename?: 'CreateCategoryOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
}

export interface CreateDishInput {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  options?: InputMaybe<Array<DishOptionInput>>;
  photo?: InputMaybe<Scalars['String']>;
  price: Scalars['Int'];
  restaurantId: Scalars['Int'];
}

export interface CreateDishOutput {
  __typename?: 'CreateDishOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
}

export interface CreateOrderInput {
  dishOptionQuantity?: InputMaybe<Array<DishOptionQuantitInputType>>;
  dishQuantity: Array<DishQuantityInputType>;
  restaurantId: Scalars['Int'];
  totalPrice: Scalars['Float'];
  userAddress: AddressItemObjectType;
}

export interface CreateOrderOutput {
  __typename?: 'CreateOrderOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  orderId?: Maybe<Scalars['Int']>;
}

export interface CreatePaymentInputType {
  orderId: Scalars['Int'];
  payment_method: Scalars['String'];
}

export interface CreatePaymentOutput {
  __typename?: 'CreatePaymentOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  url?: Maybe<Scalars['String']>;
}

export interface CreateRestaurantInput {
  address: Scalars['String'];
  categoryId: Scalars['Float'];
  coverImg: Scalars['String'];
  name: Scalars['String'];
}

export interface CreateRestaurantOutput {
  __typename?: 'CreateRestaurantOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
}

export interface DeleteDishOutput {
  __typename?: 'DeleteDishOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
}

export interface DeleteRestaurantInput {
  address?: InputMaybe<Scalars['String']>;
  categoryId?: InputMaybe<Scalars['Float']>;
  coverImg?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  restaurantId: Scalars['Float'];
}

export interface DeleteRestaurantOutput {
  __typename?: 'DeleteRestaurantOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
}

export interface Dish {
  __typename?: 'Dish';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name: Scalars['String'];
  options?: Maybe<Array<DishOption>>;
  photo?: Maybe<Scalars['String']>;
  price: Scalars['Int'];
  restaurant: Restaurant;
  updatedAt?: Maybe<Scalars['DateTime']>;
}

export interface DishInput {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  options?: InputMaybe<Array<DishOptionInput>>;
  photo?: InputMaybe<Scalars['String']>;
  price: Scalars['Int'];
  restaurant: RestaurantInput;
}

export interface DishOption {
  __typename?: 'DishOption';
  extra: Scalars['Int'];
  id: Scalars['String'];
  name: Scalars['String'];
  quantity: Scalars['Int'];
}

export interface DishOptionInput {
  extra: Scalars['Int'];
  id: Scalars['String'];
  name: Scalars['String'];
  quantity: Scalars['Int'];
}

export interface DishOptionQuantitInputType {
  id: Scalars['String'];
  quantity: Scalars['Float'];
}

export interface DishOutput {
  __typename?: 'DishOutput';
  dish?: Maybe<Dish>;
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
}

export interface DishQuantityInputType {
  id: Scalars['Float'];
  quantity: Scalars['Float'];
}

export interface EditDishInput {
  description?: InputMaybe<Scalars['String']>;
  dishId: Scalars['Float'];
  name?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Array<DishOptionInput>>;
  photo?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
  restaurantId?: InputMaybe<Scalars['Int']>;
}

export interface EditDishOutput {
  __typename?: 'EditDishOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
}

export interface EditOrderInput {
  id: Scalars['Float'];
  status: OrderStatus;
}

export interface EditOrderOutput {
  __typename?: 'EditOrderOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
}

export interface EditRestaurantInput {
  address?: InputMaybe<Scalars['String']>;
  categoryId?: InputMaybe<Scalars['Float']>;
  coverImg?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  restaurantId: Scalars['Float'];
}

export interface EditRestaurantOutput {
  __typename?: 'EditRestaurantOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
}

export interface Mutation {
  __typename?: 'Mutation';
  addUser: User;
  createAccount: CreateAccountOutput;
  createCategory: CreateCategoryOutput;
  createDishe: CreateDishOutput;
  createOrder: CreateOrderOutput;
  createPayment: CreatePaymentOutput;
  createRestaurant: CreateRestaurantOutput;
  deleteDish: DeleteDishOutput;
  deleteRestaurant: DeleteRestaurantOutput;
  editDish: EditDishOutput;
  editOrder: EditOrderOutput;
  editRestaurant: EditRestaurantOutput;
  login: LoginOutput;
  takeOrder: OrderOutput;
  updateUser: UpdateUserOutput;
  validateEmail: ValidateEmailOutput;
  verifyPayment: VerifyPaymentOutput;
}


export interface MutationAddUserArgs {
  data: AddUserArgs;
}


export interface MutationCreateAccountArgs {
  data: CreateAccountInput;
}


export interface MutationCreateCategoryArgs {
  data: CreateCategoryInput;
}


export interface MutationCreateDisheArgs {
  data: CreateDishInput;
}


export interface MutationCreateOrderArgs {
  data: CreateOrderInput;
}


export interface MutationCreatePaymentArgs {
  data: CreatePaymentInputType;
}


export interface MutationCreateRestaurantArgs {
  data: CreateRestaurantInput;
}


export interface MutationDeleteDishArgs {
  dishId: Scalars['Float'];
}


export interface MutationDeleteRestaurantArgs {
  data: DeleteRestaurantInput;
}


export interface MutationEditDishArgs {
  data: EditDishInput;
}


export interface MutationEditOrderArgs {
  data: EditOrderInput;
}


export interface MutationEditRestaurantArgs {
  data: EditRestaurantInput;
}


export interface MutationLoginArgs {
  data: LoginInput;
}


export interface MutationTakeOrderArgs {
  data: OrderInputType;
}


export interface MutationUpdateUserArgs {
  data: UpdateUserInput;
}


export interface MutationValidateEmailArgs {
  data: ValidateEmailInput;
}


export interface MutationVerifyPaymentArgs {
  data: VerifyPaymentInputType;
}

export interface Order {
  __typename?: 'Order';
  address?: Maybe<AddressItem>;
  createdAt?: Maybe<Scalars['DateTime']>;
  customer?: Maybe<User>;
  driver?: Maybe<User>;
  id: Scalars['Float'];
  items: Array<OrderItem>;
  options?: Maybe<Array<OrderOptionItem>>;
  restaurant?: Maybe<Restaurant>;
  status: OrderStatus;
  totalPrice?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
}

export interface OrderInputType {
  id: Scalars['Float'];
}

export interface OrderItem {
  __typename?: 'OrderItem';
  id: Scalars['String'];
  name: Scalars['String'];
  photo: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
  restaurantId: Scalars['Float'];
}

export interface OrderItemInputType {
  id: Scalars['String'];
  name: Scalars['String'];
  photo: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Float'];
  restaurantId: Scalars['Float'];
}

export interface OrderOptionItem {
  __typename?: 'OrderOptionItem';
  dishId: Scalars['Float'];
  extra: Scalars['Float'];
  id: Scalars['String'];
  name: Scalars['String'];
  quantity: Scalars['Float'];
}

export interface OrderOptionItemInputType {
  dishId: Scalars['Float'];
  extra: Scalars['Float'];
  id: Scalars['String'];
  name: Scalars['String'];
  quantity: Scalars['Float'];
}

export interface OrderOutput {
  __typename?: 'OrderOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  order?: Maybe<Order>;
  totalPages?: Maybe<Scalars['Int']>;
}

export enum OrderStatus {
  Cooked = 'Cooked',
  Cooking = 'Cooking',
  Delivered = 'Delivered',
  Failed = 'Failed',
  PickedUp = 'PickedUp'
}

export interface OrdersInputFilter {
  status?: InputMaybe<OrderStatus>;
}

export interface OrdersInputType {
  address?: InputMaybe<AddressItemObjectType>;
  customer?: InputMaybe<UserInput>;
  driver?: InputMaybe<UserInput>;
  items: Array<OrderItemInputType>;
  options?: InputMaybe<Array<OrderOptionItemInputType>>;
  restaurant?: InputMaybe<RestaurantInput>;
  status: OrderStatus;
  totalPrice?: InputMaybe<Scalars['Float']>;
}

export interface OrdersOutput {
  __typename?: 'OrdersOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  orders?: Maybe<Array<Order>>;
}

export interface Payment {
  __typename?: 'Payment';
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['Float'];
  order: Order;
  orderId: Scalars['Int'];
  payment_amount?: Maybe<Scalars['Float']>;
  payment_method: Scalars['String'];
  transactionId: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
}

export interface PaymentsInputType {
  order: OrdersInputType;
  orderId: Scalars['Int'];
  payment_amount?: InputMaybe<Scalars['Float']>;
  payment_method: Scalars['String'];
  transactionId: Scalars['String'];
  user: UserInput;
}

export interface PaymentsOutput {
  __typename?: 'PaymentsOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  payments?: Maybe<Array<Payment>>;
}

export interface Query {
  __typename?: 'Query';
  Payments: PaymentsOutput;
  getCategories: CategoriesOutput;
  getCategory: CategoryOutput;
  getDish: DishOutput;
  getOrderById: OrderOutput;
  getOrders: OrdersOutput;
  getOwnerRestaurant: RestaurantOutput;
  getOwnerRestaurants: RestaurantsOutput;
  getRestaurant: RestaurantOutput;
  getRestaurants: RestaurantsOutput;
  loggedInUser: User;
  searchRestaurants: SearchRestaurantOutput;
  userProfile: UserProfileOutput;
  users: Array<User>;
}


export interface QueryGetCategoryArgs {
  data: CategoryInputType;
}


export interface QueryGetDishArgs {
  dishId: Scalars['Int'];
}


export interface QueryGetOrderByIdArgs {
  data: OrderInputType;
}


export interface QueryGetOrdersArgs {
  data: OrdersInputFilter;
}


export interface QueryGetOwnerRestaurantArgs {
  data: RestaurantInputType;
}


export interface QueryGetOwnerRestaurantsArgs {
  data: RestaurantsInput;
}


export interface QueryGetRestaurantArgs {
  data: RestaurantInputType;
}


export interface QueryGetRestaurantsArgs {
  data: RestaurantsInput;
}


export interface QuerySearchRestaurantsArgs {
  data: SearchRestaurantInput;
}


export interface QueryUserProfileArgs {
  userId: Scalars['Float'];
}

export interface Restaurant {
  __typename?: 'Restaurant';
  address: Scalars['String'];
  category?: Maybe<Category>;
  coverImg: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['Float'];
  isOpen: Scalars['Boolean'];
  isPromoted: Scalars['Boolean'];
  menu: Array<Dish>;
  name: Scalars['String'];
  orders: Array<Order>;
  owner: User;
  promotedUntil?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
}

export interface RestaurantInput {
  address: Scalars['String'];
  category?: InputMaybe<CategoryInput>;
  coverImg: Scalars['String'];
  isOpen: Scalars['Boolean'];
  isPromoted: Scalars['Boolean'];
  menu: Array<DishInput>;
  name: Scalars['String'];
  orders: Array<OrdersInputType>;
  owner: UserInput;
  promotedUntil?: InputMaybe<Scalars['DateTime']>;
}

export interface RestaurantInputType {
  restaurantId: Scalars['Int'];
}

export interface RestaurantOutput {
  __typename?: 'RestaurantOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  restaurant?: Maybe<Restaurant>;
}

export interface RestaurantsInput {
  page?: InputMaybe<Scalars['Int']>;
  slug?: InputMaybe<Scalars['String']>;
}

export interface RestaurantsOutput {
  __typename?: 'RestaurantsOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  restaurants?: Maybe<Array<Restaurant>>;
  totalPages?: Maybe<Scalars['Int']>;
  totalRestaurants?: Maybe<Scalars['Int']>;
}

export interface SearchRestaurantInput {
  page?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
}

export interface SearchRestaurantOutput {
  __typename?: 'SearchRestaurantOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  restaurants?: Maybe<Array<Restaurant>>;
  totalPages?: Maybe<Scalars['Int']>;
  totalRestaurants?: Maybe<Scalars['Int']>;
}

export interface Subscription {
  __typename?: 'Subscription';
  cookedOrders: Order;
  pendingOrders: Order;
  pendingPayments: Payment;
  updateOrders: Order;
}

export interface UpdateUserInput {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
}

export interface UpdateUserOutput {
  __typename?: 'UpdateUserOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
}

export interface User {
  __typename?: 'User';
  address?: Maybe<Array<AddressItem>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Float'];
  lastName: Scalars['String'];
  mobile: Scalars['String'];
  orders: Array<Order>;
  password: Scalars['String'];
  payments: Array<Payment>;
  restaurants: Array<Restaurant>;
  rides: Array<Order>;
  role: UserRole;
  updatedAt?: Maybe<Scalars['DateTime']>;
  verified: Scalars['Boolean'];
}

export interface UserInput {
  address?: InputMaybe<Array<AddressItemObjectType>>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  mobile: Scalars['String'];
  orders: Array<OrdersInputType>;
  password: Scalars['String'];
  payments: Array<PaymentsInputType>;
  restaurants: Array<RestaurantInput>;
  rides: Array<OrdersInputType>;
  role: UserRole;
  verified: Scalars['Boolean'];
}

export interface UserProfileOutput {
  __typename?: 'UserProfileOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
}

export enum UserRole {
  Admin = 'Admin',
  Client = 'Client',
  Delivery = 'Delivery',
  Owner = 'Owner'
}

export interface ValidateEmailInput {
  code: Scalars['String'];
}

export interface ValidateEmailOutput {
  __typename?: 'ValidateEmailOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
}

export interface VerifyPaymentInputType {
  refID: Scalars['String'];
  transactionId: Scalars['String'];
}

export interface VerifyPaymentOutput {
  __typename?: 'VerifyPaymentOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  orderId?: Maybe<Scalars['Float']>;
}

export interface AddUserArgs {
  address?: InputMaybe<Array<AddressItemObjectType>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  mobile: Scalars['String'];
  orders: Array<OrdersInputType>;
  password: Scalars['String'];
  payments: Array<PaymentsInputType>;
  restaurants: Array<RestaurantInput>;
  rides: Array<OrdersInputType>;
  role: UserRole;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  verified: Scalars['Boolean'];
}

export interface CreateAccountInput {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  mobile: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
}

export interface CreateAccountOutput {
  __typename?: 'createAccountOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
}

export interface LoginInput {
  email: Scalars['String'];
  password: Scalars['String'];
}

export interface LoginOutput {
  __typename?: 'loginOutput';
  message?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
}

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'loginOutput', ok: boolean, message?: string, token?: string } };

export type CreateAccountMutationVariables = Exact<{
  data: CreateAccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'createAccountOutput', ok: boolean, message?: string } };

export type ValidateEmailMutationVariables = Exact<{
  data: ValidateEmailInput;
}>;


export type ValidateEmailMutation = { __typename?: 'Mutation', validateEmail: { __typename?: 'ValidateEmailOutput', message?: string, ok: boolean } };

export type EditUserProfileMutationVariables = Exact<{
  data: UpdateUserInput;
}>;


export type EditUserProfileMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UpdateUserOutput', ok: boolean, message?: string } };

export type CreateCategoryMutationVariables = Exact<{
  data: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'CreateCategoryOutput', ok: boolean, message?: string } };

export type CreateRestaurantMutationVariables = Exact<{
  data: CreateRestaurantInput;
}>;


export type CreateRestaurantMutation = { __typename?: 'Mutation', createRestaurant: { __typename?: 'CreateRestaurantOutput', ok: boolean, message?: string } };

export type EditRestaurantMutationVariables = Exact<{
  data: EditRestaurantInput;
}>;


export type EditRestaurantMutation = { __typename?: 'Mutation', editRestaurant: { __typename?: 'EditRestaurantOutput', ok: boolean, message?: string } };

export type DeleteRestaurantMutationVariables = Exact<{
  data: DeleteRestaurantInput;
}>;


export type DeleteRestaurantMutation = { __typename?: 'Mutation', deleteRestaurant: { __typename?: 'DeleteRestaurantOutput', ok: boolean, message?: string } };

export type CreateDishMutationVariables = Exact<{
  data: CreateDishInput;
}>;


export type CreateDishMutation = { __typename?: 'Mutation', createDishe: { __typename?: 'CreateDishOutput', ok: boolean, message?: string } };

export type DeleteDishMutationVariables = Exact<{
  dishId: Scalars['Float'];
}>;


export type DeleteDishMutation = { __typename?: 'Mutation', deleteDish: { __typename?: 'DeleteDishOutput', ok: boolean, message?: string } };

export type EditDishMutationVariables = Exact<{
  data: EditDishInput;
}>;


export type EditDishMutation = { __typename?: 'Mutation', editDish: { __typename?: 'EditDishOutput', ok: boolean, message?: string } };

export type CreateOrderMutationVariables = Exact<{
  data: CreateOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'CreateOrderOutput', ok: boolean, message?: string, orderId?: number } };

export type EditOrderMutationVariables = Exact<{
  data: EditOrderInput;
}>;


export type EditOrderMutation = { __typename?: 'Mutation', editOrder: { __typename?: 'EditOrderOutput', ok: boolean, message?: string } };

export type TakeOrderMutationVariables = Exact<{
  data: OrderInputType;
}>;


export type TakeOrderMutation = { __typename?: 'Mutation', takeOrder: { __typename?: 'OrderOutput', ok: boolean, message?: string, order?: { __typename?: 'Order', id: number } } };

export type CreatePaymentMutationVariables = Exact<{
  data: CreatePaymentInputType;
}>;


export type CreatePaymentMutation = { __typename?: 'Mutation', createPayment: { __typename?: 'CreatePaymentOutput', ok: boolean, message?: string, url?: string } };

export type MutationMutationVariables = Exact<{
  data: VerifyPaymentInputType;
}>;


export type MutationMutation = { __typename?: 'Mutation', verifyPayment: { __typename?: 'VerifyPaymentOutput', message?: string, ok: boolean, orderId?: number } };

export type LoggedInUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedInUserQuery = { __typename?: 'Query', loggedInUser: { __typename?: 'User', id: number, email: string, role: UserRole, verified: boolean, address?: Array<{ __typename?: 'AddressItem', id: string, address: string, apartment: string, postalCode: number, region: string, city: string }> } };

export type GetOrdersQueryVariables = Exact<{
  data: OrdersInputFilter;
}>;


export type GetOrdersQuery = { __typename?: 'Query', getOrders: { __typename?: 'OrdersOutput', ok: boolean, message?: string, orders?: Array<{ __typename?: 'Order', id: number, totalPrice?: number, status: OrderStatus, createdAt?: any, driver?: { __typename?: 'User', id: number }, customer?: { __typename?: 'User', id: number, email: string }, restaurant?: { __typename?: 'Restaurant', id: number, name: string, coverImg: string } }> } };

export type GetOrderByIdQueryVariables = Exact<{
  data: OrderInputType;
}>;


export type GetOrderByIdQuery = { __typename?: 'Query', getOrderById: { __typename?: 'OrderOutput', ok: boolean, message?: string, order?: { __typename?: 'Order', id: number, createdAt?: any, status: OrderStatus, totalPrice?: number, options?: Array<{ __typename?: 'OrderOptionItem', id: string, quantity: number, name: string, extra: number, dishId: number }>, items: Array<{ __typename?: 'OrderItem', id: string, quantity: number, photo: string, price: number, name: string, restaurantId: number }>, customer?: { __typename?: 'User', id: number, email: string, role: UserRole }, driver?: { __typename?: 'User', id: number }, address?: { __typename?: 'AddressItem', id: string, address: string, apartment: string, postalCode: number, region: string, city: string }, restaurant?: { __typename?: 'Restaurant', id: number, name: string, isPromoted: boolean, address: string, coverImg: string, isOpen: boolean, category?: { __typename?: 'Category', id: number, name: string } } } } };

export type RestaurantsQueryVariables = Exact<{
  data: RestaurantsInput;
}>;


export type RestaurantsQuery = { __typename?: 'Query', getRestaurants: { __typename?: 'RestaurantsOutput', ok: boolean, message?: string, totalPages?: number, totalRestaurants?: number, restaurants?: Array<{ __typename?: 'Restaurant', id: number, name: string, isPromoted: boolean, address: string, coverImg: string, isOpen: boolean, category?: { __typename?: 'Category', id: number, name: string } }> } };

export type RestaurantsOwnerQueryVariables = Exact<{
  data: RestaurantsInput;
}>;


export type RestaurantsOwnerQuery = { __typename?: 'Query', getOwnerRestaurants: { __typename?: 'RestaurantsOutput', ok: boolean, message?: string, totalPages?: number, totalRestaurants?: number, restaurants?: Array<{ __typename?: 'Restaurant', id: number, name: string, isPromoted: boolean, address: string, coverImg: string, isOpen: boolean, category?: { __typename?: 'Category', id: number, name: string } }> } };

export type RestaurantQueryVariables = Exact<{
  data: RestaurantInputType;
}>;


export type RestaurantQuery = { __typename?: 'Query', getRestaurant: { __typename?: 'RestaurantOutput', ok: boolean, message?: string, restaurant?: { __typename?: 'Restaurant', id: number, name: string, isPromoted: boolean, address: string, coverImg: string, isOpen: boolean, menu: Array<{ __typename?: 'Dish', id: number, name: string, price: number, description?: string, photo?: string, options?: Array<{ __typename?: 'DishOption', id: string, name: string, extra: number }> }>, category?: { __typename?: 'Category', id: number, name: string } } } };

export type RestaurantOwnerQueryVariables = Exact<{
  data: RestaurantInputType;
}>;


export type RestaurantOwnerQuery = { __typename?: 'Query', getOwnerRestaurant: { __typename?: 'RestaurantOutput', ok: boolean, message?: string, restaurant?: { __typename?: 'Restaurant', id: number, name: string, isPromoted: boolean, address: string, coverImg: string, isOpen: boolean, menu: Array<{ __typename?: 'Dish', id: number, name: string, price: number, description?: string, photo?: string, options?: Array<{ __typename?: 'DishOption', id: string, name: string, extra: number }> }>, orders: Array<{ __typename?: 'Order', id: number, status: OrderStatus, totalPrice?: number, createdAt?: any }>, category?: { __typename?: 'Category', id: number, name: string } } } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', getCategories: { __typename?: 'CategoriesOutput', message?: string, ok: boolean, categories?: Array<{ __typename?: 'Category', id: number, name: string, slug?: string, restaurantCount: number, iconImg?: string }> } };

export type SearchRestaurantsQueryVariables = Exact<{
  data: SearchRestaurantInput;
}>;


export type SearchRestaurantsQuery = { __typename?: 'Query', searchRestaurants: { __typename?: 'SearchRestaurantOutput', ok: boolean, message?: string, totalRestaurants?: number, totalPages?: number, restaurants?: Array<{ __typename?: 'Restaurant', id: number, name: string, isPromoted: boolean, address: string, coverImg: string, isOpen: boolean, category?: { __typename?: 'Category', id: number, name: string } }> } };

export type UserProfileQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type UserProfileQuery = { __typename?: 'Query', userProfile: { __typename?: 'UserProfileOutput', ok: boolean, message?: string, user?: { __typename?: 'User', email: string } } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, email: string, role: UserRole }> };

export type CategoryQueryVariables = Exact<{
  data: CategoryInputType;
}>;


export type CategoryQuery = { __typename?: 'Query', getCategory: { __typename?: 'CategoryOutput', ok: boolean, message?: string, totalPages?: number, category?: { __typename?: 'Category', name: string, id: number, iconImg?: string, restaurantCount: number, slug?: string }, restaurants?: Array<{ __typename?: 'Restaurant', id: number, name: string, isPromoted: boolean, address: string, coverImg: string, isOpen: boolean, category?: { __typename?: 'Category', id: number, name: string } }> } };

export type GetDishQueryVariables = Exact<{
  dishId: Scalars['Int'];
}>;


export type GetDishQuery = { __typename?: 'Query', getDish: { __typename?: 'DishOutput', message?: string, ok: boolean, totalPages?: number, dish?: { __typename?: 'Dish', id: number, name: string, description?: string, price: number, photo?: string, createdAt?: any, updatedAt?: any, restaurant: { __typename?: 'Restaurant', id: number }, options?: Array<{ __typename?: 'DishOption', id: string, name: string, extra: number, quantity: number }> } } };

export type PaymentsQueryVariables = Exact<{ [key: string]: never; }>;


export type PaymentsQuery = { __typename?: 'Query', Payments: { __typename?: 'PaymentsOutput', ok: boolean, message?: string, payments?: Array<{ __typename?: 'Payment', payment_method: string }> } };

export type RestaurantFragmentFragment = { __typename?: 'Restaurant', id: number, name: string, isPromoted: boolean, address: string, coverImg: string, isOpen: boolean, category?: { __typename?: 'Category', id: number, name: string } };

export type DishFragmentFragment = { __typename?: 'Dish', id: number, name: string, price: number, description?: string, photo?: string, options?: Array<{ __typename?: 'DishOption', id: string, name: string, extra: number }> };

export type OrderFragmentFragment = { __typename?: 'Order', id: number, status: OrderStatus, totalPrice?: number, createdAt?: any };

export type PendingOrderSubSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type PendingOrderSubSubscription = { __typename?: 'Subscription', pendingOrders: { __typename?: 'Order', id: number } };

export type UpdateOrdersSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UpdateOrdersSubscription = { __typename?: 'Subscription', updateOrders: { __typename?: 'Order', id: number, status: OrderStatus, totalPrice?: number, createdAt?: any, driver?: { __typename?: 'User', email: string }, restaurant?: { __typename?: 'Restaurant', id: number, name: string, isPromoted: boolean, address: string, coverImg: string, category?: { __typename?: 'Category', id: number } }, customer?: { __typename?: 'User', id: number } } };

export const RestaurantFragmentFragmentDoc = gql`
    fragment RestaurantFragment on Restaurant {
  id
  name
  isPromoted
  address
  coverImg
  isOpen
  category {
    id
    name
  }
  coverImg
}
    `;
export const DishFragmentFragmentDoc = gql`
    fragment DishFragment on Dish {
  id
  name
  price
  description
  photo
  options {
    id
    name
    extra
  }
}
    `;
export const OrderFragmentFragmentDoc = gql`
    fragment OrderFragment on Order {
  id
  status
  totalPrice
  createdAt
}
    `;
export const LoginDocument = gql`
    mutation login($data: loginInput!) {
  login(data: $data) {
    ok
    message
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateAccountDocument = gql`
    mutation createAccount($data: createAccountInput!) {
  createAccount(data: $data) {
    ok
    message
  }
}
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const ValidateEmailDocument = gql`
    mutation validateEmail($data: ValidateEmailInput!) {
  validateEmail(data: $data) {
    message
    ok
  }
}
    `;
export type ValidateEmailMutationFn = Apollo.MutationFunction<ValidateEmailMutation, ValidateEmailMutationVariables>;

/**
 * __useValidateEmailMutation__
 *
 * To run a mutation, you first call `useValidateEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateEmailMutation, { data, loading, error }] = useValidateEmailMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useValidateEmailMutation(baseOptions?: Apollo.MutationHookOptions<ValidateEmailMutation, ValidateEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ValidateEmailMutation, ValidateEmailMutationVariables>(ValidateEmailDocument, options);
      }
export type ValidateEmailMutationHookResult = ReturnType<typeof useValidateEmailMutation>;
export type ValidateEmailMutationResult = Apollo.MutationResult<ValidateEmailMutation>;
export type ValidateEmailMutationOptions = Apollo.BaseMutationOptions<ValidateEmailMutation, ValidateEmailMutationVariables>;
export const EditUserProfileDocument = gql`
    mutation EditUserProfile($data: UpdateUserInput!) {
  updateUser(data: $data) {
    ok
    message
  }
}
    `;
export type EditUserProfileMutationFn = Apollo.MutationFunction<EditUserProfileMutation, EditUserProfileMutationVariables>;

/**
 * __useEditUserProfileMutation__
 *
 * To run a mutation, you first call `useEditUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserProfileMutation, { data, loading, error }] = useEditUserProfileMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditUserProfileMutation(baseOptions?: Apollo.MutationHookOptions<EditUserProfileMutation, EditUserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserProfileMutation, EditUserProfileMutationVariables>(EditUserProfileDocument, options);
      }
export type EditUserProfileMutationHookResult = ReturnType<typeof useEditUserProfileMutation>;
export type EditUserProfileMutationResult = Apollo.MutationResult<EditUserProfileMutation>;
export type EditUserProfileMutationOptions = Apollo.BaseMutationOptions<EditUserProfileMutation, EditUserProfileMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($data: CreateCategoryInput!) {
  createCategory(data: $data) {
    ok
    message
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const CreateRestaurantDocument = gql`
    mutation CreateRestaurant($data: CreateRestaurantInput!) {
  createRestaurant(data: $data) {
    ok
    message
  }
}
    `;
export type CreateRestaurantMutationFn = Apollo.MutationFunction<CreateRestaurantMutation, CreateRestaurantMutationVariables>;

/**
 * __useCreateRestaurantMutation__
 *
 * To run a mutation, you first call `useCreateRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRestaurantMutation, { data, loading, error }] = useCreateRestaurantMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateRestaurantMutation(baseOptions?: Apollo.MutationHookOptions<CreateRestaurantMutation, CreateRestaurantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRestaurantMutation, CreateRestaurantMutationVariables>(CreateRestaurantDocument, options);
      }
export type CreateRestaurantMutationHookResult = ReturnType<typeof useCreateRestaurantMutation>;
export type CreateRestaurantMutationResult = Apollo.MutationResult<CreateRestaurantMutation>;
export type CreateRestaurantMutationOptions = Apollo.BaseMutationOptions<CreateRestaurantMutation, CreateRestaurantMutationVariables>;
export const EditRestaurantDocument = gql`
    mutation editRestaurant($data: EditRestaurantInput!) {
  editRestaurant(data: $data) {
    ok
    message
  }
}
    `;
export type EditRestaurantMutationFn = Apollo.MutationFunction<EditRestaurantMutation, EditRestaurantMutationVariables>;

/**
 * __useEditRestaurantMutation__
 *
 * To run a mutation, you first call `useEditRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editRestaurantMutation, { data, loading, error }] = useEditRestaurantMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditRestaurantMutation(baseOptions?: Apollo.MutationHookOptions<EditRestaurantMutation, EditRestaurantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditRestaurantMutation, EditRestaurantMutationVariables>(EditRestaurantDocument, options);
      }
export type EditRestaurantMutationHookResult = ReturnType<typeof useEditRestaurantMutation>;
export type EditRestaurantMutationResult = Apollo.MutationResult<EditRestaurantMutation>;
export type EditRestaurantMutationOptions = Apollo.BaseMutationOptions<EditRestaurantMutation, EditRestaurantMutationVariables>;
export const DeleteRestaurantDocument = gql`
    mutation DeleteRestaurant($data: DeleteRestaurantInput!) {
  deleteRestaurant(data: $data) {
    ok
    message
  }
}
    `;
export type DeleteRestaurantMutationFn = Apollo.MutationFunction<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>;

/**
 * __useDeleteRestaurantMutation__
 *
 * To run a mutation, you first call `useDeleteRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRestaurantMutation, { data, loading, error }] = useDeleteRestaurantMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteRestaurantMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>(DeleteRestaurantDocument, options);
      }
export type DeleteRestaurantMutationHookResult = ReturnType<typeof useDeleteRestaurantMutation>;
export type DeleteRestaurantMutationResult = Apollo.MutationResult<DeleteRestaurantMutation>;
export type DeleteRestaurantMutationOptions = Apollo.BaseMutationOptions<DeleteRestaurantMutation, DeleteRestaurantMutationVariables>;
export const CreateDishDocument = gql`
    mutation createDish($data: CreateDishInput!) {
  createDishe(data: $data) {
    ok
    message
  }
}
    `;
export type CreateDishMutationFn = Apollo.MutationFunction<CreateDishMutation, CreateDishMutationVariables>;

/**
 * __useCreateDishMutation__
 *
 * To run a mutation, you first call `useCreateDishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDishMutation, { data, loading, error }] = useCreateDishMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateDishMutation(baseOptions?: Apollo.MutationHookOptions<CreateDishMutation, CreateDishMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDishMutation, CreateDishMutationVariables>(CreateDishDocument, options);
      }
export type CreateDishMutationHookResult = ReturnType<typeof useCreateDishMutation>;
export type CreateDishMutationResult = Apollo.MutationResult<CreateDishMutation>;
export type CreateDishMutationOptions = Apollo.BaseMutationOptions<CreateDishMutation, CreateDishMutationVariables>;
export const DeleteDishDocument = gql`
    mutation DeleteDish($dishId: Float!) {
  deleteDish(dishId: $dishId) {
    ok
    message
  }
}
    `;
export type DeleteDishMutationFn = Apollo.MutationFunction<DeleteDishMutation, DeleteDishMutationVariables>;

/**
 * __useDeleteDishMutation__
 *
 * To run a mutation, you first call `useDeleteDishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDishMutation, { data, loading, error }] = useDeleteDishMutation({
 *   variables: {
 *      dishId: // value for 'dishId'
 *   },
 * });
 */
export function useDeleteDishMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDishMutation, DeleteDishMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDishMutation, DeleteDishMutationVariables>(DeleteDishDocument, options);
      }
export type DeleteDishMutationHookResult = ReturnType<typeof useDeleteDishMutation>;
export type DeleteDishMutationResult = Apollo.MutationResult<DeleteDishMutation>;
export type DeleteDishMutationOptions = Apollo.BaseMutationOptions<DeleteDishMutation, DeleteDishMutationVariables>;
export const EditDishDocument = gql`
    mutation editDish($data: EditDishInput!) {
  editDish(data: $data) {
    ok
    message
  }
}
    `;
export type EditDishMutationFn = Apollo.MutationFunction<EditDishMutation, EditDishMutationVariables>;

/**
 * __useEditDishMutation__
 *
 * To run a mutation, you first call `useEditDishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditDishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editDishMutation, { data, loading, error }] = useEditDishMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditDishMutation(baseOptions?: Apollo.MutationHookOptions<EditDishMutation, EditDishMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditDishMutation, EditDishMutationVariables>(EditDishDocument, options);
      }
export type EditDishMutationHookResult = ReturnType<typeof useEditDishMutation>;
export type EditDishMutationResult = Apollo.MutationResult<EditDishMutation>;
export type EditDishMutationOptions = Apollo.BaseMutationOptions<EditDishMutation, EditDishMutationVariables>;
export const CreateOrderDocument = gql`
    mutation createOrder($data: CreateOrderInput!) {
  createOrder(data: $data) {
    ok
    message
    orderId
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const EditOrderDocument = gql`
    mutation editOrder($data: EditOrderInput!) {
  editOrder(data: $data) {
    ok
    message
  }
}
    `;
export type EditOrderMutationFn = Apollo.MutationFunction<EditOrderMutation, EditOrderMutationVariables>;

/**
 * __useEditOrderMutation__
 *
 * To run a mutation, you first call `useEditOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editOrderMutation, { data, loading, error }] = useEditOrderMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditOrderMutation(baseOptions?: Apollo.MutationHookOptions<EditOrderMutation, EditOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditOrderMutation, EditOrderMutationVariables>(EditOrderDocument, options);
      }
export type EditOrderMutationHookResult = ReturnType<typeof useEditOrderMutation>;
export type EditOrderMutationResult = Apollo.MutationResult<EditOrderMutation>;
export type EditOrderMutationOptions = Apollo.BaseMutationOptions<EditOrderMutation, EditOrderMutationVariables>;
export const TakeOrderDocument = gql`
    mutation TakeOrder($data: OrderInputType!) {
  takeOrder(data: $data) {
    ok
    message
    order {
      id
    }
  }
}
    `;
export type TakeOrderMutationFn = Apollo.MutationFunction<TakeOrderMutation, TakeOrderMutationVariables>;

/**
 * __useTakeOrderMutation__
 *
 * To run a mutation, you first call `useTakeOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTakeOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [takeOrderMutation, { data, loading, error }] = useTakeOrderMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useTakeOrderMutation(baseOptions?: Apollo.MutationHookOptions<TakeOrderMutation, TakeOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TakeOrderMutation, TakeOrderMutationVariables>(TakeOrderDocument, options);
      }
export type TakeOrderMutationHookResult = ReturnType<typeof useTakeOrderMutation>;
export type TakeOrderMutationResult = Apollo.MutationResult<TakeOrderMutation>;
export type TakeOrderMutationOptions = Apollo.BaseMutationOptions<TakeOrderMutation, TakeOrderMutationVariables>;
export const CreatePaymentDocument = gql`
    mutation CreatePayment($data: CreatePaymentInputType!) {
  createPayment(data: $data) {
    ok
    message
    url
  }
}
    `;
export type CreatePaymentMutationFn = Apollo.MutationFunction<CreatePaymentMutation, CreatePaymentMutationVariables>;

/**
 * __useCreatePaymentMutation__
 *
 * To run a mutation, you first call `useCreatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentMutation, { data, loading, error }] = useCreatePaymentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePaymentMutation(baseOptions?: Apollo.MutationHookOptions<CreatePaymentMutation, CreatePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePaymentMutation, CreatePaymentMutationVariables>(CreatePaymentDocument, options);
      }
export type CreatePaymentMutationHookResult = ReturnType<typeof useCreatePaymentMutation>;
export type CreatePaymentMutationResult = Apollo.MutationResult<CreatePaymentMutation>;
export type CreatePaymentMutationOptions = Apollo.BaseMutationOptions<CreatePaymentMutation, CreatePaymentMutationVariables>;
export const MutationDocument = gql`
    mutation Mutation($data: VerifyPaymentInputType!) {
  verifyPayment(data: $data) {
    message
    ok
    orderId
  }
}
    `;
export type MutationMutationFn = Apollo.MutationFunction<MutationMutation, MutationMutationVariables>;

/**
 * __useMutationMutation__
 *
 * To run a mutation, you first call `useMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationMutation, { data, loading, error }] = useMutationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useMutationMutation(baseOptions?: Apollo.MutationHookOptions<MutationMutation, MutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationMutation, MutationMutationVariables>(MutationDocument, options);
      }
export type MutationMutationHookResult = ReturnType<typeof useMutationMutation>;
export type MutationMutationResult = Apollo.MutationResult<MutationMutation>;
export type MutationMutationOptions = Apollo.BaseMutationOptions<MutationMutation, MutationMutationVariables>;
export const LoggedInUserDocument = gql`
    query loggedInUser {
  loggedInUser {
    id
    email
    role
    verified
    address {
      id
      address
      apartment
      postalCode
      region
      city
    }
  }
}
    `;

/**
 * __useLoggedInUserQuery__
 *
 * To run a query within a React component, call `useLoggedInUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoggedInUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoggedInUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoggedInUserQuery(baseOptions?: Apollo.QueryHookOptions<LoggedInUserQuery, LoggedInUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoggedInUserQuery, LoggedInUserQueryVariables>(LoggedInUserDocument, options);
      }
export function useLoggedInUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoggedInUserQuery, LoggedInUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoggedInUserQuery, LoggedInUserQueryVariables>(LoggedInUserDocument, options);
        }
export type LoggedInUserQueryHookResult = ReturnType<typeof useLoggedInUserQuery>;
export type LoggedInUserLazyQueryHookResult = ReturnType<typeof useLoggedInUserLazyQuery>;
export type LoggedInUserQueryResult = Apollo.QueryResult<LoggedInUserQuery, LoggedInUserQueryVariables>;
export const GetOrdersDocument = gql`
    query GetOrders($data: OrdersInputFilter!) {
  getOrders(data: $data) {
    ok
    message
    orders {
      id
      totalPrice
      status
      driver {
        id
      }
      customer {
        id
        email
      }
      createdAt
      restaurant {
        id
        name
        coverImg
      }
    }
  }
}
    `;

/**
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetOrdersQuery(baseOptions: Apollo.QueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
      }
export function useGetOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<typeof useGetOrdersLazyQuery>;
export type GetOrdersQueryResult = Apollo.QueryResult<GetOrdersQuery, GetOrdersQueryVariables>;
export const GetOrderByIdDocument = gql`
    query GetOrderById($data: OrderInputType!) {
  getOrderById(data: $data) {
    ok
    message
    order {
      id
      createdAt
      status
      totalPrice
      options {
        id
        quantity
        name
        extra
        dishId
      }
      items {
        id
        quantity
        photo
        price
        name
        restaurantId
      }
      customer {
        id
        email
        role
      }
      driver {
        id
      }
      address {
        id
        address
        apartment
        postalCode
        region
        city
      }
      restaurant {
        ...RestaurantFragment
      }
    }
  }
}
    ${RestaurantFragmentFragmentDoc}`;

/**
 * __useGetOrderByIdQuery__
 *
 * To run a query within a React component, call `useGetOrderByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderByIdQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetOrderByIdQuery(baseOptions: Apollo.QueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, options);
      }
export function useGetOrderByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderByIdQuery, GetOrderByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderByIdQuery, GetOrderByIdQueryVariables>(GetOrderByIdDocument, options);
        }
export type GetOrderByIdQueryHookResult = ReturnType<typeof useGetOrderByIdQuery>;
export type GetOrderByIdLazyQueryHookResult = ReturnType<typeof useGetOrderByIdLazyQuery>;
export type GetOrderByIdQueryResult = Apollo.QueryResult<GetOrderByIdQuery, GetOrderByIdQueryVariables>;
export const RestaurantsDocument = gql`
    query restaurants($data: RestaurantsInput!) {
  getRestaurants(data: $data) {
    ok
    message
    totalPages
    totalRestaurants
    restaurants {
      ...RestaurantFragment
    }
  }
}
    ${RestaurantFragmentFragmentDoc}`;

/**
 * __useRestaurantsQuery__
 *
 * To run a query within a React component, call `useRestaurantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRestaurantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRestaurantsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRestaurantsQuery(baseOptions: Apollo.QueryHookOptions<RestaurantsQuery, RestaurantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RestaurantsQuery, RestaurantsQueryVariables>(RestaurantsDocument, options);
      }
export function useRestaurantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RestaurantsQuery, RestaurantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RestaurantsQuery, RestaurantsQueryVariables>(RestaurantsDocument, options);
        }
export type RestaurantsQueryHookResult = ReturnType<typeof useRestaurantsQuery>;
export type RestaurantsLazyQueryHookResult = ReturnType<typeof useRestaurantsLazyQuery>;
export type RestaurantsQueryResult = Apollo.QueryResult<RestaurantsQuery, RestaurantsQueryVariables>;
export const RestaurantsOwnerDocument = gql`
    query restaurantsOwner($data: RestaurantsInput!) {
  getOwnerRestaurants(data: $data) {
    ok
    message
    totalPages
    totalRestaurants
    restaurants {
      ...RestaurantFragment
    }
  }
}
    ${RestaurantFragmentFragmentDoc}`;

/**
 * __useRestaurantsOwnerQuery__
 *
 * To run a query within a React component, call `useRestaurantsOwnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useRestaurantsOwnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRestaurantsOwnerQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRestaurantsOwnerQuery(baseOptions: Apollo.QueryHookOptions<RestaurantsOwnerQuery, RestaurantsOwnerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RestaurantsOwnerQuery, RestaurantsOwnerQueryVariables>(RestaurantsOwnerDocument, options);
      }
export function useRestaurantsOwnerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RestaurantsOwnerQuery, RestaurantsOwnerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RestaurantsOwnerQuery, RestaurantsOwnerQueryVariables>(RestaurantsOwnerDocument, options);
        }
export type RestaurantsOwnerQueryHookResult = ReturnType<typeof useRestaurantsOwnerQuery>;
export type RestaurantsOwnerLazyQueryHookResult = ReturnType<typeof useRestaurantsOwnerLazyQuery>;
export type RestaurantsOwnerQueryResult = Apollo.QueryResult<RestaurantsOwnerQuery, RestaurantsOwnerQueryVariables>;
export const RestaurantDocument = gql`
    query Restaurant($data: RestaurantInputType!) {
  getRestaurant(data: $data) {
    ok
    message
    restaurant {
      ...RestaurantFragment
      menu {
        ...DishFragment
      }
    }
  }
}
    ${RestaurantFragmentFragmentDoc}
${DishFragmentFragmentDoc}`;

/**
 * __useRestaurantQuery__
 *
 * To run a query within a React component, call `useRestaurantQuery` and pass it any options that fit your needs.
 * When your component renders, `useRestaurantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRestaurantQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRestaurantQuery(baseOptions: Apollo.QueryHookOptions<RestaurantQuery, RestaurantQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RestaurantQuery, RestaurantQueryVariables>(RestaurantDocument, options);
      }
export function useRestaurantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RestaurantQuery, RestaurantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RestaurantQuery, RestaurantQueryVariables>(RestaurantDocument, options);
        }
export type RestaurantQueryHookResult = ReturnType<typeof useRestaurantQuery>;
export type RestaurantLazyQueryHookResult = ReturnType<typeof useRestaurantLazyQuery>;
export type RestaurantQueryResult = Apollo.QueryResult<RestaurantQuery, RestaurantQueryVariables>;
export const RestaurantOwnerDocument = gql`
    query restaurantOwner($data: RestaurantInputType!) {
  getOwnerRestaurant(data: $data) {
    ok
    message
    restaurant {
      ...RestaurantFragment
      menu {
        ...DishFragment
      }
      orders {
        ...OrderFragment
      }
    }
  }
}
    ${RestaurantFragmentFragmentDoc}
${DishFragmentFragmentDoc}
${OrderFragmentFragmentDoc}`;

/**
 * __useRestaurantOwnerQuery__
 *
 * To run a query within a React component, call `useRestaurantOwnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useRestaurantOwnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRestaurantOwnerQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRestaurantOwnerQuery(baseOptions: Apollo.QueryHookOptions<RestaurantOwnerQuery, RestaurantOwnerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RestaurantOwnerQuery, RestaurantOwnerQueryVariables>(RestaurantOwnerDocument, options);
      }
export function useRestaurantOwnerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RestaurantOwnerQuery, RestaurantOwnerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RestaurantOwnerQuery, RestaurantOwnerQueryVariables>(RestaurantOwnerDocument, options);
        }
export type RestaurantOwnerQueryHookResult = ReturnType<typeof useRestaurantOwnerQuery>;
export type RestaurantOwnerLazyQueryHookResult = ReturnType<typeof useRestaurantOwnerLazyQuery>;
export type RestaurantOwnerQueryResult = Apollo.QueryResult<RestaurantOwnerQuery, RestaurantOwnerQueryVariables>;
export const CategoriesDocument = gql`
    query categories {
  getCategories {
    message
    ok
    categories {
      id
      name
      slug
      restaurantCount
      iconImg
    }
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const SearchRestaurantsDocument = gql`
    query SearchRestaurants($data: SearchRestaurantInput!) {
  searchRestaurants(data: $data) {
    ok
    message
    totalRestaurants
    totalPages
    restaurants {
      ...RestaurantFragment
    }
  }
}
    ${RestaurantFragmentFragmentDoc}`;

/**
 * __useSearchRestaurantsQuery__
 *
 * To run a query within a React component, call `useSearchRestaurantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchRestaurantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchRestaurantsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSearchRestaurantsQuery(baseOptions: Apollo.QueryHookOptions<SearchRestaurantsQuery, SearchRestaurantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchRestaurantsQuery, SearchRestaurantsQueryVariables>(SearchRestaurantsDocument, options);
      }
export function useSearchRestaurantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchRestaurantsQuery, SearchRestaurantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchRestaurantsQuery, SearchRestaurantsQueryVariables>(SearchRestaurantsDocument, options);
        }
export type SearchRestaurantsQueryHookResult = ReturnType<typeof useSearchRestaurantsQuery>;
export type SearchRestaurantsLazyQueryHookResult = ReturnType<typeof useSearchRestaurantsLazyQuery>;
export type SearchRestaurantsQueryResult = Apollo.QueryResult<SearchRestaurantsQuery, SearchRestaurantsQueryVariables>;
export const UserProfileDocument = gql`
    query userProfile($userId: Float!) {
  userProfile(userId: $userId) {
    user {
      email
    }
    ok
    message
  }
}
    `;

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserProfileQuery(baseOptions: Apollo.QueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
      }
export function useUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
        }
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<typeof useUserProfileLazyQuery>;
export type UserProfileQueryResult = Apollo.QueryResult<UserProfileQuery, UserProfileQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    email
    role
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const CategoryDocument = gql`
    query Category($data: CategoryInputType!) {
  getCategory(data: $data) {
    ok
    message
    totalPages
    category {
      name
      id
      iconImg
      restaurantCount
      slug
    }
    restaurants {
      ...RestaurantFragment
    }
  }
}
    ${RestaurantFragmentFragmentDoc}`;

/**
 * __useCategoryQuery__
 *
 * To run a query within a React component, call `useCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCategoryQuery(baseOptions: Apollo.QueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
      }
export function useCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
        }
export type CategoryQueryHookResult = ReturnType<typeof useCategoryQuery>;
export type CategoryLazyQueryHookResult = ReturnType<typeof useCategoryLazyQuery>;
export type CategoryQueryResult = Apollo.QueryResult<CategoryQuery, CategoryQueryVariables>;
export const GetDishDocument = gql`
    query getDish($dishId: Int!) {
  getDish(dishId: $dishId) {
    message
    ok
    totalPages
    dish {
      id
      name
      description
      price
      restaurant {
        id
      }
      options {
        id
        name
        extra
        quantity
      }
      photo
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetDishQuery__
 *
 * To run a query within a React component, call `useGetDishQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDishQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDishQuery({
 *   variables: {
 *      dishId: // value for 'dishId'
 *   },
 * });
 */
export function useGetDishQuery(baseOptions: Apollo.QueryHookOptions<GetDishQuery, GetDishQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDishQuery, GetDishQueryVariables>(GetDishDocument, options);
      }
export function useGetDishLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDishQuery, GetDishQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDishQuery, GetDishQueryVariables>(GetDishDocument, options);
        }
export type GetDishQueryHookResult = ReturnType<typeof useGetDishQuery>;
export type GetDishLazyQueryHookResult = ReturnType<typeof useGetDishLazyQuery>;
export type GetDishQueryResult = Apollo.QueryResult<GetDishQuery, GetDishQueryVariables>;
export const PaymentsDocument = gql`
    query Payments {
  Payments {
    ok
    message
    payments {
      payment_method
    }
  }
}
    `;

/**
 * __usePaymentsQuery__
 *
 * To run a query within a React component, call `usePaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePaymentsQuery(baseOptions?: Apollo.QueryHookOptions<PaymentsQuery, PaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaymentsQuery, PaymentsQueryVariables>(PaymentsDocument, options);
      }
export function usePaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentsQuery, PaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaymentsQuery, PaymentsQueryVariables>(PaymentsDocument, options);
        }
export type PaymentsQueryHookResult = ReturnType<typeof usePaymentsQuery>;
export type PaymentsLazyQueryHookResult = ReturnType<typeof usePaymentsLazyQuery>;
export type PaymentsQueryResult = Apollo.QueryResult<PaymentsQuery, PaymentsQueryVariables>;
export const PendingOrderSubDocument = gql`
    subscription PendingOrderSub {
  pendingOrders {
    id
  }
}
    `;

/**
 * __usePendingOrderSubSubscription__
 *
 * To run a query within a React component, call `usePendingOrderSubSubscription` and pass it any options that fit your needs.
 * When your component renders, `usePendingOrderSubSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingOrderSubSubscription({
 *   variables: {
 *   },
 * });
 */
export function usePendingOrderSubSubscription(baseOptions?: Apollo.SubscriptionHookOptions<PendingOrderSubSubscription, PendingOrderSubSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<PendingOrderSubSubscription, PendingOrderSubSubscriptionVariables>(PendingOrderSubDocument, options);
      }
export type PendingOrderSubSubscriptionHookResult = ReturnType<typeof usePendingOrderSubSubscription>;
export type PendingOrderSubSubscriptionResult = Apollo.SubscriptionResult<PendingOrderSubSubscription>;
export const UpdateOrdersDocument = gql`
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
    totalPrice
    customer {
      id
    }
    createdAt
  }
}
    `;

/**
 * __useUpdateOrdersSubscription__
 *
 * To run a query within a React component, call `useUpdateOrdersSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrdersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdateOrdersSubscription({
 *   variables: {
 *   },
 * });
 */
export function useUpdateOrdersSubscription(baseOptions?: Apollo.SubscriptionHookOptions<UpdateOrdersSubscription, UpdateOrdersSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UpdateOrdersSubscription, UpdateOrdersSubscriptionVariables>(UpdateOrdersDocument, options);
      }
export type UpdateOrdersSubscriptionHookResult = ReturnType<typeof useUpdateOrdersSubscription>;
export type UpdateOrdersSubscriptionResult = Apollo.SubscriptionResult<UpdateOrdersSubscription>;