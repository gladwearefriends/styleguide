const React = require('react');

const Page = require('./components/Page');
const Example = require('./components/Example');
const CodeEditor = require('./components/CodeEditor');

const Panel = require('../src/Panel');
const Button = require('../src/Button');

const SCOPE = {React, Button};

const EXAMPLE_DEFAULT =
`<Button>Button button</Button>
<Button href="#">Link button</Button>`;

const EXAMPLE_SIZES =
`<Button size="lg">Large button</Button>
<Button size="md">Normal button</Button>
<Button size="sm">Small button</Button>
<Button size="xs">Extra small button</Button>`;

const EXAMPLE_STYLES =
`<Button style="primary">Primary button</Button>
<Button style="success">Success button</Button>
<Button style="danger">Danger button</Button>
<Button style="secondary">Secondary button</Button>`;

const EXAMPLE_BLOCK =
`<Button block style="primary">Primary block button</Button>
<Button block>Secondary button</Button>`;

const EXAMPLE_GROUP =
`<Button.Toolbar>
    <Button.Group>
        <Button>Button</Button>
        <Button>Button</Button>
    </Button.Group>
    <Button.Group>
        <Button size="sm">Button</Button>
        <Button size="sm">Button</Button>
    </Button.Group>
</Button.Toolbar>`;

const EXAMPLE_GROUP_JUSTIFIED =
`<Button.Group block>
    <Button>Button</Button>
    <Button>Button</Button>
</Button.Group>`;

export default () => {
    return (
        <Page title="Buttons" active="buttons">
            <Panel>
                <Panel.Heading title="Buttons" />
                <Panel.Body>
                    <p>Buttons are used for actions, like in forms, while textual hyperlinks are used for destinations, or moving from one page to another.</p>
                    <CodeEditor source="const Button = require('gitbook-styleguide/lib/Button');" />
                </Panel.Body>
            </Panel>

            <Example title="Default buttons" source={EXAMPLE_DEFAULT} scope={SCOPE}></Example>

            <Example title="Sizes" source={EXAMPLE_SIZES} scope={SCOPE}>
                Buttons are availables in multiples sizes: Large, Normal, Small and Extra-Small.
            </Example>

            <Example title="Styles" source={EXAMPLE_STYLES} scope={SCOPE}>
                Buttons can be filled to indicate a more important action:
            </Example>

            <Example title="Block buttons" source={EXAMPLE_BLOCK} scope={SCOPE}>
                Create block level buttons—those that span the full width of a parent:
            </Example>

            <Example title="Button groups" source={EXAMPLE_GROUP} scope={SCOPE}>
                Have a hankering for a series of buttons that are attached to one another? Wrap them in a `Button.Group` and the buttons will be rounded and spaced automatically.
            </Example>

            <Example title="Justified Button groups" source={EXAMPLE_GROUP_JUSTIFIED} scope={SCOPE}>
                Button groups can be justified, to make a group of buttons stretch at equal sizes to span the entire width of its parent. Also works with button dropdowns within the button group.
            </Example>
        </Page>
    );
};