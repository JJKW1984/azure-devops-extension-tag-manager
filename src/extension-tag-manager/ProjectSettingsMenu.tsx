import * as React from "react";
import * as SDK from "azure-devops-extension-sdk";
import { CommonServiceIds, IProjectPageService } from "azure-devops-extension-api";
import { Button } from "azure-devops-ui/Button";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { ListSelection } from "azure-devops-ui/List";
import { ObservableArray, ObservableValue } from "azure-devops-ui/Core/Observable";
import { showRootComponent } from "../../Common";

interface IProjectSettingsMenuState {
    permissions: ObservableArray<string>;
    selectedPermission: ObservableValue<string>;
    groups: ObservableArray<string>;
    selectedGroup: ObservableValue<string>;
}

class ProjectSettingsMenu extends React.Component<{}, IProjectSettingsMenuState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            permissions: new ObservableArray<string>(["Read", "Update", "Merge", "Delete"]),
            selectedPermission: new ObservableValue<string>("Read"),
            groups: new ObservableArray<string>(["Group1", "Group2", "Group3"]),
            selectedGroup: new ObservableValue<string>("Group1")
        };
    }

    public componentDidMount() {
        SDK.init();
        this.loadGroups();
    }

    public render(): JSX.Element {
        const { permissions, selectedPermission, groups, selectedGroup } = this.state;

        return (
            <div className="project-settings-menu">
                <Dropdown
                    items={groups.value}
                    onSelect={this.onGroupChanged}
                    selection={new ListSelection({ selectOnFocus: false, multiSelect: false, selectedRanges: [{ beginIndex: groups.value.indexOf(selectedGroup.value), endIndex: groups.value.indexOf(selectedGroup.value) }] })}
                    placeholder="Select a group"
                />
                <Dropdown
                    items={permissions.value}
                    onSelect={this.onPermissionChanged}
                    selection={new ListSelection({ selectOnFocus: false, multiSelect: false, selectedRanges: [{ beginIndex: permissions.value.indexOf(selectedPermission.value), endIndex: permissions.value.indexOf(selectedPermission.value) }] })}
                    placeholder="Select a permission"
                />
                <Button text="Set Permission" onClick={this.setPermission} />
            </div>
        );
    }

    private onGroupChanged = (event: React.SyntheticEvent<HTMLElement>, item: string): void => {
        this.setState({ selectedGroup: new ObservableValue<string>(item) });
    }

    private onPermissionChanged = (event: React.SyntheticEvent<HTMLElement>, item: string): void => {
        this.setState({ selectedPermission: new ObservableValue<string>(item) });
    }

    private async loadGroups(): Promise<void> {
        const projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService);
        const project = await projectService.getProject();

        if (project) {
            // Simulate API call to fetch groups
            const allGroups = ["Group1", "Group2", "Group3"]; // Replace with actual API call
            this.setState({ groups: new ObservableArray<string>(allGroups) });
        }
    }

    private setPermission = (): void => {
        const { selectedGroup, selectedPermission } = this.state;
        // Implement set permission functionality
        console.log(`Setting ${selectedPermission.value} permission for ${selectedGroup.value}`);
    }
}

showRootComponent(<ProjectSettingsMenu />);
