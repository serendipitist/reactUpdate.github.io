it('shows forks when the button is tapped', () => {
    const rendered = TestUtils.renderIntoDocument(
        <Detail params={{repo: ''}} />
    );

    const btns = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'button');
    const forksButton = btns[1];
    TestUtils.Simulate.click(forksButton);
    expect(rendered.state.mode).toEqual('forks');
});