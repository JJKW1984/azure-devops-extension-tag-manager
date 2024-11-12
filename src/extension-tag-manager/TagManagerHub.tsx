import * as React from "react";
import * as SDK from "azure-devops-extension-sdk";
import { CommonServiceIds, IProjectPageService, IHostPageLayoutService } from "azure-devops-extension-api";
import { Button } from "azure-devops-ui/Button";
import { TextField } from "azure-devops-ui/TextField";
import { List } from "azure-devops-ui/List";
import { ObservableArray, ObservableValue } from "azure-devops-ui/Core/Observable";
import { showRootComponent } from "../../Common";

interface ITagManagerHubState {
    tags: ObservableArray<string>;
    filterString: ObservableValue<string>;
    currentPage: number;
    totalPages: number;
}

class TagManagerHub extends React.Component<{}, ITagManagerHubState> {
    private pageSize = 350;

    constructor(props: {}) {
        super(props);

        this.state = {
            tags: new ObservableArray<string>([]),
            filterString: new ObservableValue<string>(""),
            currentPage: 1,
            totalPages: 1
        };
    }

    public componentDidMount() {
        SDK.init();
        this.loadTags();
    }

    public render(): JSX.Element {
        const { tags, filterString, currentPage, totalPages } = this.state;

        return (
            <div className="tag-manager-hub">
                <TextField
                    value={filterString.value}
                    onChange={this.onFilterStringChanged}
                    placeholder="Filter tags"
                />
                <List
                    items={tags.value}
                    renderRow={this.renderTagRow}
                />
                <div className="pagination-controls">
                    <Button
                        text="Previous"
                        onClick={this.onPreviousPage}
                        disabled={currentPage === 1}
                    />
                    <span>{currentPage} / {totalPages}</span>
                    <Button
                        text="Next"
                        onClick={this.onNextPage}
                        disabled={currentPage === totalPages}
                    />
                </div>
            </div>
        );
    }

    private onFilterStringChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void => {
        this.setState({ filterString: new ObservableValue<string>(value) }, this.loadTags);
    }

    private onPreviousPage = (): void => {
        this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }), this.loadTags);
    }

    private onNextPage = (): void => {
        this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }), this.loadTags);
    }

    private renderTagRow = (index: number, tag: string): JSX.Element => {
        return (
            <div className="tag-row" key={index}>
                <span>{tag}</span>
                <Button text="Rename" onClick={() => this.renameTag(tag)} />
                <Button text="Merge" onClick={() => this.mergeTag(tag)} />
                <Button text="Delete" onClick={() => this.deleteTag(tag)} />
            </div>
        );
    }

    private async loadTags(): Promise<void> {
        const { filterString, currentPage } = this.state;
        const projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
        const project = await projectService.getProject();

        if (project) {
            // Simulate API call to fetch tags
            const allTags = ["tag1", "tag2", "tag3", "tag4", "tag5"]; // Replace with actual API call
            const filteredTags = allTags.filter(tag => tag.includes(filterString.value));
            const totalPages = Math.ceil(filteredTags.length / this.pageSize);
            const paginatedTags = filteredTags.slice((currentPage - 1) * this.pageSize, currentPage * this.pageSize);

            this.setState({
                tags: new ObservableArray<string>(paginatedTags),
                totalPages
            });
        }
    }

    private renameTag(tag: string): void {
        // Implement rename tag functionality
    }

    private mergeTag(tag: string): void {
        // Implement merge tag functionality
    }

    private deleteTag(tag: string): void {
        // Implement delete tag functionality
    }
}

showRootComponent(<TagManagerHub />);
