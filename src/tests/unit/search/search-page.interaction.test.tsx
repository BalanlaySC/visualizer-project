import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SearchPage } from '../../../features/search/SearchPage'

describe('SearchPage baseline interactions', () => {
  it('keeps exactly one start node when placing start twice', () => {
    render(<SearchPage theme="light" />)

    const toolSelect = screen.getByRole('combobox', { name: /node tool/i })
    fireEvent.change(toolSelect, { target: { value: 'start' } })

    fireEvent.pointerDown(screen.getByTitle('Node [0, 0]'))
    expect(screen.getByText('Walls: 0 | Start: 1 | End: 0')).toBeInTheDocument()

    fireEvent.pointerDown(screen.getByTitle('Node [0, 1]'))
    expect(screen.getByText('Walls: 0 | Start: 1 | End: 0')).toBeInTheDocument()
  })
})
