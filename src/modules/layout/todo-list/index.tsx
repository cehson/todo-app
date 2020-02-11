import React, {useState, useEffect} from 'react';
import {useDebounce} from 'use-debounce';
import Todo from '../todo-details/redux/types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const TodoList = ({todos, isLogedIn}) => {

	// ========= state ==================
	let [searchValue, setSearchValue] = useState('');
	let [filterBy, setFilterBy] = useState('id');
	let [filterByStatus, setFilterByStatus] = useState('all');

	// ==================================
	const [searchbYValue] = useDebounce(searchValue, 400);
	const [searchbYFilter] = useDebounce(filterBy, 400);
	const [searchByStatus] = useDebounce(filterByStatus, 400);

	// const statusFilter = (event) => {
	//
	// 	let updatedValue = event.currentTarget.value;
	//
	// 	if (updatedValue === "true" || updatedValue == "false") {
	// 		updatedValue = JSON.parse(updatedValue);
	// 		setFilterByStatus(updatedValue);
	// 	}
	// 	todos = todos.filter(el => {
	// 		return el.finished === updatedValue;
	// 	});
	// };

	function compare(a, b) {
		const timeA = a.scheduledTime;
		const timeB = b.scheduledTime;
		let comparison = 0;
		if (timeA > timeB) {
			comparison = -1;
		} else if (timeA < timeB) {
			comparison = 1;
		}
		return comparison;
	}


	return (
		<section className='section'>
			<div className='container'>
				<div style={{marginBottom: '40px'}}>
					<div className='field' style={{maxWidth: '200px', display: 'inline-block'}}>
						<div className='control'>
							<input
								className='input'
								type='text'
								onChange={event => setSearchValue(event.target.value)}
								placeholder='Search todos'/>
						</div>
					</div>

					<div className='select' style={{marginLeft: '20px'}}>
						<select onChange={event => setFilterBy(event.target.value)}>
							<option value='id'>By ID</option>
							<option value='content'>By Content</option>
						</select>
					</div>

					<div className='select' style={{marginLeft: '20px'}}>
						<select onChange={event => setFilterByStatus(event.target.value)}>
							<option value='all'>Show all</option>
							<option value='false'>Not finished</option>
							<option value='true'>Finished</option>
						</select>
					</div>

				</div>
				{/*<h1 className='title'>Todo List</h1>*/}
				<table className='table todoListTable' style={{width: '100%', overflowX: 'auto'}}>
					<thead>
					<tr>
						<th>Number</th>
						<th>Todo ID</th>
						<th>Content</th>
						<th>Date</th>
						<th>Status</th>
						<th></th>
					</tr>
					</thead>
					<tbody>
					{
						todos  && isLogedIn && todos.length ? todos.sort(compare).filter((todo) => {
							if (searchByStatus === 'all') {
								return todos;
							} else {
								return todo && todo.finished === JSON.parse(searchByStatus);
							}
						}).filter((todo) => {
							return todo && todo[`${searchbYFilter}`] && todo[`${searchbYFilter}`].indexOf(searchbYValue) ? todo[`${searchbYFilter}`].indexOf(searchbYValue) !== -1 : todos;
						}).map((todo: Todo, index: number) => {
							return (
								<tr key={index + 1} className={todo.finished ? 'finished' : ''}>
									<td>{index + 1}</td>
									<td>{todo.id }</td>
									<td>{todo.content}</td>
									<td>{new Date(todo.scheduledTime).toDateString()}</td>
									<td>{todo.finished ? 'Finished' : 'Not finished'}</td>
									<td><Link to={'todo/' + todo.id}>Go to</Link></td>
								</tr>
							);
						}) : todos  && !isLogedIn && todos.map((todo: Todo, index: number) => {
							return (
								<tr key={index + 1} className={todo.finished ? 'finished' : ''}>
									<td>{index + 1}</td>
									<td></td>
									<td>{todo.content}</td>
									<td>{new Date(todo.scheduledTime).toDateString()}</td>
									<td>{todo.finished ? 'Finished' : 'Not finished'}</td>
									<td><Link to={'todo/' + todos.findIndex(function(item) {
										return item.content === todo.content;	}) }>Go to</Link></td>
								</tr>
							);
						})
					}</tbody>
				</table>
			</div>
		</section>
	);
};

const mapStateToProps = (state: any) => {
	return {
		isLogedIn: state.firebase.auth.uid
	};
};

export default connect(mapStateToProps)(TodoList);
