import React from "react";
import List from './List'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const list = [
    {
        text: 'This is a testing text we will see if it works',
        done: false,
        id: 1
    },
    {
        text: 'This is pointless data for testing',
        done: true,
        id:2
    },
    {
        text:'Another empty data for testing',
        done:true,
        id:3
    }
]

const onClickAdd = jest.fn()
const onClickDelete = jest.fn()

test('renders content', () => {
    render(
    <List 
        todos={list} 
        completeTodo={onClickAdd} 
        deleteTodo={onClickDelete}
    />)
    const todoData = screen.getByText('This is a testing text we will see if it works')
    expect(todoData).toBeInTheDocument()

})