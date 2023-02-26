import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'The test blog title',
  author: 'Master yoda',
  url: 'www.google.com',
  like: 102,
  user: {
    name: 'Nikolai Markalainen',
    username: 'Lastis',
    password: '12345',
  },
}
const user = {
  name: 'Nikolai Markalainen',
  username: 'Lastis',
  password: '12345',
}

test('renders content', () => {
  const { container } = render(<Blog blog={blog} user={user} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('The test blog title, Master yoda')
})

test('looking for values', async () => {
  const { container } = render(<Blog blog={blog} user={user} />)

  const clickedUser = userEvent.setup()

  const button = screen.getByText('Show more')
  await clickedUser.click(button)

  const title = container.querySelector('.blog')
  expect(title).toHaveTextContent('The test blog title, Master yoda')
  const url = container.querySelector('.url-info')
  expect(url).toHaveTextContent('www.google.com')
  const likes = container.querySelector('.likes-data')
  expect(likes).toHaveTextContent(102)
  const creator = container.querySelector('.user-info')
  expect(creator).toHaveTextContent('Lastis')
})

test('Clicking like twice and event handler works', async () => {
  const mockHandler = jest.fn()

  const { container } = render(
    <Blog blog={blog} user={user} addBlogLike={mockHandler} />
  )

  const simulatedUser = userEvent.setup()
  const detailsButton = screen.getByText('Show more')

  await simulatedUser.click(detailsButton)

  const likeButton = screen.getByText('LIKE')

  await simulatedUser.click(likeButton)
  await simulatedUser.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
  expect(mockHandler).toHaveBeenCalledTimes(2)
  expect
  likeButton.simulate
})
