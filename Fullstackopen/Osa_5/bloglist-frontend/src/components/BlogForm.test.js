import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


test('Testing contents of blogFrom ', async () => {
    const mockHandler = jest.fn()
        
    render(
            <BlogForm 
            createBlog = {mockHandler}
            />
        )

    const simulatedUser = userEvent.setup()


    const titleInput = screen.getByPlaceholderText('blog-title')
    const authorInput = screen.getByPlaceholderText('blog-author')
    const urlInput = screen.getByPlaceholderText('blog-url')

    await simulatedUser.type(titleInput, 'Test title')
    await simulatedUser.type(authorInput, 'testing-author')
    await simulatedUser.type(urlInput, 'www.testing.com')


    const sendButton = screen.getByText('save')
    await simulatedUser.click(sendButton)
    
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toContain('Test title')
    expect(mockHandler.mock.calls[0][0].author).toBe('testing-author')
    expect(mockHandler.mock.calls[0][0].url).toBe('www.testing.com')
    expect(mockHandler.mock.calls[0][0].like).toBe(0)
})