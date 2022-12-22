import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'testing testing',
    author: 'jestthaatdoesJEST'

  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('testing testing, jestthaatdoesJEST')

  expect(element).toBeDefined()
})