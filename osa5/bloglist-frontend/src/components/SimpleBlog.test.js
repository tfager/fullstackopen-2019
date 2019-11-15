import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
    let component
    let mockClick

    beforeEach(() => {
        const blog = {
            title: 'Test Title',
            author: 'Test author',
            likes: 10
        }
        mockClick = jest.fn()

        component = render(
            <SimpleBlog blog={blog} onClick={mockClick}/>
        )

    })

    test('renders content', () => {

        const div1 = component.container.querySelector('.blogmain')
        expect(div1).toHaveTextContent(
            'Test Title Test author'
        )

        const div2 = component.container.querySelector('.likes')
        expect(div2).toHaveTextContent(
            '10 likes'
        )

    })

    test('calls like handler', () => {
        const button = component.getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockClick.mock.calls.length).toBe(2)
    })
})