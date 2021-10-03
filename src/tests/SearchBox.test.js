import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { SearchBox } from '../components/shared/SearchBox'

it('renders searchbox correctly', () => {
  const mockSearch = jest.fn()
  const { queryByTestId } = render(<SearchBox onSearch={mockSearch} />)

  expect(queryByTestId('search-box')).toBeTruthy
})

describe('Input value', () => {
  it('updates on change', () => {
    const mockSearch = jest.fn()
    const { queryByTestId } = render(<SearchBox onSearch={mockSearch} />)

    const searchInput = queryByTestId('search-box')

    fireEvent.change(searchInput, { target: { value: 'test' } })

    expect(searchInput.value).toBe('test')
  })
})

describe('Search functionality', () => {
  describe('with empty query', () => {
    it('triggers the search function on mount', () => {
      const onSearch = jest.fn()

      const { queryByTestId } = render(<SearchBox onSearch={onSearch} />)
      const searchInput = queryByTestId('search-box')

      fireEvent.change(searchInput, { target: { value: '' } })
      expect(onSearch.mock.calls.length).toBe(1)
    })
  })

  describe('with search query', () => {
    it('triggers the search function a second time', () => {
      const onSearch = jest.fn()

      const { queryByTestId } = render(<SearchBox onSearch={onSearch} />)
      const searchInput = queryByTestId('search-box')

      fireEvent.change(searchInput, { target: { value: 'test' } })

      expect(onSearch.mock.calls.length).toBe(2)
    })
  })
})
