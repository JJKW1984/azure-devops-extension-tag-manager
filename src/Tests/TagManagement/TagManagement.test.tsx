import '@testing-library/jest-dom/extend-expect';
import {
    fireEvent,
    render,
    screen,
    waitFor
} from '@testing-library/react';
import React from 'react';
import TagManagerHub from '../../extension-tag-manager/TagManagerHub';
import ProjectSettingsMenu from '../../extension-tag-manager/ProjectSettingsMenu';

describe('TagManagerHub', () => {
    test('renders TagManagerHub component', () => {
        render(<TagManagerHub />);
        const filterInput = screen.getByPlaceholderText(/Filter tags/i);
        expect(filterInput).toBeInTheDocument();
    });

    test('filters tags based on input', async () => {
        render(<TagManagerHub />);
        const filterInput = screen.getByPlaceholderText(/Filter tags/i);
        fireEvent.change(filterInput, { target: { value: 'tag1' } });
        await waitFor(() => {
            const tagRow = screen.getByText(/tag1/i);
            expect(tagRow).toBeInTheDocument();
        });
    });

    test('paginates tags', async () => {
        render(<TagManagerHub />);
        const nextButton = screen.getByText(/Next/i);
        fireEvent.click(nextButton);
        await waitFor(() => {
            const currentPage = screen.getByText(/2 \/ 2/i);
            expect(currentPage).toBeInTheDocument();
        });
    });

    test('renames a tag', async () => {
        render(<TagManagerHub />);
        const renameButton = screen.getByText(/Rename/i);
        fireEvent.click(renameButton);
        // Implement further checks for renaming functionality
    });

    test('merges a tag', async () => {
        render(<TagManagerHub />);
        const mergeButton = screen.getByText(/Merge/i);
        fireEvent.click(mergeButton);
        // Implement further checks for merging functionality
    });

    test('deletes a tag', async () => {
        render(<TagManagerHub />);
        const deleteButton = screen.getByText(/Delete/i);
        fireEvent.click(deleteButton);
        // Implement further checks for deleting functionality
    });
});

describe('ProjectSettingsMenu', () => {
    test('renders ProjectSettingsMenu component', () => {
        render(<ProjectSettingsMenu />);
        const groupDropdown = screen.getByPlaceholderText(/Select a group/i);
        expect(groupDropdown).toBeInTheDocument();
    });

    test('sets permission for a group', async () => {
        render(<ProjectSettingsMenu />);
        const groupDropdown = screen.getByPlaceholderText(/Select a group/i);
        fireEvent.change(groupDropdown, { target: { value: 'Group1' } });
        const permissionDropdown = screen.getByPlaceholderText(/Select a permission/i);
        fireEvent.change(permissionDropdown, { target: { value: 'Read' } });
        const setPermissionButton = screen.getByText(/Set Permission/i);
        fireEvent.click(setPermissionButton);
        // Implement further checks for setting permission functionality
    });
});
